import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './style.css'
import { Helmet } from "react-helmet";
import Loading from "../../loading/Loading";

function ShopDetail() {
  const { id } = useParams(); // URL'dan ID ni olish
  const [shopDetails, setShopDetails] = useState(null);

  useEffect(() => {
    // Do'kon ma'lumotlarini olish
    fetch("https://cuqrwqnnguneymulgghg.supabase.co/storage/v1/object/public/zgfor/shohruh.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedShop = data.page4.shopClick.find((item) => item.title === id); // IDga mos do'konni topish
        setShopDetails(selectedShop ? selectedShop.open : null); // Olingan do'kon ma'lumotlarini saqlash
      })
      .catch((error) => console.error(`API xatolik: ${error}`));
  }, [id]);

  if (!shopDetails) {
    return <Loading/>;
  }

  return (
   <>
       <Helmet>
        <title>{shopDetails.title}</title>
        <meta
          name="description"
          content="This is my awesome page description."
        />
      </Helmet>
    <div className="openShop">
      <h2>{shopDetails.title}</h2>
      <p>{shopDetails.p}</p>
      <p>{shopDetails.soatN} <br /> {shopDetails.soat}</p>
    </div>
    </>
  );
}

export default ShopDetail;
