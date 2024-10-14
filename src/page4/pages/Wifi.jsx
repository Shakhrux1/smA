import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import './style.css'
function Wifi() {
    const [wifi, setWifi] =useState([])
    useEffect(() =>{
        fetch('/db.json')
        .then((response) => response.json())
        .then((data) => setWifi(data.page4.wifiClik)
        )
        .catch((error) => console.erro(`apida xatolik ${error}` )
        )
    },[])
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
        <div className="wifi" >
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
            <img src={wifi.img} alt="" />
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
          <a href="#smoking-rooms">See smoking roomsi <img src={wifi.icon} alt="" /> </a>
         </article>
        </div>
      </div>
      </div>
    </section>
    </>
  );
}

export default Wifi;
