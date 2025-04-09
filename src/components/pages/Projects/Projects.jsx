import { useLocation } from "react-router-dom";
import Mensagem from "../../layout/Mensagem/Mensagem";
import "./Projects.module.css";
import Conteiner from "../../layout/Container/Container";
import LinkButton from "../../layout/LinkButton/LinkButton";
import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard/ProjectCard";

import { useState, useEffect } from "react";

function Projets() {
  const location = useLocation();
  const [projects, setProjects] = useState([]);

  let mensagem = "";
  if (location.state) {
    mensagem = location.state.message;
  }

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.project_conteiner}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {mensagem && <Mensagem tipo="success" mensagem={mensagem} />}
      <Conteiner customClass="start">
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
      </Conteiner>
    </div>
  );
}

export default Projets;
