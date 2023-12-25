import Modal from "../components/common/modal";
import Button from "../components/common/Button";
import styles from "./AddBlogSuccessModal.module.scss";
import successIcon from "../assets/photos/tick-circle.svg";
import { useNavigate } from "react-router-dom";
const AddBlogSuccessModal = () => {
  const navigate = useNavigate();
  const closeModalandler = () => {
    navigate("/");
  };
  return (
    <Modal successModal={styles["success-modal"]}>
      <img
        className={styles["success-icon"]}
        src={successIcon}
        alt="green success icon"
      />
      <h3 className={styles["success-title"]}>ჩანაწერი წარმატებით დაემატა</h3>
      <Button onClick={closeModalandler} className={styles["success-btn"]}>
        მთავარ გვერდზე დაბრუნება
      </Button>
    </Modal>
  );
};
export default AddBlogSuccessModal;
