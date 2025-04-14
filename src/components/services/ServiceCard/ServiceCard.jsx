import styles from "../../pages/Projects/ProjectCard/ProjectCard.module.css";
import { BsFillTrashFill } from "react-icons/bs";

import FormatNumber from "../../layout/FormatNumber/FormatNumber";

function ServiceCard({ id, name, description, cost, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, cost);
  };

  return (
    <section className={styles.project_card}>
      <h4>{name}</h4>
      <div>
        <p>
          <span>Custo total</span>
        </p>
        <FormatNumber value={cost} />
      </div>
      <div>
        <p>
          <span>Descrição</span>
        </p>
        {description}
      </div>
      <div className={styles.project_card_actions}>
        <button onClick={remove} className="btn-remove">
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </section>
  );
}

export default ServiceCard;
