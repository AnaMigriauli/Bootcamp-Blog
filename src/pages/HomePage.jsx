import { useEffect } from "react";
import heroImg from "../assets/photos/Blog-1024x355 1.svg";
import style from "./HomePage.module.scss";
import useBlog from "../hooks/useBlog";
import BlogCategories from "../components/common/BlogCategories";

const HomePage = () => {
  return (
    <div className={style["home-page"]}>
      <section className={style["hero-section"]}>
        <h1 className={style["hero-title"]}>ბლოგი</h1>
        <img src={heroImg} alt="hero image" />
      </section>
      <main className={style["main-content"]}>
        <nav>
          <BlogCategories />
        </nav>
      </main>
    </div>
  );
};

export default HomePage;
