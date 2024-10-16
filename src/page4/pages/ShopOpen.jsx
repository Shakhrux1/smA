import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './style.css'
function ShopDetail() {
  const { id } = useParams(); // URL'dan ID ni olish
  const [shopDetails, setShopDetails] = useState(null);

  useEffect(() => {
    // Do'kon ma'lumotlarini olish
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedShop = data.page4.shopClick.find((item) => item.title === id); // IDga mos do'konni topish
        setShopDetails(selectedShop ? selectedShop.open : null); // Olingan do'kon ma'lumotlarini saqlash
      })
      .catch((error) => console.error(`API xatolik: ${error}`));
  }, [id]);

  if (!shopDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="openShop">
      <h2>{shopDetails.title}</h2>
      <p>{shopDetails.p}</p>
      <p>{shopDetails.soatN}: {shopDetails.soat}</p>
    </div>
  );
}

export default ShopDetail;
