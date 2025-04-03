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
    </footer>
  );
};

export default Footer;
