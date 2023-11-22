import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Layout from '../../components/Layout';
import Title from '../../components/Title';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Layout>
      <div id="error-page">
        <Title text="Oops!" />
        <div className="grid place-content-center">
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
      </div>
    </Layout>
  );
};

export default ErrorPage;
