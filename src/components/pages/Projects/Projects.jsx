import { useLocation } from "react-router-dom";
import Mensagem from "../../layout/Mensagem/Mensagem";
import "./Projects.module.css";
import Conteiner from "../../layout/Container/Container";
import LinkButton from "../../layout/LinkButton/LinkButton";
import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard/ProjectCard";

import { useState, useEffect } from "react";
import Loading from "../../layout/Loading/Loading";

function Projets() {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  let mensagem = "";
  if (location.state) {
    mensagem = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, []);

  return (
    <div className={styles.project_conteiner}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {mensagem && <Mensagem tipo="success" mensagem={mensagem} />}
      <Conteiner className={styles.containerCenter} customClass="start">
        {projects.length > 0 &&
          projects.map(({ id, name, budget, category }) => (
            <ProjectCard
              id={id}
              name={name}
              budget={budget}
              category={category.name}
              key={id}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <div className={styles.noprojects}>
            <p>Não há projetos cadastrados</p>
          </div>
        )}
      </Conteiner>
    </div>
  );
}

export default Projets;
