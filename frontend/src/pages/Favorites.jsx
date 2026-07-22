import { useEffect, useState } from "react";
import api from "../services/api";
import RestaurantCard from "../components/RestaurantCard";
import "../styles/Favorites.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";


function Favorites() {


  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {


    fetchFavorites();


  }, []);



const fetchFavorites = async () => {

  const token = localStorage.getItem("token");

  try {

    const response = await api.get(
      "restaurants/favorites/",
      {
        headers:{
          Authorization:`Token ${token}`,
        },
      }
    );

    setFavorites(response.data);

  }

  catch(error){

    console.error(
      "Favorites error:",
      error
    );

  }

  finally {

    setLoading(false);

  }

};
  if (loading) {
    return <LoadingSpinner />;
  }





  return (


    <div className="favorites-container">


      <h1 className="favorites-title">
        ❤️ My Favorites ({favorites.length})
      </h1>




      {

      favorites.length > 0 ? (


        <div className="favorite-grid">


          {
            favorites.map((item)=>(


              <RestaurantCard

                key={item.id}

                restaurant={item.restaurant}
                onFavoriteChange={fetchFavorites}

              />


            ))

          }


        </div>


      )


      :


      (


        <div className="empty-favorites">

          

          <div className="empty-icon">
            
          </div>

        <h2>No Favorite Restaurants Yet</h2>

        <p>
        Start exploring restaurants and save your favourites here.
        </p>

        <Link to="/restaurants">
        <button className="explore-btn">
          🍽️ Explore Restaurants
        </button>
        </Link>

        

        </div>


      )


      }


    </div>


  );


}


export default Favorites;