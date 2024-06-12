import NavLinkMobile from './NavLinkMobile';
import DarkModeToggle from './DarkModeToggle';

export type Link = {
  href: string;
  label: string;
};

type Props = {
  id: string;
  isOpen: boolean;
  links: Link[];
  toggleMenu: () => void;
};

const MenuMobile = ({ id, isOpen, links, toggleMenu }: Props) => {
  return (
    <div
      className={`absolute left-0 z-40 h-full w-full bg-background pb-24 pt-12 transition-all duration-500 ease-in-out ${
        isOpen ? 'top-0' : 'top-full'
      }`}
      onClick={toggleMenu}
    >
      <nav className="my-10" aria-label="primary" id={id}>
        <ul className="flex flex-col items-center">
          {links.map(({ label, href }) => (
            <NavLinkMobile href={href} key={label}>
              {label}
            </NavLinkMobile>
          ))}
        </ul>
      </nav>
      <div className="grid place-content-center md:hidden">
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default MenuMobile;
