import React, { useContext } from "react";
import { CartContext } from "../component/CartContext";
import "../style/cart.css";
import { Link } from "react-router-dom";
import pan from "../assets/steel-pan.png";
import bottle from "../assets/bottle.png";
import casserole from "../assets/casserole.png";
import mug from "../assets/mug.png";
import { useNavigate } from "react-router-dom";
import ProductCard from "../component/ProductCard";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, addToCart } = useContext(CartContext);

  const frequentProducts = [
    { id: 101, img: pan, title: "Steel Non-Stick Pan", para: "Best combo choice", price: 1000, oldPrice: 1400, rating: 4, reviews: 25 },
    { id: 102, img: bottle, title: "Steel Bottle – 750ml", para: "Most bought together", price: 1000, oldPrice: 1400, rating: 5, reviews: 40 },
    { id: 103, img: casserole, title: "Steel Casserole – 5L", para: "Perfect kitchen set", price: 1000, oldPrice: 1400, rating: 3, reviews: 18 },
    { id: 104, img: mug, title: "Steel Mug – 200ml", para: "Popular add-on", price: 1000, oldPrice: 1400, rating: 4, reviews: 30 },
  ];

  const handleIncrement = (index) => {
    updateQuantity(index, cartItems[index].quantity + 1);
  };

  const handleDecrement = (index) => {
    updateQuantity(index, cartItems[index].quantity - 1);
  };

 const totalPrice = cartItems.reduce(
  (acc, item) => acc + Number(item.price) * Number(item.quantity),
  0
);

  const formatPrice = (num) => `${num.toLocaleString()}`; // format price for display

    console.log(cartItems);


  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ color: "red", textAlign: "center" }}>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, i) => (
            <div className="cart-card" key={i}>
              <div className="cart-img">
                <img src={item.img} alt={item.title} />
              </div>

              <div className="cart-details">
                <h4>{item.title}</h4>
                <p>Size: {item.size || "200ml"}</p>
              </div>

              <div className="cart-units">
                <button onClick={() => handleDecrement(i)}>-</button>
                <input type="text" value={item.quantity} readOnly className="quantity-input" />
                <button onClick={() => handleIncrement(i)}>+</button>
              </div>

             <div className="cart-amount">
  {formatPrice(Number(item.price) * Number(item.quantity))}
</div>

              <div className="cart-remove">
                <button onClick={() => removeFromCart(i)}>X</button>
              </div>
            </div>
          ))}

          <h3 style={{ marginTop: "20px" }}>Total: {formatPrice(totalPrice)}</h3>

          <div className="cart-actions">
            <Link to="/" className="continue-shopping">← Continue Shopping</Link>
            <button className="checkout-btn" onClick={() => {
  console.log("Checkout clicked");
  navigate("/checkout");
}}>CHECKOUT</button>
          </div>
        </div>
      )}

      {/* ================= FREQUENTLY BOUGHT TOGETHER ================= */}
      <section className="products-section">
        <h2>Frequently Bought Together</h2>
        <div className="products-grid">
  {frequentProducts.map((item) => (
    <ProductCard
      key={item.id}
      id={item.id}
      img={item.img}
      title={item.title}
      price={`${item.price}`}
      oldPrice={`${item.oldPrice}`}
      para={item.para}
      rating={item.rating}
      reviews={item.reviews}
    />
  ))}
</div>

      </section>
    </div>


  );
};

export default Cart;
