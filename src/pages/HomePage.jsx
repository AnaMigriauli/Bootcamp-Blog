import { useEffect } from "react";
import heroImg from "../assets/photos/Blog-1024x355 1.svg";
import style from "./HomePage.module.scss";
import useBlog from "../hooks/useBlog";

const HomePage = () => {
  const { categories, setCategories } = useBlog();
  useEffect(() => {
    const token =
      "b22230c8af120a1eb792677da7fbb4565deca1ab57339c7b1e064c4fcb332e0d";
    fetch("https://api.blog.redberryinternship.ge/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data.data));
  }, []);

  return (
    <div className={style["home-page"]}>
      <section className={style["hero-section"]}>
        <h1 className={style["hero-title"]}>ბლოგი</h1>
        <img src={heroImg} alt="hero image" />
      </section>
      <main className={style["main-content"]}>
        <nav>
          <ul className={style["categories-list"]}>
            {categories?.map((categorie) => (
              <li
                className={style.categorie}
                key={categorie.id}
                style={{
                  background: categorie.background_color,
                }}
              >
                <button
                  className={style["categorie-btn"]}
                  style={{
                    color: categorie.text_color,
                  }}
                >
                  {categorie.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default HomePage;
