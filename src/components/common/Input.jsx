import styles from "./Input.module.scss";
import errorIcon from "../../assets/photos/info-circle.svg";
const Input = ({
  lable,
  placeholder,
  labelStyle,
  inputStyle,
  type,
  onChange,
  errorMessage,
  onKeyPress,
}) => {
  const inputClass = errorMessage
    ? ` ${inputStyle} ${styles["input-error"]}`
    : inputStyle;

  return (
    <>
      <label className={labelStyle}>{lable}</label>
      <input
        className={inputClass}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onKeyPress={onKeyPress}
      ></input>
      {errorMessage && (
        <div className={styles["input-error-message"]}>
          <img src={errorIcon} alt="error icon" />
          <span className={styles["error-text"]}>{errorMessage}</span>
        </div>
      )}
    </>
  );
};
export default Input;
