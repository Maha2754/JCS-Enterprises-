import React, { useState } from "react";
import ProductCard from "../component/ProductCard";
import "../style/productcard.css"; // Already has grid styling

// Sample product data (you can import from a separate file or API)
import pan from "../assets/steel-pan.png";
import bottle from "../assets/bottle.png";
import casserole from "../assets/casserole.png";
import mug from "../assets/mug.png";

import { useLocation } from "react-router-dom";

const AllProducts = () => {
//   const [search, setSearch] = useState("");
const [category, setCategory] = useState(""); // new state for filter

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const initialSearch = queryParams.get("search") || "";

const [search, setSearch] = useState(initialSearch);


  const products = [
    { id: 1, img: pan, title: "Steel Non-Stick Pan", type: "Pan", price: "₹1,000.00", oldPrice: "₹1,400.00", para: "Best Selling" },
    { id: 2, img: bottle, title: "Steel Bottle – 750ml", type: "Bottle", price: "₹1,000.00", oldPrice: "₹1,400.00", para: "Best Selling" },
    { id: 3, img: mug, title: "Steel Mug – 200ml", type: "Mug", price: "₹1,000.00", oldPrice: "₹1,400.00", para: "Best Selling" },
    { id: 4, img: casserole, title: "Steel Casserole – 5L", type: "Casserole", price: "₹1,000.00", oldPrice: "₹1,400.00", para: "Best Selling" },
    // Add more products as needed
  ];

  // Filter products based on search
const filteredProducts = products.filter((product) => {
  const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) ||
                        product.type.toLowerCase().includes(search.toLowerCase());
  const matchesCategory = category === "" || product.type === category;
  return matchesSearch && matchesCategory;
});


  return (
    <div className="products-section">
      <h2>All Products</h2>

      {/* Search Bar */}
<div style={{ marginBottom: "30px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
  
  {/* Search Bar */}
  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      padding: "10px 15px",
      width: "250px",
      borderRadius: "20px",
      border: "1px solid #ccc",
      outline: "none"
    }}
  />

  {/* Category Filter */}
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    style={{
      padding: "10px 15px",
      borderRadius: "20px",
      border: "1px solid #ccc",
      outline: "none",
      cursor: "pointer"
    }}
  >
    <option value="">All Categories</option>
    <option value="Pan">Pan</option>
    <option value="Bottle">Bottle</option>
    <option value="Mug">Mug</option>
    <option value="Casserole">Casserole</option>
  </select>
</div>


      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              img={item.img}
              title={item.title}
              price={item.price}
              oldPrice={item.oldPrice}
              para={item.para}
              type={item.type}
            />
          ))
        ) : (
          <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
