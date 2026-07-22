import { useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css";

function OrderSuccess() {

  const navigate = useNavigate();

  return (

    <div className="success-container">

      <div className="success-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p>
          Thank you for ordering with <strong>FoodHub</strong>.
        </p>

        <p>
          Your delicious food is being prepared by our restaurant.
        </p>

        <div className="delivery-box">

          <h3>🚚 Estimated Delivery</h3>

          <h2>30 - 40 Minutes</h2>

        </div>

        <div className="success-buttons">

          <button
            className="orders-btn"
            onClick={() => navigate("/orders")}
          >
             View My Orders
          </button>

          <button
            className="shop-btn"
            onClick={() => navigate("/restaurants")}
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>

  );

}

export default OrderSuccess;