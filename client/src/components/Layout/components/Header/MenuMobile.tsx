import { useState } from 'react';
import MenuButton from './MenuButton';
import MenuOverlay, { Link } from './MenuOverlay';

type Props = { links: Link[] };

const MenuMobile = ({ links }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = 'mobile-menu';

  const toggleMenu = () => setIsOpen((current) => !current);

  return (
    <>
      <MenuButton
        className="z-50"
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        menuId={menuId}
      />
      <MenuOverlay
        id={menuId}
        links={links}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

export default MenuMobile;
