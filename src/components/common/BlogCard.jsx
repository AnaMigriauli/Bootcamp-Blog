import img from "../../assets/photos/unsplash_v9FQR4tbIq8.png";
import arrow from "../../assets/photos/Arrow-small.svg";
import styles from "./BlogCard.module.scss";
import { Link } from "react-router-dom";
const BlogCard = () => {
  return (
    <div>
      <img src={img} alt="" />
      <div>
        <p>ნია გოგსაძე</p>
        <time>02.11.2023</time>
        <h3>EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა</h3>
        <ul>
          <li>კატეგორია1</li>
          <li>კატეგორია2</li>
          <li>კატეგორია3</li>
        </ul>
        <p>
          6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური
          სიზუსტისთვის, ეს პროცესი...
        </p>
        <div>
          <Link className={styles.link}>
            სრულად ნახვა <img src={arrow} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
