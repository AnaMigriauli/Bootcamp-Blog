import exitArrowIcon from "../assets/photos/Arrow.svg";
import Input from "../components/common/Input";
import { useState, useCallback, useEffect } from "react";
import folderAddIcon from "../assets/photos/folder-add.svg";
import styles from "./AddBlogPage.module.scss";
import { useDropzone } from "react-dropzone";
import Button from "../components/common/Button";
import imgIcon from "../assets/photos/gallery.svg";
import closeIcon from "../assets/photos/add.svg";
import { useBlog } from "../hooks/BlogContext";
import { useNavigate } from "react-router-dom";
import AddBlogSuccessModal from "../modals/AddBlogSuccessModal";
import { fetchBlogsData } from "../api/api";
const AddBlogPage = () => {
  const { categories, setAddBlogSuccess, addBlogSuccess } = useBlog();
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setData] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [email, setEmail] = useState("");

  // console.log(date);

  useEffect(() => {
    const savedData = localStorage.getItem("addBlogData");

    if (savedData) {
      const {
        file,
        fileName,
        author,
        title,
        description,
        date,
        selectedCategory,
        email,
      } = JSON.parse(savedData);

      if (file) setFile(file);
      if (author) setAuthor(author);
      if (title) setTitle(title);
      if (description) setDescription(description);
      if (date) setData(date);
      if (selectedCategory) setSelectedCategory(selectedCategory);
      if (email) setEmail(email);
      if (fileName) setFileName(fileName);
    }
  }, []);

  //Sava Data To LocalStorage
  useEffect(() => {
    const dataToSave = {
      file,
      fileName,
      author,
      title,
      description,
      date,
      selectedCategory,
      email,
    };

    localStorage.setItem("addBlogData", JSON.stringify(dataToSave));
  }, [
    file,
    fileName,
    author,
    title,
    description,
    date,
    selectedCategory,
    email,
  ]);

  //Drag and drop
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setFileName(acceptedFiles[0].name);

    // const currentData = JSON.parse(localStorage.getItem("addBlogData")) || {};
    // currentData.fileName = acceptedFiles[0].name;
    // localStorage.setItem("addBlogData", JSON.stringify(currentData));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  let validationSchema = {
    authorInput: {
      rule: /^[ა-ჰ\s]+$/,
      minLength: 4,
      required: true,
    },
    title: {
      minLength: 2,
    },
  };

  const isValidInput = (name, value) => {
    let input = validationSchema[name];
    if (!value || (typeof value === "string" && !value.trim())) {
      return !input.required;
    }

    if (name == "title") {
      return value.length >= input.minLength;
    }
  };

  const stepIsFilled = () => {
    let filled;
    let inputs = ["title"];
    let helper = [];

    inputs = inputs.filter((input) => input !== "");
    inputs.forEach((input) => helper.push(isValidInput(input, title)));

    // filled =
  };

  const publishBlog = () => {
    let isValidStep = stepIsFilled();
  };

  let submitMethod;

  submitMethod = publishBlog();

  const fetchBlogDataHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("author", author);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("publish_date", date);
    formData.append("categories", JSON.stringify(selectedCategory));
    formData.append("email", email);

    try {
      const response = await fetchBlogsData(formData);
      console.log(response);

      if (response.status === 204) {
        setAddBlogSuccess(true);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setFile("");
    setFileName("");
    setAuthor("");
    setTitle("");
    setDescription("");
    setData("");
    setSelectedCategory([]);
    setEmail("");
  };

  useEffect(() => {
    if (addBlogSuccess) {
      document.body.classList.add("no-scroll");
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [addBlogSuccess]);

  //Navigate
  const exitHandler = () => {
    navigate("/");
  };

  const closeInputHandler = () => {
    setFile("");
  };

  return (
    <>
      <div className={styles["Add-blog-page"]}>
        <button onClick={exitHandler} className={styles["exit-btn"]}>
          <img src={exitArrowIcon} alt="exit arrow button" />
        </button>
        <form
          className={styles["add-blog-form"]}
          onSubmit={fetchBlogDataHandler}
        >
          <h3 className={styles["form-title"]}>ბლოგის დამატება</h3>
          <label className={styles["label"]}>ატვირთეთ ფოტო *</label>
          <div
            {...getRootProps()}
            className={
              file ? styles["select-file-input"] : styles["drop-file-input"]
            }
          >
            {file && <img src={imgIcon} alt="image icon" />}
            {!file && (
              <img
                className={styles["drop-file-icon"]}
                src={folderAddIcon}
                alt="folder add icon"
              />
            )}
            <input {...getInputProps()} />
            {file ? (
              <p>{fileName}</p>
            ) : (
              <p>
                ჩააგდეთ ფაილი აქ ან
                <span className={styles["file-select"]}> აირჩიეთ ფაილი</span>
              </p>
            )}
            {file && (
              <button
                onClick={closeInputHandler}
                className={styles["input-close-btn"]}
              >
                <img src={closeIcon} alt="close icon" />
              </button>
            )}
          </div>
          <div className={styles["input-wrapper"]}>
            <Input
              type="text"
              lable="ავტორი *"
              value={author}
              placeholder="შეიყვნეთ ავტორი"
              labelStyle={styles["label"]}
              inputStyle={styles["common-input-style"]}
              primaryValidation="მინიმუმ 4 სიმბოლო"
              secondaryValidation="მინიმუმ ორი სიტყვა"
              tertiaryValidation="მხოლოდ ქართული სიმბოლოები"
              onChange={(e) => setAuthor(e.target.value)}
            />
            <Input
              type="text"
              lable="სათური *"
              value={title}
              placeholder="შეიყვნეთ სათაური"
              labelStyle={styles["label"]}
              inputStyle={styles["common-input-style"]}
              primaryValidation="მინიმუმ 2 სიმბოლო"
              primaryValidationStyle={styles["validation-text"]}
              onChange={(e) => setTitle(e.target.value)}
              error={!isValidInput("title", title)}
            />
          </div>
          <Input
            isTextarea
            lable="აღწერა *"
            value={description}
            placeholder="შეიყვნეთ აღწერა"
            labelStyle={styles["label"]}
            primaryValidation="მინიმუმ 2 სიმბოლო"
            validationStyle={styles["validation-text"]}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div className={styles["input-wrapper"]}>
            <Input
              type="date"
              value={date}
              lable="გამოქვეყნების თარიღი *"
              placeholder="შეიყვნეთ ავტორი"
              labelStyle={styles["label"]}
              inputStyle={styles["common-input-style"]}
              onChange={(e) => {
                setData(e.target.value);
              }}
            />
            <Input
              isSelect
              lable="კატეგორია *"
              labelStyle={styles["label"]}
              inputStyle={styles["common-input-style"]}
              onChange={(value) => setSelectedCategory(value)}
              options={categories}
            />
          </div>
          <Input
            type="email"
            lable="ელ-ფოსტა"
            value={email}
            placeholder="Example@redberry.ge"
            labelStyle={styles["label"]}
            inputStyle={styles["common-input-style"]}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Button className={styles["submit-btn"]} type="submit">
            გამოქვეყნება
          </Button>
        </form>
      </div>
      {addBlogSuccess && <AddBlogSuccessModal />}
    </>
  );
};

export default AddBlogPage;
