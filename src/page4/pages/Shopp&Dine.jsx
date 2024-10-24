import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet"; // Helmet ni import qilish
import "./style.css";
import Loading from "../../loading/Loading";

function Shopp() {
  const { tab } = useParams(); // URL'dan tab parametrini olish
  const [shopDine, setShopDine] = useState(null);
  const [activeTab, setActiveTab] = useState(tab || "shop");
  const [fill, setFill] = useState("");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Accordion ochiq yoki yopiq ekanligini boshqarish

  useEffect(() => {
    fetch("https://cuqrwqnnguneymulgghg.supabase.co/storage/v1/object/public/zgfor/shohruh.json")
      .then((response) => response.json())
      .then((data) => setShopDine(data.page4))
      .catch((error) => console.error(`API xatolik: ${error}`));
  }, []);

  // Aktiv tabga qarab sarlavha va meta ma'lumotlarini yangilash
  useEffect(() => {
    setActiveTab(tab || "shop"); // URL'dan tab qiymatini o'rnating
  }, [tab]);

  if (!shopDine || !shopDine.shopClick || !shopDine.dineClick) {
    return <Loading/>;
  }

  const filter = shopDine.dineClick.filter((item) =>
    fill ? item.title === fill : true
  );

  // Accordionni ochish/yopish funksiyasi
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  // Filter qiymatini tanlaganda accordion sarlavhasini o'zgartirish va yopish
  const handleFilterChange = (value) => {
    setFill(value);
    setIsAccordionOpen(false); // Accordion yopilsin
  };

  return (
    <>
      <Helmet>
        <title>{activeTab === "shop" ? "Shop" : "Dine"}</title>
        <meta
          name="description"
          content={`Explore our ${activeTab} selections.`}
        />
      </Helmet>
      <div className="container">
        <div className="tabs">
          <Link
            to="/ShopandDine/shop"
            className={activeTab === "shop" ? "activeTab" : ""}
          >
            <img src={shopDine.img3} alt="" />
            <button onClick={() => setActiveTab("shop")}>Shop</button>
          </Link>

          <Link
            to="/ShopandDine/dine"
            className={activeTab === "dine" ? "activeTab" : ""}
          >
            <img src={shopDine.img2} alt="" />
            <button onClick={() => setActiveTab("dine")}>Dine</button>
          </Link>
        </div>

        {activeTab === "shop" && (
          <div className="shop">
            {shopDine.shopClick.map((item, id) => (
              <div key={id}>
                <img src={item.img} alt={item.title} />
                <h2>{item.title}</h2>
                <Link to={`/ShopandDine/shop/${item.title}`}>
                  <button>
                    {item.btn} <img src={item.icon} alt="" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Accordionni ochish/yopish tugmasi */}
        
        {activeTab === "dine" && (
          <>
            <div className="accordion">
          <div className="accordion-header" onClick={toggleAccordion}>
            <h2>{fill || "Select a category"}</h2> {/* Filter Options o'rniga tanlangan qiymat */}
            <span>{isAccordionOpen ? "-" : "+"}</span> {/* Plus/Minus belgisi */}
          </div>

          {/* Accordion faqat ochiq bo'lganda ko'rsatiladi */}
          {isAccordionOpen && (
            <div className="accordion-content">
              <ul>
                <li onClick={() => handleFilterChange("")}>All</li>
                <li onClick={() => handleFilterChange("Coffee Shops")}>
                  Coffee Shops
                </li>
                <li onClick={() => handleFilterChange("Restaurants")}>
                  Restaurants
                </li>
                <li onClick={() => handleFilterChange("Cafeteria")}>
                  Cafeteria
                </li>
              </ul>
            </div>
          )}
        </div>

          <div className="div">
            <h5>Need a power bank?</h5>
            <p>
              Exclusively offered to customers of Butler’s Chocolate Cafe,
              Bottega, Todd English, and the Food Park: simply scan the QR code
              on the power bank charging station, available to use while
              exploring the airport for up to 24 hours.
            </p>
            <div className="dine">
              {filter.map((item, id) => (
                <div key={id}>
                  <img src={item.img} alt={item.title} />
                  <h4>{item.title}</h4>
                  <h2>{item.name}</h2>
                  <Link to={`/ShopandDine/dine/${item.title}`}>
                    <button>
                      {item.btn} <img src={item.icon} alt="" />
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
