// YonalishOpen.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import back from '../icon/icons8-next-page-50.png'
import "./styles.css";

function YonalishOpen() {
  const { id } = useParams();
  const [api, setApi] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedShop = data.yonalish.find((item) => item.t === id);
        setApi(selectedShop ? selectedShop : null);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!api) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>{api.t}</title>
        <meta name="description" content="This is my awesome page description." />
      </Helmet>
      <div className="container">
        <Link to='/Direction'>
        <button id="bs"> <img src={back} alt="" /> Back</button>
        </Link>
        <div className="flex-container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay]}
            className="mySwipers"
          >
            <SwiperSlide  >
              <img src={api.open.img} alt={`${api.t} image 1`} />
            </SwiperSlide>
            <SwiperSlide >
              <img src={api.open.img2} alt={`${api.t} image 2`} />
            </SwiperSlide>
            <SwiperSlide >
              <img src={api.open.img3} alt={`${api.t} image 3`} />
            </SwiperSlide>
          </Swiper>
          <div className="text-container">
            <h3>{api.open.lorem}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default YonalishOpen;
