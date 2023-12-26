import arrow from "../../assets/photos/Arrow-small.svg";
import styles from "./BlogCard.module.scss";
import { Link } from "react-router-dom";
const BlogCard = ({ blogList }) => {
  // if (!blogList || blogList.length === 0) {
  //   return <div>Loading...</div>;
  // }

  const { image, author, publish_date, title, categories, description, id } =
    blogList;

  console.log(blogList);
  return (
    <div className={styles["blog-card"]}>
      <img className={styles["blog-card-image"]} src={image} alt="image" />
      <div className={styles["blog-text-content"]}>
        <div>
          <p className={styles["blog-author"]}>{author}</p>
          <div>
            <time className={styles["blog-publish-date"]}>{publish_date}</time>
            {/* {email && <span>{email}</span>} */}
          </div>
        </div>
        <h3 className={styles["blog-title"]}>{title}</h3>
        {categories && (
          <ul className={styles["blog-categories"]}>
            {categories.map((category) => (
              <li
                className={styles["category-list"]}
                key={category.id}
                style={{
                  color: category.text_color,
                  background: category.background_color,
                }}
              >
                {category.title}
              </li>
            ))}
          </ul>
        )}
        <p className={styles["blog-description"]}>{description}</p>
        <div>
          <Link to={`/blog/${id}`} className={styles.link}>
            სრულად ნახვა <img src={arrow} alt="view more" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
