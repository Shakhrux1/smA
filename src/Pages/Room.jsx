import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import as from '../icon/icons8-next-page-50.png'
import { useTranslation } from "react-i18next";
function Room() {
  const {t} = useTranslation()
    return (
     <>
     <Helmet>
        <title>{t("pp")}</title>
        <meta name="description" content="This is my awesome page description." />
      </Helmet>
      
        <div className="container">
          <div className="aq">
          <Link to="/Facilities" className="qq">
        <button className="qq"> <img src={as} alt="" />{t("back")}</button>
        </Link>
          </div>
        
           <div className="la">
           <h2>
            {t("loc")}
            </h2>
            <h4>
              {t("P")}
              </h4>
            <div className="fs">
                <div  className="sk">            <img src="https://homesynchronize.com/wp-content/uploads/2020/04/Homemydesign.jpg" alt="" />
                </div>
                <div className="sk">            <img src="https://www.pinnacleinteriors.org/wp-content/uploads/2022/08/D3-Prayer-1.jpg" alt="" />
                </div>
                <div className="sk">            <img src="https://www.shutterstock.com/image-photo/prayer-room-door-mosque-moslem-260nw-2376539671.jpg" alt="" />
                </div>
                <div className="sk">            <img src="https://i.pinimg.com/originals/9f/87/8e/9f878e8c0396ffd4f566848e0799b8c6.jpg" alt="" />
                </div>
                <div className="sk">            <img src="https://www.louisvillecardinal.com/media/2023/09/prayer-room.png" alt="" />
                </div>
                <div className="sk">            <img src="https://pw.escg.ac.uk/site/assets/files/215137/multi-faith-prayer-rooms.980x0.jpg?gen=1666018980" alt="" />
                    </div>
            </div>
           </div>
        </div>
     </>   
    )
}

export default Room
