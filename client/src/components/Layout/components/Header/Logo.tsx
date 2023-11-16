import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link
      to={'/'}
      className="cursor-pointer select-none whitespace-nowrap text-xl font-bold text-purple-600"
      title="Trending Github X"
    >
      <span aria-hidden={true}>Trending Github X</span>
      <span className="sr-only">Home</span>
    </Link>
  );
};

export default Logo;
