import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import n from '../icon/icons8-next-page-50.png';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";
import "./style.css";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

function Page3() {
  const [page, setPage] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        setPage(data.page3);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="slider-container container">
      <h1 className="relative">{t("prs")}</h1>
      <Swiper
        spaceBetween={60}
        centeredSlides={true}
        slidesPerView={1.4}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={2000}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
        breakpoints={{
          768: {
            slidesPerView: 1.2,
            spaceBetween: 100,
          },
          480: {
            slidesPerView: 1.1,
            spaceBetween: 10,
          },
        }}
      >
        {page.map((item, id) => (
          <SwiperSlide key={id}>
            <div className="flexx">
              <div className="cover">
                <img src={item.img} alt="Parking offer" />
                <div className="bgc">
                  
                  <h1>{item.p[i18n.language] || item.p.en}</h1>
                  <p>{item.days[i18n.language] || item.days.en}</p>
                  <p>{item.days2[i18n.language] || item.days2.en}</p>
                  <p>{item.days3[i18n.language] || item.days3.en}</p>
                  <h4>{item.chegirma[i18n.language] || item.chegirma.en}</h4>
                  <button>
                    <Link to="/Parking">{item.btn[i18n.language] || item.btn.en}</Link>
                    <img src={n} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Page3;
