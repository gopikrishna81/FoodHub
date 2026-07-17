import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Fetch restaurant details
    api
      .get(`restaurants/${id}/`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant:", error);
      });

    // Fetch menu items
    api
      .get(`restaurants/${id}/menu/`)
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, [id]);

  if (!restaurant) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      {/* Restaurant Details */}

      <img
        src={restaurant.image}
        alt={restaurant.name}
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      <h1>{restaurant.name}</h1>

      <p>
        <strong>⭐ Rating:</strong> {restaurant.rating}
      </p>

      <p>
        <strong>👤 Owner:</strong> {restaurant.owner_name}
      </p>

      <p>
        <strong>📍 City:</strong> {restaurant.city}
      </p>

      <p>
        <strong>📧 Email:</strong> {restaurant.email}
      </p>

      <p>
        <strong>📞 Phone:</strong> {restaurant.phone}
      </p>

      <p>
        <strong>🏠 Address:</strong> {restaurant.address}
      </p>

      <hr style={{ margin: "40px 0" }} />

      {/* Menu */}

      <h2 style={{ marginBottom: "25px" }}>🍽 Our Menu</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            style={{
              width: "250px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <h3
                style={{
                  minHeight: "30px",
                  marginBottom: "10px",
                }}
              >
                {item.name}
              </h3>

              <p
                style={{
                  minHeight: "50px",
                  color: "#555",
                  marginBottom: "10px",
                }}
              >
                {item.description}
              </p>

              <h3
                style={{
                  color: "#ff5722",
                  marginBottom: "15px",
                }}
              >
                ₹ {item.price}
              </h3>

              <button
                onClick={() => addToCart(item)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#ff5722",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginTop: "auto",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantDetails;