import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PreFooterCollections from "./components/layout/PreFooterCollections";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import CartDrawer from "./components/common/CartDrawer";

// Pages
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import ExperienceCentrePage from "./pages/ExperienceCentrePage";
import RequestQuotePage from "./pages/RequestQuotePage";
import ContactPage from "./pages/ContactPage";
import NewsPage from "./pages/NewsPage";
import PolicyPage from "./pages/PolicyPage";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// 404 Fallback
function NotFoundPage() {
  return (
    <div className="bg-[#eae5da] py-28 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold mb-2">
        Error 404
      </span>
      <h1 className="font-serif text-4xl text-stone-900 font-medium">Page Not Found</h1>
      <p className="text-stone-600 text-sm mt-3 max-w-sm">
        The requested piece or collection does not exist or has been relocated within the atelier.
      </p>
      <a
        href="/"
        className="mt-8 px-8 py-3.5 bg-stone-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8C7A6B] hover:text-white transition-all"
      >
        Return to Atelier
      </a>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col justify-between bg-[#eae5da] text-[#222222] selection:bg-[#c5a880] selection:text-stone-900">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Shop & Catalog */}
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />

              {/* WooCommerce Standard Category & Subcategory Routes */}
              <Route path="/product-category/:category" element={<CategoryPage />} />
              <Route path="/product-category/:category/:subcategory" element={<CategoryPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              
              {/* Direct Category Shortcuts */}
              <Route path="/living" element={<CategoryPage />} />
              <Route path="/bedroom" element={<CategoryPage />} />
              <Route path="/dining" element={<CategoryPage />} />
              <Route path="/one-of-one" element={<CategoryPage />} />

              {/* Cart & Checkout */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Information & Atelier */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/experience-centre" element={<ExperienceCentrePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/request-quote" element={<RequestQuotePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/get-in-touch" element={<ContactPage />} />
              
              {/* Policies */}
              <Route path="/shipping-policy" element={<PolicyPage />} />
              <Route path="/terms-of-service" element={<PolicyPage />} />
              <Route path="/privacy-policy" element={<PolicyPage />} />
              <Route path="/policies" element={<PolicyPage />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <PreFooterCollections />
          <Footer />

          {/* Persistent global widgets */}
          <CartDrawer />
          <WhatsAppButton />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
