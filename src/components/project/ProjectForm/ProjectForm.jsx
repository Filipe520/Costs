import styles from "./ProjectForm.module.css";
import Input from "../../form/Input/input";
import Select from "../../form/Select/Select";
import SubmitButton from "../../form/SubmitButton/SubmitButton";

const ProjectForm = ({ btnText }) => {
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

      <Select name="category_id" text="Selecione a categoria"></Select>

      <SubmitButton text={btnText}></SubmitButton>
    </form>
  );
};

export default ProjectForm;
