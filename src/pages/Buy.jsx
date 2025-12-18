import React, { useState, useEffect, useContext } from "react";
import "../style/buy.css";

// images
import pan1 from "../assets/steel-pan.png";
import pan2 from "../assets/pan1.png";

import bottle1 from "../assets/bottle.png";
import bottle2 from "../assets/bottle.png";

import mug1 from "../assets/mug.png";
import mug2 from "../assets/mug.png";

import cas1 from "../assets/casserole.png";
import cas2 from "../assets/casserole.png";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import { CartContext } from "../component/CartContext";
import ProductCard from "../component/ProductCard";

// CENTRAL PRODUCT LIST
const allProducts = [
  { id: 1, type: "pan", title: "Steel Pan", img: pan1, price: 999 },
  { id: 2, type: "bottle", title: "Steel Bottle", img: bottle1, price: 999 },
  { id: 3, type: "mug", title: "Steel Mug", img: mug1, price: 999 },
  { id: 4, type: "casserole", title: "Steel Casserole", img: cas1, price: 999 },
];

const Buy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { addToCart } = useContext(CartContext);

  // FIND PRODUCT BY ID
  // const product = allProducts.find((p) => p.id === parseInt(id));
const product =
  location.state ||
  allProducts.find((p) => p.id === parseInt(id));

  const productType = product?.type || "bottle";



  // redirect if product not found
  useEffect(() => {
    if (!product) navigate("/");
  }, [product, navigate]);

  if (!product) return null;
  //thumbs
    const thumbsByType = {
    pan: [pan1, pan2,pan1,pan2],
    bottle: [bottle1, bottle2,bottle1,bottle2],
    mug: [mug1, mug2,mug1,mug2],
    casserole: [cas1, cas2,cas1,cas2],
  };

const thumbs =
  location.state?.img
    ? [location.state.img]
    : thumbsByType[productType] || [product.img];

 
const [activeImg, setActiveImg] = useState(product.img);


  const [activeTab, setActiveTab] = useState("description");
  const sizesByType = {
    pan: ["Small", "Medium", "Large"],
    bottle: ["500ml", "750ml", "1000ml"],
    mug: ["150ml", "200ml", "300ml"],
    casserole: ["2L", "3L", "5L"],
  };
 const [activeSize, setActiveSize] = useState(
  sizesByType[productType]?.[0] || ""
);

useEffect(() => {
  setActiveImg(location.state?.img || product.img);
}, [id, product.img, location.state]);


  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

const handleBuyNow = () => {
addToCart({
  id: product.id,
  img: product.img,
  title: product.title,
  price: product.price, // NUMBER-a store panrom
  size: activeSize,
  quantity: Number(quantity) || 1,
})
  navigate("/cart");
};




  return (
    <div className="buy-page">
      <div className="buy-top">
        {/* LEFT SIDE */}
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
      value={quantity}
      min="1"
      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
    />
  </div>

<button
    className="add-cart"
    onClick={() =>
      addToCart({
  id: product.id,
  img: product.img,
  title: product.title,
  price: product.price, // NUMBER-a store panrom
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
              className={`wishlist ${isWishlisted ? "active" : ""}`}
              onClick={toggleWishlist}
            >
              <i className="fa-solid fa-heart"></i>
              {isWishlisted ? " Added to Wishlist" : " Add to Wishlist"}
            </span>
          </div>

          <div className="share-row">
            <span>Share :</span>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-whatsapp"></i>
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

      {/* RELATED PRODUCTS */}
      <div className="related-section">
        <h4 style={{ marginBottom: "20px" }}>Related Products</h4>
        <div className="related-grid">
          {allProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              img={p.img}
              title={p.title}
              price={p.price}
              type={p.type}
              oldPrice="₹1,400.00"
              para="Best Selling – 200+ Bought last Month"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buy;
