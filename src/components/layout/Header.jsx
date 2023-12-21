import style from "./Header.module.scss";
import logo from "../../assets/photos/LOGO-02 3.svg";
import Button from "../common/Button";
import LoginModal from "../../modals/LoginModal";
import useBlog from "../../hooks/useBlog";

const Header = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, closeSuccessModal } =
    useBlog();
  const openModalHandler = () => {
    setIsLoginModalOpen(true);
  };

  console.log(closeSuccessModal);
  return (
    <>
      <div className={style.header}>
        <img className={style.logo} src={logo} alt="logo" />
        <Button onClick={openModalHandler} className={style["header-btn"]}>
          {!closeSuccessModal ? " დაამატე ბლოგი" : " შესვლა"}
        </Button>
      </div>
      {isLoginModalOpen && <LoginModal />}
    </>
  );
};

export default Header;
