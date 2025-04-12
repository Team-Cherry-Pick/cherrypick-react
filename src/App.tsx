import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "@/pages/main-page/MainPage";
import ProductDetailPage from "@/pages/product-detail-page/product-detail-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
