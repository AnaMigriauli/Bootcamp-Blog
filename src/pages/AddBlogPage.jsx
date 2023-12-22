import exitArrowIcon from "../assets/photos/Arrow.svg";
import Input from "../components/common/Input";
import { useState, useCallback } from "react";
import folderAddIcon from "../assets/photos/folder-add.svg";
import styles from "./AddBlogPage.module.scss";
import { useDropzone } from "react-dropzone";
import Button from "../components/common/Button";
import imgIcon from "../assets/photos/gallery.svg";
import closeIcon from "../assets/photos/add.svg";
const AddBlogPage = () => {
  const [file, setFile] = useState(null);
  const [authorIput, setAuthorInput] = useState("");
  const [isMinLength, setIsMinLength] = useState(false);
  const [isTwoWords, setIsTwoWords] = useState(false);
  const [isGeorgianCharsOnly, setIsGeorgianCharsOnly] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    setAuthorInput(value);

    setIsMinLength(value.length >= 4);
    setIsTwoWords(value.trim().split(" ").length >= 2);
    const georgianCharsRegex = /^[ა-ჰ]+$/;
    setIsGeorgianCharsOnly(georgianCharsRegex.test(value));
  };

  const ValidationStyle = (isValid) => {
    return isValid ? styles.valid : styles["is-not-valid"];
  };

  return (
    <div className={styles["Add-blog-page"]}>
      <button className={styles["exit-btn"]}>
        <img src={exitArrowIcon} alt="exit arrow icon" />
      </button>
      <form className={styles["add-blog-form"]}>
        <h3 className={styles["form-title"]}>ბლოგის დამატება</h3>
        <label className={styles["label"]}>ატვირთეთ ფოტო</label>
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
            <p>{file.name}</p>
          ) : (
            <p>
              ჩააგდეთ ფაილი აქ ან
              <span className={styles["file-select"]}> აირჩიეთ ფაილი</span>
            </p>
          )}
          {file && (
            <img
              className={styles["input-close-icon"]}
              src={closeIcon}
              alt="close icon"
            />
          )}
        </div>
        <div className={styles["input-wrapper"]}>
          <Input
            type="text"
            lable="ავტორი *"
            value={authorIput}
            placeholder="შეიყვნეთ ავტორი"
            labelStyle={styles["label"]}
            inputStyle={styles["common-input-style"]}
            primaryValidation="მინიმუმ 4 სიმბოლო"
            secondaryValidation="მინიმუმ ორი სიტყვა"
            tertiaryValidation="მხოლოდ ქართული სიმბოლოები"
            primaryValidationStyle={ValidationStyle(isMinLength)}
            secondaryValidationStyles={ValidationStyle(isTwoWords)}
            tertiaryValidationStyles={ValidationStyle(isGeorgianCharsOnly)}
            onChange={inputChangeHandler}
          />
          <Input
            type="text"
            lable="სათური *"
            placeholder="შეიყვნეთ სათაური"
            labelStyle={styles["label"]}
            inputStyle={styles["common-input-style"]}
            primaryValidation="მინიმუმ 2 სიმბოლო"
            validationStyle={styles["validation-text"]}
          />
        </div>
        <Input
          isTextarea
          lable="აღწერა *"
          placeholder="შეიყვნეთ აღწერა"
          labelStyle={styles["label"]}
          primaryValidation="მინიმუმ 2 სიმბოლო"
          validationStyle={styles["validation-text"]}
        />
        <div className={styles["input-wrapper"]}>
          <Input
            type="date"
            lable="გამოქვეყნების თარიღი *"
            placeholder="შეიყვნეთ ავტორი"
            labelStyle={styles["label"]}
            inputStyle={styles["common-input-style"]}
          />
          <Input
            isSelect
            lable="კატეგორია *"
            placeholder="აირჩიეთ კატეგორია"
            labelStyle={styles["label"]}
            inputStyle={styles["common-input-style"]}
          />
        </div>
        <Input
          type="email"
          lable="ელ-ფოსტა"
          placeholder="Example@redberry.ge"
          labelStyle={styles["label"]}
          inputStyle={styles["common-input-style"]}
        />

        <Button className={styles["submit-btn"]}>გამოქვეყნება</Button>
      </form>
    </div>
  );
};

export default AddBlogPage;
