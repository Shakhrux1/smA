import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles.css";

function Yonalish({ showAll = false }) {
  const [yol, setYol] = useState([]);
  const [filteredYol, setFilteredYol] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [fill, setFill] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 6);
        const options = { month: "long", day: "numeric" };
        const formattedDate = futureDate.toLocaleDateString("en-US", options);

        const updatedData = data.yonalish.map((item) => ({
          ...item,
          ketish: {
            en: `Departure Date: ${formattedDate}`,
            ru: `Дата вылета: ${formattedDate}`,
            uz: `Ketish sanasi: ${formattedDate}`,
          },
        }));
        setYol(updatedData);
        setFilteredYol(updatedData);
      })
      .catch((error) => console.error(`Api error: ${error}`));
  }, []);
  

  useEffect(() => {
    if (selectedRegion === "") {
      setFilteredYol(yol);
    } else {
      setFilteredYol(yol.filter((item) => item.region === selectedRegion));
    }
  }, [selectedRegion, yol]);

  const handleFilterChange = (region, label) => {
    setSelectedRegion(region);
    setFill(label);
    setIsAccordionOpen(false);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleMoreClick = () => {
    navigate("/Direction");
  };

  return (
    <div className="container">
      <div className="yonalish" style={{ marginTop: "120px" }}>
        <div className="flex">
          <h1>{t("main")}</h1>
          <article>
            <div className="accordion">
              <div className="accordion-header" onClick={toggleAccordion}>
                <h2>{fill || "Select a category"}</h2>
                <span>{isAccordionOpen ? "-" : "+"}</span>
              </div>
              {isAccordionOpen && (
                <div className="accordion-content">
                  <ul>
                    <li onClick={() => handleFilterChange("", "All")}>{t("all")}</li>
                    <li onClick={() => handleFilterChange("osiyo", "Asia")}>{t("asia")}</li>
                    <li onClick={() => handleFilterChange("yevropa", "Europe")}>{t("ev")}</li>
                    <li onClick={() => handleFilterChange("aqsh", "US")}>{t("us")}</li>
                  </ul>
                </div>
              )}
            </div>
            {!showAll && (
              <button className="btn" onClick={handleMoreClick}>
                {t("more")}
              </button>
            )}
          </article>
        </div>
        <div className="grid">
          {(showAll ? filteredYol : filteredYol.slice(0, 7)).map((item, id) => (
            <div key={id} className="box">
              <img src={item.img} alt="" />
              <h2>{item.t[i18n.language] || item.t.en}</h2>
              <h5>{item.ketish[i18n.language] || item.ketish.en}</h5>
              <article>
                <p>
                  {t("from")}: <span>{item.narx[i18n.language] || item.narx.en}</span>
                </p>
                <Link to={`/Direction/${item.t.en}`}>
                  <button className="btn2">{item.btn[i18n.language] || item.btn.en}</button>
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Yonalish;
