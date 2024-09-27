import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetails/ProductDetail";
import { useEffect, useState } from "react";

const ProductDetailsPage = () => {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id: productId } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();
        setSingleProduct(data);
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchSingleProduct();
  }, [apiUrl, productId]);


  return singleProduct ? (
    <ProductDetail singleProduct={singleProduct} setSingleProduct={setSingleProduct}/>
  ) : (
    <p>Ürün Yükleniyor</p>
  );
};
export default ProductDetailsPage;
