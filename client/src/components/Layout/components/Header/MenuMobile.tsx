import NavLinkMobile from './NavLinkMobile';
import DarkModeToggle from './DarkModeToggle';

type Link = {
  label: string;
  href: string;
};

type Props = { id: string; isOpen: boolean; links: Link[] };

const MenuMobile = ({ id, isOpen, links }: Props) => {
  if (!isOpen) return <></>;

  return (
    <div className="absolute left-0 top-0 z-40 h-full w-full bg-background pb-24 pt-12 duration-500">
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
