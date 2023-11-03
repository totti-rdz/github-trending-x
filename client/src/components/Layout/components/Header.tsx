import NavLink from './NavLink';
import { classNames } from '../../../utils/classNames';
import { Link } from 'react-router-dom';

const links = [
  { label: 'repositories', href: '/' },
  { label: 'developers', href: '/developers' },
];

const Header = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <header
        className={classNames(
          'mx-4 flex items-center justify-between gap-2 px-2 py-2',
          'lg:gap-4 lg:px-4 lg:py-4'
        )}
      >
        <div className="flex-1">
          <Link
            to={'/'}
            className="select-none text-xl font-bold text-purple-600"
          >
            Trending Github X
          </Link>
        </div>
        <div className="">
          <ul className="space-x-5">
            {links.map(({ label, href }) => (
              <NavLink href={href} key={label}>
                {label}
              </NavLink>
            ))}
          </ul>
        </div>
        {/* <div className="flex flex-1 justify-end">Menu</div> */}
      </header>
    </div>
  );
};

export default Header;
