import { useContext, useState } from "react";
import "./Info.css";
import PropTypes from "prop-types";
import { CartContext } from "../../../context/CartProvider";

const Info = ({ singleProduct }) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const orginialPrice = singleProduct.price.current;
  const discountPercent = singleProduct.price.discount;
  const discountedPrice =
    orginialPrice - (orginialPrice * discountPercent) / 100;

  const filteredCart = cartItems.find(
    (cartItem) => cartItem.product._id === singleProduct._id
  );
  console.log(singleProduct);

  const [quantity, setQuantity] = useState("1");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const quantityChange = (e) => {
    setQuantity(e.target.value);
    return e.target.value;
  };
  const addCart = () => {
    addToCart({
      product: {
        ...singleProduct,
        price: discountedPrice,
        colors: selectedColor,
        sizes: selectedSize,
      },
      quantity: quantity,
    });
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity("1");
  };

  return (
    <div className="product-info">
      <h1 className="product-title">{singleProduct.name}</h1>
      <div className="product-review">
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <span>2 reviews</span>
      </div>
      <div className="product-price">
        <s className="old-price">${orginialPrice.toFixed(2)}</s>
        <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
      </div>
      <p
        className="product-description"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      ></p>
      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Color</span>
            </div>
            <div className="colors-wrapper">
              {singleProduct.colors.map((color, index) => (
                <div
                  className={`color-wrapper ${
                    selectedColor === color ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setSelectedColor(color);
                  }}
                >
                  <label
                    style={{ backgroundColor: `${color}`, border: "1px solid" }}
                  >
                    <input type="radio" name="product-color" />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <span>Size</span>
            </div>
            <div className="values-list">
              {singleProduct.sizes.map((item, index) => (
                <span
                  className={`${selectedSize === item ? "active" : ""}`}
                  style={{ textTransform: "uppercase" }}
                  key={index}
                  onClick={() => {
                    setSelectedSize(item);
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="cart-button">
            <input
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
              value={quantity}
              onChange={quantityChange}
            />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              onClick={addCart}
              disabled={filteredCart}
            >
              Add to cart
            </button>
          </div>
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-globe"></i>
              <span>Size Guide</span>
            </a>
            <a href="#">
              <i className="bi bi-heart"></i>
              <span>Add to Wislist</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span>Share this Product</span>
            </a>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <div className="product-meta">
        <div className="product-sku">
          <span>SKU:</span>
          <strong>BE45VGRT</strong>
        </div>
        <div className="product-categories">
          <span>Categories:</span>
          <strong>Pants , Women</strong>
        </div>
        <div className="product-tags">
          <span>Tags:</span>
          <a href="#">black</a>,<a href="#">white</a>
        </div>
      </div>
    </div>
  );
};

export default Info;

Info.propTypes = {
  singleProduct: PropTypes.object,
};
