import { useContext, useState } from "react";
import "./ProductItem.css";
import PropTypes from "prop-types";
import { CartContext } from "../../context/CartProvider";
import { Link } from "react-router-dom";
import { Form, InputNumber, Modal, Select } from "antd";
const { Option } = Select;

const ProductItem = ({ product }) => {
  const { addToCart, cartItems } = useContext(CartContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const onColorChange = (value) => {
    setColor(value);
  };
  const onSizeChange = (value) => {
    setSize(value);
  };
  const onQuantityChange = (value) => {
    setQuantity(value);
  };

  const filteredCart = cartItems.find(
    (cartItem) => cartItem.product._id === product._id
  );

  const orginialPrice = product.price.current;
  const discountPercent = product.price.discount;
  const discountedPrice =
    orginialPrice - (orginialPrice * discountPercent) / 100;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (e) => {
    e.preventDefault();
    product = {
      ...product,
      sizes: size,
      colors: color,
      price: discountedPrice,
    };
    addToCart({ product, quantity: quantity });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href="#">
          <img src={product.img[0]} alt="" className="img1" />
          <img src={product.img[1]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          {product.name}
        </a>
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
        <div className="product-prices">
          <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
          <span className="old-price">${orginialPrice.toFixed(2)}</span>
        </div>
        <span className="product-discount">-{discountPercent}%</span>
        <div className="product-links">
          <button
            className="add-to-cart"
            onClick={() => showModal()}
            disabled={filteredCart}
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`/product/${product._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
      <Modal
        title="Product Options"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        okButtonProps={{ disabled: !color || !size || !quantity }}
        cancelText="Cancel"
      >
        <Form
          name="control-hooks"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="color"
            label="Color"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a color"
              onChange={onColorChange}
              allowClear
            >
              {product.colors.map((color) => (
                <Option key={color.id} value={`${color}`}>
                  {
                    <label
                      style={{
                        background: `${color}`,
                        display: "grid",
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        border: "1px solid",
                      }}
                    ></label>
                  }
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="size"
            label="Size"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a size"
              onChange={onSizeChange}
              allowClear
            >
              {product.sizes.map((size) => (
                <Option key={size.id} value={`${size}`}>
                  {size}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              onChange={onQuantityChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.object,
  setCartItems: PropTypes.func,
};
