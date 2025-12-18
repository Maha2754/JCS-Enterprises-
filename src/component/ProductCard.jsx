import React, { useContext, useState } from "react";
import { CartContext } from "../component/CartContext";
import "../style/productcard.css";
import View from "../component/View"; // 🔥 modal component
import { useNavigate } from "react-router-dom";


const ProductCard = ({ id, img, title, price, type, oldPrice, para, rating = 5, reviews = 20 }) => {
  const { addToCart } = useContext(CartContext);
  const [isViewOpen, setIsViewOpen] = useState(false); // modal state
    const navigate = useNavigate();

  return (
    <>
      <div className="product-card">
        {/* Image */}
         <div
          className="product-img-box"
          onClick={() =>
  navigate(`/buy/${id}`, {
    state: {
      id,
      img,
      title,
      price,
      oldPrice,
      type,
      para
    }
  })
}
   // 🔥 IMAGE CLICK → BUY PAGE
        >
          <img src={img} alt={title} />
          <span
            className="view-btn"
            onClick={(e) => {
              e.stopPropagation(); // prevent parent click
              setIsViewOpen(true); // open modal
            }}
          >
            View
          </span>
        </div>

        {/* Details */}
        <div className="product-details">
          <h4>{title}</h4>
          {para && <p className="best">{para}</p>}

          {/* Rating */}
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`star ${star <= rating ? "filled" : "empty"}`}>★</span>
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
                e.stopPropagation();
                addToCart({
                  id,
                  img,
                  title,
                  price: Number(String(price).replace(/₹|,/g, "")),
                  quantity: 1
                });
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {isViewOpen && <View onClose={() => setIsViewOpen(false)} product={{ id, img, title, price, oldPrice, type, para }} />}
    </>
  );
};

export default ProductCard;
