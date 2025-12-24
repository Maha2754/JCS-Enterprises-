import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // Initialize cart from localStorage if exists
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
const addToCart = (product) => {
  setCartItems((prev) => {
    const existingIndex = prev.findIndex(
      (item) =>
        item.id === product.id &&
        item.variantId === product.variantId && 
        (item.size || "default") === (product.size || "default")
    );

    if (existingIndex >= 0) {
      const updatedItems = [...prev];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity:
          Number(updatedItems[existingIndex].quantity) +
          Number(product.quantity || 1),
      };
      return updatedItems;
    } else {
      return [
        ...prev,
        {
          ...product,
          price: Number(product.price),
          quantity: Number(product.quantity || 1),
        },
      ];
    }
  });
};


  // Remove product from cart by index
  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Update quantity directly
  const updateQuantity = (index, qty) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        quantity: qty < 1 ? 1 : qty,
      };
      return updated;
    });
  };

  // Total cart price in ₹
  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Alias for total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
