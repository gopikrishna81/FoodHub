import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>🍔 FoodHub</h2>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/">Restaurants</Link>
        <Link to="/cart">🛒 Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;