import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import "../style/festive.css";
import bannerImage from "../assets/banners/banner.png";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import FilterBar from "../component/FilterBar";

import pan from "../assets/pan1.png";
import Bottle from "../assets/bottle.png";
import Bowl from "../assets/bowl.png";
import Drink from "../assets/drink.png";
import casserole from "../assets/casserole.png";
import mug from "../assets/mug.png";
import store from "../assets/storage.png";
import tiffin from "../assets/tiffin.png";
import Lunch from "../assets/lunch.png";



/*  pagination settings */
const ITEMS_PER_PAGE = 16;

export default function Festive() {


  const { data, loading, error } = useFetch("/data/dummydata.json");

  const imageMap = {
    pan: pan,
    bottle: Bottle,
    bowl: Bowl,
    drink: Drink,
    mug: mug,
    casserole: casserole,
    lunch: Lunch,
    storage: store,
    tiffin: tiffin,
  };

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
            <ProductCard
              key={item.id}
              id={item.id}
              img={imageMap[item.img]}
              title={item.title}
              price={item.price}
              oldPrice={item.oldPrice}
              para={item.para}
            />
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
