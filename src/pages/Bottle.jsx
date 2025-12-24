import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import "../style/bottle.css";
import bannerImage from "../assets/banners/banner.png";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import FilterBar from "../component/FilterBar";

import bottle from "../assets/bottle.png";
import bottle1 from "../assets/bottle2.png";
import bottle2 from "../assets/bottle3.png";
import bottle3 from "../assets/bottle4.png";

const imageMap = {
  bottle,
  bottle1,
  bottle2,
  bottle3,
};

/* pagination settings */
const ITEMS_PER_PAGE = 16;

export default function Bottle() {
  const { data, loading, error } = useFetch("/data/dummydata.json");

  const allProducts = data.filter((item) => item.type === "bottle");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLitre, setSelectedLitre] = useState("");
  const [sortType, setSortType] = useState("default");

  const getFilteredProducts = () => {
    let products = [...allProducts];

    if (selectedSize) {
      products = products.filter((item) =>
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
    <div className="bottle-page">
      <section className="banner">
        <img src={bannerImage} alt="Banner" />
        <div className="banner-content">
          <h1>Shop</h1>
          <p>
            <Link to="/">Home</Link> / <span><a href="#shop">Shop</a></span>
          </p>
        </div>
      </section>

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

      <section className="products-section split" id="shop">
        {loading && <p>Loading...</p>}
        {error && <p>Error loading products</p>}

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
