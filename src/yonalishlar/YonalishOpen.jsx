import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import back from '../icon/icons8-next-page-50.png';
import "./styles.css";
import { useTranslation } from "react-i18next";

function YonalishOpen() {
  const { id } = useParams();
  const [api, setApi] = useState(null);
  const { t, i18n } = useTranslation(); // Initialize translation and i18n

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedShop = data.yonalish.find((item) => item.t.en.toLowerCase() === id.toLowerCase());
        setApi(selectedShop ? selectedShop : null);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!api) {
    return <Loading />;
  }

  const currentLang = i18n.language; // Get the current language using i18n

  return (
    <>
      <Helmet>
        <title>{api.t[currentLang] || api.t.en}</title>
        <meta name="description" content={`Details about ${api.t[currentLang] || api.t.en}.`} />
      </Helmet>
      <Link to="/Direction" id="bs">
        <img src={back} alt="back" /> {t("back")}
      </Link>
      <div className="flex-container container">
        
        <Swiper 
          className="mySwipers"
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
        >
          {api.open.img && (
            <SwiperSlide>
              <img src={api.open.img} alt="Slide 1" />
            </SwiperSlide>
          )}
          {api.open.img2 && (
            <SwiperSlide>
              <img src={api.open.img2} alt="Slide 2" />
            </SwiperSlide>
          )}
          {api.open.img3 && (
            <SwiperSlide>
              <img src={api.open.img3} alt="Slide 3" />
            </SwiperSlide>
          )}
        </Swiper>
        <p className="text-container ">
          {api.open.lorem[currentLang] || api.open.lorem.en}
        </p>
      </div>
    </>
  );
}

export default YonalishOpen;
