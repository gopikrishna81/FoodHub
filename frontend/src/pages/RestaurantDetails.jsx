import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../context/CartContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import "../styles/RestaurantDetails.css";


function RestaurantDetails() {

  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { addToCart } = useContext(CartContext);



  useEffect(()=>{


    api.get(`restaurants/${id}/`)
    .then(res=>setRestaurant(res.data))
    .catch(err=>console.log(err));



    api.get(`restaurants/${id}/menu/`)
    .then(res=>setMenuItems(res.data))
    .catch(err=>console.log(err));



    api.get(`restaurants/${id}/reviews/`)
    .then(res=>setReviews(res.data))
    .catch(err=>console.log(err));


  },[id]);





  const handleReview = async()=>{


    const token = localStorage.getItem("token");


    if(!token){

      toast.warning("Please login first");
      return;

    }



    try{


      await api.post(

        `restaurants/${id}/add-review/`,

        {
          rating,
          comment
        },

        {
          headers:{
            Authorization:`Token ${token}`
          }
        }

      );


      toast.success("Review Added ⭐");


      const response = await api.get(
        `restaurants/${id}/reviews/`
      );


      setReviews(response.data);


      setRating(5);
      setComment("");


    }
    catch(error){

      console.log(error);

      toast.error("Failed to add review");

    }


  };





  if(!restaurant){

    return <LoadingSpinner/>;

  }





  return (

<div className="restaurant-details-page">



{/* Restaurant Details */}


<img

src={restaurant.image}

alt={restaurant.name}

className="restaurant-banner"

/>




<div className="restaurant-info">


<h1 className="restaurant-name">

{restaurant.name}

</h1>



<p>⭐ Rating: {restaurant.rating}</p>


<p>👤 Owner: {restaurant.owner_name}</p>


<p>📍 City: {restaurant.city}</p>


<p>📧 Email: {restaurant.email}</p>


<p>📞 Phone: {restaurant.phone}</p>


<p>🏠 Address: {restaurant.address}</p>



</div>





{/* Menu */}



<h2 className="menu-title">

🍽 Our Menu

</h2>




<div className="menu-grid">



{

menuItems.map(item=>(


<div

key={item.id}

className="menu-card"


>


<img

src={item.image}

alt={item.name}

className="menu-image"

/>



<h3>

{item.name}

</h3>



<p>

{item.description}

</p>




<h3>

₹ {item.price}

</h3>





<button

className={
addedItems.includes(item.id)
?
"add-btn added"
:
"add-btn"
}


onClick={()=>{


addToCart(item);


setAddedItems(prev=>[

...prev,

item.id

]);


}}

>


{

addedItems.includes(item.id)

?

"✅ Added"

:

"Add to Cart"

}


</button>



</div>


))


}


</div>







{/* Add Review */}



<div className="restaurant-info">


<h2>

⭐ Customer Reviews

</h2>



<select

value={rating}

onChange={(e)=>setRating(Number(e.target.value))}

>


<option value="5">
⭐⭐⭐⭐⭐
</option>

<option value="4">
⭐⭐⭐⭐
</option>

<option value="3">
⭐⭐⭐
</option>

<option value="2">
⭐⭐
</option>

<option value="1">
⭐
</option>


</select>





<textarea

className="review-textarea"

placeholder="Write your review..."

value={comment}

onChange={(e)=>setComment(e.target.value)}

/>





<button

className="review-btn"

onClick={handleReview}

>

Submit Review

</button>



</div>







{/* Reviews List */}



<h2 className="menu-title">

All Reviews

</h2>




{

reviews.length===0

?

(

<div className="review-card">

<h3>

⭐ No Reviews Yet

</h3>


<p>

Be the first customer to review this restaurant!

</p>


</div>

)


:


reviews.map(review=>(


<div

key={review.id}

className="review-card"

>


<h3>

{review.username}

</h3>


<p>

{"⭐".repeat(review.rating)}

</p>


<p>

{review.comment}

</p>


<small>

{new Date(review.created_at)
.toLocaleString()}

</small>



</div>



))


}




</div>


);


}



export default RestaurantDetails;