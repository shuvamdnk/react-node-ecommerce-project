import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import { useEffect } from 'react'

import RootLayout from './pages/Root';

// Pages
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';

// Style
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
        element: <Login />,
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails />,
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
