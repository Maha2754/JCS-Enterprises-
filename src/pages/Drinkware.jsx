import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import "../style/drinkware.css";
import bannerImage from "../assets/banners/banner.png";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import FilterBar from "../component/FilterBar";
import drink1 from "../assets/drink.png";
import drink2 from "../assets/drink2.png";
import drink3 from "../assets/drink3.png";

/* pagination settings */
const ITEMS_PER_PAGE = 16;

export default function Drinkware() {
  const { data, loading, error } = useFetch("/data/dummydata.json");

  const imageMap = {
    drink: drink1,
    drink1: drink2,
    drink2: drink3,
  };

  const allProducts = data.filter((item) => item.type === "drinkware");

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
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="drinkware-page">
      {/* BANNER */}
      <section className="banner">
        <img src={bannerImage} alt="Drinkware Banner" />
        <div className="banner-content">
          <h1>Drinkware</h1>
          <p>
            <Link to="/">Home</Link> / <span><a href="#shop">Drinkware</a></span>
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
          setCurrentPage(1);
        }}
      />

      {/* PRODUCTS */}
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
                img={imageMap[item.img] || drink1} // <-- fix done
                title={item.title}
                price={item.price}
                oldPrice={item.oldPrice}
                para={item.para}
              />
            </Link>
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
            <span onClick={() => setCurrentPage(currentPage + 1)}>Next</span>
          )}
        </div>
      </section>
    </div>
  );
}
