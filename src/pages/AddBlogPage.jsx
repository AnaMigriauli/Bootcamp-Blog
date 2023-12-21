import exitArrowIcon from "../assets/photos/Arrow.svg";
import Input from "../components/common/Input";
import { useState, useCallback } from "react";
import folderAddIcon from "../assets/photos/folder-add.svg";
import styles from "./AddBlogPage.module.scss";
import { useDropzone } from "react-dropzone";
const AddBlogPage = () => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });
  return (
    <div className={styles["Add-blog-page"]}>
      <button>
        <img src={exitArrowIcon} alt="exit arrow icon" />
      </button>
      <form className={styles["add-blog-form"]}>
        <h3 className={styles["form-title"]}>ბლოგის დამატება</h3>
        <label className={styles["label"]}>ატვირთეთ ფოტო</label>
        <div {...getRootProps()} className={styles["drop-file-input"]}>
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
              ჩააგდეთ ფაილი აქ ან <a>აირჩიეთ ფაილი</a>
            </p>
          )}
        </div>
        <div>
          <Input type="text" lable="ავტორი *" labelStyle={styles["label"]} />
        </div>
      </form>
    </div>
  );
};

export default AddBlogPage;
