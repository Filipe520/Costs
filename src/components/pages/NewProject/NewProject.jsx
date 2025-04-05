import { useNavigate } from "react-router-dom";
import styles from "./NewProject.module.css";
import ProjectForm from "../../project/ProjectForm/ProjectForm";

function NewProject() {
  const history = useNavigate();

  function createPost(project) {
    // initialize cost and services
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        // redirect to /projects
        console.log(data);
        history.push("/projects", { message: "Projeto criado com sucesso!" });
      })
      .catch((error) => console.log("Error creating project:", error));
  }

  return (
    <div className={styles.newProject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm
        handleSubmit={createPost}
        btnText="Criar projeto"
      ></ProjectForm>
    </div>
  );
}

export default NewProject;
