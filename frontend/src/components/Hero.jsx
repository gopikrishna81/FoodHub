import hero from "../assets/hero.png";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <img src={hero} alt="Food Delivery" />
      </div>

      <div className="hero-right">
        <h1>Delicious Food Delivered</h1>
        <p>Order from your favourite restaurants.</p>
        <button>Order Now</button>
      </div>
    </section>
  );
}

export default Hero;