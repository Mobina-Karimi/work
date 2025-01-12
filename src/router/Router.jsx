import { Route, Routes } from "react-router-dom";
import PageNoteFound from "pages/404";
import AdminPage from "pages/AdminPage";
import AuthPage from "pages/AuthPage";
import DashboardPage from "pages/DashboardPage";
import HomePage from "pages/HomePage";
import PostDetailsPage from "pages/PostDetailsPage";

function Router({ searchQuery, setSearchQuery }) {
  return (
    <Routes>
      <Route
        index
        element={<HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
      />
      <Route path="/post/:id" element={<PostDetailsPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<PageNoteFound />} />
    </Routes>
  );
}

export default Router;

