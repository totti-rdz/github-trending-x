import Link from '../../Link';
import { classNames } from '../../../utils/classNames';

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
        <div className="flex-1 text-xl font-bold text-purple-600">
          Trending Github X
        </div>
        <div className="">
          <ul className="space-x-5">
            {links.map(({ label, href }) => (
              <Link href={href}>{label}</Link>
            ))}
          </ul>
        </div>
        {/* <div className="flex flex-1 justify-end">Menu</div> */}
      </header>
    </div>
  );
};

export default Header;
