import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css"; // SCSS faylini import qilish

// Import required modules
import { Autoplay,  Navigation } from "swiper/modules";

function Page3() {
  const [page, setPage] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        setPage(data.page3); // JSON ma'lumotlarni state-ga saqlash
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // faqat bir marta fetch qilinadi

  return (
    <div className="slider-container container">
      <h1 className="relative">Pre-book Your Parking
      </h1>
      <Swiper
        spaceBetween={60} // Slide'lar orasidagi masofa (30px)
        centeredSlides={true}
        slidesPerView={1.4} // Birinchi slaydning yonida ikkinchi slaydning qismi ko'rinishi uchun
        autoplay={{
          delay: 4000, // Slayder o'rtasidagi vaqt (4 soniya)
          disableOnInteraction: false,
        }}
        speed={2000} // O'tish vaqtini sekinlashtirish (1.5 soniya)
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,  Navigation]}
        className="mySwiper"
        breakpoints={{
          768: {
            slidesPerView: 1.2, // 768px va undan kichik ekranlar uchun 1.2 slayd ko'rsatiladi
            spaceBetween: 100, // Mobil qurilmalar uchun oraliqni kamaytirish
          },
          480: {
            slidesPerView: 1.1, // 480px va undan kichik ekranlar uchun 1.1 slayd
            spaceBetween: 10, // Eng kichik ekranlar uchun oraliq
          },
        }}
      >
        {page.map((item, id) => (
          <SwiperSlide key={id}>
            <div className="flexx">
              <div className="cover">
                <img src={item.img} alt="Parking offer" />
                <div className="bgc">
                  <h1>{item.p}</h1>
                  <p>{item.days}</p>
                  <p>{item.days2}</p>
                  <p>{item.days3}</p>
                  <h4>{item.chegirma}</h4>
                  <button>{item.btn}</button>
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
