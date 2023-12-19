import style from "./Header.module.css";
import logo from "../../assets/photos/LOGO-02 3.svg";
import Button from "../common/Button";
const Header = () => {
  return (
    <div className={style.header}>
      <img className={style.logo} src={logo} alt="logo" />
      <Button className={style["header-btn"]}>შესვლა</Button>
    </div>
  );
};

export default Header;
