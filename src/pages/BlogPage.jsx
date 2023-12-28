import { useParams } from "react-router-dom";
import { fetchBlogId } from "../api/api";
import { useEffect, useState } from "react";
import styles from "./BlogPage.module.scss";
import BlogCard from "../components/common/BlogCard";
import arrow from "../assets/photos/Arrow.svg";
import arrowLeft from "../assets/photos/Arrow-left.svg";
import arrowRight from "../assets/photos/Arrow-right.svg";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../hooks/BlogContext";
const BlogPage = () => {
  const { blogList } = useBlog();
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState();

  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await fetchBlogId(blogId);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [blogId]);

  //Loader
  if (!blog || blog.length === 0) {
    return <div className={styles.loader}>Loading...</div>;
  }
  //Filter

  const filteredRelatedArticles =
    blogList &&
    blogList.filter((cat) =>
      cat.categories.some((cat) =>
        blog.categories.some((blog) => blog.id === cat.id)
      )
    );

  //Navigate
  const exitHandler = () => {
    navigate("/");
  };

  //Slider
  const itemsPerSlide = 3;

  const previousHandler = () => {
    setSliderIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const nextHandler = () => {
    setSliderIndex((prevIndex) => {
      const maxIndex = filteredRelatedArticles.length - itemsPerSlide;
      return Math.min(maxIndex, prevIndex + 1);
    });
  };

  const visibleCards = filteredRelatedArticles.slice(
    sliderIndex,
    sliderIndex + itemsPerSlide
  );

  console.log(filteredRelatedArticles);
  return (
    <div className={styles.blog}>
      <div className={styles["blog-card-wrapper"]}>
        <button onClick={exitHandler} className={styles["exit-btn"]}>
          <img src={arrow} alt="exit arrow button" />
        </button>
        <BlogCard
          image={blog.image}
          author={blog.author}
          publish_date={blog.publish_date}
          title={blog.title}
          email={blog.email}
          categories={blog.categories}
          description={blog.description}
          blogCard={styles["blog-card"]}
          blogCardImage={styles["blog-card-image"]}
          blogTextContent={styles["blog-text-content"]}
          blogAuthor={styles["blog-author"]}
          blogDataEmail={styles["blog-data-email"]}
          blogPublishDate={styles["blog-publish-date"]}
          blogTitle={styles["blog-title"]}
          blogCategories={styles["blog-categories"]}
          categoryList={styles["category-list"]}
          blogDescription={styles["blog-description"]}
        />
      </div>
      <div className={styles["related-articles-heading"]}>
        <h4 className={styles["related-posts-title"]}>მსგავსი სტატიები</h4>
        <div className={styles["navigation-controls"]}>
          <button
            onClick={previousHandler}
            className={styles["previous-article-btn"]}
          >
            <img src={arrowLeft} alt="left" />
          </button>
          <button onClick={nextHandler} className={styles["next-article-btn"]}>
            <img src={arrowRight} alt="right" />
          </button>
        </div>
      </div>
      <div className={styles["related-articles-container"]}>
        {visibleCards.map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            author={blog.author}
            publish_date={blog.publish_date}
            title={blog.title}
            categories={blog.categories}
            description={blog.description}
            id={blog.id}
            blogCard={styles["related-blog-card"]}
            blogCardImage={styles["related-blog-card-image"]}
            blogTextContent={styles["related-blog-text-content"]}
            blogAuthor={styles["related-blog-author"]}
            blogPublishDate={styles["related-blog-publish-date"]}
            blogTitle={styles["related-blog-title"]}
            blogCategories={styles["related-blog-categories"]}
            categoryList={styles["related-category-list"]}
            blogDescription={styles["related-blog-description"]}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
