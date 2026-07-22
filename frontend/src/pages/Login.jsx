import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("accounts/login/", {
        username,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      if (response.data.token) {
        // Save token
        login(username, response.data.token);

        toast.success("Login Successful 🎉");

        // Redirect to previous page or Home
        const from = location.state?.from?.pathname || "/";
        setTimeout(() => {
        navigate(from, { replace: true });
        }, 1000);
      } else {
        toast.error(response.data.message || "Invalid username or password");
      }
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        toast.error("Login Failed");
      }
      finally {
        setLoading(false);
      }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome Back 👋</h1>

      <p className="login-subtitle">
        Login to your FoodHub account
      </p>

      <form onSubmit={handleLogin}>
        <input
          className="login-input"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="login-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button 
          className="login-button" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="signup-text">
        Don't have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;