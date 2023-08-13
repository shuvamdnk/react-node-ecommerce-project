import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
  // const handleRouteUpdate = () => {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: 'instant'
  //   });
  // };
  // useEffect(() => {
  //   console.log('calling');
  //   handleRouteUpdate();
  // }, [router])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
