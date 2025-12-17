import React, { useState, useEffect, useContext } from "react";
import "../style/home.css";
import bannerImage from "../assets/banner.png";

import pan from "../assets/steel-pan.png";
import bottle from "../assets/bottle.png";
import casserole from "../assets/casserole.png";
import mug from "../assets/mug.png";

import { useNavigate } from "react-router-dom";
import { CartContext } from "../component/CartContext";
import ProductCard from "../component/ProductCard";

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Check login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/login");
  }, [navigate]);

  const products = [
    { id: 1, img: pan, title: "Steel Non-Stick Pan with Clean look", para: "Best Selling - 300+ Bought last Month", price: "₹1,000.00", oldPrice: "₹1,400.00" },
    { id: 2, img: bottle, title: "Steel Bottle – 750ml", para: "Best Selling - 300+ Bought last Month", price: "₹1,000.00", oldPrice: "₹1,400.00" },
    { id: 3, img: mug, title: "Steel Mug with Double Layer – 200ml", para: "Best Selling - 300+ Bought last Month", price: "₹1,000.00", oldPrice: "₹1,400.00" },
    { id: 4, img: casserole, title: "Steel Casserole – 5 Litres", para: "Best Selling - 300+ Bought last Month", price: "₹1,000.00", oldPrice: "₹1,400.00" },
  ];

  return (
    <div className="home">
      <section className="home-banner">
        <img src={bannerImage} alt="Banner" />
      </section>

      <div className="split">
        {/* Collections */}
        <section className="collections-section">
          <h2>Collections</h2>
          <div className="collections-cards">
            <div className="collection-card">
              <h4>Steel Pans</h4>
              <img src={pan} alt="Steel Pans" />
              <button onClick={() => navigate("/buy/1")}>Buy Now</button>
            </div>
            <div className="collection-card">
              <h4>Steel Bottles</h4>
              <img src={bottle} alt="Steel Bottles" />
              <button onClick={() => navigate("/buy/2")}>Buy Now</button>
            </div>
            <div className="collection-card">
              <h4>Steel Mugs</h4>
              <img src={mug} alt="Steel Mugs" />
              <button onClick={() => navigate("/buy/3")}>Buy Now</button>
            </div>
            <div className="collection-card">
              <h4>Steel Casseroles</h4>
              <img src={casserole} alt="Steel Casseroles" />
              <button onClick={() => navigate("/buy/4")}>Buy Now</button>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="products-section">
          <div className="products-grid">
            {products.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                img={item.img}
                title={item.title}
                price={item.price}
                oldPrice={item.oldPrice}
                para={item.para}
              />
            ))}
          </div>
          <p
  className="explore"
  onClick={() => navigate("/all-products")}
>
  Explore →
</p>

        </section>
      </div>
    </div>
  );
}

export default Home;
