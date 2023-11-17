import { useState } from 'react';
import MenuButton from './MenuButton';
import MenuOverlay, { Link } from './MenuOverlay';

type Props = { links: Link[] };

const MenuMobile = ({ links }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = 'mobile-menu';

  return (
    <>
      <MenuButton
        className="z-50"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuId={menuId}
      />
      <MenuOverlay id={menuId} links={links} isOpen={isOpen} />
    </>
  );
};

export default MenuMobile;
