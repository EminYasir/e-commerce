import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import CartProvider from "./context/CartProvider.jsx";
import { Layout } from "./layout/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ScrollToTop/>
    <CartProvider>
      <Layout>
        <App />
      </Layout>
    </CartProvider>
  </BrowserRouter>
);
