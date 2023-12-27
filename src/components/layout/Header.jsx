import style from "./Header.module.scss";
import logo from "../../assets/photos/LOGO-02 3.svg";
import Button from "../common/Button";
import LoginModal from "../../modals/LoginModal";
import { useBlog } from "../../hooks/BlogContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { isLoginModalOpen, setIsLoginModalOpen } = useBlog();
  const [isSuccess, setIsSuccess] = useState(false);
  const openModalHandler = () => {
    setIsLoginModalOpen(true);
  };

  const openAddBlogHandler = () => {
    navigate("/add-blog");
  };

  return (
    <>
      <div className={style.header}>
        <img className={style.logo} src={logo} alt="logo" />
        {!isSuccess ? (
          <Button onClick={openModalHandler} className={style["header-btn"]}>
            შესვლა
          </Button>
        ) : (
          <Button onClick={openAddBlogHandler} className={style["header-btn"]}>
            დაამატე ბლოგი
          </Button>
        )}
      </div>
      {isLoginModalOpen && <LoginModal setIsSuccess={setIsSuccess} />}
    </>
  );
};

export default Header;
