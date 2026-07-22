import { useEffect, useState } from "react";
import api from "../services/api";
import RestaurantCard from "../components/RestaurantCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/Restaurants.css";


function Restaurants() {

    const [restaurants, setRestaurants] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [city, setCity] = useState("");
    const [rating, setRating] = useState("");
    const [sort, setSort] = useState("");

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        api.get("restaurants/")
        .then(res => {

            setRestaurants(res.data);
            setLoading(false);

        })
        .catch(err => {

            console.log(err);
            setLoading(false);

        });


    },[]);



    const clearFilters = ()=>{

        setSearch("");
        setCategory("");
        setCity("");
        setRating("");
        setSort("");

    };



    let filteredRestaurants = restaurants.filter((restaurant)=>{


        return (

            restaurant.name
            .toLowerCase()
            .includes(search.toLowerCase())


            &&


            (
                category === "" ||
                restaurant.category === category
            )


            &&


            (
                city === "" ||
                restaurant.city === city
            )


            &&


            (
                rating === "" ||
                restaurant.rating >= Number(rating)
            )


        );


    });



    if(sort==="rating"){

        filteredRestaurants = [...filteredRestaurants]
        .sort((a,b)=>b.rating-a.rating);

    }




    const categories = [
        ...new Set(
            restaurants.map(r=>r.category)
        )
    ];


    const cities = [
        ...new Set(
            restaurants.map(r=>r.city)
        )
    ];



    return (

    <div className="restaurant-page">


        <h1>
            Explore Restaurants 🍴
        </h1>


        <p className="subtitle">
            Discover the best food near you
        </p>



        <input

        className="search-box"

        placeholder="🔍 Search restaurants..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        />




        <div className="filter-box">


        <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        >

            <option value="">
                All Categories
            </option>


            {
                categories.map((cat,index)=>(

                    <option key={index}>
                        {cat}
                    </option>

                ))
            }


        </select>





        <select
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        >

            <option value="">
                All Cities
            </option>


            {
                cities.map((city,index)=>(

                    <option key={index}>
                        {city}
                    </option>

                ))
            }


        </select>






        <select
        value={rating}
        onChange={(e)=>setRating(e.target.value)}
        >

            <option value="">
                Any Rating
            </option>

            <option value="4">
                ⭐ 4+
            </option>

            <option value="5">
                ⭐ 5
            </option>

        </select>







        <select
        value={sort}
        onChange={(e)=>setSort(e.target.value)}
        >

            <option value="">
                Sort By
            </option>

            <option value="rating">
                Highest Rating
            </option>


        </select>





        <button onClick={clearFilters}>
            Clear
        </button>



        </div>







        {
            loading ?

            <LoadingSpinner/>

            :

            filteredRestaurants.length === 0 ?

            (

                <h2 className="no-result">
                    😔 No restaurants found
                </h2>

            )


            :

            (

            <div className="restaurant-grid">


            {
                filteredRestaurants.map((restaurant)=>(


                    <RestaurantCard

                    key={restaurant.id}

                    restaurant={restaurant}

                    />


                ))
            }


            </div>

            )

        }



    </div>

    );

}


export default Restaurants;