import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import closeIcon from "../../assets/photos/add.svg";
const Modal = (props) => {
  return createPortal(
    <div>
      <div className={styles.modal}>
        {props.children}
        <button className={styles["close-btn"]}>
          <img src={closeIcon} alt="close icon" />
        </button>
      </div>
      ,<div className={styles.overlay}></div>
    </div>,
    document.getElementById("modal")
  );
};
export default Modal;
