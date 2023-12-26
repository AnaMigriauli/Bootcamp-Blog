import { useEffect, useState } from "react";
import heroImg from "../assets/photos/Blog-1024x355 1.svg";
import styles from "./HomePage.module.scss";
import useBlog from "../hooks/useBlog";
import BlogCard from "../components/common/BlogCard";

const HomePage = () => {
  const { categories, setCategories, requestApi } = useBlog();
  const [blogList, setBlogList] = useState();
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
      .then((data) =>
        setCategories(
          data.data.map((category) => ({
            id: category.id,
            label: category.title,
            value: category.title,
            text_color: category.text_color,
            background_color: category.background_color,
          }))
        )
      );
  }, []);

  useEffect(() => {
    const token =
      "b22230c8af120a1eb792677da7fbb4565deca1ab57339c7b1e064c4fcb332e0d";
    fetch("https://api.blog.redberryinternship.ge/api/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBlogList(data.data));
  }, [requestApi]);

  if (!blogList || blogList.length === 0) {
    return <div>Loading...</div>;
  }
  const restOfBlogPosts = blogList ? blogList.slice(4) : [];
  return (
    <div className={styles["home-page"]}>
      <section className={styles["hero-section"]}>
        <h1 className={styles["hero-title"]}>ბლოგი</h1>
        <img src={heroImg} alt="hero image" />
      </section>
      <main className={styles["main-content"]}>
        <nav>
          <ul className={styles["category-list"]}>
            {categories?.map((categorie) => (
              <li
                className={styles.category}
                key={categorie.id}
                style={{
                  background: categorie.background_color,
                }}
              >
                <button
                  className={styles["category-btn"]}
                  style={{
                    color: categorie.text_color,
                  }}
                >
                  {categorie.value}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles["blogs-container"]}>
          {restOfBlogPosts.map((blog) => (
            <BlogCard key={blog.id} blogList={blog} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
