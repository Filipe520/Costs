// Icones
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
// Styles
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li className={styles.social_list}>
          <FaFacebook />
        </li>
        <li className={styles.social_list}>
          <FaInstagram />
        </li>
        <li className={styles.social_list}>
          <FaLinkedin />
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>Costs</span> &copy; 2025
      </p>

      <p className={styles.Autor}>
        Desenvolvidor -{" "}
        <strong>
          <a
            href="https://www.instagram.com/filipealves520/"
            target="_blank"
            rel="external"
          >
            Filipe Alves
          </a>
        </strong>
      </p>
    </footer>
  );
};

export default Footer;
