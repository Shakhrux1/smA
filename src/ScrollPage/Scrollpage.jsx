import { useEffect, useState } from "react"; 
import ReactGA from "react-ga";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import moduleName from "../icon/videoplayback.mp4";
import vidio from '../icon/icons8-video-50.png'
import "./style.css";
import { useTranslation } from "react-i18next";
ReactGA.initialize("UA-XXXXXXXXX-X");

const Scrollpage = () => {
  const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  };
  const {t} = useTranslation()
  const [vidiooo, setVidio] = useState([])
    useEffect(() => {
        fetch("https://cuqrwqnnguneymulgghg.supabase.co/storage/v1/object/public/zgfor/shohruh.json")
        .then((response) => response.json())
        .then((data) => setVidio(data.page1))

      logPageView();
      gsap.registerPlugin(ScrollTrigger);

      const t = gsap.fromTo(
        ".flip-element",
        {
          scale: 1,
          x: "0px",
          y: '-128px'
        },
        {
          scale: 0.4,
          x: "300px",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1.5,
            markers: false,
          },
        }
      );

      ScrollTrigger.create({
        start: () => t.scrollTrigger.end,
        end: "center center",
        endTrigger: ".flip-target",
        pin: true,
        pinSpacing: false,
        markers: false,
      });

      const t2 = gsap.fromTo(
        '.scrolBox',
        { 
          y: '500px',
          x: '100px'
        },
        {
          y: "500px",
          x: '100px', 
          transformOrigin: "top top",
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: "+=500%",
          }
        }
      );
      const t3 = gsap.fromTo(
        '.video-overlay-text',
        {
          
          opacity: 0, 
          x: '-1000%', 
        },
        {
          
          opacity: 1, 
          x: '13%', 
          duration: 100, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".flip-element",
            start: 'top center', 
            end: "+=230%", 
            scrub: 1,
            markers: false, 
          }
        }
      );
      const t4 =gsap.fromTo(
        '.logos',
        {
          y:'250%',
          x:"600%"
        },{
          y:"150%",
          scrollTrigger:{
            trigger:".flip-element",
            start:"center center",
            end:"+=200%",
            markers:false,
            scrub:1,
          }

        }
    )
    const t5 = gsap.fromTo(
      '.opacty',
      {
        opacity:0,
      },
      {
        opacity:1,
        scrollTrigger:{
          trigger:'.flip-element',
          start:"center center",
            end:"+=200%",
            markers:false,
            scrub:1,
        }
      }
    )
      

      return () => {
       
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, []);

  return (
    <>
      <div className="hidden">
        <div className="hero gradient-green">
          <div className="opacty">
          <div className="scrolBox">
            <h1>{t("aboutH1")}</h1>
            <p>{t("aboutp")}</p>          
            </div>
          </div>
          <div className="flip-element gradient-blue">
            <video src={vidiooo.vidios} autoPlay muted loop>
            </video>
              <img className="logos" src={vidio} alt="" />
            <h4 className="video-overlay-text">{t("vidio")}</h4>
          </div>
        </div>
      </div>
      <div className="flip-target"></div>
    </>
  );
};

export default Scrollpage;
