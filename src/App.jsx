import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import ScrollToTop from "./component/ScrollToTop";
import { CartProvider } from "./component/CartContext";
import ProtectedRoute from "./component/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Bottle from "./pages/Bottle";
import Tiffin from "./pages/Tiffin";
import Drinkware from "./pages/Drinkware";
import Bowls from "./pages/Bowls";
import Storage from "./pages/Storage";
import LunchKit from "./pages/LunchKit";
import Festive from "./pages/Festive";
import Buy from "./pages/Buy";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import AllProducts from "./pages/AllProducts";

// Auth
import Login from "./Login/Register/Login";
import Register from "./Login/Register/Register";

function App() {
  const location = useLocation();

  // Hide Navbar for login/register pages
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <CartProvider>
      <ScrollToTop />

      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Protected Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Products Pages (Protected) */}
        <Route path="/bottles" element={<ProtectedRoute><Bottle /></ProtectedRoute>} />
        <Route path="/tiffins" element={<ProtectedRoute><Tiffin /></ProtectedRoute>} />
        <Route path="/drinkware" element={<ProtectedRoute><Drinkware /></ProtectedRoute>} />
        <Route path="/bowls" element={<ProtectedRoute><Bowls /></ProtectedRoute>} />
        <Route path="/storage" element={<ProtectedRoute><Storage /></ProtectedRoute>} />
        <Route path="/lunch-kit" element={<ProtectedRoute><LunchKit /></ProtectedRoute>} />
        <Route path="/festive" element={<ProtectedRoute><Festive /></ProtectedRoute>} />

        {/* Buy & Cart Pages */}
        <Route path="/buy/:id" element={<Buy />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />

        {/* Public Pages */}
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;
