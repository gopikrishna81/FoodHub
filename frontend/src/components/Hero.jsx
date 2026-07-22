import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.png";
import "../styles/Hero.css";


function Hero() {

  const navigate = useNavigate();


  return (

    <section className="hero">


      <div className="hero-left">


        <img
          src={hero}
          alt="Food Delivery"
        />


      </div>




      <div className="hero-right">


        <h1>
          Delicious Food Delivered Fresh to Your Doorstep
        </h1>



        <p>

          Discover the best restaurants near you.
          Order your favourite food and enjoy
          fast delivery at your doorstep.

        </p>




      




        <div className="hero-features">


          <div>

            🚀
            <span>
              Fast Delivery
            </span>

          </div>



          <div>

            🍴
            <span>
              Best Restaurants
            </span>

          </div>




          <div>

            🔒
            <span>
              Secure Payment
            </span>

          </div>


        </div>



      </div>


    </section>

  );

}


export default Hero;