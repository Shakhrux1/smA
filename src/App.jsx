import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
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
import CommentSection from "./sharh/CommentSection";
import { Helmet } from "react-helmet";
import Loading from "./loading/Loading";
import Dashboard from "./dashboard/Dash";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  const [body, setBody] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch("https://cuqrwqnnguneymulgghg.supabase.co/storage/v1/object/public/zgfor/shohruh.json")
      .then((response) => response.json())
      .then((data) => {
        setBody(data);
        setLoader(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
        </>
      ),
      children: [
        {
          path: "/",
          element: (
            <>
              <Scrollpage />
              <FlightBooking />
              <Yonalish />
              <Page3 />
              <Page4 />
            </>
          ),
        },
        { path: "/Home", element: <Home /> },
        { path: "/Internet", element: <Wifi /> },
        { path: "/Parking", element: <BookingForm /> },
        { path: "/ShopandDine/:tab", element: <Shopp /> },
        { path: "/ShopandDine/shop/:id", element: <ShopDetail /> },
        { path: "/ShopandDine/dine/:id", element: <DineOpne /> },
        { path: "/Comments", element: <CommentSection /> },
        { path: "/Direction", element: <Yonalish showAll={true} /> }, // Barcha yo'nalishlarni ko'rsatadigan sahifa
      ],
    },
    { path: "*", element: <NotFound /> },
    { path: "/Dashboard", element: <Dashboard /> },
  ]);

  return (
    <>
      <Helmet>
        <title>Samarkand Airways - Affordable Flights Across Central Asia and Beyond</title>
        <meta name="description" content="This is my awesome page description." />
      </Helmet>
      <div>{loader ? <Loading /> : <RouterProvider router={routes} />}</div>
    </>
  );
}

export default App;
