import { useEffect, useState } from "react";

import styles from "./ProjectForm.module.css";
import Input from "../../form/Input/input";
import Select from "../../form/Select/Select";
import SubmitButton from "../../form/SubmitButton/SubmitButton";

const ProjectForm = ({ btnText }) => {
  const [categories, setCategories] = useState([]);

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
    <form className={styles.form}>
      <div>
        <Input
          type="text"
          text="Nome do projeto"
          name="Name"
          placeholder="Insira o nome do projeto.."
        ></Input>
      </div>

      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total.."
      ></Input>

      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
      ></Select>

      <SubmitButton text={btnText}></SubmitButton>
    </form>
  );
};

export default ProjectForm;
