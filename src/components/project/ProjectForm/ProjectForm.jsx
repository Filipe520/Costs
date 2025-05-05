import { useEffect, useState } from "react";

import styles from "./ProjectForm.module.css";
import Input from "../../form/input_botao/Input";
import Select from "../../form/Select/Select";
import SubmitButton from "../../form/SubmitButton/SubmitButton";

const ProjectForm = ({ handleSubmit, btnText, projectData }) => {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  const submit = (e) => {
    e.preventDefault();
    // console.log(project);
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
    console.log(project);
  }

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <form onSubmit={submit} className={styles.form}>
      <div>
        <Input
          type="text"
          text="Nome do projeto"
          name="name"
          placeholder="Insira o nome do projeto.."
          handleOnChange={handleChange}
          value={project.name ? project.name : ""}
        ></Input>
      </div>

      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total.."
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ""}
      ></Input>

      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ""}
      ></Select>

      <SubmitButton text={btnText}></SubmitButton>
    </form>
  );
};

export default ProjectForm;
