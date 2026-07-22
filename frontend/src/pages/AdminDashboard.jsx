import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";


function AdminDashboard() {


  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  

  const [form, setForm] = useState({

    id:null,
    name:"",
    owner_name:"",
    email:"",
    phone:"",
    address:"",
    city:"",
    category:"Biryani",
    image:"",
    rating:0,
    

  });
  const inputStyle = {

  display: "block",
  width: "400px",
  padding: "12px",
  margin: "12px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",

};


const buttonStyle = {

  width: "220px",
  padding: "14px 20px",
  background: "#ff5722",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
  marginTop: "20px",
  transition: "0.3s",

};

const [menuForm, setMenuForm] = useState({
  id: null,
  restaurant: "",
  name: "",
  price: "",
  image: "",
  description: "",
});


  useEffect(() => {

    fetchRestaurants();
    fetchDashboardStats();
  

}, []);
const fetchMenuItems = async (restaurantId) => {

  if (!restaurantId) {
    setMenuItems([]);
    return;
  }

  try {

    const response = await api.get(
      `restaurants/${restaurantId}/menu/`
    );

    setMenuItems(response.data);

  } catch (error) {

    console.log(error);

  }

};



  const fetchRestaurants = async()=>{

    try{

      const response = await api.get(
        "restaurants/"
      );

      setRestaurants(response.data);

    }
    catch(error){

      console.log(error);

    }

  };


  const fetchDashboardStats = async () => {

  try {

    setTotalUsers(0); // Replace with API later
    setTotalOrders(0); // Replace with API later

  } catch (error) {

    console.log(error);

  }

};




  const handleChange=(e)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };
const handleMenuChange = (e) => {

  const { name, value } = e.target;

  setMenuForm({
    ...menuForm,
    [name]: value,
  });

  if (name === "restaurant") {
    fetchMenuItems(value);
  }

};






  const addRestaurant=async()=>{


    const token =
    localStorage.getItem("token");


    try{


      await api.post(

        "restaurants/admin/restaurants/add/",

        form,

        {
          headers:{
            Authorization:
            `Token ${token}`
          }
        }

      );


      toast.success(
        "Restaurant Added Successfully"
      );


      fetchRestaurants();



    }
    catch(error){

      console.log(error);

      toast.error(
        "Failed to add restaurant"
      );

    }


  };



  const addMenuItem = async () => {

  const token = localStorage.getItem("token");

  try {

    await api.post(

      "restaurants/admin/menu/add/",

      menuForm,

      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }

    );

    toast.success("Menu Item Added");

    fetchMenuItems();

    setMenuForm({
      id: null,
      restaurant: "",
      name: "",
      price: "",
      image: "",
      description: "",
    });

  }

  catch (error) {

    console.log("Error:", error);

    console.log("Status:", error.response?.status);

    console.log("Data:", error.response?.data);

    toast.error("Failed to Add Menu");

  }
};

const deleteMenuItem = async (id) => {

  const token = localStorage.getItem("token");

  try {

    await api.delete(
      `restaurants/admin/menu/${id}/delete/`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );

    toast.success("Menu Item Deleted");

    fetchMenuItems();

  }
  catch (error) {

    console.log(error);

    toast.error("Delete Failed");

  }

};


const editMenuItem = async () => {

  const token = localStorage.getItem("token");

  if (!menuForm.id) {
    toast.error("Select menu item first");
    return;
  }

  try {

    await api.put(

      `restaurants/admin/menu/${menuForm.id}/update/`,

      menuForm,

      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }

    );

    toast.success("Menu Item Updated");

    fetchMenuItems();

    setMenuForm({
      id: null,
      restaurant: "",
      name: "",
      price: "",
      image: "",
      description: "",
    });

  }

  catch (error) {

    console.log(error.response?.data);

    toast.error("Update Failed");

  }

};

  const deleteRestaurant = async (id) => {

  const token = localStorage.getItem("token");

  try {

    await api.delete(
      `restaurants/admin/restaurants/${id}/delete/`,
      {
        headers:{
          Authorization:`Token ${token}`
        }
      }
    );

    toast.success("Restaurant Deleted");

    fetchRestaurants();

  }
  catch(error){

    console.log(error);
    toast.error("Delete Failed");

  }

};
 const loadRestaurantForEdit = (restaurant) => {

  setForm({

    id: restaurant.id,
    name: restaurant.name,
    owner_name: restaurant.owner_name,
    email: restaurant.email,
    phone: restaurant.phone,
    address: restaurant.address,
    city: restaurant.city,
    category: restaurant.category,
    image: restaurant.image,
    rating: restaurant.rating,

  });

};

const loadMenuForEdit = (item) => {

  setMenuForm({
    id: item.id,
    restaurant: item.restaurant,
    name: item.name,
    price: item.price,
    image: item.image,
    description: item.description,
  });

};

const editRestaurant = async () => {

  const token = localStorage.getItem("token");


  if(!form.id){
    toast.error("Select restaurant first");
    return;
  }


  try {

    await api.put(

      `restaurants/admin/restaurants/${form.id}/update/`,

      form,

      {
        headers:{
          Authorization:`Token ${token}`
        }
      }

    );


    toast.success("Restaurant Updated");


    fetchRestaurants();
    setForm({
        id: null,
        name: "",
        owner_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        category: "Biryani",
        image: "",
        rating: 0,
    });


  }
  catch(error){

    console.log(error.response.data);

    toast.error("Update Failed");

  }

};







return (

<div style={{padding:"40px"}}>


<h1>
👨‍💼 Admin Dashboard
</h1>

<div
style={{
display:"flex",
gap:"20px",
flexWrap:"wrap",
marginBottom:"40px"
}}
>

<div
style={{
background:"#ff5722",
color:"white",
padding:"25px",
borderRadius:"12px",
width:"220px",
boxShadow:"0 4px 12px rgba(0,0,0,0.15)"
}}
>
<h2>{restaurants.length}</h2>
<p>Total Restaurants</p>
</div>

<div
style={{
background:"#1976d2",
color:"white",
padding:"25px",
borderRadius:"12px",
width:"220px",
boxShadow:"0 4px 12px rgba(0,0,0,0.15)"
}}
>
<h2>{menuItems.length}</h2>
<p>Total Menu Items</p>
</div>

<div
style={{
background:"#43a047",
color:"white",
padding:"25px",
borderRadius:"12px",
width:"220px",
boxShadow:"0 4px 12px rgba(0,0,0,0.15)"
}}
>
<h2>{totalOrders}</h2>
<p>Total Orders</p>
</div>

<div
style={{
background:"#8e24aa",
color:"white",
padding:"25px",
borderRadius:"12px",
width:"220px",
boxShadow:"0 4px 12px rgba(0,0,0,0.15)"
}}
>
<h2>{totalUsers}</h2>
<p>Total Users</p>
</div>

</div>

<input
style={inputStyle}
name="name"
value={form.name}
placeholder="Restaurant Name"
onChange={handleChange}
/>


<input
style={inputStyle}
name="owner_name"
value={form.owner_name}
placeholder="Owner Name"
onChange={handleChange}
/>


<input
style={inputStyle}
name="email"
value={form.email}
placeholder="Email"
onChange={handleChange}
/>


<input
style={inputStyle}
name="phone"
value={form.phone}
placeholder="Phone"
onChange={handleChange}
/>


<input
style={inputStyle}
name="address"
value={form.address}
placeholder="Address"
onChange={handleChange}
/>


<input
style={inputStyle}
name="city"
value={form.city}
placeholder="City"
onChange={handleChange}
/>



<input
style={inputStyle}
name="image"
value={form.image}
placeholder="Image URL"
onChange={handleChange}
/>



<select
style={inputStyle}
name="category"
value={form.category}
onChange={handleChange}
>


<option>Biryani</option>

<option>Pizza</option>

<option>Burger</option>

<option>Chinese</option>

<option>Dessert</option>

<option>Healthy</option>

<option>South Indian</option>


</select>



<button
style={buttonStyle}
onClick={addRestaurant}
>
➕ Add Restaurant
</button>

<button
style={{
  ...buttonStyle,
  background:"#1976d2",
  marginLeft:"20px"
}}
onClick={editRestaurant}
>
✏️ Update Restaurant
</button>



<h2
style={{
  marginTop:"40px"
}}
>
🍴 Restaurants
</h2>


<h2 style={{ marginTop: "50px" }}>
🍽️ Menu Management
</h2>

<select
style={inputStyle}
name="restaurant"
value={menuForm.restaurant}
onChange={handleMenuChange}
>
<option value="">Select Restaurant</option>

{restaurants.map((restaurant) => (
  <option
    key={restaurant.id}
    value={restaurant.id}
  >
    {restaurant.name}
  </option>
))}

</select>

<input
style={inputStyle}
name="name"
placeholder="Menu Item Name"
value={menuForm.name}
onChange={handleMenuChange}
/>

<input
style={inputStyle}
name="price"
placeholder="Price"
value={menuForm.price}
onChange={handleMenuChange}
/>

<input
style={inputStyle}
name="image"
placeholder="Image URL"
value={menuForm.image}
onChange={handleMenuChange}
/>

<textarea
style={{
  ...inputStyle,
  height: "100px"
}}
name="description"
placeholder="Description"
value={menuForm.description}
onChange={handleMenuChange}
/>

<button
style={buttonStyle}
onClick={addMenuItem}
>
➕ Add Menu Item
</button>

<button
style={{
  ...buttonStyle,
  background:"#1976d2",
  marginLeft:"20px"
}}
onClick={editMenuItem}
>
🔄 Update Menu
</button>


<h2 style={{ marginTop: "40px" }}>
🍽 Menu Items
</h2>

{
menuItems.map((item) => (

<div
key={item.id}
style={{
border:"1px solid #ddd",
padding:"20px",
margin:"20px 0",
borderRadius:"12px",
boxShadow:"0 3px 10px rgba(0,0,0,0.1)"
}}
>

<img
src={item.image}
alt={item.name}
style={{
width:"120px",
height:"100px",
objectFit:"cover",
borderRadius:"8px"
}}
/>

<h3>{item.name}</h3>

<p>₹ {item.price}</p>

<p>{item.description}</p>


<div style={{ marginTop: "15px" }}>



<button
style={{
background:"#1976d2",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"8px",
marginRight:"10px",
cursor:"pointer"
}}
onClick={() => loadMenuForEdit(item)}
>
✏️ Edit
</button>

<button
style={{
background:"#e53935",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
onClick={() => deleteMenuItem(item.id)}
>
🗑️ Delete
</button>

</div>

</div>

))
}

{
restaurants.map((restaurant) => (

<div
key={restaurant.id}
style={{
border:"1px solid #ddd",
padding:"20px",
margin:"20px 0",
borderRadius:"12px",
boxShadow:"0 3px 10px rgba(0,0,0,0.1)"
}}
>

<h3>
{restaurant.name}
</h3>

<p>
{restaurant.category}
</p>

<p>
{restaurant.city}
</p>

<button
style={{
background:"#1976d2",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"8px",
marginRight:"15px",
cursor:"pointer"
}}
onClick={() => {
  console.log("Edit clicked", restaurant);
  loadRestaurantForEdit(restaurant);
}}
>
✏️ Edit
</button>


<button
style={{
background:"#e53935",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
onClick={()=>deleteRestaurant(restaurant.id)}
>
🗑️ Delete
</button>


</div>

))
}



</div>

);



}
export default AdminDashboard;