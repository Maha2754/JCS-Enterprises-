import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import "../style/festive.css";
import bannerImage from "../assets/banners/banner.png";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import FilterBar from "../component/FilterBar";

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

  const imageMap = {
  pan: pan1,
  pan1: pan2,
  pan2: pan3,

  // bottle
  bottle: bottle1,
  bottle1: bottle2,
  bottle2: bottle3,
  bottle3: bottle4,

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

/*  pagination settings */
const ITEMS_PER_PAGE = 16;

export default function Festive() {


  const { data, loading, error } = useFetch("/data/dummydata.json");

  const allProducts = data.filter(
    (item) => item.isFestive === true
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLitre, setSelectedLitre] = useState("");
  const [sortType, setSortType] = useState("default");



  const getFilteredProducts = () => {
    let products = [...allProducts];

    if (selectedSize) {
      products = products.filter(item =>
        item.title.toLowerCase().includes(selectedSize.toLowerCase())
      );
    }

    if (sortType === "low-high") {
      products.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortType === "high-low") {
      products.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return products;
  };

  const filteredProducts = getFilteredProducts();

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  return (
    <div className="festive-page">
      <section className="banner">
        <img src={bannerImage} alt="Festive Banner" />
        <div className="banner-content">
          <h1>Festive Collection</h1>
          <p>
            <Link to="/">Home</Link> / <span><a href="#shop">Festive</a></span>
          </p>
        </div>
      </section>

      {/* filterbar */}
      <FilterBar
        onFilterChange={({ type, value }) => {
          if (type === "size") setSelectedSize(value);
          if (type === "litre") setSelectedLitre(value);
          setCurrentPage(1);
        }}
        onSortChange={(type) => {
          setSortType(type);
          setCurrentPage(1);
        }}
      />

      <section className="products-section" id="shop">
        {loading && <p>Loading festive offers...</p>}
        {error && <p>Failed to load festive products</p>}

        <div className="products-grid">
          {currentProducts.map((item) => (
  <Link
    to={`/buy/${item.id}`}   // buy page route
    state={item}             // pass full product
    key={item.id}
    style={{ textDecoration: "none", color: "inherit" }} // keep card style same
  >
    <ProductCard
      id={item.id}
      img={imageMap[item.img] || bottle1} 
      title={item.title}
      price={item.price}
      oldPrice={item.oldPrice}
      para={item.para}
    />
  </Link>
          ))}
        </div>

        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          {currentPage < totalPages && (
            <span onClick={() => setCurrentPage(currentPage + 1)}>Next</span>
          )}
        </div>
      </section>
    </div>
  );
}
