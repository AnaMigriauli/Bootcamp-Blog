import { useEffect, useState } from "react";
import heroImg from "../assets/photos/Blog-1024x355 1.svg";
import styles from "./HomePage.module.scss";
import useBlog from "../hooks/useBlog";
import BlogCard from "../components/common/BlogCard";
import { fetchCategories, fetchBlogs } from "../api/api";

const HomePage = () => {
  const { categories, setCategories, requestApi } = useBlog();
  const [blogList, setBlogList] = useState();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        const formattedCategories = data.data.map((category) => ({
          id: category.id,
          label: category.title,
          value: category.title,
          text_color: category.text_color,
          background_color: category.background_color,
        }));
        setCategories(formattedCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    fetchBlogs().then((data) => setBlogList(data.data));
  }, [requestApi]);

  if (!blogList || blogList.length === 0) {
    return <div>Loading...</div>;
  }
  const restOfBlogPosts = blogList ? blogList.slice(4) : [];

  let filteredPosts = restOfBlogPosts.filter((blog) =>
    selectedCategoryIds.some((selectedId) =>
      blog.categories.some((category) => category.id === selectedId)
    )
  );

  const onCategorySetHandler = (categoryId) => {
    const isAlreadySelected = selectedCategoryIds.some(
      (id) => id === categoryId
    );

    if (isAlreadySelected) {
      setSelectedCategoryIds((prevState) =>
        prevState.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategoryIds((prevState) => [...prevState, categoryId]);
    }
  };

  const getCategoryStyle = (categoryId) => {
    const isSelected = selectedCategoryIds.some((id) => id === categoryId);
    return isSelected ? "1px solid var(--black)" : "";
  };

  return (
    <div className={styles["home-page"]}>
      <section className={styles["hero-section"]}>
        <h1 className={styles["hero-title"]}>ბლოგი</h1>
        <img src={heroImg} alt="hero image" />
      </section>
      <main className={styles["main-content"]}>
        <nav>
          <ul className={styles["category-list"]}>
            {categories?.map((category) => (
              <li
                className={styles.category}
                key={category.id}
                style={{
                  background: category.background_color,
                  outline: getCategoryStyle(category.id),
                }}
                onClick={() => onCategorySetHandler(category.id)}
              >
                <button
                  className={styles["category-btn"]}
                  style={{
                    color: category.text_color,
                  }}
                >
                  {category.value}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles["blogs-container"]}>
          {(selectedCategoryIds.length > 0
            ? filteredPosts
            : restOfBlogPosts
          ).map((blog) => (
            <BlogCard key={blog.id} blogList={blog} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
