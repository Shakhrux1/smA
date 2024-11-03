import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"; // Corrected import
import "./style.css";
import as from '../icon/icons8-next-page-50.png'
import { useTranslation } from "react-i18next";
function Hotel() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const {t} = useTranslation()

  return (
    <>
      <Helmet>
        <title> {t("ho")} </title>
        <meta name="description" content="This is my awesome page description." />
      </Helmet>
      
      <div className="container">
      <div className="aq">
      <Link to="/Facilities" className="qq">
        <button className="qq"> <img src={as} alt="" />{t("back")}</button>
        </Link>
      </div>
        <div className="divs" style={{ marginTop: "20px" }}>
          <h1 className="h1">{t("hh1")}</h1>
          <p className="pa">
           {t("hp")}
          </p>
          <br />
          <p className="pa">
              {t("hpa")}
          </p>
        </div>
        <button className="alm">{t('book')}</button>
        <div className="accordions">
          <div className="accordion-item">
            <div
              className={`accordion-title ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => toggleAccordion(0)}
            >
              {t("ha")}
              <span className="icon">{activeIndex === 0 ? "-" : "+"}</span>
            </div>
            <div
              className={`accordion-content ${activeIndex === 0 ? "open" : ""}`}
            >
              <ul>
                <li>{t("l1")}</li>
                <li>{t("l2")}</li>
                <li>{t("l3")}</li>
                <li>{t("l4")}</li>
                <li>{t("l5")}</li>
                <li>{t("l6")}</li>
                <li>{t("l7")}</li>
                <li>{t("l8")}</li>
                <li>{t("l9")}</li>
                <li>{t("l10")}</li>
              </ul>
            </div>
          </div>

          <div className="accordion-item">
            <div
              className={`accordion-title ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => toggleAccordion(1)}
            >
             {t("gs")}
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
