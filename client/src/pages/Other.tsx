import { Link, useParams } from "react-router-dom";

function Other() {
  const params = useParams();
  return (
    <>
      <div>Hello again</div>
      <Link to={`/`}>Home</Link>
      {params && params.test && <div>Test: {params.test}</div>}
    </>
  );
}

export default Other;
