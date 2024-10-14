import "./style.css";
import logo from "../icon/photo_2024-10-01_15-58-27-removebg-preview.png";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");
  const [boxShadow, setBoxShadow] = useState("none") // Initial background color

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true); // Hide navbar on scroll down
      } else {
        setIsHidden(false); // Show navbar on scroll up
      }

      // Change background color based on scroll position
      if (currentScrollY >120) {
        setBgColor("#FFF"); 
        setBoxShadow("0px 4px 20px rgba(0, 0, 0, 0.2)")
        // Change to a dark background
        
      } else {
        setBgColor("transparent"); // Reset to transparent
        setBoxShadow("none")
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
            style={{ transition: "all 0.3s", backgroundColor: bgColor,boxShadow: boxShadow  }} // Apply background color
          >
            <div className="container">
              <div className="flex">
                <Link className="a" to="/">
                  <img src={logo} alt=""   style={{ width: "150px" }} />
                </Link>
                <ul>
                  <li key="home">
                    <Link to="/home">home</Link>
                  </li>
                  <li key="about">
                    <Link to="/about">about</Link>
                  </li>
                  <li key="info">
                    <Link to="/info">info</Link>
                  </li>
                  <li key="register">
                    <Link to="/register">register</Link>
                  </li>
                  <li key="contact">
                    <Link to="/contact">contact</Link>
                  </li>
                </ul>
              </div>
              <button>sent</button>
            </div>
          </nav>
        </div>
      </main>
      <header>
        <Outlet />
      </header>
      <footer></footer>
    </>
  );
}