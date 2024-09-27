import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./Products.css"
import Slider from "react-slick";
import PropTypes from "prop-types";

const Products = () => {


  const [products, setProducts] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  

  useEffect(()=>{
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } 
      } catch (error) {
        console.log("Veri Hatalı:", error);
      }
    }
    fetchProducts();
  },[apiUrl])

  function NextBtn({ onClick }) {
    return (
      <button className="glide__arrow glide__arrow--right" onClick={onClick}>
        <i className="bi bi-chevron-right"></i>
      </button>
    );
  }

  NextBtn.propTypes = {
    onClick: PropTypes.func,
  };

  function PrevBtn({ onClick }) {
    return (
      <button className="glide__arrow glide__arrow--left" onClick={onClick}>
        <i className="bi bi-chevron-left"></i>
      </button>
    );
  }
  
  PrevBtn.propTypes = {
    onClick: PropTypes.func,
  };

  const sliderSettings={
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  }

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <div className="glide__track">
            <Slider {...sliderSettings}>
            {products.map((product)=>(
              <ProductItem product={product} key={product._id}/>
            ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;

