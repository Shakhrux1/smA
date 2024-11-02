import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"; // Corrected import
import "./style.css";
import as from '../icon/icons8-next-page-50.png'
function Hotel() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>AU Hotel</title>
        <meta name="description" content="This is my awesome page description." />
      </Helmet>
      
      <div className="container">
      <div className="aq">
      <Link to="/Facilities" className="qq">
        <button className="qq"> <img src={as} alt="" />Back</button>
        </Link>
      </div>
        <div className="divs" style={{ marginTop: "20px" }}>
          <h1 className="h1">AUHotel - Zayed International Airport</h1>
          <p className="pa">
            Situated at the heart of Zayed International Airport, AUHotel caters
            to those guests travelling through the airport in need of both
            comfortable and flexible timings for rest options.
          </p>
          <br />
          <p className="pa">
            Newly built in 2024, AUHotel offers convenient and affordable rooms
            ensuring you arrive relaxed and refreshed at your next destination.
          </p>
        </div>
        <button className="alm">Book</button>
        <div className="accordions">
          <div className="accordion-item">
            <div
              className={`accordion-title ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => toggleAccordion(0)}
            >
              Hotel Amenities
              <span className="icon">{activeIndex === 0 ? "-" : "+"}</span>
            </div>
            <div
              className={`accordion-content ${activeIndex === 0 ? "open" : ""}`}
            >
              <ul>
                <li>Free WIFI</li>
                <li>Family rooms</li>
                <li>Non-smoking rooms</li>
                <li>Restaurant</li>
                <li>In Room Dining</li>
                <li>24-hour front desk</li>
                <li>Elevator</li>
                <li>TV in every room</li>
                <li>Tea & coffee Tray</li>
                <li>Hairdryer</li>
              </ul>
            </div>
          </div>

          <div className="accordion-item">
            <div
              className={`accordion-title ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => toggleAccordion(1)}
            >
              Image Gallery
              <span className="icon">{activeIndex === 1 ? "-" : "+"}</span>
            </div>
            <div
              className={`accordion-content ${activeIndex === 1 ? "open" : ""}`}
            >
             <img src="https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdGVsfGVufDB8fDB8fHww" alt="Image Gallery" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0JxgI2qCHTsxA7QPfdfjYhu9rf6CT_-1mAA&s" alt="" />
              <img src="https://www.ahstatic.com/photos/5451_ho_00_p_1024x768.jpg" alt="" />
              <img src="https://media.maldronhotels.com/image/upload/f_auto,c_auto,w_3840,q_auto/v1712218212/maldron-hotel-liverpool/Bar_at_Maldron_Hotel_Liverpool_zpnofz.jpg" alt="" />
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hotel;
