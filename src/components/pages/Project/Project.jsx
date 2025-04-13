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
