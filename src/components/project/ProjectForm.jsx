const ProjectForm = () => {
  return (
    <form>
      <div>
        <input type="text" placeholder="Insira o nome do projeto" />
      </div>
      <div>
        <input type="number" placeholder="Insira o orçamento total" />
      </div>
      <div>
        <select>
          <option disabled selected>
            Selecione a categoria
          </option>
          <option value="b1">o</option>
          <option value="b2">p</option>
        </select>
      </div>
      <div>
        <input type="submit" value="Criar projeto" />
      </div>
    </form>
  );
};

export default ProjectForm;
