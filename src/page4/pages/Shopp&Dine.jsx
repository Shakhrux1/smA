import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import './style.css';

function Shopp() {
  const [shopDine, setShopDine] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setShopDine(data.page4))
      .catch((error) => console.error(`API xatolik: ${error}`));
  }, []);

  if (!shopDine || !shopDine.shopClick) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Dine & Shop</title>
        <meta
          name="description"
          content="This is my awesome page description."
        />
      </Helmet>
      <div className="container">
        <div className="dine">
          {shopDine.shopClick.map((item, id) => (
            <div key={id}>
              <img src={item.img} alt={item.title} />
              <h2>{item.title}</h2>
              <Link to={`/ShopandDine/Shop/${item.title}`}> {/* Do'kon detallariga yo'naltirish */}
                <button>
                  {item.btn} <img src={item.icon} alt="" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Shopp;
