import { Link } from "react-router-dom";
import "../styles/Footer.css";


function Footer() {


  return (

    <footer className="footer">


      <div className="footer-container">


        <div className="footer-section">


          <h2>
            🍔 FoodHub
          </h2>


          <p>
            Delicious food delivered
            to your doorstep.
          </p>


        </div>




        <div className="footer-section">


          <h3>
            Quick Links
          </h3>


          <Link to="/">
            Home
          </Link>


          <Link to="/cart">
            Cart
          </Link>


          <Link to="/orders">
            My Orders
          </Link>


          <Link to="/profile">
            Profile
          </Link>


        </div>





        <div className="footer-section">


          <h3>
            Contact
          </h3>


          <p>
            📧 support@foodhub.com
          </p>


          <p>
            📞 +91 98765 43210
          </p>


          <p>
            📍 Hyderabad, India
          </p>


        </div>





        <div className="footer-section">


          <h3>
            Follow Us
          </h3>


          <p>
            Instagram 📷
          </p>


          <p>
            Facebook 👍
          </p>


          <p>
            Twitter 🐦
          </p>


        </div>



      </div>



      <div className="footer-bottom">


        © 2026 FoodHub. All Rights Reserved.


      </div>


    </footer>

  );


}


export default Footer;