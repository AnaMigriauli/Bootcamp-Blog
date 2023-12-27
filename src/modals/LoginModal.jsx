import Modal from "../components/common/modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import styles from "./LoginModal.module.scss";
// import { useState } from "react";
import LoginSuccessModal from "./LoginSuccessModal";
import { useBlog } from "../hooks/BlogContext";
const LoginModal = ({ setIsSuccess }) => {
  const {
    email,
    setEmail,
    setEmailError,
    setLoginSuccess,
    emailError,
    loginSuccess,
  } = useBlog();

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
      } else {
        setEmailError("");
        setLoginSuccess(true);
      }
    }
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const loginHandler = () => {
    validateEmail();
  };
  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      loginHandler();
    }
  };
  return (
    <>
      {!loginSuccess && (
        <Modal>
          <h3 className={styles["modal-title"]}>შესვლა</h3>
          <Input
            type="email"
            lable="ელ-ფოსტა"
            placeholder=" Example@redberry.ge"
            labelStyle={styles.lable}
            inputStyle={styles.input}
            onChange={emailChangeHandler}
            errorMessage={emailError}
            onKeyPress={keyPressHandler}
          />
          <Button onClick={loginHandler} className={styles["modal-btn"]}>
            შესვლა
          </Button>
        </Modal>
      )}
      {loginSuccess && <LoginSuccessModal setIsSuccess={setIsSuccess} />}
    </>
  );
};
export default LoginModal;
