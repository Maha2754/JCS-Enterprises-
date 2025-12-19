import React, { useState } from "react";
import "../style/trackorder.css";
import steelBottle from "../assets/bottle.png";
import Lunch from "../assets/lunch.png";



const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Open modal and hide navbar
  const openModal = () => {
    setShowModal(true);
    document.querySelector(".navbar")?.classList.add("hidden-navbar");
  };

  // Close modal and show navbar
  const closeModal = () => {
    setShowModal(false);
    document.querySelector(".navbar")?.classList.remove("hidden-navbar");
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    setError("");
    setOrderDetails(null);

    if (!orderId || !email) {
      setError("Please enter both Order ID and Email");
      return;
    }

    // Simulated backend logic
    if (orderId === "12345" && email === "admin@gmail.com") {
      setOrderDetails({
        id: "12345",
        expectedDelivery: "2025-12-25",
        statusSteps: [
          { step: "Order Placed", date: "2025-12-18", completed: true },
          { step: "Processed", date: "2025-12-19", completed: true },
          { step: "Shipped", date: "2025-12-20", completed: true },
          { step: "Out for Delivery", date: "2025-12-24", completed: false },
          { step: "Delivered", date: "2025-12-25", completed: false },
        ],
        items: [
          { img: steelBottle, name: "Steel Bottle", qty: 1, price: 499 },
          { img: Lunch, name: "Lunch Box", qty: 2, price: 799 },
        ],
      });
      openModal(); // ✅ open modal and hide navbar
    } else {
      closeModal(); // ✅ hide modal & ensure navbar shows
      setError("Order not found. Please check your details.");
    }
  };


  return (
    <div className="track-order-container">
      <h2>Track Your Order</h2>
      <form onSubmit={handleTrackOrder} className="track-order-form">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Track Order</button>
      </form>

      {error && <p className="error">{error}</p>}

      {/* Modal */}
      {showModal && orderDetails && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={closeModal}>
              &times;
            </span>

            <h3>Order ID: {orderDetails.id}</h3>
            <p>Expected Delivery: {orderDetails.expectedDelivery}</p>

            {/* Shipment Tracker */}
           {/* Shipment Tracker */}
<div className="tracker">
  {orderDetails.statusSteps?.map((step, index) => (
    <div className="tracker-step" key={index}>
      <div
        className={`tracker-dot ${step.completed ? "completed" : ""}`}
        title={`${step.step} - ${step.date}`}
      ></div>
      {index !== orderDetails.statusSteps.length - 1 && (
        <div
          className={`tracker-line ${
            step.completed ? "completed" : ""
          }`}
        ></div>
      )}
      <span className="tracker-label">{step.step}</span>
    </div>
  ))}

  {/* Truck */}
  <div
    className="truck"
    style={{
      left: `${
        (orderDetails.statusSteps.filter((s) => s.completed).length - 1) *
        25
      }%`,
    }}
  >
    🚚
  </div>
</div>


            {/* Items */}
            <h4>Items:</h4>
            <div className="order-items">
              {orderDetails.items?.map((item, index) => (
                <div className="order-item" key={index}>
                  <img src={item.img} alt={item.name} />
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <p>Qty: {item.qty}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
