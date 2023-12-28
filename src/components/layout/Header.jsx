import style from "./Header.module.scss";
import logo from "../../assets/photos/LOGO-02 3.svg";
import Button from "../common/Button";
import LoginModal from "../../modals/LoginModal";
import { useBlog } from "../../hooks/BlogContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, isSuccess } = useBlog();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const isAddBlogPage = currentPath === "/add-blog";
  // const [localIsSuccess, setLocalIsSuccess] = useState(false);

  // useEffect(() => {
  //   const savedIsSuccess = localStorage.getItem("isSuccess");
  //   if (savedIsSuccess !== null) {
  //     setLocalIsSuccess(JSON.parse(savedIsSuccess));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('isSuccess', JSON.stringify(isSuccess));
  // }, [isSuccess]);

  // const [isSuccess, setIsSuccess] = useState(false);
  const openModalHandler = () => {
    setIsLoginModalOpen(true);
  };
  const openAddBlogHandler = () => {
    navigate("/add-blog");
  };

  //no-scroll for Modal
  useEffect(() => {
    if (isLoginModalOpen) {
      document.body.classList.add("no-scroll");
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isLoginModalOpen]);

  return (
    <>
      <div
        className={
          !isAddBlogPage
            ? `${style.header}`
            : `${style.header} ${style["header-add-blog-page"]}`
        }
      >
        <img className={style.logo} src={logo} alt="logo" />
        {!isAddBlogPage &&
          (!isSuccess ? (
            <Button onClick={openModalHandler} className={style["header-btn"]}>
              შესვლა
            </Button>
          ) : (
            <Button
              onClick={openAddBlogHandler}
              className={style["header-btn"]}
            >
              დაამატე ბლოგი
            </Button>
          ))}
      </div>
      {isLoginModalOpen && <LoginModal />}
    </>
  );
};

export default Header;
