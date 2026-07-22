import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/MyOrders.css";
import LoadingSpinner from "../components/LoadingSpinner";

function MyOrders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    api
      .get("orders/my-orders/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (

    <div className="orders-container">

      <h1 className="orders-title">
        📦 My Orders
      </h1>

      {orders.length === 0 ? (

        <div className="empty-orders">

          <h2>📦 No Orders Yet</h2>

          <p>You haven't placed any orders yet.</p>

          <p>Order your favourite food now!</p>

          <button onClick={() => navigate("/restaurants")}>
            Explore Restaurants 🍴
          </button>

        </div>

      ) : (

        <div className="orders-grid">

          {orders.map((order) => (

            <div
              key={order.id}
              className="order-card"
            >

              <div className="order-header">

                <h2>Order #{order.id}</h2>

                <span
                  className={`status ${order.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {order.status}
                </span>

              </div>

              <p>
                <strong>Customer:</strong> {order.customer_name}
              </p>

              <p>
                <strong>Total:</strong> ₹{order.total_price}
              </p>

              <p>
                <strong>Placed:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>

              <h3>Ordered Items</h3>

              {order.items?.length > 0 ? (

                order.items.map((item) => (

                  <div
                    key={item.id}
                    className="order-item"
                  >

                    <span>
                      {item.item_name} × {item.quantity}
                    </span>

                    <span>
                      ₹{item.price}
                    </span>

                  </div>

                ))

              ) : (

                <p>No items found.</p>

              )}

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default MyOrders;