import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './style.css';
import { Helmet } from "react-helmet";
import Loading from "../../loading/Loading";
import { useTranslation } from "react-i18next"; // i18next import

function DineOpne() {
  const { id } = useParams();
  const { i18n } = useTranslation(); // i18n ob'ektini chaqirish
  const [shopDetails, setShopDetails] = useState(null);

  useEffect(() => {
    // Do'kon ma'lumotlarini olish
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedShop = data.page4.dineClick.find((item) => item.title.en === id); // IDga mos do'konni topish
        setShopDetails(selectedShop ? selectedShop.open : null); // Olingan do'kon ma'lumotlarini saqlash
      })
      .catch((error) => console.error(`API xatolik: ${error}`));
  }, [id]);

  if (!shopDetails) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>{shopDetails.title[i18n.language] || shopDetails.title.en}</title> {/* Do'kon nomi titlega kiritildi */}
        <meta name="description" content="This is my awesome page description." />
      </Helmet>
      <div className="container">
        <Link to='/ShopandDine/dine'>
          <button id="bsss">
            <img src="https://cdn1.iconfinder.com/data/icons/essential-28/24/arrow-ios-back-outline-512.png" alt="" /> Back
          </button>
        </Link>
        
        <div className="openShop">
          <div>
            <h2>{shopDetails.title[i18n.language] || shopDetails.title.en}</h2>
            <p>{shopDetails.p[i18n.language] || shopDetails.p.en}</p>
          </div>
          <div>
            <p style={{backgroundColor:" rgb(0, 170, 255, 0.864)", padding:"5px 15px", width:"180px",color:"#FFF", marginTop:"10px"}}>
              {shopDetails.soatN[i18n.language] || shopDetails.soatN.en} <br /> {shopDetails.soat}
            </p>
            <p>{shopDetails.locat} <br /> {shopDetails.locatName}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DineOpne;
