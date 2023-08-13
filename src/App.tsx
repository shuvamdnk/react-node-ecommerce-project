import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import { useEffect } from 'react'

import RootLayout from './pages/Root';

// Pages
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import Login from './pages/Login';

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
