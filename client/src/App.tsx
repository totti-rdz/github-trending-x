import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Other from './pages/Other';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
