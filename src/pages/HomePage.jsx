import { useEffect, useState } from "react";
import heroImg from "../assets/photos/Blog-1024x355 1.svg";
import styles from "./HomePage.module.scss";
import { useBlog } from "../hooks/BlogContext";
import BlogCard from "../components/common/BlogCard";
import { fetchCategories, fetchBlogs } from "../api/api";

const getSelectedCategoriesFromStorage = () => {
  const savedCategoties = localStorage.getItem("selectedCategories");
  return savedCategoties ? JSON.parse(savedCategoties) : [];
};

const HomePage = () => {
  const { categories, setCategories, requestApi, blogList, setBlogList } =
    useBlog();
  const [blogs, setBlogs] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(
    getSelectedCategoriesFromStorage
  );

  useEffect(() => {
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategoryIds)
    );
  }, [selectedCategoryIds]);

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
    fetchBlogs().then((data) => setBlogs(data.data));
  }, [requestApi]);

  //მომავალში გამოქვეყნების ლოგიკა
  useEffect(() => {
    const filterBlogs = () => {
      const currentDate = new Date();
      const filtered = blogs.filter((blog) => {
        const publishDate = new Date(blog.publish_date);
        return publishDate <= currentDate;
      });
      setBlogList(filtered);
    };

    const getNextPublishTime = () => {
      const futurePublishDates = blogs
        .map((blog) => new Date(blog.publish_date))
        .filter((date) => date > new Date());

      if (futurePublishDates.length === 0) {
        return null;
      }

      return Math.min(...futurePublishDates);
    };

    filterBlogs();

    const nextPublishTime = getNextPublishTime();
    let timeoutId;

    if (nextPublishTime) {
      const delay = nextPublishTime - new Date();
      timeoutId = setTimeout(() => {
        filterBlogs();
      }, delay);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [blogs]);

  //Loader
  if (!blogList || blogList.length === 0) {
    return <div className={styles.loader}>Loading...</div>;
  }

  let filteredPosts = blogList.filter((blog) =>
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
          {(selectedCategoryIds.length > 0 ? filteredPosts : blogList).map(
            (blog) => (
              <BlogCard
                key={blog.id}
                image={blog.image}
                author={blog.author}
                publish_date={blog.publish_date}
                title={blog.title}
                categories={blog.categories}
                description={blog.description}
                id={blog.id}
                blogCard={styles["blog-card"]}
                blogCardImage={styles["blog-card-image"]}
                blogTextContent={styles["blog-text-content"]}
                blogAuthor={styles["blog-author"]}
                blogPublishDate={styles["blog-publish-date"]}
                blogTitle={styles["blog-title"]}
                blogCategories={styles["blog-categories"]}
                categoryList={styles["category-list"]}
                blogDescription={styles["blog-description"]}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
