import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Home() {
  return (
    <Layout>
      <div>Hello world</div>
      <div>
        <Link to={`/other`}>Other Page</Link>
      </div>
    </Layout>
  );
}

export default Home;
