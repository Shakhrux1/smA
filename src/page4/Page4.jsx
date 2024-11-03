import next3 from "../icon/icons8-next-page-50.png";
import { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Page4() {
  const [api, setApi] = useState([]);
  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setApi(data.page4))
      .catch((error) => console.error(` aipdan xatolik ${error}`));
  }, []);
  const {t} = useTranslation()
  return (
    <>
      <div className="container">
        <div className="page4">
          <p className="p">{t("xizmatlar")}</p>
          <h1>{t("title")}</h1>
          <div className="grid">
            <div id="box1">
              <img  className="img"  src={api.img} width={"50px"} alt="" />
              <h2>{t("wifi")}</h2>
              <p>{t("wifiP")}</p>
              <button
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <Link to='/Internet'>{t("wifiLink")} </Link> <img width={"20px"} src={next3} alt="" />
              </button>
            </div>
            <div id="box2">
              <img  className="img" src={api.img2} width={"50px"} alt="" />
              <h2>{t("dine")}</h2>
              <p>{t("dineP")}</p>
              <button
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <Link to='/ShopandDine/dine'>{t("dineLink")} </Link> <img width={"20px"} src={next3} alt="" />
              </button>
            </div>
            <div id="box3">
              <img className="img"  src={api.img3} width={"50px"} alt="" />
              <h2>{t("shop")}</h2>
              <p>{t("shopP")}</p>
              <button
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <Link to='/ShopandDine/shop'>{t("shopLink")}</Link> <img width={"20px"} src={next3} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page4;
