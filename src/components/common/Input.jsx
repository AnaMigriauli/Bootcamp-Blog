import styles from "./Input.module.scss";
import errorIcon from "../../assets/photos/info-circle.svg";
import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { useBlog } from "../../hooks/BlogContext";
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
  errorSecondary,
  errorTertiary,
  isTextarea,
  isSelect,
  // primaryValidationStyle,
  // secondaryValidationStyles,
  // tertiaryValidationStyles,
  mailError,
  value,
  onChange,
  onClick,
  onBlur,
  onFocus,
  error,
}) => {
  const { categories, setCategories } = useBlog();
  const [inputValue, setInputValue] = useState(value);
  const [touched, setTouched] = useState(false);
  const [focused, setfocused] = useState(false);
  // const [change, setChange] = useState(false);

  const inputClass = errorMessage
    ? ` ${inputStyle} ${styles["input-error"]}`
    : inputStyle;

  const onClickHandler = () => {
    if (onClick) onClick();
  };
  console.log(touched);
  const inputChangeHandler = (e) => {
    // setChange(true);
    setTouched(true);
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };
  const inputBlurHandler = (e) => {
    setTouched(true);
    if (onBlur) onBlur(e);
    getInputBorder();
  };
  const inputFocusHandler = (e) => {
    setfocused(true);
    if (onFocus) onFocus(e);
    getInputBorder();
  };
  const getInputBorder = () => {
    // if (!touched && !focused) {
    //   return styles["default-input-border"];
    // } else if (error && (touched || change)) {
    //   return styles["invalid-input-border"];
    // } else if (inputValue !== "" && !error && touched) {
    //   return styles["valid-input-border"];
    // }
    // return styles["default-input-border"];
    if ((error || errorSecondary || errorTertiary) && touched) {
      return styles["invalid-input-border"];
    }
    if (!touched || (touched && !focused && error)) {
      return styles["default-input-border"];
    } else {
      return styles["valid-input-border"];
    }
  };

  const getValidationStyle = () => {
    if (error) {
      return styles["is-not-valid"];
    }
  };

  const selectChangeHandler = (e) => {
    setTouched(true);
    const id = e.map((option) => option.id);

    if (onChange) onChange(id);
  };

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
  const getSelectBorder = () => {
    if (error && touched) {
      return "--bright-red"; // Return the CSS variable name
    }
    if (!touched || (touched && !focused && error)) {
      // console.log('guramchika')
      return "--pale-purple";
    } else {
      return "--green";
    }
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
    }),

    control: (provided, state) => ({
      ...provided,
      width: 288,
      minHeight: 44,
      borderRadius: 12,
      border: `1.5px solid var(${getSelectBorder()})`,
      marginTop: 8,
      borderColor: state.isFocused
        ? "var(--purple) !important"
        : provided.borderColor,
      boxShadow: state.isFocused ? "none" : provided.boxShadow,
      "&:hover": {
        borderColor: "none",
      },
    }),

    menuList: (provided) => ({
      ...provided,
      maxHeight: "300px",
      overflowY: "auto",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.background_color,
      color: state.data.text_color,
      padding: 10,
      margin: 10,
      borderRadius: 12,
      whiteSpace: "wrap",

      display: "inline-block", // Use inline-block for natural content width
      width: "auto", // Width auto to accommodate content width

      boxSizing: "border-box",
    }),

    valueContainer: (provided) => ({
      ...provided,
      display: "flex",
      flexWrap: "nowrap",
      overflowX: "scroll",
    }),
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        display: "flex",
        flexWrap: "no-wrap",
        backgroundColor: data.background_color,
        color: "white",
        borderRadius: "8px",
        minWidth: "min-content",
        width: "fit-content",
      };
    },

    multiValueLabel: (styles) => ({
      ...styles,
      color: "black",
    }),

    multiValueRemove: (base) => ({
      ...base,
      color: "white",
      ":hover": {
        color: "black",
        backgroundColor: "darkpurple",
        borderRadius: "12px",
      },
    }),
  };
  return (
    <>
      <div className={styles["input-wrapper"]}>
        <label className={labelStyle}>{lable}</label>
        {isTextarea ? (
          <textarea
            value={value}
            className={`${styles.textarea} ${getInputBorder()}`}
            placeholder={placeholder}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            onFocus={inputFocusHandler}
            onClick={onClickHandler}
          />
        ) : isSelect ? (
          <Select
            isMulti
            placeholder="აირჩიეთ კატეგორია"
            options={categories}
            value={value}
            styles={customStyles}
            // isSelect={isSelect}
            onChange={selectChangeHandler}
            onBlur={inputBlurHandler}
            onFocus={inputFocusHandler}
            onClick={onClickHandler}
          />
        ) : (
          <input
            className={`${inputClass} ${getInputBorder()}`}
            placeholder={placeholder}
            type={type}
            value={value}
            onKeyPress={onKeyPress} // შევცვალო
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            onFocus={inputFocusHandler}
            onClick={onClickHandler}
          />
        )}

        <ul className={styles["validation-list"]}>
          {primaryValidation && (
            <li
              style={{
                color:
                  error && touched
                    ? "red"
                    : !touched || (touched && !focused && error)
                    ? "grey"
                    : "green",
              }}
              className={getValidationStyle()}
            >
              {primaryValidation}
            </li>
          )}
          {secondaryValidation && (
            <li
              style={{
                color:
                  errorSecondary && touched
                    ? "red"
                    : !touched || (touched && !focused && error)
                    ? "grey"
                    : "green",
              }}
              className={getValidationStyle()}
            >
              {secondaryValidation}
            </li>
          )}
          {tertiaryValidation && (
            <li
              style={{
                color:
                  errorTertiary && touched
                    ? "red"
                    : !touched || (touched && !focused && error)
                    ? "grey"
                    : "green",
              }}
              className={getValidationStyle()}
            >
              {tertiaryValidation}
            </li>
          )}
        </ul>
      </div>
      {errorMessage && (
        <div className={styles["input-error-message"]}>
          <img src={errorIcon} alt="error icon" />
          <span className={styles["error-text"]}>{errorMessage}</span>
        </div>
      )}
      {mailError && touched && (
        <div className={styles["input-error-message"]}>
          <img src={errorIcon} alt="error icon" />
          <span className={styles["error-text"]}>{mailError}</span>
        </div>
      )}
    </>
  );
};

Input.propTypes = {
  lable: PropTypes.string,
  placeholder: PropTypes.string,
  labelStyle: PropTypes.string,
  inputStyle: PropTypes.string,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  onKeyPress: PropTypes.func,
  primaryValidation: PropTypes.string,
  secondaryValidation: PropTypes.string,
  tertiaryValidation: PropTypes.string,
  isTextarea: PropTypes.bool,
  isSelect: PropTypes.bool,
  primaryValidationStyle: PropTypes.string,
  secondaryValidationStyles: PropTypes.string,
  tertiaryValidationStyles: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.bool,
  options: PropTypes.array,
  // isSelect: PropTypes.bool,
  // value: PropTypes.object,
  // className: PropTypes.string,
  // onChange: PropTypes.func.isRequired,
  // placeholder: PropTypes.string,
};
export default Input;
