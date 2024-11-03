import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
 // Make sure you have the loader component
import './style.css';
import { useTranslation } from "react-i18next";
import Loading from "../../loading/Loading";

function Wifi() {
  const [wifi, setWifi] = useState(null); // Set initial state to null to handle loading
  const [isLoading, setIsLoading] = useState(true); // State for managing loading
  const {t} = useTranslation()
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
            <h1>{t("h1")}</h1>
            <article>
              <p>{t("p")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
              <p>{t("p4")}</p>
              <p>{t("p5")}</p>
              <p>{t("p6")}</p>
              <p>{t("p7")}</p>
              <p>{t("p8")}</p>
              <p>{t("p9")}</p>
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
          <h1>{t("f")}</h1>
          <div className="facilities-container">
            <div className="facility-card">
              <div className="icon baby-changing"></div>
              <article>
                <h2>{t("baby")}</h2>
                <p>{t("you")}</p>
                <a href="#changing-rooms">{t("link")} <img src={wifi.icon} alt="" /> </a>
              </article>
            </div>
            <div className="facility-card">
              <div className="icon baby-strollers"></div>
              <article>
                <h2>{t("baby2")}</h2>
                <p>{t("you2")}</p>
                <a href="#strollers">{t("link2")}<img src={wifi.icon} alt="" /> </a>
              </article>
            </div>
            <div className="facility-card">
              <div className="icon smoking-rooms"></div>
              <article>
                <h2>{t("baby3")}</h2>
                <p>{t("you3")}</p>
                <a href="#smoking-rooms">{t("link3")}<img src={wifi.icon} alt="" /> </a>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Wifi;
