import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Scrollpage from "./ScrollPage/Scrollpage";
import Home from "./Home/Home";


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
              <Scrollpage/>
            </>
          ]
        },
        {
          path:'/home',
          element:<Home/>
        }
      ]

    }
  ])
  return (

    <>
  
      <RouterProvider  router={routes}/>
    </>
  )
}

export default App;
