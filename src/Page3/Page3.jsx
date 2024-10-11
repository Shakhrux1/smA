import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./style.css"; // SCSS faylini import qilish

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

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "200px", // Desktop uchun kengroq padding
    slidesToShow: 1,
    speed: 1000,
    responsive: [
      {
        breakpoint: 768, // Ekran kengligi 768px yoki kichikroq bo'lganda
        settings: {
          centerPadding: "50px", // Mobil qurilmalar uchun kichikroq padding
          slidesToShow: 1, // Har bir sahifada 1 ta slayd ko'rsatiladi
        },
      },
      {
        breakpoint: 480, // Ekran kengligi 480px yoki kichikroq bo'lganda
        settings: {
          centerPadding: "20px", // Eng kichik ekranlar uchun minimal padding
          slidesToShow: 1, // Har bir sahifada 1 ta slayd
        },
      },
    ],
  };

  return (
    <div className="slider-container" style={{ overflow: "hidden", width: "100%", margin: "auto" }}>
      <Slider {...settings}>
        {page.map((item, id) => (
          <div key={id}>
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
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Page3;
