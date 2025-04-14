import { useState } from "react";

import Input from "../../form/Input/input";
import SubmitButton from "../../form/SubmitButton/SubmitButton";

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
    <div>
      <h2>Criar Serviço</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">Nome do Serviço</label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Insira o nome do serviço.."
            handleOnChange={handleChange}
            required
            value={service[name]}
          />
        </div>
        <div>
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
        <div>
          <label htmlFor="description">Descrição do Serviço</label>
          <Input
            type="text"
            id="description"
            name="description"
            placeholder="Insira a descrição do serviço.."
            handleOnChange={handleChange}
            required
          />
        </div>
        <SubmitButton text={btnText} />
      </form>
    </div>
  );
};

export default ServiceForm;
