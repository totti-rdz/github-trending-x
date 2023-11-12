import { classNames } from '../../../utils/classNames';

const classMap = {
  top: {
    active: 'top-1.5 translate-x-0 rotate-[225deg]',
    default:
      'top-0 translate-x-0 [@media(hover:hover)]:group-hover:translate-x-1',
  },
  center: {
    active: 'top-1.5 translate-x-4 scale-0',
    default:
      'top-1.5 translate-x-2 [@media(hover:hover)]:group-hover:translate-x-0',
  },
  bottom: {
    active: 'top-1.5 translate-x-0 rotate-[135deg]',
    default:
      'top-3 translate-x-1 [@media(hover:hover)]:group-hover:translate-x-2',
  },
};

type MenuBarProps = {
  isActive?: boolean;
  position: keyof typeof classMap;
};

const MenuBar = ({ isActive = false, position }: MenuBarProps) => (
  <span
    className={classNames(
      'absolute left-0 h-[2px] w-5 rounded-[2px] bg-foreground transition-all duration-300',
      isActive ? classMap[position].active : classMap[position].default
    )}
  />
);

export default MenuBar;
