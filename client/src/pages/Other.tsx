import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

function Other() {
  const params = useParams();
  return (
    <Layout>
      <div>Hello again</div>
      <Link to={`/`}>Home</Link>
      {params && params.test && <div>Test: {params.test}</div>}
    </Layout>
  );
}

export default Other;
