import { useLocation } from "react-router-dom";
import Mensagem from "../layout/Mensagem/Mensagem";

function Projets() {
  const location = useLocation();

  let mensagem = "";
  if (location.state) {
    mensagem = location.state.message;
  }

  return (
    <div>
      <h1>Meus Projetos</h1>
      {mensagem && <Mensagem tipo="erro" mensagem={mensagem} />}
    </div>
  );
}

export default Projets;
