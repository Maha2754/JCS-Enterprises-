import React, { useContext } from "react";
import { CartContext } from "../component/CartContext";
import "../style/cart.css";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import useFetch from "../hooks/useFetch";

// PAN
import pan1 from "../assets/steel-pan.png";
import pan2 from "../assets/pan1.png";
import pan3 from "../assets/pan2.png";

// BOTTLE
import bottle1 from "../assets/bottle.png";
import bottle2 from "../assets/bottle2.png";
import bottle3 from "../assets/bottle3.png";
import bottle4 from "../assets/bottle4.png";

// BOWL
import bowl1 from "../assets/bowl.png";
import bowl2 from "../assets/bowl2.png";
import bowl3 from "../assets/bowl3.png";

// DRINK
import drink1 from "../assets/drink.png";
import drink2 from "../assets/drink2.png";
import drink3 from "../assets/drink3.png";

// MUG
import mug1 from "../assets/mug.png";
import mug2 from "../assets/mug2.png";
import mug3 from "../assets/mug3.png";

// CASSEROLE
import cas1 from "../assets/casserole.png";
import cas2 from "../assets/casserole2.png";
import cas3 from "../assets/casserole3.png";

// TIFFIN
import tiffin1 from "../assets/tiffin.png";
import tiffin2 from "../assets/tiffin2.png";

import store1 from "../assets/storage.png";
import store2 from "../assets/storage2.png";

import Lunch1 from "../assets/lunch.png";
import Lunch2 from "../assets/lunch2.png";

const imgMap = {
  // pan
  pan: pan1,
  pan1: pan2,
  pan2: pan3,

  // bottle
  bottle: bottle1,
  bottle1: bottle1,
  bottle2: bottle2,
  bottle3: bottle3,

  // bowl
  bowl: bowl1,
  bowl1: bowl2,
  bowl2: bowl3,

  // drinkware
  drink: drink1,
  drink1: drink2,
  drink2: drink3,

  // mug
  mug: mug1,
  mug1: mug2,
  mug2: mug3,

  // casserole
  casserole: cas1,
  casserole1: cas2,
  casserole2: cas3,

  // tiffin
  tiffin: tiffin1,
  tiffin1: tiffin2,

    storage : store1,
    storage1 : store2,
  
    lunch : Lunch1,
    lunch1 : Lunch2,

};


const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, addToCart } = useContext(CartContext);
  const { data: allProducts } = useFetch("/data/dummydata.json");
  const products = Array.isArray(allProducts) ? allProducts : [];

  const cartTypes = [
    ...new Set(cartItems.map(item => item.type).filter(Boolean))
  ];

  const cartIds = cartItems.map(item => item.id);
  const frequentProducts = products.filter(product =>
    cartTypes.includes(product.type) && !cartIds.includes(product.id)
  );
  const limitedFrequent = frequentProducts.slice(0, 4);


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

  const formatPrice = (num) => `${num.toLocaleString()}`;

  console.log("Cart Items:", cartItems);

  console.log("ALL PRODUCTS:", products);
  console.log("CART TYPES:", cartTypes);


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

      {/*FREQUENTLY BOUGHT TOGETHER*/}
      <section className="products-section">
        <h2>Frequently Bought Together</h2>

        {limitedFrequent.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            Add products to cart to see recommendations
          </p>
        ) : (
          <div className="products-grid">
            {limitedFrequent.map((p) => (
<ProductCard
  key={p.id}
  id={p.id}
 img={imgMap[p.img] || imgMap[p.type]} 
  title={p.title}
  price={p.price}
  type={p.type}
  oldPrice={p.oldPrice}
  para={p.para}
  onAddToCart={() =>
    addToCart({
      id: p.id,
      img: imgMap[p.type],
      title: p.title,
      price: p.price,
      type: p.type,
    })
  }
/>


            ))}
          </div>
        )}
      </section>

    </div>


  );
};

export default Cart;
