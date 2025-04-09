import { useState, useEffect } from "react";
import styles from "./Mensagem.module.css";

function Mensagem({ tipo, mensagem }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mensagem) {
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
  }, [mensagem]);
  return (
    <>
      {visible && (
        <div className={`${styles.mensagem} ${styles[tipo]}`}>{mensagem}</div>
      )}
    </>
  );
}

export default Mensagem;
