import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './components/NotFound.jsx'
import { lazy,Suspense } from 'react'


const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'));
const ProductList = lazy(() => import('./components/ProductList.jsx'));
const Cart = lazy(() => import('./components/Cart.jsx'));
const Checkout =lazy(()=>import('./components/Checkout.jsx'));
const appRouter = createBrowserRouter([

  {
    path:"/",
    element:<App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<p className="text-center mt-10">Loading Product List...</p>}>
            <ProductList />
          </Suspense>
        ),
      },
      {
        path: '/products/:id',
        element: (
          <Suspense fallback={<p className="text-center mt-10">Loading Product Detail...</p>}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<p className="text-center mt-10">Loading Cart...</p>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element:  (
          <Suspense fallback={<p className="text-center mt-10">Loading CheckOut...</p>}>
            <Checkout />,
          </Suspense>
        ),
      },

    ]
  }

])
createRoot(document.getElementById('root')).render(
  
  
    <RouterProvider router={appRouter} />
  
  
)
