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
import useFetch from "../hooks/useFetch";

import bowl from "../assets/bowl.png";
import drink from "../assets/drink.png";
import lunch from "../assets/lunch.png";
import storage from "../assets/storage.png";
import tiffin from "../assets/tiffin.png";

const imageMap = {
  pan,
  bottle,
  casserole,
  mug,
  bowl,
  drink,
  lunch,
  storage,
  tiffin,
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
            {limitedFrequent.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                img={imageMap[item.type]}
                title={item.title}
                price={`${item.price}`}
                oldPrice={`${item.oldPrice}`}
                para={item.para}
                type={item.type}
                onAddToCart={() =>
                  addToCart({
                    id: item.id,
                    img: imageMap[item.type],
                    title: item.title,
                    price: item.price,
                    type: item.type,
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
