import { Route, Routes } from "react-router-dom";
import HomePages from "./pages/HomePages";
import ShopPage from "./pages/ShopPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPages from "./pages/CartPages";
import BlogPages from "./pages/BlogPages";
import ContactPages from "./pages/ContactPages";
import AuthPages from "./pages/AuthPages";
import "./App.css";
import UserPage from "./pages/Admin/UserPage";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";
import CreateProductPage from "./pages/Admin/Products/CreateProductPage";
import ProductPage from "./pages/Admin/Products/ProductPage";
import UpdateProductPage from "./pages/Admin/Products/UpdateProductPage";
import CouponPage from "./pages/Admin/Coupons/CouponPage";
import CreateCouponPage from "./pages/Admin/Coupons/CreateCouponPage";
import UpdateCouponPage from "./pages/Admin/Coupons/UpdateCouponPage";
import Success from "./pages/Success";
import OrderPage from "./pages/Admin/OrderPage";
import DashboardPage from "./pages/Admin/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePages />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPages />} />
      <Route path="/contact" element={<ContactPages />} />
      <Route path="/cart" element={<CartPages />} />
      <Route path="/auth" element={<AuthPages />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin/*">
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
        <Route path="categories/create/" element={<CreateCategoryPage />} />
        <Route path="products/" element={<ProductPage />} />
        <Route path="products/create/" element={<CreateProductPage />} />
        <Route path="products/update/:id" element={<UpdateProductPage />} />
        <Route path="coupons" element={<CouponPage />} />
        <Route path="coupons/create" element={<CreateCouponPage />} />
        <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
        <Route path="orders" element={<OrderPage />} />
      </Route>
    </Routes>
  );
}

export default App;
