import Modal from "../components/common/modal";
import Button from "../components/common/Button";
import styles from "./AddBlogSuccessModal.module.scss";
import successIcon from "../assets/photos/tick-circle.svg";
import { useNavigate } from "react-router-dom";
import useBlog from "../hooks/useBlog";
const AddBlogSuccessModal = () => {
  const { requestApi, setRequestApi } = useBlog();
  const navigate = useNavigate();

  const closeModalhandler = () => {
    navigate("/");
    setRequestApi(true);
  };
  return (
    <Modal successModal={styles["success-modal"]}>
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
