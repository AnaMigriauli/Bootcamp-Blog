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
    setTouched,
  } = useBlog();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [error, setError] = useState(false);
  const validateEmail = async () => {
    // const emailRegex = /@redberry.ge\s*$/;
    // if (!emailRegex.test(email)) {
    //   setEmailError("ელ-ფოსტა არ მოიძებნა");
    // } else {
    // setEmailError(" ");
    const token =
      "b22230c8af120a1eb792677da7fbb4565deca1ab57339c7b1e064c4fcb332e0d";

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

    console.log(response);
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
    // setTouched(false);
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

  const isValid = () => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return !input.required;
    }
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
