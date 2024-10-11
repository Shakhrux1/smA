// import { useEffect } from 'react';
// import { gsap } from 'gsap';
// import './style.css';

const Notfound = () => {
  // useEffect(() => {
  //   let animation = null;

  //   const handleMouseMove = (e) => {
  //     const maskWidth = 1530; // maskning kengligi
  //     const maskHeight = -730; // maskning balandligi

  //     // Maskni kursor ostida markazlashtirish
  //     if (animation) {
  //       animation.kill(); // Avvalgi animatsiyani to'xtatish
  //     }

  //     animation = gsap.to(".mask", {
  //       x: e.clientX - maskWidth / 2,
  //       y: e.clientY + maskHeight / 2, // Kursor ostida joylashishi uchun
  //       duration: 2, // harakat davomiyligi
  //       ease: "power3.out", // bosib olish funksiyasi
  //     });
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     if (animation) {
  //       animation.kill(); // O'chirishda animatsiyani to'xtatish
  //     }
  //   };
  // }, []);

  return (
    <div className="error-container">
      <div className="text">
        <h1>404</h1>
        <p>page not found</p>
        <h2>Back to main</h2>
      </div>
      <div className="mask" />
    </div>
  );
};

export default Notfound;