import { Link } from "react-router-dom";
import "../styles/RestaurantCard.css";

function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <img src={restaurant.image} alt={restaurant.name} />

      <div className="restaurant-content">
        <div className="restaurant-header">
          <h2>{restaurant.name}</h2>
          <span className="rating">⭐ {restaurant.rating}</span>
        </div>

        <p><strong>👤 Owner:</strong> {restaurant.owner_name}</p>
        <p><strong>📍 City:</strong> {restaurant.city}</p>

        <div className="card-buttons">
          <Link to={`/restaurant/${restaurant.id}`}>
            <button className="view-btn">View Menu</button>
          </Link>

          <button className="order-btn">Order Now</button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;