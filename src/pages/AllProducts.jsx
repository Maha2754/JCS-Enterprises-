import React, { useState } from "react";
import ProductCard from "../component/ProductCard";
import "../style/productcard.css";

import pan from "../assets/steel-pan.png";
import bottle from "../assets/bottle.png";
import casserole from "../assets/casserole.png";
import mug from "../assets/mug.png";
import bowl from "../assets/bowl.png";
import drink from "../assets/drink.png";
import lunch from "../assets/lunch.png";
import storage from "../assets/storage.png";
import tiffin from "../assets/tiffin.png";

import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";


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

const AllProducts = () => {
  const [category, setCategory] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);

  const { data: products, loading, error } = useFetch("data/dummydata.json");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.type.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "" || product.type === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;
  if (error) return <p style={{ textAlign: "center" }}>Error loading products</p>;


  return (
    <div className="products-section">
      <h2>All Products</h2>

      {/* Search Bar */}
      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px 15px", width: "250px", borderRadius: "20px" }}
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "10px 15px", borderRadius: "20px" }}
        >
          <option value="">All Categories</option>
          <option value="pan">Pan</option>
          <option value="bottle">Bottle</option>
          <option value="bowl">Bowl</option>
          <option value="drinkware">Drinkware</option>
          <option value="tiffin">Tiffin</option>
          <option value="storage">Storage</option>
          <option value="lunchkit">Lunchkit</option>
        </select>
      </div>


      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              img={imageMap[item.img]}
              title={item.title}
              price={`₹${item.price}`}
              oldPrice={`₹${item.oldPrice}`}
              para={item.para}
              type={item.type}
              isFestive={item.isFestive}
            />
          ))
        ) : (
          <p style={{ gridColumn: "1/-1", textAlign: "center" }}>
            No products found.
          </p>
        )}
      </div>

    </div>
  );
};

export default AllProducts;
