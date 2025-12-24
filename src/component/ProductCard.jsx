import React, { useContext, useState } from "react";
import { CartContext } from "../component/CartContext";
import "../style/productcard.css";
import View from "../component/View";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../component/WishlistContext";


const ProductCard = ({ id, img, title, price, type, oldPrice, para, rating = 5, reviews = 20 }) => {
  const { addToCart } = useContext(CartContext);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);

  const isWishlisted = wishlist.some(item => item.id === id);

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
        //  IMAGE CLICK → BUY PAGE
        >
          <img src={img} alt={title} />
          <span
            className={`productcard-wishlist-btn ${isWishlisted ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();

              if (isWishlisted) {
                removeFromWishlist(id);
              } else {
                addToWishlist({ id, img, title, price, oldPrice, type, para });
              }
            }}
          >
            <i className="fa-solid fa-heart"></i>
          </span>


          <span
            className="view-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsViewOpen(true);
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
          <div className="price-action">
            <div className="price">
              <span className="new">₹{price}</span>
              {oldPrice && <span className="old">₹{oldPrice}</span>}
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
                    type,
                    price: Number(String(price).replace(/₹|,/g, "")),
                    quantity: 1,
                  });
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>

      </div>
      {/* View Modal */}
      {isViewOpen && <View onClose={() => setIsViewOpen(false)} product={{ id, img, title, price, oldPrice, type, para }} />}
    </>
  );
};

export default ProductCard;
