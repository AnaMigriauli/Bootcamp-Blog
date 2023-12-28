import Modal from "../components/common/modal";
import Button from "../components/common/Button";
import styles from "./AddBlogSuccessModal.module.scss";
import successIcon from "../assets/photos/tick-circle.svg";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../hooks/BlogContext";
import closeIcon from "../assets/photos/add.svg";
const AddBlogSuccessModal = () => {
  const {
    setRequestApi,
    setIsSuccess,
    setLoginSuccess,
    setIsLoginModalOpen,
    setCloseSuccessModal,
    setAddBlogSuccess,
  } = useBlog();
  const navigate = useNavigate();

  const closeModalhandler = () => {
    navigate("/");
    setRequestApi(true);
    setIsSuccess(false);
    setLoginSuccess(false);
    setIsLoginModalOpen(false);
    setCloseSuccessModal(false);
    setAddBlogSuccess(false);
  };

  const modalCloseHandler = () => {
    setAddBlogSuccess(false);
  };
  return (
    <Modal successModal={styles["success-modal"]}>
      <button onClick={modalCloseHandler} className={styles["close-btn"]}>
        <img src={closeIcon} alt="close icon" />
      </button>
      <img
        className={styles["success-icon"]}
        src={successIcon}
        alt="green success icon"
      />
      <h3 className={styles["success-title"]}>ჩანაწერი წარმატებით დაემატა</h3>
      <Button onClick={closeModalhandler} className={styles["success-btn"]}>
        მთავარ გვერდზე დაბრუნება
      </Button>
    </Modal>
  );
};
export default AddBlogSuccessModal;
