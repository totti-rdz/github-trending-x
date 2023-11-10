import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Other from './pages/Other';
import DevelopersPage from './pages/Developers';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/developers',
    element: <DevelopersPage />,
  },
  {
    path: '/other',
    element: <Other />,
  },
  {
    path: '/other/:test',
    element: <Other />,
  },
]);

function App() {
  // fix showing style for light mode and then transitioning to dark mode when loading page on dark mode
  useEffect(() => {
    document.body.style.transitionDuration = '0.5s';
  }, [document]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
