import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
 // Make sure you have the loader component
import './style.css';
import Loading from "../../loading/Loading";

function Wifi() {
  const [wifi, setWifi] = useState(null); // Set initial state to null to handle loading
  const [isLoading, setIsLoading] = useState(true); // State for managing loading

  useEffect(() => {
    fetch('https://cuqrwqnnguneymulgghg.supabase.co/storage/v1/object/public/zgfor/shohruh.json')
      .then((response) => response.json())
      .then((data) => {
        setWifi(data.page4.wifiClik);
        setIsLoading(false); // Data is loaded, stop showing loader
      })
      .catch((error) => {
        console.error(`APIda xatolik: ${error}`);
        setIsLoading(false); // Stop loading even if there’s an error
      });
  }, []);

  if (isLoading) {
    return <Loading />; // Display the loader while waiting for data
  }

  return (
    <>
      <Helmet>
        <title>Wi-fi</title>
        <meta
          name="description"
          content="This is my awesome page description."
        />
      </Helmet>
      <div className="container">
        <div className="wifi">
          <div>
            <h1>{wifi.h1}</h1>
            <article>
              <p>{wifi.p}</p>
              <p>{wifi.p2}</p>
              <p>{wifi.p3}</p>
              <p>{wifi.p4}</p>
              <p>{wifi.p5}</p>
              <p>{wifi.p6}</p>
              <p>{wifi.p7}</p>
              <p>{wifi.p8}</p>
              <p>{wifi.p9}</p>
            </article>
          </div>
          <div>
            <div className="re">
              <div className="borders"></div>
              <img src={wifi.img} alt="Wi-Fi Facility" />
            </div>
          </div>
        </div>
      </div>
      <section className="facilities">
        <div className="container">
          <h1>Explore more facilities</h1>
          <div className="facilities-container">
            <div className="facility-card">
              <div className="icon baby-changing"></div>
              <article>
                <h2>Baby changing rooms</h2>
                <p>You’ll find them at all areas at the airport</p>
                <a href="#changing-rooms">Go to baby changing rooms <img src={wifi.icon} alt="" /> </a>
              </article>
            </div>
            <div className="facility-card">
              <div className="icon baby-strollers"></div>
              <article>
                <h2>Baby strollers</h2>
                <p>So you don’t have to carry everything yourself</p>
                <a href="#strollers">Find baby strollers <img src={wifi.icon} alt="" /> </a>
              </article>
            </div>
            <div className="facility-card">
              <div className="icon smoking-rooms"></div>
              <article>
                <h2>Smoking rooms</h2>
                <p>We’ve set out a few areas where you can smoke</p>
                <a href="#smoking-rooms">See smoking rooms <img src={wifi.icon} alt="" /> </a>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Wifi;
