import { useNavigate } from "react-router-dom";
import "../style/address.css";

const Address = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();   // page reload stop
    navigate("/payment"); // only after validation
  };

  return (
    <div className="address-page">
      <h2>Delivery Address</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          required
        />

        <textarea
          placeholder="Address"
          required
        ></textarea>

        <input
          type="text"
          placeholder="Pincode"
          required
        />

        <button type="submit">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default Address;
