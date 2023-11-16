import MenuIcon from '../../icons/MenuIconAnimated';

type Props = {
  className?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuButton = ({ className, isOpen, setIsOpen }: Props) => {
  return (
    <div className={className}>
      <button
        className="group h-10 w-10 overflow-hidden rounded-full border-2 border-purple-600 p-1"
        onClick={() => setIsOpen((current) => !current)}
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
