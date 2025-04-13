import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../layout/Loading/Loading";
import Container from "../../layout/Container/Container";
import ProjectForm from "../../project/ProjectForm/ProjectForm";
import Menssage from "../../layout/Mensagem/Mensagem";

import { BsPencil } from "react-icons/bs";
import { HiMiniXMark } from "react-icons/hi2";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);

  const [services, setServices] = useState([]);
  const [mensage, setMessage] = useState();
  const [type, setType] = useState();

  console.log(type);

  useEffect(() => {
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
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [id]);

  function editPost(project) {
    setMessage("");
    setType("");
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
                    <span>Total de Orçamentos:</span> {project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> {project.cost}
                  </p>
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
                  <ProjectForm
                    btnText="Adicionar serviço"
                    projectData={project}
                    handleSubmit={editPost}
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
                    <div className={styles.service} key={service.id}>
                      <p>
                        <span>Nome:</span> {service.name}
                      </p>
                      <p>
                        <span>Descrição:</span> {service.description}
                      </p>
                      <p>
                        <span>Valor:</span> {service.cost}
                      </p>
                    </div>
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
