import { useParams } from "react-router-dom";
import { fetchBlogId } from "../api/api";
import { useEffect } from "react";
const BlogPage = () => {
  const { blogId } = useParams();

  // if (!blogList || blogList.length === 0) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await fetchBlogId(blogId);
        console.log(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [blogId]);

  return <p>ana</p>;
};

export default BlogPage;
