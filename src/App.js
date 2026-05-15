import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import PageLoader from "./components/ui/PageLoader";
import BackToTop from "./components/ui/BackToTop";

const MainPage = lazy(() => import("./components/pages/MainPage"));
const AboutPage = lazy(() => import("./components/pages/AboutPage"));
const CatalogPage = lazy(() => import("./components/pages/CatalogPage"));
const CareersPage = lazy(() => import("./components/pages/CareersPage"));
const NewsPage = lazy(() => import("./components/pages/NewsPage"));
const ContactPage = lazy(() => import("./components/pages/ContactPage"));

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <BackToTop />
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
