import MenuIcon from '../../../icons/MenuIconAnimated';

type Props = {
  className?: string;
  isOpen: boolean;
  menuId: string;
  toggleMenu: ()=>void;
};

const MenuButton = ({ className, isOpen, menuId, toggleMenu }: Props) => {
  
  return (
    <div className={className}>
      <button
        className="group h-10 w-10 overflow-hidden rounded-full border-2 border-purple-600 p-1"
        onClick={toggleMenu}
        aria-label={`${isOpen ? 'Close' : 'Open'} menu`}
        aria-controls={menuId}
        aria-expanded={`${isOpen}`}
      >
        <div
          className="grid h-full w-full place-content-center"
          aria-hidden="true"
        >
          <MenuIcon isActive={isOpen} />
        </div>
        <span className="sr-only">{`${isOpen ? 'Close' : 'Open'} menu`}</span>
      </button>
    </div>
  );
};

export default MenuButton;
