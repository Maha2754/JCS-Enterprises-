import React, { useState } from "react";
import "../style/storage.css";
import bannerImage from "../assets/banners/banner.png";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import FilterBar from "../component/FilterBar";

import store from "../assets/storage.png";



const allProducts = [
  { id: 1, img: store, title: "Steel Bottle 500ml", price: "1000", oldPrice: "1200", para: "Best Selling Product" },
  { id: 2, img: store, title: "Steel Bottle 750ml", price: "1200", oldPrice: "1500", para: "Best Selling Product" },
  { id: 3, img: store, title: "Steel Bottle 1000ml", price: "1400", oldPrice: "1700", para: "Best Selling Product" },
  { id: 4, img: store, title: "Steel Bottle 500ml", price: "1000", oldPrice: "1200", para: "Best Selling Product" },
  { id: 5, img: store, title: "Steel Bottle 750ml", price: "1200", oldPrice: "1500", para: "Best Selling Product" },
  { id: 6, img: store, title: "Steel Bottle 1000ml", price: "1400", oldPrice: "1700", para: "Best Selling Product" },
  { id: 7, img: store, title: "Steel Bottle 500ml", price: "1000", oldPrice: "1200", para: "Best Selling Product" },
  { id: 8, img: store, title: "Steel Bottle 750ml", price: "1200", oldPrice: "1500", para: "Best Selling Product" },
  { id: 9, img: store, title: "Steel Bottle 1000ml", price: "1400", oldPrice: "1700", para: "Best Selling Product" },
  { id: 10, img: store, title: "Steel Bottle 500ml", price: "1000", oldPrice: "1200", para: "Best Selling Product" },
  { id: 11, img: store, title: "Steel Bottle 750ml", price: "1200", oldPrice: "1500", para: "Best Selling Product" },
  { id: 12, img: store, title: "Steel Bottle 1000ml", price: "1400", oldPrice: "1700", para: "Best Selling Product" },
  { id: 13, img: store, title: "Steel Bottle 500ml", price: "1000", oldPrice: "1200", para: "Best Selling Product" },
  { id: 14, img: store, title: "Steel Bottle 750ml", price: "1200", oldPrice: "1500", para: "Best Selling Product" },
  { id: 15, img: store, title: "Steel Bottle 1000ml", price: "1400", oldPrice: "1700", para: "Best Selling Product" },
  { id: 16, img: store, title: "Steel Bottle 500ml", price: "1000", oldPrice: "1200", para: "Best Selling Product" },
  { id: 17, img: store, title: "Steel Bottle 750ml", price: "1200", oldPrice: "1500", para: "Best Selling Product" },
  { id: 18, img: store, title: "Steel Bottle 1000ml", price: "1400", oldPrice: "1700", para: "Best Selling Product" },
  { id: 19, img: store, title: "Steel Bottle 500ml", price: "1000", oldPrice: "1200", para: "Best Selling Product" },
  { id: 20, img: store, title: "Steel Bottle 750ml", price: "1200", oldPrice: "1500", para: "Best Selling Product" },
];

/* 🔹 pagination settings */
const ITEMS_PER_PAGE = 16;
export default function Storage() {
  const [currentPage, setCurrentPage] = useState(1);


  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLitre, setSelectedLitre] = useState("");
  const [sortType, setSortType] = useState("default");



  const getFilteredProducts = () => {
    let products = [...allProducts];

    // 🔹 FILTER
    if (selectedSize) {
      products = products.filter(item =>
        item.title.toLowerCase().includes(selectedSize.toLowerCase())
      );
    }

    // 🔹 SORT
    if (sortType === "low-high") {
      products.sort(
        (a, b) => Number(a.price.replace("", "")) - Number(b.price.replace("", ""))
      );
    }
    if (sortType === "high-low") {
      products.sort(
        (a, b) => Number(b.price.replace("", "")) - Number(a.price.replace("", ""))
      );
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
    <div className="storage-page">
      {/* BANNER */}
      <section className="banner">
        <img src={bannerImage} alt="Storage Banner" />

        <div className="banner-content">
          <h1>Storage</h1>
          <p>
            <Link to="/">Home</Link> / <span><a href="#shop">Storage</a></span>
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <FilterBar
        onFilterChange={({ type, value }) => {
          if (type === "size") setSelectedSize(value);
          if (type === "litre") setSelectedLitre(value);
          setCurrentPage(1);
        }}
        onSortChange={(type) => {
          setSortType(type);
          setCurrentPage(1); //  essential
        }}
      />

      {/* PRODUCTS */}
      <section className="products-section" id="shop">
        <div className="products-grid">
          {currentProducts.map((item) => (
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

        {/* PAGINATION */}
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
            <span onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
