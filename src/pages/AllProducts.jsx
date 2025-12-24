import React, { useState } from "react";
import ProductCard from "../component/ProductCard";
import "../style/productcard.css";

// PAN
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

import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";


const imageMap = {
  // pan
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
 img={imageMap[item.img] || imageMap[item.type]} 
  title={item.title}
  price={item.price}
  type={item.type}
  oldPrice={item.oldPrice}
  para={item.para}
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
