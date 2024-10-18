import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './style.css';
import { Helmet } from "react-helmet";

function DineOpne() {
  const { id } = useParams();
  const [shopDetails, setShopDetails] = useState(null);

  useEffect(() => {
    // Do'kon ma'lumotlarini olish
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedShop = data.page4.dineClick.find((item) => item.title === id); // IDga mos do'konni topish
        setShopDetails(selectedShop ? selectedShop.open : null); // Olingan do'kon ma'lumotlarini saqlash
      })
      .catch((error) => console.error(`API xatolik: ${error}`));
  }, [id]);

  if (!shopDetails) {
    return <div>Loading...</div>;
  }

  return (
   <>
   <Helmet>
   <title>{shopDetails.name}</title> {/* Do'kon nomi titlega kiritildi */}
        <meta
          name="description"
          content="This is my awesome page description."
        />
   </Helmet>
     <div className="openShop">
        
        <h2>{shopDetails.title}</h2>
        <p>{shopDetails.p}</p>
        <p>{shopDetails.soatN} <br /> {shopDetails.soat}</p>
        <p>{shopDetails.locat} <br /> {shopDetails.locatName }</p>
      </div>
   </>
  );
}

export default DineOpne;
