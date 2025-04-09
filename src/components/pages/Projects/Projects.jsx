import { useLocation } from "react-router-dom";
import Mensagem from "../../layout/Mensagem/Mensagem";
import "./Projects.module.css";
import Conteiner from "../../layout/Container/Container";
import LinkButton from "../../layout/LinkButton/LinkButton";
import styles from "./Projects.module.css";

function Projets() {
  const location = useLocation();

  let mensagem = "";
  if (location.state) {
    mensagem = location.state.message;
  }

  return (
    <div className={styles.project_conteiner}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {mensagem && <Mensagem tipo="erro" mensagem={mensagem} />}
      <Conteiner customClass="start">
        <p>Projetos...</p>
      </Conteiner>
    </div>
  );
}

export default Projets;
