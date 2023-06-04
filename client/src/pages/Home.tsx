import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>Hello world</div>
      <div>
        <Link to={`/other`}>Other Page</Link>
      </div>
    </>
  );
}

export default Home;
