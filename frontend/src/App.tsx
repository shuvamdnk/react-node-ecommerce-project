import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import { useEffect } from 'react'

import RootLayout from './pages/Root';

// Pages
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import PaymentFailed from './pages/PaymentFailed';
import PaymentSuccess from './pages/PaymentSuccess';
import Cart from './pages/Cart';

// Style
import './App.css';
import Search from './pages/Search';
import Signup from './pages/Signup';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Protected from './pages/Protected';

  
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/category/:categoryID/products',
        element: <CategoryPage />
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/product-details/:productID/:categoryID?',
        element: <ProductDetails />,
      },
      {
        path: '/search/:searchQuery?',
        element: <Search />,
      },
      {
        path: '/profile',
        element: <Protected component={Profile} />
      },
      {
        path: '/cart',
        element: <Protected component={Cart} />
      },
      {
        path: '/payment',
        children:[
          {
            path:'failed',
            element: <PaymentFailed />,
          },
          {
            path:'success',
            element: <PaymentSuccess />,
          }
        ]
      },
    ]
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
