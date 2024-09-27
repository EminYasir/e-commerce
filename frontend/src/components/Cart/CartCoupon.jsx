import { useContext, useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { CartContext } from "../../context/CartProvider";

const CartCoupon = () => {
  const [coupon, setCoupon] = useState("");
  const { cartItems, setCartItems } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async () => {
    if (coupon.trim().length === 0) {
      message.warning("Kupon kodu giriniz!!");
      return;
    }
    console.log(coupon);
    try {
      const res = await fetch(`${apiUrl}/api/coupon/code/${coupon.trim()}`);
      if (!res.ok) {
        message.error("Girdiğiniz kupon kodu yanlış");
        return;
      }
      const data = await res.json();
      const discountPercent = data.discountPercent;
      const updateCart = cartItems.map((item) => {
        item.product.price =
          item.product.price - item.product.price / discountPercent;
        return { ...item };
      });
      setCartItems(updateCart);
      //console.log(cartItems)
      message.success(`${coupon} kodu başarılı şekilde uygulandı`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const confirm = () => {
    setCartItems([]);
    message.success("Sepet Temizlendi");
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Coupon code"
          onChange={(e) => setCoupon(e.target.value)}
          value={coupon}
        />
        <button className="btn" type="button" onClick={applyCoupon}>
          Apply Coupon
        </button>
      </div>
      <div className="update-cart">
        <Popconfirm
          title="Sepeti Boşalt"
          description="Sepeti temizlemek istediğinize emin misiniz ?"
          onConfirm={confirm}
          okText="Temizle"
          cancelText="Geri"
        >
          <Button
            className="btn"
            style={{
              display: "inline-block",
              height: "40px",
              fontSize: "500",
              transition: "0.2s ease all",
              background: "#ee403d",
              color: "#fff",
            }}
          >
            Update Cart
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default CartCoupon;
