import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Layout from '../components/Layout';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Layout>
      <div id="error-page">
        <h1>Oops!</h1>
        {isRouteErrorResponse(error) ? (
          <>
            <h2>{error.status}</h2>
            <p>{error.statusText}</p>
            {error.data?.message && <p>{error.data.message}</p>}
          </>
        ) : (
          <p>Sorry, an unexpected error occured.</p>
        )}
      </div>
    </Layout>
  );
}
