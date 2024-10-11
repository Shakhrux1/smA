import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Scrollpage from "./ScrollPage/Scrollpage";
import Home from "./Home/Home";
import FlightBooking from "./zakas/ZakazPage";
import Page3 from "./Page3/Page3";
import NotFound from "./NotFount/NotFound";


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
            </>
          ]
        },
        {
          path:'/home',
          element:<Home/>
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
