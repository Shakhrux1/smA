import { useEffect } from "react"; 
import ReactGA from "react-ga";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import moduleName from "../icon/videoplayback.mp4";
import vidio from '../icon/icons8-video-50.png'
import "./style.css";

ReactGA.initialize("UA-XXXXXXXXX-X");

const Scrollpage = () => {
  const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  };

    useEffect(() => {
      logPageView();
      gsap.registerPlugin(ScrollTrigger);

      const t = gsap.fromTo(
        ".flip-element",
        {
          scale: 1,
          x: "0px",
          y: '-55px'
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
          x: '15%', 
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
            <h1>salom xurmatli mijoz</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis eius
              aliquam explicabo recusandae praesentium error.
            </p>
          </div>
          </div>
          <div className="flip-element gradient-blue">
            <video src={moduleName} autoPlay muted loop>
            </video>
              <img className="logos" src={vidio} alt="" />
            <h1 className="video-overlay-text">Welcome to Shox Airways</h1>
          </div>
        </div>
      </div>
      <div className="flip-target"></div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis eos nam vitae. Quidem doloribus ullam, assumenda autem inventore eligendi maiores nostrum culpa! Nam pariatur obcaecati ad perspiciatis, rerum repellendus praesentium labore reiciendis vel dicta eos consequuntur tempore asperiores fugit accusamus inventore dignissimos! Expedita, non? Vero laudantium veritatis mollitia consequuntur recusandae dolores, natus esse adipisci eum nam odio fugit nesciunt necessitatibus perspiciatis voluptate voluptatem libero repudiandae impedit quis, quos et, maiores ratione. Similique suscipit aut dolorum fuga dolorem deserunt at voluptas nulla, quo officia nesciunt quisquam assumenda rerum repudiandae nisi rem placeat voluptatum repellat esse ut corrupti incidunt aspernatur! Placeat dolorum sapiente, corporis expedita laudantium, officiis eaque fugiat suscipit dolor magnam, quam cum non quaerat unde repellat obcaecati hic adipisci omnis harum. Earum aut facilis, odio minima consectetur totam quo at excepturi sunt delectus quasi vitae placeat voluptas numquam alias nobis ab blanditiis cum eum, architecto tempore? Quo voluptatibus cupiditate neque tempora architecto, ab earum. Accusantium vitae labore tenetur eaque explicabo. Ducimus dolore delectus maxime officiis nobis est? Nihil minus asperiores provident laudantium quis modi ad repellendus nemo accusantium quae tempore atque quod dolorum delectus consequuntur reprehenderit, repudiandae suscipit adipisci reiciendis. Magni architecto animi consequatur consequuntur non. Magnam, omnis? Error, aspernatur qui ipsum ipsa nam sed eligendi corrupti exercitationem rem, itaque suscipit delectus quidem ex reiciendis beatae? Inventore officiis quos aperiam, corporis a dolor veniam odit laudantium voluptatum voluptates modi fugit nesciunt! Quam officiis quos laborum id mollitia totam incidunt, maiores voluptate quidem dolore ex, voluptatum ipsam ullam iste vitae minus repudiandae illo consequuntur voluptatem optio accusantium reprehenderit. Tenetur error molestias sint unde neque numquam. Commodi adipisci, est vel quos quidem excepturi qui tempora sit nisi consequuntur fuga laborum obcaecati maxime earum? Iusto, ad possimus laudantium aspernatur explicabo suscipit sapiente consectetur nisi quos error voluptatum non minima temporibus officiis repellat? Neque aperiam repudiandae necessitatibus nesciunt reprehenderit quae, voluptates cupiditate est debitis culpa! Ut culpa odio esse. Quidem repudiandae dolore saepe eaque laboriosam nostrum ab in fugiat quia aspernatur distinctio officia corporis reprehenderit, praesentium ipsa corrupti laudantium molestiae? Itaque sequi pariatur cupiditate et voluptas asperiores exercitationem quibusdam necessitatibus, maxime tempora atque non ab minima dignissimos fuga ipsum nobis, ex modi. Quia ut dolore facilis, numquam ducimus officiis. Culpa non tempora nisi assumenda. Voluptas, ipsa! Alias at illum quidem illo doloribus! Tempora repellendus aliquam omnis, est ex velit inventore atque reiciendis adipisci optio quis laboriosam quia dicta, eum soluta eius maiores blanditiis vitae. Quod dolore nulla at pariatur fugiat voluptates qui, rem odio deserunt ipsa nisi. Eaque quae optio, perspiciatis molestiae, corrupti adipisci accusantium sit exercitationem incidunt in ullam illum architecto ipsum laborum harum assumenda odio quisquam eos omnis saepe. Earum fuga deleniti rerum sunt officiis iusto assumenda vitae sit fugiat quia repellat ab temporibus ad, ex facilis cupiditate nam nobis quaerat cum molestiae asperiores? Fugiat quos consectetur possimus eos magni neque dolorem assumenda omnis ipsa! Qui corrupti iure est impedit accusantium nulla quisquam voluptates aperiam harum, excepturi ipsa nihil fugit magni totam autem accusamus, at, velit dicta consectetur dolorem veniam facilis ex.
    </>
  );
};

export default Scrollpage;
