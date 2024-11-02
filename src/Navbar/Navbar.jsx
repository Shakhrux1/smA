  import "./style.css";
  
  import logo from "../icon/photo_2024-10-01_15-58-27-removebg-preview.png";
  import { Link, Outlet } from "react-router-dom";
  import { useEffect, useState } from "react";
  import iq from '../icon/letter-iq-logo-or-icon-design-vector-removebg-preview.png';
  import losd from '../icon/Screenshot_2024-10-24_193400-removebg-preview.png';
  import SignUpForm from '../forma/Form';
  import user from '../icon/user.png'
  
  export default function Navbar() {
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [bgColor, setBgColor] = useState("transparent");
    const [boxShadow, setBoxShadow] = useState("none");
    const currentYear = new Date().getFullYear();
    
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
      setIsFormVisible((prev) => !prev);
      document.body.style.overflow = isFormVisible ? 'auto' : 'hidden';
    };

    const closeForm = () => {
      setIsFormVisible(false);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsHidden(true); 
        } else {
          setIsHidden(false); 
        }

      
        if (currentScrollY > 120) {
          setBgColor("#FFF");
          setBoxShadow("0px 4px 20px rgba(0, 0, 0, 0.2)");
        } else {
          setBgColor("transparent");
          setBoxShadow("none");
        }

        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [lastScrollY]);
    return (
      <>
        <main>
          <div className="nav-bgcround">
            <nav
              className={isHidden ? "hidden" : "active"}
              style={{
                transition: "all 0.3s",
                backgroundColor: bgColor,
                boxShadow: boxShadow,
              }}
            >
              <div className="container">
                <div className="flex">
                  <Link className="a" to="/">
                    <img src={logo} alt="Logo" style={{ width: "150px" }} />
                  </Link>
                  <ul>
                    <li key="home">
                      <Link to="/home">home</Link>
                    </li>
                    <li key="about">
                      <Link to="/about">about</Link>
                    </li>
                    <li key="info">
                      <Link to="/Facilities">Facilities</Link>
                    </li>
                    <li key="register">
                      <Link to="/Comments">Comments</Link>
                    </li>
                    <li key=""   >
                      <Link to="/ShopandDine/shop">Shop & Dine</Link>
                    </li>
                  </ul>
                  
                </div>
                <button className="nav-btn" onClick={toggleFormVisibility}>
                  <img width={'25px'} src={user} alt="" />
                </button>
              </div>
              {isFormVisible && (
                <div className="modal-overlay" onClick={closeForm}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <SignUpForm onClose={closeForm} /> {/* Pass close function */}
                    <button className="close-btn" onClick={closeForm}>Close</button> {/* Close button */}
                  </div>
                </div>
              )}
            </nav>
          </div>
        </main>
        <header>
          <Outlet />
        </header>
        <footer>
          <div className="bgcc">
            <div className="container">
              <div className="footer">
                <img src={losd} alt="Footer Logo" />
                <ul>
                  <li>Privacy policy</li>
                  <li>Terms of use</li>
                  <li>Sitemap</li>
                </ul>
                <article>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                >
                  <path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 30 30"
                >
                  <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                >
                  <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
                </svg>
              </article>
              </div>
            </div>
            <div className="border"></div>
            <div className="container">
              <div className="f">
                <p className="text"> &copy; Samarkand International Airport (AUH) {currentYear}</p>
                <div className="iq">
                  <img src={iq} alt="IQ Logo" />
                  <h3>Shakhrux <span>IQ</span></h3>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }