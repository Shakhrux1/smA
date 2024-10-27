import { useState, useEffect } from "react";
import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Scrollpage from "./ScrollPage/Scrollpage";
import Home from "./Home/Home";
import FlightBooking from "./zakas/ZakazPage";
import Page3 from "./Page3/Page3";
import NotFound from "./NotFount/NotFound";
import Page4 from "./page4/Page4";
import Wifi from "./page4/pages/Wifi";
import Shopp from "./page4/pages/Shopp&Dine";
import ShopDetail from "./page4/pages/ShopOpen";
import DineOpne from "./page4/pages/DineOpen";
import Yonalish from "./yonalishlar/Yonalish";
import BookingForm from "./Parking/BookingForm";
import Loading from "./loading/Loading";
import CommentSection from "./sharh/CommentSection";
import WorldMapChart from "./sharh/WorldMapChart";




function App() {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    // Simulate data loading or other operations
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: !isLoading ? <Navbar /> : null, // Conditionally render Navbar when loading is false
      children: [
        {
          path: "/",
          element: (
            <>
            <WorldMapChart/>
              <CommentSection/>
              <Scrollpage />
              <FlightBooking />
              <Yonalish />
              <Page3 />
              <Page4 />
              
            </>
          ),
        },
        {
          path: "/Home",
          element: <Home />,
        },
        {
          path: "/Internet",
          element: <Wifi />,
        },
        {
          path:"/Parking",
          element:<BookingForm />
        },
        {
          path: "/ShopandDine/:tab",
          element: <Shopp />,
          children: [
            { path: "Shop", element: <Shopp /> },
            { path: "Dine", element: <Shopp /> },
          ],
        },
        {
          path: "/ShopandDine/shop/:id",
          element: <ShopDetail />,
        },
        {
          path: "/ShopandDine/dine/:id",
          element: <DineOpne />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div style={{ backgroundColor: isLoading ? "#254a88" : "white", minHeight: "100vh" }}>
      {isLoading ? <Loading /> : <RouterProvider router={routes} />}
    </div>
  );
}

export default App;
