import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Signup.css";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  const handleSignup = async (e) => {
    e.preventDefault();


    // Email format validation
    // Username validation
if (username.trim().length < 3) {
  toast.error("Username must contain at least 3 characters");
  return;
}


// Email validation
const emailPattern =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;


if (!emailPattern.test(email)) {
  toast.error("Please enter a valid .com email address");
  return;
}


// Password validation
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


if (!passwordPattern.test(password)) {

  toast.error(
    "Password must have 8 characters, uppercase, lowercase, number and special character"
  );

  return;
}


    setLoading(true);


    try {
      const response = await api.post("accounts/signup/", {
        username,
        email,
        password,
      });


      console.log(response.data);

      toast.success("Signup Successful 🎉");


      setTimeout(() => {
        navigate("/login");
      }, 1000);


    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message || "Signup Failed"
      );


    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="signup-container">

      <h1 className="signup-title">
        Create Account ✨
      </h1>


      <p className="signup-subtitle">
        Join FoodHub and start ordering delicious food.
      </p>


      <form onSubmit={handleSignup}>


        <input
          className="signup-input"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />


        <input
          className="signup-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />


        <input
          className="signup-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />


        <button
          className="signup-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>


      </form>


      <p className="login-text">
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Login
        </Link>
      </p>


    </div>
  );
}

export default Signup;