import Modal from "../components/common/modal";
import successIcon from "../assets/photos/tick-circle.svg";
import Button from "../components/common/Button";
import styles from "./LoginSuccessModal.module.scss";
import useBlog from "../hooks/useBlog";
const LoginSuccessModal = () => {
  const { closeSuccessModal, setCloseSuccessModal } = useBlog();
  const closeModalandler = () => {
    setCloseSuccessModal(true);
  };

  return (
    !closeSuccessModal && (
      <Modal successModal={styles["success-modal"]}>
        <img
          className={styles["success-icon"]}
          src={successIcon}
          alt="green success icon"
        />
        <h3 className={styles["success-title"]}>წარმატებული ავტორიზაცია</h3>
        <Button onClick={closeModalandler} className={styles["success-btn"]}>
          კარგი
        </Button>
      </Modal>
    )
  );
};
export default LoginSuccessModal;
