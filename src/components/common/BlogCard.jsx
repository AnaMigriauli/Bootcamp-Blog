import arrow from "../../assets/photos/Arrow-small.svg";
import styles from "./BlogCard.module.scss";
import { Link } from "react-router-dom";
const BlogCard = ({
  image,
  author,
  publish_date,
  title,
  categories,
  description,
  email,
  id,
  blogCard,
  blogCardImage,
  blogTextContent,
  blogAuthor,
  blogDataEmail,
  blogPublishDate,
  blogEmail,
  blogTitle,
  blogCategories,
  categoryList,
  blogDescription,
}) => {
  return (
    <div className={blogCard}>
      <img className={blogCardImage} src={image} alt="image" />
      <div className={blogTextContent}>
        <div>
          <p className={blogAuthor}>{author}</p>
          <div className={blogDataEmail}>
            <time className={blogPublishDate}>{publish_date}</time>
            {email && <li>{email}</li>}
          </div>
        </div>
        <h3 className={blogTitle}>{title}</h3>
        {categories && (
          <ul className={blogCategories}>
            {categories.map((category) => (
              <li
                className={categoryList}
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
        <p className={blogDescription}>{description}</p>
        {id && (
          <div>
            <Link to={`/blog/${id}`} className={styles.link}>
              სრულად ნახვა <img src={arrow} alt="view more" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
