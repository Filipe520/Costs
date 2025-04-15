import { useState, useEffect } from "react";
import styles from "./Mensagem.module.css";

function Mensagem({ type, msg }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [msg]);
  return (
    <div className={styles.mensagemContainer}>
      {visible && (
        <div className={`${styles.mensagem} ${styles[type]}`}>{msg}</div>
      )}
    </div>
  );
}

export default Mensagem;
