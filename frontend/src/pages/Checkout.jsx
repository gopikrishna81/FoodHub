import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import "../styles/Checkout.css";
import { toast } from "react-toastify";


function Checkout() {


  const navigate = useNavigate();


  const [loading,setLoading] = useState(false);



  const [customer,setCustomer] = useState({

    name:"",
    phone:"",
    address:""

  });



  const [payment,setPayment] = useState(
    "Cash on Delivery"
  );



  const {
    cartItems,
    clearCart
  } = useContext(CartContext);





  const subtotal = cartItems.reduce(

    (total,item)=>
      total + item.price * item.quantity,

    0

  );



  const deliveryCharge = subtotal > 0 ? 40 : 0;

  const gst = Math.round(subtotal * 0.05);


  const total =
    subtotal +
    deliveryCharge +
    gst;







  const handlePlaceOrder = async()=>{


    if(cartItems.length===0){

      toast.error(
        "Your cart is empty"
      );

      return;

    }





    const token =
      localStorage.getItem("token");



    if(!token){

      toast.error(
        "Please login first"
      );

      navigate("/login");

      return;

    }




    if(
      !customer.name ||
      !customer.phone ||
      !customer.address
    ){

      toast.error(
        "Please fill delivery details"
      );

      return;

    }





    setLoading(true);



    try{


      await api.post(

        "orders/place/",

        {


          customer_name:
            customer.name,


          phone:
            customer.phone,


          address:
            customer.address,


          payment_method:
            payment,


          total_price:
            total,


          items:
            cartItems


        },


        {

          headers:{

            Authorization:
            `Token ${token}`

          }

        }

      );





      toast.success(
        "Order placed successfully 🎉"
      );



      clearCart();



      navigate(
        "/order-success"
      );



    }


    catch(error){


      console.log(error);


      toast.error(
        "Order failed"
      );


    }


    finally{


      setLoading(false);


    }



  }








  return(


<div className="checkout-container">



<h1>
🛒 Checkout
</h1>




<div className="delivery-box">


<h2>
Delivery Details
</h2>



<input

placeholder="Name"

value={customer.name}

onChange={
(e)=>
setCustomer({
...customer,
name:e.target.value
})
}

/>




<input

placeholder="Phone Number"

value={customer.phone}

onChange={
(e)=>
setCustomer({
...customer,
phone:e.target.value
})
}

/>





<textarea

placeholder="Delivery Address"

value={customer.address}

onChange={
(e)=>
setCustomer({
...customer,
address:e.target.value
})
}

/>



</div>







<div className="payment-box">


<h2>
Payment Method
</h2>



<label>

<input

type="radio"

checked={
payment==="Cash on Delivery"
}

onChange={()=>
setPayment(
"Cash on Delivery"
)
}

/>

Cash on Delivery

</label>




<label>

<input

type="radio"

checked={
payment==="UPI"
}

onChange={()=>
setPayment(
"UPI"
)
}

/>

UPI

</label>



</div>








<h2>
Order Summary
</h2>




{

cartItems.map(item=>(


<div

className="checkout-item"

key={item.id}

>


<div>

<h3>
{item.name}
</h3>


<p>
₹{item.price} × {item.quantity}
</p>


</div>



<h3>

₹{item.price*item.quantity}

</h3>


</div>


))


}








<div className="bill">


<p>
Subtotal
</p>


<span>
₹{subtotal}
</span>


</div>





<div className="bill">


<p>
Delivery Charge
</p>


<span>
₹{deliveryCharge}
</span>


</div>





<div className="bill">


<p>
GST
</p>


<span>
₹{gst}
</span>


</div>






<hr />





<div className="total">


<h2>
Total
</h2>


<h2>
₹{total}
</h2>


</div>






<button

className="place-order-btn"

onClick={handlePlaceOrder}

disabled={loading}

>


{
loading
?
"Placing Order..."
:
"Place Order 🚀"
}



</button>





</div>


  );


}


export default Checkout;