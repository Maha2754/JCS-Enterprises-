import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import "../style/bowls.css";
import bannerImage from "../assets/banners/banner.png";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import FilterBar from "../component/FilterBar";
import bowl from "../assets/bowl.png";
import bowl1 from "../assets/bowl2.png";
import bowl2 from "../assets/bowl3.png";
import bowl3 from "../assets/bowl4.png";


// Image map
const imageMap = {
 bowl,
 bowl1,
 bowl2,
 bowl3,
};

/* Pagination settings */
const ITEMS_PER_PAGE = 16;

export default function Bowls() {
  const { data, loading, error } = useFetch("/data/dummydata.json");

  // Protect against undefined data
  const allProducts = data ? data.filter((item) => item.type === "bowl") : [];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLitre, setSelectedLitre] = useState("");
  const [sortType, setSortType] = useState("default");

  // Filter and sort
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
    <div className="bowls-page">
      {/* Banner */}
      <section className="banner">
        <img src={bannerImage} alt="Bowls Banner" />
        <div className="banner-content">
          <h1>Bowls</h1>
          <p>
            <Link to="/">Home</Link> / <span><a href="#shop">Bowls</a></span>
          </p>
        </div>
      </section>

      {/* Filter Bar */}
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

      {/* Products */}
      <section className="products-section" id="shop">
        {loading && <p>Loading...</p>}
        {error && <p>Error loading products</p>}

        <div className="products-grid">
          {currentProducts.map((item) => (
            <Link
              to={`/buy/${item.id}`}
              state={item}
              key={item.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ProductCard
                id={item.id}
                img={imageMap[item.img] || bowl1} // fallback image
                title={item.title}
                price={item.price}
                oldPrice={item.oldPrice}
                para={item.para}
              />
            </Link>
          ))}
        </div>

        {/* Pagination */}
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
