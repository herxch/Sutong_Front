import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import AboutPage from "./components/pages/AboutPage";
import CareersPage from "./components/pages/CareersPage";
import NewsPage from "./components/pages/NewsPage";
import ContactPage from "./components/pages/ContactPage";
import CatalogPage from "./components/pages/CatalogPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
