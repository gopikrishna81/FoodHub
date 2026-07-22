import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/RestaurantCard.css";
import { toast } from "react-toastify";


function RestaurantCard({ restaurant, onFavoriteChange }) {

  const [favorite, setFavorite] = useState(false);


  useEffect(() => {

    const checkFavorite = async () => {

      const token = localStorage.getItem("token");

      if (!token) return;


      try {

        const response = await api.get(
          "restaurants/favorites/",
          {
            headers:{
              Authorization:`Token ${token}`
            }
          }
        );


        const exists = response.data.some(
          (item)=> item.restaurant.id === restaurant.id
        );


        setFavorite(exists);


      } catch(error){

        console.log(error);

      }

    };


    checkFavorite();


  },[restaurant.id]);




  const toggleFavorite = async()=>{

    const token = localStorage.getItem("token");


    if(!token){

      toast.warning("Please login first");
      return;

    }


    try{


      if(!favorite){


        await api.post(
          `restaurants/${restaurant.id}/favorite/`,
          {},
          {
            headers:{
              Authorization:`Token ${token}`
            }
          }
        );


        toast.success("Added to Favorites ❤️");


      }

      else{


        await api.delete(
          `restaurants/${restaurant.id}/unfavorite/`,
          {
            headers:{
              Authorization:`Token ${token}`
            }
          }
        );


        toast.info("Removed from Favorites");


      }


      setFavorite(!favorite);
      window.dispatchEvent(
        new Event("favoriteChanged")
      );


      if(onFavoriteChange){
        onFavoriteChange();
      }



    }
    catch(error){

      console.log(error);
      toast.error("Something went wrong");

    }

  };





  return (

    <div className="restaurant-card">


      <div className="image-container">


        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
        />


        <button
          className="favorite-icon"
          onClick={toggleFavorite}
        >

          {favorite ? "❤️" : "🤍"}

        </button>


        {
          restaurant.offer &&
          <span className="offer-badge">

            {restaurant.offer}

          </span>
        }


      </div>




      <div className="restaurant-content">


        <h2>
          {restaurant.name}
        </h2>



        <p className="cuisine">

          🍽️ {restaurant.cuisine}

        </p>




        <div className="info-row">


          <span className="rating">

            ⭐ {restaurant.rating}

          </span>



          <span>

            🕒 {restaurant.delivery_time}

          </span>



        </div>





        <Link to={`/restaurant/${restaurant.id}`}>

          <button className="view-btn">

            View Menu

          </button>


        </Link>


      </div>



    </div>

  );

}


export default RestaurantCard;