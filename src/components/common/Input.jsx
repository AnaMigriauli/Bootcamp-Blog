import styles from "./Input.module.scss";
import errorIcon from "../../assets/photos/info-circle.svg";
import { useEffect, useState } from "react";
import BlogCategories from "./BlogCategories";

const Input = ({
  lable,
  placeholder,
  labelStyle,
  inputStyle,
  type,
  errorMessage,
  onKeyPress,
  primaryValidation,
  secondaryValidation,
  tertiaryValidation,
  isTextarea,
  isSelect,
  primaryValidationStyle,
  secondaryValidationStyles,
  tertiaryValidationStyles,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  options,
}) => {
  const inputClass = errorMessage
    ? ` ${inputStyle} ${styles["input-error"]}`
    : inputStyle;

  const [inputValue, setInputValue] = useState(value);
  // const [errors, setErrors] = useState([]);
  const [touched, setTouched] = useState(false);
  const [focused, setfocused] = useState(false);
  const [change, setChange] = useState(false);

  // useEffect(() => {
  //   setInputValue(value);
  // }, [value]);

  const inputChangeHandler = (e) => {
    setChange(true);
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };
  const inputBlurHandler = (e) => {
    setTouched(true);
    if (onBlur) onBlur(e);
  };
  const inputFocusHandler = (e) => {
    setfocused(true);
    if (onFocus) onFocus(e);
  };
  const getInputBorder = () => {
    if (!touched && !focused) {
      return styles["default-input-border"];
    } else if (error && (touched || change)) {
      return styles["invalid-input-border"];
    } else if (inputValue !== "" && !error && touched) {
      return styles["valid-input-border"];
    }
    return styles["default-input-border"];
  };
  const getValidationStyle = () => {
    if (error) {
      return styles["is-not-valid"];
    }
  };

  const selectChangeHandler = (e) => {
    const values = e.map((option) => option.value);
    console.log(values);
    onChange(values);
  };

  return (
    <>
      <div className={styles["input-wrapper"]}>
        <label className={labelStyle}>{lable}</label>
        {isTextarea ? (
          <textarea
            value={value}
            className={styles.textarea}
            placeholder={placeholder}
            onChange={onChange}
          />
        ) : isSelect ? (
          <BlogCategories
            value={value}
            className={`${inputStyle} ${styles["categories-list"]}`}
            isSelect={isSelect}
            onChange={selectChangeHandler}
            // inputStyle={inputStyle}
          />
        ) : (
          <input
            className={`${inputClass} ${getInputBorder()}`}
            placeholder={placeholder}
            type={type}
            value={value}
            onKeyPress={onKeyPress}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            onFocus={inputFocusHandler}
          />
        )}

        <ul className={styles["validation-list"]}>
          {primaryValidation && (
            <li className={getValidationStyle()}>{primaryValidation}</li>
          )}
          {secondaryValidation && (
            <li className={secondaryValidationStyles}>{secondaryValidation}</li>
          )}
          {tertiaryValidation && (
            <li className={tertiaryValidationStyles}>{tertiaryValidation}</li>
          )}
        </ul>
      </div>
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
