import NavLink from './NavLink';
import { classNames } from '../../../../utils/classNames';
import Logo from './Logo';
import MenuButton from './MenuButton';
import DarkModeToggle from './DarkModeToggle';
import MenuMobile from './MenuMobile';
import { useState } from 'react';

const links = [
  { label: 'repositories', href: '/' },
  { label: 'developers', href: '/developers' },
  { label: 'other', href: '/Other' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="mx-auto w-full max-w-screen-xl">
      <div
        className={classNames(
          'mx-4 grid grid-cols-2 gap-0 px-2 py-2 md:grid-cols-[1fr_auto_1fr]',
          'lg:gap-4 lg:px-4 lg:py-4'
        )}
      >
        <div className="z-50 mr-0 flex items-center md:mr-20">
          <Logo />
        </div>
        <nav className="hidden md:block" aria-label="primary">
          <ul className="gap-5">
            {links.map(({ label, href }) => (
              <NavLink href={href} key={label}>
                {label}
              </NavLink>
            ))}
          </ul>
        </nav>
        <div className="col-span-2 hidden items-center justify-center md:col-span-1 md:flex md:justify-end">
          <DarkModeToggle />
        </div>

        <div className="flex justify-end md:hidden">
          <MenuButton
            className="z-50"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            menuId="mobile-menu"
          />
          <MenuMobile id="mobile-menu" links={links} isOpen={isOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
