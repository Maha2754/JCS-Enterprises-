import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");

  const handlePay = () => {
    if (!selectedPayment) {
      alert("Please select a payment method"); // must select
      return;
    }
    navigate("/success");
  };

  return (
    <div className="payment-page">
      <h2>Select Payment Method</h2>

      <label>
        <input
          type="radio"
          name="pay"
          value="UPI"
          checked={selectedPayment === "UPI"}
          onChange={(e) => setSelectedPayment(e.target.value)}
        />{" "}
        UPI
      </label>

      <label>
        <input
          type="radio"
          name="pay"
          value="Card"
          checked={selectedPayment === "Card"}
          onChange={(e) => setSelectedPayment(e.target.value)}
        />{" "}
        Card
      </label>

      <label>
        <input
          type="radio"
          name="pay"
          value="COD"
          checked={selectedPayment === "COD"}
          onChange={(e) => setSelectedPayment(e.target.value)}
        />{" "}
        Cash on Delivery
      </label>

      <button onClick={handlePay}>Pay Now</button>
    </div>
  );
};

export default Payment;
