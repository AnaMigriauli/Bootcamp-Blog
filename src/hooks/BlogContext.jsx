import { useReducer, createContext, useContext } from "react";

const BlogContext = createContext();

const actionTypes = {
  SET_EMAIL: "SET_EMAIL",
  SET_EMAIL_ERROR: "SET_EMAIL_ERROR",
  SET_LOGIN_SUCCESS: "SET_LOGIN_SUCCESS",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_IS_LOGIN_MODAL_OPEN: "SET_IS_LOGIN_MODAL_OPEN",
  SET_CLOSE_SUCCESS_MODAL: "SET_CLOSE_SUCCESS_MODAL",
  SET_ADD_BLOG_SUCCESS: "SET_ADD_BLOG_SUCCESS",
  SET_REQUES_API: "SET_REQUES_API",
  SET_BLOG_LIST: "SET_BLOG_LIST",
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
    case actionTypes.SET_ADD_BLOG_SUCCESS:
      return {
        ...state,
        addBlogSuccess: action.payload,
      };
    case actionTypes.SET_REQUES_API:
      return {
        ...state,
        requestApi: action.payload,
      };
    case actionTypes.SET_BLOG_LIST:
      return {
        ...state,
        blogList: action.payload,
      };
    default:
      return state;
  }
};

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, () => ({
    categories: [],
    email: "",
    emailError: "",
    loginSuccess: false,
    addBlogSuccess: false,
    isLoginModalOpen: false,
    closeSuccessModal: false,
    requestApi: false,
    blogList: [],
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
  const setAddBlogSuccess = (addBlogSuccess) => {
    dispatch({ type: "SET_ADD_BLOG_SUCCESS", payload: addBlogSuccess });
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
  const setRequestApi = (requestApi) => {
    dispatch({ type: "SET_REQUES_API", payload: requestApi });
  };
  const setBlogList = (blogList) => {
    dispatch({ type: "SET_BLOG_LIST", payload: blogList });
  };

  return (
    <BlogContext.Provider
      value={{
        ...state,
        setEmail,
        setEmailError,
        setLoginSuccess,
        setCategories,
        setIsLoginModalOpen,
        setCloseSuccessModal,
        setAddBlogSuccess,
        setRequestApi,
        setBlogList,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  return useContext(BlogContext);
};
