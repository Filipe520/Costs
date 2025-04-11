import styles from "./ProjectCard.module.css";
import { Link } from "react-router-dom";

import { BsFillTrashFill, BsPencil } from "react-icons/bs";

const ProjectCard = ({ id, name, budget, category, handleRemover }) => {
  const remove = (e) => {
    e.preventDefault();
    handleRemover(id);
  };

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R$ {budget}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`} className={styles.edit}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove} className={styles.remove}>
          <BsFillTrashFill />
          Remover
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
// This component represents a card for displaying project details.
