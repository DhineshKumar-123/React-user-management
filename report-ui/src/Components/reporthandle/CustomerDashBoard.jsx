import React from "react";
import { useNavigate, Link } from "react-router";
// import "./style.css"; 

function CustomerDashboard() 
{
  const navigate = useNavigate();

  const handleBookNow = (hotel) => 
  {
    navigate('/booking', { state: hotel });
  };

  const hotels = [
    {
      name: "The Plaza Hotel",
      price: "₹2500/-",
      location: "Mumbai, Maharashtra",
      img: "images/hotel-1.jpg",
    },
    {
      name: "Ritz",
      price: "₹3000/-",
      location: "Chennai, Tamil Nadu",
      img: "images/hotel-2.jpg",
    },
    {
      name: "The Peninsula",
      price: "₹2800/-",
      location: "Hyderabad, Telangana",
      img: "images/hotel-3.jpg",
    },
    {
      name: "Atlantis The Palm",
      price: "₹3500/-",
      location: "Bangalore, Karnataka",
      img: "images/hotel-4.jpg",
    },
    {
      name: "The Ritz-Carlton",
      price: "₹4000/-",
      location: "Munnar, Kerala",
      img: "images/hotel-5.jpg",
    },
    {
      name: "Marina Bay Sands",
      price: "₹3200/-",
      location: "Shimla, Himachal Pradesh",
      img: "images/hotel-6.jpg",
    },
  ];

  return (
    <div>
  
      <nav>
        <div className="nav__logo">COZY HEAVEN</div>
        <ul className="nav__links">
          <li className="link">
            <Link to="/hotel">Hotels</Link>
          </li>
          <li className="link">
            <Link to="/service">Services</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="link profile-icon">
            <Link to="/profile">
              <i className="ri-user-line"></i> Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Header */}
      <header className="section__container header__container">
        <div className="header__image__container">
          <div className="header__content">
            <h1>Enjoy Your Dream Vacation</h1>
            <p>Book hotels, stay packages at the lowest price.</p>
          </div>
        </div>
      </header>

      {/* Popular Hotels */}
      <section className="section__container popular__container">
        <h2 className="section__header">Popular Hotels</h2>
        <div className="popular__grid">
          {hotels.map((hotel, index) => (
            <div className="popular__card" key={index}>
              <img src={hotel.img} alt="Hotel" />
              <div className="popular__content">
                <div className="popular__card__header">
                  <h4>{hotel.name}</h4>
                  <h4>{hotel.price}</h4>
                </div>
                <p>{hotel.location}</p>
                <button className="book__btn" onClick={() => handleBookNow(hotel)}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clients review */}
      <section className="client">
        <div className="section__container client__container">
          <h2 className="section__header">What Our Clients Say</h2>
          <div className="client__grid">
            {[
              {
                img: "images/client-1.jpg",
                text:
                  "The booking process was seamless, and the confirmation was instant. I highly recommend Cozy Heaven for hassle-free hotel bookings.",
              },
              {
                img: "images/client-2.jpg",
                text:
                  "The website provided detailed information about hotels, including amenities and photos, which helped me make an informed decision.",
              },
              {
                img: "images/client-3.jpg",
                text:
                  "I was able to book a room within minutes, and the hotel exceeded my expectations. I appreciate Cozy Heaven's efficiency and reliability.",
              },
            ].map((client, idx) => (
              <div className="client__card" key={idx}>
                <img src={client.img} alt="Client" />
                <p>{client.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="section__container">
        <div className="reward__container">
          <p>100+ Discount Codes</p>
          <h4>Join rewards and discover amazing discounts on your booking</h4>
          <Link to="/rewards">
            <button className="reward__btn">Join Rewards</button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__col">
            <h3>COZY HEAVEN</h3>
            <p>Your trusted hotel booking platform for a luxurious and comfortable stay.</p>
          </div>
          <div className="footer__col">
            <h4>Quick Links</h4>
            <p>About Us</p>
            <p>Contact</p>
            <p>FAQ</p>
          </div>
          <div className="footer__col">
            <h4>Follow Us</h4>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </div>
        </div>
        <div className="footer__bar">
          Copyright © 2025 Cozy Heaven. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default CustomerDashboard;
