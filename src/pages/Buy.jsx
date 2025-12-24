import React, { useState, useEffect, useContext } from "react";
import "../style/buy.css";
import useFetch from "../hooks/useFetch";

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


import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../component/CartContext";
import ProductCard from "../component/ProductCard";
import { WishlistContext } from "../component/WishlistContext";

const imgMap = {
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

const sizesByType = {
  pan: ["Small", "Medium", "Large"],
  bottle: ["500ml", "750ml", "1000ml"],
  mug: ["150ml", "200ml", "300ml"],
  casserole: ["2L", "3L", "5L"],
  drinkware: ["2L", "3L", "5L"],
};

const categoryMap = {
  drinkware: "drink",
  bottle: "bottle",
  mug: "mug",
  pan: "pan",
  casserole: "casserole",
  bowl: "bowl",
  tiffin: "tiffin",
  storage: "storage",
  lunchkit: "lunch",
};

const thumbsByImg = {
  bottle: [bottle1, bottle2, bottle3, bottle4],
  pan: [pan1, pan2,pan3],
  casserole : [cas1,cas2,cas3],
  mug : [mug1,mug2,mug3],
  tiffin : [tiffin1,tiffin2],
  bowl : [bowl1,bowl2,bowl3],
  storage : [store1,store2],
  lunch : [Lunch1,Lunch2],
drink: [drink1, drink2, drink3],
};



const Buy = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);

  // --- fetch products ---
  const { data: products, loading, error } = useFetch("/data/dummydata.json");
  const [allProductsList, setAllProductsList] = useState([]);

  // --- hooks at top level ---
  const [activeTab, setActiveTab] = useState("description");
  const [activeSize, setActiveSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImg, setActiveImg] = useState("");

  // --- set products list when fetch done ---
  useEffect(() => {
    if (!loading && !error && products) {
      setAllProductsList(products);
    }
  }, [products, loading, error]);

  // --- current product ---
  const product = location.state || allProductsList.find((p) => p.id === parseInt(id));

useEffect(() => {
  const prod = allProductsList.find((p) => p.id === parseInt(id));
  if (prod) {
    setActiveSize(sizesByType[prod.type]?.[0] || "");
    setActiveImg(imgMap[prod.img] || imgMap[prod.type]);
    setIsWishlisted(wishlist.some((item) => item.id === prod.id));
  }
}, [id, allProductsList, wishlist]);

  // --- guards (conditional rendering) ---
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;
  if (!product) return <p>Loading product...</p>;

  const productType = product.type || "bottle";
  const initialMainImg = location.state?.img || imgMap[productType];


  const thumbs =
  thumbsByImg[product.img] ||
  thumbsByImg[categoryMap[product.type]] ||
  [imgMap[product.img]];



  const productCategory = product?.type ? (categoryMap[product.type] || product.type).toLowerCase() : null;

  const relatedProducts =
    allProductsList.length > 0
      ? allProductsList.filter((p) => p.id !== product.id && p.type === product.type)
      : [];

  // --- handlers ---
  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      variantId: activeImg, 
      img: activeImg, 
      title: product.title,
      type: product.type,
      price: Number(String(product.price).replace(/[^0-9.]/g, "")),
      size: activeSize,
      quantity: Number(quantity) || 1,
    });
    navigate("/cart");
  };

  const handleWishlist = () => {
    if (!isWishlisted) {
      addToWishlist({
        id: product.id,
        img: product.img,
        title: product.title,
        price: product.price,
        type: product.type,
      });
    } else {
      removeFromWishlist(product.id);
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="buy-page">
      <div className="buy-top">
        <div className="buy-left">
          <div className="main-img">
            <img src={activeImg} alt="product" />
          </div>
          <div className="thumbs">
            {thumbs.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={activeImg === img ? "active-thumb" : ""}
              />
            ))}
          </div>
        </div>
         {/* RIGHT SIDE */}
        <div className="buy-right">
          <h1 className="product-title">{product.title}</h1>

          <div className="price-row">
            <span className="price">Rs. {product.price}</span>
            <span className="offer">
              Rs. <del>500 off</del>
            </span>
          </div>

          <div className="size-row">
            <span>Size:</span>
            {(sizesByType[product.type] || []).map((size, i) => (
              <button
                key={i}
                className={`size-btn ${activeSize === size ? "active" : ""}`}
                onClick={() => setActiveSize(size)}
              >
                {size}
              </button>
            ))}
            <p className="selected-size">Selected Size: {activeSize}</p>
          </div>

         <div className="action-row">
<div className="unit-box">
    <span>Units:</span>
    <input
      type="number"
      min="1"
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
    />
  </div>

<button
    className="add-cart"
    onClick={() =>
      addToCart({
  id: product.id,
  variantId: activeImg,
  img: activeImg,
  title: product.title,
  type : product.type,
  price: Number(String(product.price).replace(/[^0-9.]/g, "")),
  size: activeSize,
  quantity: Number(quantity) || 1,
})
    }
  >
    ADD TO CART
  </button>

  {/* Fixed Buy Now button */}
<button className="buy-now" onClick={handleBuyNow}>
  Buy Now
</button>


</div>


          <hr />

<div className="wish-row">
  <span>⇄ Compare</span>
  <span
    className={`buypage-wishlist ${isWishlisted ? "active" : ""}`}
    onClick={handleWishlist}
  >
    <i className="fa-solid fa-heart"></i>
    {isWishlisted ? " Wishlist Added" : " Add to Wishlist"}
  </span>
</div>


          <div className="share-row">
  <span>Share :</span>

  {/* WhatsApp */}
  <a
    href={`https://wa.me/?text=Check out this product: ${window.location.href}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-whatsapp"></i>
  </a>

  {/* Twitter */}
  <a
    href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this product!`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-twitter"></i>
  </a>

  {/* Facebook */}
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-facebook-f"></i>
  </a>

  {/* Instagram profile link */}
  <a
    href="https://instagram.com/yourprofile"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-instagram"></i>
  </a>
</div>


          <div className="meta-grid">
            <p>
              <b>Vendor :</b>
            </p>
            <p>Steel utensils</p>

            <p>
              <b>Type :</b>
            </p>
            <p>
              {product.type === "pan" && "Steel Pans"}
              {product.type === "bottle" && "Steel Bottles"}
              {product.type === "mug" && "Steel Mugs"}
              {product.type === "casserole" && "Steel Casseroles"}
            </p>

            <p>
              <b>Model :</b>
            </p>
            <p>SU_SB_700</p>

            <p>
              <b>Availability :</b>
            </p>
            <p>Available</p>
          </div>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="buy-section-two">
        <div className="tab-header">
          <button
            className={activeTab === "description" ? "tab active" : "tab"}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={activeTab === "info" ? "tab active" : "tab"}
            onClick={() => setActiveTab("info")}
          >
            Additional Information
          </button>
          <button
            className={activeTab === "reviews" ? "tab active" : "tab"}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
          <button
            className={activeTab === "shipping" ? "tab active" : "tab"}
            onClick={() => setActiveTab("shipping")}
          >
            Shipping & Return
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "description" && (
            <div>
              <p>
                Elevate your culinary experience with premium stainless steel
                bottles crafted for durability and daily use.
              </p>
              <ul>
                <li>High quality stainless steel</li>
                <li>Rust free and long lasting</li>
                <li>Ergonomic design for easy grip</li>
                <li>Ideal for office, travel & home</li>
              </ul>
            </div>
          )}
          {activeTab === "info" && (
            <div>
              <p>
                <b>Material:</b> Stainless Steel
              </p>
              <p>
                <b>Capacity:</b> 750ml / 1000ml
              </p>
              <p>
                <b>Color:</b> Silver
              </p>
              <p>
                <b>Country of Origin:</b> India
              </p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div>
              <p>⭐ ⭐ ⭐ ⭐ ☆</p>
              <p>Very good quality bottle. Value for money.</p>
            </div>
          )}
          {activeTab === "shipping" && (
            <div>
              <p>✔ Free shipping within 5–7 business days.</p>
              <p>✔ Easy 7-day return policy.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      <div className="related-section">
        <h4 style={{ marginBottom: "20px" }}>Related Products</h4>
<div className="related-grid">
  {relatedProducts.length > 0 ? (
    relatedProducts.map((p) => (
<ProductCard
  key={p.id}
  id={p.id}
 img={imgMap[p.img] || imgMap[p.type]} 
  title={p.title}
  price={p.price}
  type={p.type}
  oldPrice={p.oldPrice}
  para={p.para}
/>
    ))
  ) : (
    <p>No related products found.</p>
  )}
</div>

      </div>
    </div>
  );
};

export default Buy;
