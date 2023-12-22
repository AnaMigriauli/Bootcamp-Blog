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
  primaryValidation,
  secondaryValidation,
  tertiaryValidation,
  validationStyle,
  isTextarea,
  isSelect,
  primaryValidationStyle,
  secondaryValidationStyles,
  tertiaryValidationStyles,
}) => {
  const inputClass = errorMessage
    ? ` ${inputStyle} ${styles["input-error"]}`
    : inputStyle;

  return (
    <>
      <div className={styles["input-wrapper"]}>
        <label className={labelStyle}>{lable}</label>
        {isTextarea ? (
          <textarea className={styles.textarea} placeholder={placeholder} />
        ) : isSelect ? (
          <select className={inputStyle}>
            <option>{placeholder}</option>
          </select>
        ) : (
          <input
            className={inputClass}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        )}

        <ul className={styles["validation-list"]}>
          {primaryValidation && (
            <li
              className={
                primaryValidationStyle
                  ? primaryValidationStyle
                  : validationStyle
              }
            >
              {primaryValidation}
            </li>
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
