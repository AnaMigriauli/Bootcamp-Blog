import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

const Modal = ({ successModal, children }) => {
  return createPortal(
    <div>
      <div className={`${styles.modal} ${successModal}`}>{children}</div>,
      <div className={styles.overlay}></div>
    </div>,
    document.getElementById("modal")
  );
};
export default Modal;
