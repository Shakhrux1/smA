import next3 from "../icon/icons8-next-page-50.png";
import { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Page4() {
  const [api, setApi] = useState([]);
  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setApi(data.page4))
      .catch((error) => console.error(` aipdan xatolik ${error}`));
  }, []);
  return (
    <>
      <div className="container">
        <div className="page4">
          <p className="p">{api.xizmatlar}</p>
          <h1>{api.title}</h1>
          <div className="grid">
            <div id="box1">
              <img  className="img"  src={api.img} width={"50px"} alt="" />
              <h2>{api.wifi}</h2>
              <p>{api.wifiP}</p>
              <button
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <Link to='/Internet'>{api.wifiLink}</Link> <img width={"20px"} src={next3} alt="" />
              </button>
            </div>
            <div id="box2">
              <img  className="img" src={api.img2} width={"50px"} alt="" />
              <h2>{api.dine}</h2>
              <p>{api.dineP}</p>
              <button
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <Link to='/ShopandDine/Dine'>{api.dineLink}</Link> <img width={"20px"} src={next3} alt="" />
              </button>
            </div>
            <div id="box3">
              <img className="img"  src={api.img3} width={"50px"} alt="" />
              <h2>{api.shop}</h2>
              <p>{api.shopP}</p>
              <button
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <Link to='/ShopandDine/Shop'>{api.shopLink}</Link> <img width={"20px"} src={next3} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page4;
