import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./style.css";
import Loading from "../../loading/Loading";
import { useTranslation } from "react-i18next";

function Shopp() {
  const { tab } = useParams();
  const [shopDine, setShopDine] = useState(null);
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState(tab || "shop");
  const [fill, setFill] = useState("");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setShopDine(data.page4))
      .catch((error) => console.error(`API xatolik: ${error}`));
  }, []);

  useEffect(() => {
    setActiveTab(tab || "shop");
  }, [tab]);

  if (!shopDine || !shopDine.shopClick || !shopDine.dineClick) {
    return <Loading />;
  }

  const filter = shopDine.dineClick.filter((item) => {
    if (!fill) return true; // Show all if no filter is applied
    const itemTitle = item.open.title.en?.toLowerCase();
    return itemTitle === fill.toLowerCase(); // Case-insensitive match
  });

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleFilterChange = (value) => {
    console.log("Filtering by:", value); // Debugging line
    setFill(value);
    setIsAccordionOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{activeTab === "shop" ? t("sho") : t("din")}</title>
        <meta
          name="description"
          content={`Explore our ${activeTab === "shop" ? t("sho") : t("din")} selections.`}
        />
      </Helmet>
      <div className="container">
        <div className="tabs">
          <Link
            to="/ShopandDine/shop"
            className={activeTab === "shop" ? "activeTab" : ""}
          >
            <img src={shopDine.img3} alt="" />
            <button onClick={() => setActiveTab("shop")}>{t("sho")}</button>
          </Link>

          <Link
            to="/ShopandDine/dine"
            className={activeTab === "dine" ? "activeTab" : ""}
          >
            <img src={shopDine.img2} alt="" />
            <button onClick={() => setActiveTab("dine")}>{t("din")}</button>
          </Link>
        </div>

        {activeTab === "shop" && (
          <div className="shop">
            {shopDine.shopClick.map((item, id) => (
              <div key={id}>
                <img src={item.img} alt={item.title[i18n.language]} />
                <h2>{item.title[i18n.language] || item.title.en}</h2>
                <Link to={`/ShopandDine/shop/${item.title[i18n.language] || item.title.en }`}>
                  <button>
                    {item.btn[i18n.language] || item.btn.en} <img src={item.icon} alt="" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {activeTab === "dine" && (
          <>
            <div className="accordion">
              <div className="accordion-header" onClick={toggleAccordion}>
                <h2>{fill || t("Select a category")}</h2>
                <span>{isAccordionOpen ? "-" : "+"}</span>
              </div>

              {isAccordionOpen && (
                <div className="accordion-content">
                  <ul>
                    <li onClick={() => handleFilterChange("")}>{t("all")}</li>
                    <li onClick={() => handleFilterChange("Coffee Shops")}>
                      {t("cofe")}
                    </li>
                    <li onClick={() => handleFilterChange("Restaurants")}>
                      {t("res")}
                    </li>
                    <li onClick={() => handleFilterChange("Cafeteria")}>
                      {t("caf")}
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="div">
              <h5>{t("ned")}</h5>
              <p>{t("nedP")}</p>
              <div className="dine">
                {filter.map((item, id) => (
                  <div key={id}>
                    <img src={item.img} alt={item.open.title[i18n.language]} />
                    <h4>{item.open.title[i18n.language] || item.open.title.en}</h4>
                    <h2>{item.name[i18n.language] || item.name.en}</h2>
                    <Link to={`/ShopandDine/dine/${item.open.title.en}`}>
                      <button>
                        {item.btn[i18n.language] || item.btn.en} <img src={item.icon} alt="" />
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Shopp;
