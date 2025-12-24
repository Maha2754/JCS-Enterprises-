import React, { useContext, useState } from "react";
import { CartContext } from "../component/CartContext";
import "../style/checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  // subtotal calculation — price is already a number
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const [isCouponApplied, setIsCouponApplied] = useState(false);


  const applyCoupon = () => {
    if (!coupon) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setCouponError("");
    setLoading(true);

    setTimeout(() => {
      setDiscount(subtotal * 0.1); // 10% discount
      setIsCouponApplied(true);    
      setLoading(false);
    }, 1000);
  };

  const sgst = subtotal * 0.1;
  const cgst = subtotal * 0.1;
  const total = subtotal + sgst + cgst - discount;

  return (
    <div className="checkout-page">
      {/* LEFT */}
      <div className="checkout-left">
        {cartItems.map((item, i) => (
          <div className="checkout-card" key={i}>
            <div className="checkout-img">
              <img src={item.img} alt={item.title} />
            </div>

            <div className="checkout-details">
              <h4>{item.title}</h4>
              <p>Size: 1000ml</p>
              <p>Color: Steel</p>
              <p>Price: ₹ {item.price.toLocaleString()}</p>
            </div>

            <div className="checkout-qty">
              <button onClick={() => updateQuantity(i, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(i, item.quantity + 1)}>+</button>
            </div>

            <div className="checkout-remove" onClick={() => removeFromCart(i)}>
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="checkout-right">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹ {subtotal.toLocaleString()}</span>
        </div>

        <div className="summary-row">
          <span>Discount:</span>
          <span>₹ {discount.toLocaleString()}</span>
        </div>

        <div className="summary-row">
          <span>SGST (10%):</span>
          <span>₹ {sgst.toLocaleString()}</span>
        </div>
        <div className="summary-row">
          <span>CGST (10%):</span>
          <span>₹ {cgst.toLocaleString()}</span>
        </div>

        <hr />

        <div className="summary-row total">
          <span>Total:</span>
          <span>₹ {total.toLocaleString()}</span>
        </div>

        <h4 className="head">Apply Promo Code :</h4>

        <div className="coupon-row">
          <input
            type="text"
            placeholder="Enter Coupon"
            value={coupon}
            onChange={(e) => {
              setCoupon(e.target.value);
              setIsCouponApplied(false);
            }}

            required
          />
          <button className="apply-btn" onClick={applyCoupon} disabled={loading}>
            {loading ? "Applying..." : "Apply"}
          </button>
        </div>

        {couponError && <p className="error">{couponError}</p>}

        <button
          className="final-checkout"
          disabled={cartItems.length === 0}
          onClick={() => {
            if (!isCouponApplied) {
              setCouponError("Please apply coupon to continue checkout");
              return;
            }
            navigate("/address");
          }}
        >
          Checkout
        </button>

      </div>
    </div>
  );
};

export default Checkout;
