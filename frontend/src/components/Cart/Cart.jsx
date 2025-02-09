import { useContext } from "react";
import "./Cart.css";
import CartCoupon from "./CartCoupon";
import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartTotals from "./CartTotals";
import { CartContext } from "../../context/CartProvider";

const Cart = () => {
  const {cartItems}=useContext(CartContext);
  return (
    <section className="cart-page">
      <div className="container">
        {cartItems.length> 0 ? <div className="cart-page-wrapper">
          <form className="cart-form">
            <CartProgress />
            <div className="shop-table-wrapper">
              <CartTable />
              <CartCoupon/>
            </div>
          </form>
          <CartTotals/>
        </div> : 
        <div style={{display:"flex",justifyContent:"center", width:"100%"}}>
          <h2>Sepette Hiç Ürün yok</h2>
        </div>
        }
        
      </div>
    </section>
  );
};

export default Cart;
