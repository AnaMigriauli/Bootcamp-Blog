import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddBlogPage from "./pages/AddBlogPage";
import Layout from "./components/layout/Layout";
import BlogPage from "./pages/BlogPage";
import { BlogProvider } from "./hooks/BlogContext";
// import { useEffect } from "react";

function App() {
  // const navigate = useNavigate();

  return (
    <BlogProvider>
      <Router basename="/Bootcamp-Blog">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="add-blog" element={<AddBlogPage />} />
            <Route path="blog/:blogId" element={<BlogPage />} />
          </Route>
        </Routes>
      </Router>
    </BlogProvider>
  );
}

export default App;
