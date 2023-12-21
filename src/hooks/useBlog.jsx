import { useReducer } from "react";

const actionTypes = {
  SET_EMAIL: "SET_EMAIL",
  SET_EMAIL_ERROR: "SET_EMAIL_ERROR",
  SET_LOGIN_SUCCESS: "SET_LOGIN_SUCCESS",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_IS_LOGIN_MODAL_OPEN: "SET_IS_LOGIN_MODAL_OPEN",
  SET_CLOSE_SUCCESS_MODAL: "SET_CLOSE_SUCCESS_MODAL",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case actionTypes.SET_EMAIL_ERROR:
      return {
        ...state,
        emailError: action.payload,
      };
    case actionTypes.SET_LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: action.payload,
      };
    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.SET_IS_LOGIN_MODAL_OPEN:
      return {
        ...state,
        isLoginModalOpen: action.payload,
      };
    case actionTypes.SET_CLOSE_SUCCESS_MODAL:
      return {
        ...state,
        closeSuccessModal: action.payload,
      };
    default:
      return state;
  }
};

const useBlog = () => {
  const [state, dispatch] = useReducer(reducer, () => ({
    categories: [],
    email: "",
    emailError: "",
    loginSuccess: false,
    isLoginModalOpen: false,
    closeSuccessModal: false,
  }));

  const setEmail = (email) => {
    dispatch({ type: "SET_EMAIL", payload: email });
  };
  const setEmailError = (emailError) => {
    dispatch({ type: "SET_EMAIL_ERROR", payload: emailError });
  };

  const setLoginSuccess = (loginSuccess) => {
    dispatch({ type: "SET_LOGIN_SUCCESS", payload: loginSuccess });
  };

  const setCategories = (categories) => {
    dispatch({ type: "SET_CATEGORIES", payload: categories });
  };

  const setIsLoginModalOpen = (isLoginModalOpen) => {
    dispatch({ type: "SET_IS_LOGIN_MODAL_OPEN", payload: isLoginModalOpen });
  };
  const setCloseSuccessModal = (closeSuccessModal) => {
    dispatch({ type: "SET_CLOSE_SUCCESS_MODAL", payload: closeSuccessModal });
  };
  return {
    ...state,
    setEmail,
    setEmailError,
    setLoginSuccess,
    setCategories,
    setIsLoginModalOpen,
    setCloseSuccessModal,
  };
};
export default useBlog;
