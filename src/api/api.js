import { apiRequest } from "./apiRequest";
const baseUrl = "https://api.blog.redberryinternship.ge/api";

export const fetchCategories = () => {
  const url = `${baseUrl}/categories`;
  return apiRequest(url);
};

export const fetchBlogs = () => {
  const url = `${baseUrl}/blogs`;
  return apiRequest(url);
};

export const fetchBlogId = (id) => {
  const url = `${baseUrl}/blogs/${id}`;
  return apiRequest(url);
};

export const fetchBlogsData = (body) => {
  const url = `${baseUrl}/blogs`;
  return apiRequest(url, body, "POST");
};
export const fetchLogin = (body) => {
  const url = `${baseUrl}/login`;
  return apiRequest(url, body, "POST");
};
