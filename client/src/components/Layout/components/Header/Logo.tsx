import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link
      to={'/'}
      className="cursor-pointer select-none whitespace-nowrap text-xl font-bold text-accent-600"
      title="Github Trending X"
    >
      <span aria-hidden={true}>Github Trending X</span>
      <span className="sr-only">Home</span>
    </Link>
  );
};

export default Logo;
