import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Catalog from "./Catalog"
import Search from "./Search"
import Home from "./Home"
import Cart from "./Cart"
import Item from "./Item"

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/catalog",
      element: <Catalog />,
    },
    {
      path: "/search/:search",
      element: <Search />,
    },
    {
      path: "item/:itemId",
      element: <Item />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
