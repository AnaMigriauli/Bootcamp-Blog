import Modal from "../components/common/modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import styles from "./LoginModal.module.scss";
import LoginSuccessModal from "./LoginSuccessModal";
import closeIcon from "../assets/photos/add.svg";
import { useBlog } from "../hooks/BlogContext";
import { useState } from "react";

const LoginModal = () => {
  const {
    email,
    setEmail,
    setEmailError,
    setLoginSuccess,
    emailError,
    loginSuccess,
    setIsLoginModalOpen,
  } = useBlog();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [error, setError] = useState(false);
  const validateEmail = async () => {
    const token =
      "220c707e00c0a9217b65348e57de71282ecf8a42d49d2b53bd4763d801a6b678";

    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      }
    );
    if (response.ok) {
      if (response.status !== 204) {
        setEmailError("ელ-ფოსტა არ მოიძებნა");
        setError(true);
      } else {
        setEmailError("");
        setLoginSuccess(true);
        setError(false);
      }
    }
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);

    if (
      !e.target.value ||
      (typeof e.target.value === "string" && !e.target.value.trim())
    ) {
      return false;
    }
  };

  const loginHandler = () => {
    validateEmail();
  };
  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      loginHandler();
    }
  };

  const modalCloseHandler = () => {
    setIsModalOpen(false);
    setIsLoginModalOpen(false);
  };

  return (
    <>
      {isModalOpen && !loginSuccess && (
        <Modal>
          <button onClick={modalCloseHandler} className={styles["close-btn"]}>
            <img src={closeIcon} alt="close icon" />
          </button>
          <h3 className={styles["modal-title"]}>შესვლა</h3>
          <Input
            type="email"
            lable="ელ-ფოსტა"
            placeholder=" Example@redberry.ge"
            labelStyle={styles.lable}
            inputStyle={styles.input}
            onChange={emailChangeHandler}
            errorMessage={emailError}
            error={emailError ? error : undefined}
            onKeyPress={keyPressHandler}
          />
          <Button onClick={loginHandler} className={styles["modal-btn"]}>
            შესვლა
          </Button>
        </Modal>
      )}
      {loginSuccess && <LoginSuccessModal />}
    </>
  );
};
export default LoginModal;
