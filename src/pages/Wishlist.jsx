import React, { useContext } from "react";
import { WishlistContext } from "../component/WishlistContext";
import ProductCard from "../component/ProductCard";
import "../style/wishlist.css"; // MUST

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className="wishlist-page">
      <h2>My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-item" key={item.id}>
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
