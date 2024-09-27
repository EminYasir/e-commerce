import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

const CartItem = ({ product }) => {
  const { removeFromCart } = useContext(CartContext);
  //console.log(product);

  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={product.product.img[0]} alt="" />
        <i
          className="bi bi-x delete-cart"
          data-id={product.product._id}
          onClick={() => removeFromCart(product.product._id)}
        ></i>
      </td>
      <td>{product.product.name}</td>
      <td style={{ textTransform: "uppercase" }}>{product.product.sizes}</td>
      <td>
        {
          <label
            style={{
              background: `${product.product.colors}`,
              display: "grid",
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              border: "1px solid",
            }}
          ></label>
        }
      </td>
      <td>${product.product.price.toFixed(2)}</td>
      <td className="product-quantity">{product.quantity}</td>
      <td className="product-subtotal">
        ${(product.product.price * product.quantity).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItem;

CartItem.propTypes = {
  product: PropTypes.object,
  removeFromCart: PropTypes.func,
};
