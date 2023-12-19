import heroImg from "../assets/photos/Blog-1024x355 1.svg";
import style from "./HomePage.module.scss";
const HomePage = () => {
  return (
    <div className={style["home-page"]}>
      <section className={style["hero-section"]}>
        <h1 className={style["hero-title"]}>ბლოგი</h1>
        <img src={heroImg} alt="hero image" />
      </section>
    </div>
  );
};

export default HomePage;
