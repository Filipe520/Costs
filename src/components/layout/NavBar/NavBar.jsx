import { Link } from "react-router-dom";

import Container from "../Container/Container";

import styles from "./NavBar.module.css";
import logo from "../../../img/costs_logo.png";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs" />
        </Link>

        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/projects">Projetos</Link>
          </li>
          <li className={styles.item}>
            <Link to="/contato">Contato</Link>
          </li>
          <li className={styles.item}>
            <Link to="/company">Empresa</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default NavBar;
