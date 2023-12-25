import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddBlogPage from "./pages/AddBlogPage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="add-blog" element={<AddBlogPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
