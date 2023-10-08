import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/globals.css';

import Home from './pages/Home.tsx';
import Other from './pages/Other.tsx';
import ErrorPage from './pages/Error.tsx';

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
