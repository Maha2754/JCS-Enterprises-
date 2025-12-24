import React, { useState, useEffect, useContext } from "react";
import "../style/home.css";
import useFetch from "../hooks/useFetch";


import pan from "../assets/steel-pan.png";
import bottle from "../assets/bottle.png";
import casserole from "../assets/casserole.png";
import mug from "../assets/mug.png";

import { useNavigate } from "react-router-dom";
import { CartContext } from "../component/CartContext";
import ProductCard from "../component/ProductCard";
import HeroBanner from "../component/HeroBanner";

const imageMap = {
  pan: pan,
  bottle: bottle,
  mug: mug,
  casserole: casserole,
};

function Home() {
  const { data: products, loading, error } = useFetch("/data/dummydata.json");

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const homeProducts = products.slice(0, 4);

  // Check login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/login");
  }, [navigate]);

  return (
    <div className="home">
      <section className="hero-section">
        <HeroBanner />
      </section>

      <div className="split">
        {/* Collections */}
        <section className="collections-section">
          <h2>Collections</h2>
          <div className="collections-cards">
            {homeProducts.map((item) => (
              <div className="collection-card" key={item.id}>
                <h4>{item.title.split(" ")[1]}</h4>
                <img src={imageMap[item.img]} alt={item.title} />
                <button onClick={() => navigate(`/buy/${item.id}`)}>
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Products */}
      <section className="products-section">
        <h2>Our Products</h2>

        {loading && <p>Loading products...</p>}
        {error && <p>Something went wrong</p>}

        <div className="products-grid">
          {homeProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              img={imageMap[item.img]}
              title={item.title}
              price={item.price}
              oldPrice={item.oldPrice}
              para={item.para}
              type={item.type}
            />
          ))}
        </div>

        <p className="explore" onClick={() => navigate("/all-products")}>
          Explore →
        </p>
      </section>


    </div>
  );
}

export default Home;
