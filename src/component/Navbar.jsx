import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../component/CartContext";
import "../style/navbar.css";
import Breadcrumb from "../component/Breadcrumb";

const Navbar = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const location = useLocation();
  const hideMenu = [
    "/bottles","/tiffins","/drinkware","/bowls","/storage","/lunch-kit","/festive","/cart","/buy",
  ].includes(location.pathname);

  const showBreadcrumb =
  location.pathname === "/cart" ||
  location.pathname.startsWith("/buy");


  const [userOpen, setUserOpen] = useState(false);

const user = JSON.parse(localStorage.getItem("user"));

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  setUserOpen(false);
  navigate("/login");
};

  

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <span className="icon" onClick={() => setSearchOpen(!searchOpen)}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          {searchOpen && (
            <div className="search-dropdown">
              <input
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      // Navigate to AllProducts page with search query
      navigate(`/all-products?search=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false); // close dropdown
      setSearchTerm(""); // clear input
    }
  }}
/>

            </div>
          )}
        </div>

        <div className="nav-logo">
          <Link to="/">JCS Enterprises</Link>
        </div>

        <div className="nav-right">
          
  <div className="user-wrapper">
  <span
    className="icon"
    onClick={() => setUserOpen(!userOpen)}
  >
    <i className="fa-regular fa-user"></i>
  </span>

  {userOpen && user && (
    <div className="user-dropdown">
      <p className="user-name">
        {user.firstName} {user.lastName}
      </p>
      <p className="user-email">{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )}
</div>

         <span className="icon cart-icon" onClick={() => navigate("/cart")}>
  <i className="fa-solid fa-bag-shopping"></i>
  {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
</span>

          {!hideMenu && (
            <span className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</span>
          )}
        </div>
      </div>

      


      {!hideMenu && (
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li><Link to="/bottles">Bottles</Link></li>
          <li><Link to="/tiffins">Tiffins</Link></li>
          <li><Link to="/drinkware">Drinkware</Link></li>
          <li><Link to="/bowls">Bowls</Link></li>
          <li><Link to="/storage">Storage</Link></li>
          <li><Link to="/lunch-kit">Lunch kit</Link></li>
          <li><Link to="/festive">Festive</Link></li>
        </ul>
      )}

       {/* Breadcrumb (menu replace) */}
  {showBreadcrumb && (
    <div className="breadcrumb-wrapper">
      <Breadcrumb />
    </div>
  )}
    </nav>
  );
};

export default Navbar;
