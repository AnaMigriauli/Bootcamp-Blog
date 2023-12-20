import style from "./Header.module.scss";
import logo from "../../assets/photos/LOGO-02 3.svg";
import Button from "../common/Button";
import LoginModal from "../../modals/LoginModal";
import { useState } from "react";

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openModalHandler = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <div className={style.header}>
        <img className={style.logo} src={logo} alt="logo" />
        <Button onClick={openModalHandler} className={style["header-btn"]}>
          შესვლა
        </Button>
      </div>
      {isLoginModalOpen && <LoginModal />}
    </>
  );
};

export default Header;
