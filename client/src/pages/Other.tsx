import { Link } from "react-router-dom";

function Other() {
  return (
    <>
      <div>Hello again</div>
      <Link to={`/`}>Home</Link>
    </>
  );
}

export default Other;
