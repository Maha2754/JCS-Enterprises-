//  each page la ulla product cards all card same so na separate component use panni atha matha page la impot panitan


import React, { useContext, useState } from "react";
import { CartContext } from "../component/CartContext";
import "../style/productcard.css";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ id, img, title, price,type, oldPrice, para, rating = 5, reviews = 20 }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  return (
    <div
  className="product-card"
  onClick={() =>
    navigate("/buy", {
      state: {
        id,
        img,
        title,
        price,
        oldPrice,
        para,
        type
      }
    })

    
  }
>
      {/* Image */}
      <div className="product-img-box">
        <img src={img} alt={title} />
      </div>

      {/* Details */}
      <div className="product-details">
        <h4>{title}</h4>

        {para && <p className="best">{para}</p>}

        {/* Rating */}
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "filled" : "empty"}`}
            >
              ★
            </span>
          ))}
          <span className="reviews">({reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="price">
          <span className="new">{price}</span>
          {oldPrice && <span className="old">{oldPrice}</span>}
        </div>

        {/* Add to Cart */}
        <div className="action-row">
          <button
  className="add-btn"
  onClick={(e) => {
    e.stopPropagation(); // VERY IMPORTANT
  addToCart({
  id,
  img,
  title,
  price: Number(
    String(price)
      .replace(/₹/g, "")
      .replace(/,/g, "")
  ), // 🔥 "₹1,000.00" → 1000
  quantity: 1,
});
  }}
>
  Add
</button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
