import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import ShopDetail from "./page4/pages/ShopOpen"; // Yangi sahifani import qilish

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: [
            <>
              <Scrollpage />,
              <FlightBooking />
              <Page3 />
              <Page4 />
            </>
          ]
        },
        {
          path: "/Home",
          element: <Home />
        },
        {
          path: "/Internet",
          element: <Wifi />
        },
        {
          path: "/ShopandDine/Shop",
          element: <Shopp />
        },
        {
          path: "/ShopandDine/Shop/:id", // Yangi yo'nalish
          element: <ShopDetail /> // Detallar sahifasini ochish
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App;
