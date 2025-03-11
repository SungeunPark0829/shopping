import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./page/Home"
import AllProducts from "./page/AllProducts"
import NewProducts from "./page/NewProducts"
import ProductDetail from "./page/ProductDetail"
import MyCart from "./page/MyCart"
import NotFound from "./page/NotFound"
import ProductedRoute from "./page/ProductedRoute"
import Products from "./components/Products"

function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Home />,
      errorElement : <NotFound />,
      children : [
        {
          index : true,
          element : <AllProducts />
        },
        {
          path : 'products',
          element : <Products />
        },
        {
          path : 'products/new',
          element : 
          <ProductedRoute isAdmin>
            <NewProducts />
          </ProductedRoute>
        },
        {
          path : 'product/:id',
          element : <ProductDetail />
        },
        {
          path : 'carts', 
          element : 
          <ProductedRoute>
            <MyCart />
          </ProductedRoute>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
