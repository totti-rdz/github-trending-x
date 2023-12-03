import MenuBar from './MenuBar';

type MenuIconProps = {
  isActive?: boolean;
};

const MenuIcon = ({ isActive = false }: MenuIconProps) => (
  <div className="relative h-3.5 w-5 overflow-hidden">
    <MenuBar position="top" isActive={isActive} />
    <MenuBar position="center" isActive={isActive} />
    <MenuBar position="bottom" isActive={isActive} />
  </div>
);

export default MenuIcon;
