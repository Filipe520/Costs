import styles from "./ServiceForm.module.css";

import { useState } from "react";

import Input from "../form/Input/Input";
import SubmitButton from "../form/SubmitButton/SubmitButton";

const ServiceForm = ({ handleSubmit, btnText, projectData }) => {
  const [service, setService] = useState({});

  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <div className={styles.form}>
      <h2>Criar Serviço</h2>
      <form onSubmit={submit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Nome do Serviço</label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Insira o nome do serviço.."
            handleOnChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="cost">Custo do Serviço</label>
          <Input
            type="number"
            id="cost"
            name="cost"
            placeholder="Insira o custo do serviço.."
            handleOnChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="description">Descrição do Serviço</label>
          <Input
            id="description"
            name="description"
            placeholder="Insira a descrição do serviço.."
            onChange={handleChange}
            required
          />
        </div>
        <SubmitButton text={btnText} />
      </form>
    </div>
  );
};

export default ServiceForm;
