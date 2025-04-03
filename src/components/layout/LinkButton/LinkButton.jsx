import { Link } from "react-router-dom";
import style from "./LinkButton.module.css";

const LinkButton = ({ to, text }) => {
  console.log(to);
  return (
    <Link to={to} className={style.btn}>
      {text}
    </Link>
  );
};

export default LinkButton;
