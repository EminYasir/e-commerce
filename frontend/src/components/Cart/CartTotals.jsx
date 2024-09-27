import { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../../context/CartProvider";
import { message, Spin } from "antd";

const CartTotals = () => {
  const { cartItems } = useContext(CartContext);
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const cartItemsTotal = cartItems.map((item) => {
    const itemTotal = item.product.price * item.quantity;

    return itemTotal;
  });

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const subTotal = cartItemsTotal.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const cargoFee = 15;
  const cartTotal = fastCargoChecked
    ? (cargoFee + subTotal).toFixed(2)
    : subTotal.toFixed(2);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;

  const handlePayment = async () => {
    setLoading(true);
    if (!user) {
      return message.info("Ödeme yapabilmek için giriş yapmalısınız !");
    }
    const body = {
      products: cartItems,
      user: user,
      cargoFee: fastCargoChecked ? cargoFee : 0,
    };
    console.log(body);

    try {
      const stripe = await loadStripe(stripePublicKey);
      const res = await fetch(`${apiUrl}/api/payment/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        return message.error("Ödeme işlemei başarısız oldu");
      }

      const session = await res.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-collaterals">
      <div className="cart-totals">
        <h2>Cart totals</h2>
        <table>
          <tbody>
            <tr className="cart-subtotal">
              <th>Subtotal</th>
              <td>
                <span id="subtotal">${subTotal.toFixed(2)}</span>
              </td>
            </tr>
            <tr>
              <th>Shipping</th>
              <td>
                <ul>
                  <li>
                    <label>
                      Fast Cargo: ${cargoFee.toFixed(2)}
                      <input
                        type="checkbox"
                        id="fast-cargo"
                        onClick={() => setFastCargoChecked(!fastCargoChecked)}
                      />
                    </label>
                  </li>
                  <li>
                    <a href="#">Change Address</a>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <td>
                <strong id="cart-total">${cartTotal}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="checkout">
          <Spin spinning={loading}>
            <button className="btn btn-lg" onClick={handlePayment}>
              Proceed to checkout
            </button>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
