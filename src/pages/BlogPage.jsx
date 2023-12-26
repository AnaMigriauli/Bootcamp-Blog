import { useParams } from "react-router-dom";
const BlogPage = () => {
  const { blogId } = useParams();

  console.log(blogId);

  const token =
    "b22230c8af120a1eb792677da7fbb4565deca1ab57339c7b1e064c4fcb332e0d";
  fetch(`https://api.blog.redberryinternship.ge/api/blogs/${blogId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));

  return <p>ana</p>;
};

export default BlogPage;
