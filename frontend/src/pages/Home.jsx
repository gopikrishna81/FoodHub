import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="home">


      {/* Hero Section */}

      <section className="hero">


        {/* Left Image */}

        <div className="hero-image">

          <img
            src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
            alt="Food"
          />

        </div>



        {/* Right Content */}

        <div className="hero-content">


          <h1>
            Delicious Food 
            <br />
            Delivered To Your Door
          </h1>


          <div className="food-icon">
            
          </div>



          <p>
            Discover the best restaurants near you.
            Order your favourite food and enjoy
            fast delivery at your doorstep.
          </p>



          <button
            onClick={() => navigate("/restaurants")}
          >
            Explore Restaurants 🍴
          </button>



          <div className="features">


            <div className="feature-card">

              <span>
                🚀
              </span>

              <h3>
                Fast Delivery
              </h3>

            </div>



            <div className="feature-card">

              <span>
                🍽️
              </span>

              <h3>
                Best Restaurants
              </h3>

            </div>



            <div className="feature-card">

              <span>
                🔒
              </span>

              <h3>
                Secure Payment
              </h3>

            </div>


          </div>


        </div>


      </section>


    </div>

  );
}


export default Home;