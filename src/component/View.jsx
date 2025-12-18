import React, { useState, useContext } from "react";
import "../style/view.css";
import { CartContext } from "../component/CartContext"; // import context
import { useNavigate } from "react-router-dom";


const View = ({ onClose, product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [mainImg, setMainImg] = useState(product.img);
  const [size, setSize] = useState("700ml");
  const [quantity, setQuantity] = useState(1);

  const [isWishlisted, setIsWishlisted] = useState(false);

const toggleWishlist = () => {
  setIsWishlisted(!isWishlisted);
};


const handleAddToCart = () => {
  addToCart({
    id: product.id,
    img: product.img,
    title: product.title,
    price: Number(
      String(product.price).replace(/[^0-9.]/g, "")
    ), // ✅ REAL FIX
    size: size,
    quantity: Number(quantity) || 1,
  });
};


  const handleBuyNow = () => {
 addToCart({
    id: product.id,
    img: product.img,
    title: product.title,
    price: Number(
      String(product.price).replace(/[^0-9.]/g, "")
    ), // ✅ REAL FIX
    size: size,
    quantity: Number(quantity) || 1,
  });

 onClose();

    navigate("/cart");
  };

  const thumbnails = [product.img]; // Add more if available

  return (
    <div className="view-overlay">
      <div className="view-container">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="view-content">
          <div className="left-thumbs">
            {thumbnails.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`thumb-img ${mainImg === img ? "active-thumb" : ""}`}
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>

          <div className="main-image">
            <img src={mainImg} alt="main product" />
          </div>

          <div className="right-details">
            <h2>{product.title}</h2>
            <p className="price">
              {product.price} <span className="old-price">{product.oldPrice}</span>
            </p>

            <div className="sizes">
              <label>Size:</label>
              <button className={size === "700ml" ? "active" : ""} onClick={() => setSize("700ml")}>700ml</button>
              <button className={size === "1000ml" ? "active" : ""} onClick={() => setSize("1000ml")}>1000ml</button>
            </div>

            <div className="purchase">
              <label>Units:</label>
<input
  type="number"
  min="1"
  value={quantity}
  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
/>
              
              {/* Add to Cart button */}
              <button className="add-cart" onClick={handleAddToCart}>Add to Cart</button>
              
              {/* Buy Now button */}
              <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
            </div>

            <hr className="hr" />

            {/* Compare / Wishlist */}
           <div className="compare-wishlist">
  <button>⇄ Compare</button>

  <button
    className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
    onClick={toggleWishlist}
  >
    <i className="fa-solid fa-heart"></i>
    {isWishlisted ? " Added to Wishlist" : " Add to Wishlist"}
  </button>
</div>


            {/* Share icons */}
            <div className="share-icons">
              Share :
               <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-whatsapp"></i>
  </a>
  <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-x-twitter"></i>
  </a>
  <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-facebook-f"></i>
  </a>
  <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-instagram"></i>
  </a>
            </div>

            {/* Vendor info */}
            <div className="vendor-info">
  <p><span className="label">Vendor :</span><span className="value">Steel Utensils</span></p>
  <p><span className="label">Type :</span><span className="value">Steel Bottles</span></p>
  <p><span className="label">Model :</span><span className="value">SU_SB_700</span></p>
  <p><span className="label">Availability :</span><span className="value">Available</span></p>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
