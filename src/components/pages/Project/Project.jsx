import { v4 as uuidv4 } from "uuid";

import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../layout/Loading/Loading";
import Container from "../../layout/Container/Container";
import ProjectForm from "../../project/ProjectForm/ProjectForm";
import Menssage from "../../layout/Mensagem/Mensagem";
import ServiceForm from "../../services/ServiceForm/ServiceForm";
import ServiceCard from "../../services/ServiceCard/ServiceCard";

import { BsPencil } from "react-icons/bs";
import { HiMiniXMark } from "react-icons/hi2";

import FormatNumber from "../../layout/FormatNumber/FormatNumber";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);

  const [services, setServices] = useState([]);
  const [mensage, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setMessage(() => "");
    setType(() => "");
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [id]);

  function editPost(project) {
    setMessage(() => "");
    setType(() => "");
    // budget validation
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);

        // mensagem
        setMessage("Projeto atualizado com sucesso!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function createService() {
    setMessage("");
    setType("");
    // last service
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    // max value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço!");
      setType("error");
      project.services.pop();
      return false;
    }

    // add service to project
    project.cost = newCost;

    //update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowServiceForm(false);
        setProject(data);
        setMessage(() => "Serviço adicionado com sucesso!");
        setType(() => "success");
      })
      .catch((err) => console.log(err));
  }

  function removeService(id) {
    setMessage("");
    setType("");
    const serviceUpdated = project.services.filter(
      (service) => service.id !== id
    );
    const serviceRemoved = project.services.find(
      (service) => service.id === id
    );

    const cost = parseFloat(project.cost) - parseFloat(serviceRemoved.cost);

    if (cost < 0) {
      setMessage("Ocorreu um erro, tente novamente!");
      setType("error");
      return false;
    }

    project.services = serviceUpdated;
    project.cost = cost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        setServices(serviceUpdated);
        setMessage("Serviço removido com sucesso!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  const num = Number(project.budget) - Number(project.cost);

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {mensage && <Menssage type={type} msg={mensage} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {showProjectForm ? " Fechar projeto " : "Editar projeto "}

                {showProjectForm ? (
                  <HiMiniXMark className={styles.icon} />
                ) : (
                  <BsPencil className={styles.icon} />
                )}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamentos: </span>
                    <FormatNumber value={project.budget} />
                  </p>
                  <p>
                    <span>Total Utilizado: </span>
                    <FormatNumber value={project.cost} />
                  </p>

                  {/* verifica se o saldo é negativo */}
                  {num < 0 ? (
                    <p className={styles.error}>
                      <span>Saldo negativo</span>
                      <FormatNumber value={num} />
                    </p>
                  ) : (
                    <p className={styles.success}>
                      <span>Saldo positivo</span>
                      <FormatNumber value={num} />
                    </p>
                  )}
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    btnText="Concluir edição"
                    projectData={project}
                    handleSubmit={editPost}
                  />
                </div>
              )}
            </div>

            <div className={styles.service_form_conteiner}>
              <h2>Adicioner um serviço:</h2>

              <button className={styles.btn} onClick={toggleServiceForm}>
                {showServiceForm ? " Fechar " : "Adicionar serviço "}

                {showProjectForm ? (
                  <HiMiniXMark className={styles.icon} />
                ) : (
                  <BsPencil className={styles.icon} />
                )}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    btnText="Criar serviço"
                    handleSubmit={createService}
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              <div className={styles.services}>
                {services.length === 0 && <p>Não há serviços cadastrados</p>}
                {services.length > 0 &&
                  services.map((service) => (
                    <ServiceCard
                      id={service.id}
                      name={service.name}
                      description={service.description}
                      cost={service.cost}
                      key={service.id}
                      handleRemove={removeService}
                    />
                  ))}
              </div>
            </Container>
          </Container>
        </div>
      ) : (
        <div className={styles.project_container}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default Project;
