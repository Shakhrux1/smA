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
import Dine from "./page4/pages/Dine";
import Shopp from "./page4/pages/Shopp";
import SignUpLoginForm from "./forma/Form";


function App() {
  const routes = createBrowserRouter([
    {
      path:"/",
      element: <Navbar/>,
      children:[
        {
          path:'/',
          element:[
            <>
              <Scrollpage/>,
              <FlightBooking/>
              <Page3/>
              <Page4/>
              <SignUpLoginForm/>
            </>
          ]
        },
        {
          path:'/Home',
          element:<Home/>
        },
        {
          path:"/Internet",
          element:<Wifi/>
        },{
          path:'/ShopandDine/Dine',
          element:<Dine/>
        },{
          path:"/ShopandDine/Shop",
          element:<Shopp/>
        }
      ]

    },
    {
      path:'*',
      element:<NotFound/>
    }
  ])
  return (

    <>
  
      <RouterProvider  router={routes}/>
    </>
  )
}

export default App;
