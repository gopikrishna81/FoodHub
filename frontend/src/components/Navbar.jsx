import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";
import api from "../services/api";


function Navbar() {


  const navigate = useNavigate();


  const { cartItems } = useContext(CartContext);

  const { user, logout } = useContext(AuthContext);


  const [favoriteCount, setFavoriteCount] = useState(0);



  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );





  const updateFavorites = async () => {


    if (!user) {

      setFavoriteCount(0);

      return;

    }


    const token = localStorage.getItem("token");


    try {


      const response = await api.get(

        "restaurants/favorites/",

        {

          headers: {

            Authorization:
              `Token ${token}`,

          },

        }

      );


      setFavoriteCount(
        response.data.length
      );


    }

    catch(error) {


      console.log(error);


    }


  };






  useEffect(() => {


    updateFavorites();



    window.addEventListener(
      "favoriteChanged",
      updateFavorites
    );



    return () => {


      window.removeEventListener(
        "favoriteChanged",
        updateFavorites
      );


    };


  }, [user]);








  const handleLogout = () => {


    const confirmLogout = window.confirm(

      "Are you sure you want to logout?"

    );



    if(confirmLogout) {

      logout();

      navigate("/login");

    }


  };








  return (


    <nav className="navbar">



      <div className="logo">


        <Link
          to="/"
          className="logo-link"
        >

          🍔 FoodHub

        </Link>


      </div>







      <div className="nav-links">





        <Link to="/">

          Home

        </Link>





        <Link to="/restaurants">

          Restaurants

        </Link>




        {

        user && (

          <>

          <Link to="/cart">


          🛒 Cart


          {

          cartCount > 0 && (

            <span className="cart-count">

              {cartCount}

            </span>

          )

          }


        </Link>









          <Link to="/favorites">


            ❤️ Favorites



            {

            favoriteCount > 0 && (

              <span className="cart-count">

                {favoriteCount}

              </span>

            )

            }


           


          </Link>

          <Link to="/orders">

            📦 My Orders

          </Link>







          <Link to="/profile">

            👤 Profile

          </Link>





          </>

        )

        }









        {

        user ? (



          <>


            <span className="username">

              Hi, {user} 👋

            </span>





            <button

              className="logout-btn"

              onClick={handleLogout}

            >

              Logout

            </button>



          </>



        )

        :



        (



          <>



          <Link to="/login">

            Login

          </Link>





          <Link to="/signup">

            Signup

          </Link>



          </>


        )

        }



      </div>



    </nav>


  );

}



export default Navbar;