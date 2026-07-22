import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";


function Cart() {

  const navigate = useNavigate();


  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);



  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );



  return (

    <div className="cart-container">


      <h1>
        🛒 My Cart ({cartItems.length})
      </h1>



      {
        cartItems.length === 0 ?


        (

          <div className="empty-cart">

            <h2>
              Your cart is empty 😔
            </h2>


            <p>
              Add delicious food from your favourite restaurants.
            </p>


            <button
              onClick={() => navigate("/restaurants")}
            >
              Explore Restaurants 🍴
            </button>


          </div>

        )


        :


        (

        <>


        <div className="cart-items">


        {
          cartItems.map((item)=>(


          <div 
            className="cart-card"
            key={item.id}
          >



            <img
              src={
                item.image ||
                "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
              }
              alt={item.name}
            />





            <div className="cart-details">


              <h2>
                {item.name}
              </h2>



              <p className="restaurant-name">

                🍴 {item.restaurant_name || "FoodHub Restaurant"}

              </p>




              <p className="item-price">

                Price: ₹{item.price}

              </p>





              <p className="quantity-title">

                Quantity

              </p>




              <div className="quantity-box">


                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  -
                </button>




                <span>
                  {item.quantity}
                </span>




                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>



              </div>






              <h3 className="item-total">

                Total: ₹{Number(item.price) * item.quantity}

              </h3>






              <button

                className="remove-btn"

                onClick={() =>
                  removeFromCart(item.id)
                }

              >

                Remove

              </button>




            </div>



          </div>



          ))

        }



        </div>






        <div className="bill-box">


          <h2>
            Bill Summary
          </h2>




          <div>

            <span>
              Food Total
            </span>

            <span>
              ₹{total}
            </span>


          </div>





          <div>

            <span>
              Delivery Charges
            </span>

            <span>
              ₹40
            </span>


          </div>





          <hr />





          <h2>

            <span>
              Total Amount
            </span>


            <span>
              ₹{total + 40}
            </span>


          </h2>






          <button
            onClick={() => navigate("/checkout")}
          >

            Proceed to Checkout 🚀

          </button>




        </div>




        </>

        )

      }



    </div>

  );

}


export default Cart;