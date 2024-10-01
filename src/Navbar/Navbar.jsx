import "./style.css";
import logo from "../icon/photo_2024-10-01_15-58-27-removebg-preview.png";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    const handleScrollY = () => {
      if (window.scrollY > 1500) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    };

    window.addEventListener('scroll', handleScrollY);

    return () => {
      window.removeEventListener('scroll', handleScrollY);
    };
  }, []);

  return (
    <>
      <main>
        <div className="nav-bgcround">
          <nav className={scrollY ? "active" : ""} style={{ transition: 'all .3s' }}>
            <div className="container">
              <div className="flex">
                <Link className="a" to='/'> 
                  <img src={logo} alt="" style={{ width: "200px" }} />
                </Link>
                <ul>
                  <Link to='/home'>
                    <li key="home">home</li> {/* Har bir elementga noyob `key` qo'shildi */}
                  </Link>
                  <li key="about">about</li>
                  <li key="info">info</li>
                  <li key="register">register</li>
                  <li key="contact">contact</li>
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
      <footer>
      </footer>
    </>
  );
}
