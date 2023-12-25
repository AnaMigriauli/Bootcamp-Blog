import useBlog from "../../hooks/useBlog";
import styles from "./BlogCategories.module.scss";
import Select from "react-select";
import { useEffect, useState } from "react";
const BlogCategories = ({
  isSelect,
  value,
  className,
  onChange,
  placeholder,
}) => {
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

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      background: state.data.background_color,
      color: state.data.text_color,
      padding: 20,
    }),
  };
  console.log(onChange);
  console.log(categories);
  if (isSelect) {
    return (
      <Select
        isMulti
        // value={value}
        placeholder="აირჩიეთ კატეგორია"
        onChange={onChange}
        options={categories}
        className={className}
        styles={customStyles}
      />
      //   <select className={className} value={value} onChange={onChange}>
      //     <option value="" disabled selected={!value}>
      //       აირჩიეთ კატეგორია
      //     </option>
      //     {categories?.map((category) => (
      //       <option
      //         key={category.id}
      //         value={category.id}
      //         className={styles.categorie}
      //         style={{
      //           background: category.background_color,
      //           color: category.text_color,
      //         }}
      //       >
      //         {category.title}
      //       </option>
      //     ))}
      //   </select>
    );
  } else {
    return (
      <ul className={styles["category-list"]}>
        {categories?.map((categorie) => {
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
              {categorie.title}
            </button>
          </li>;
        })}
      </ul>
    );
  }
};
export default BlogCategories;