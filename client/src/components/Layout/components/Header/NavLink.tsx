import { NavLink as RouterNavLink } from 'react-router-dom';
import { getHoverAnimationClasses } from '../../../../utils/getHoverAnimationClasses';
import { classNames } from '../../../../utils/classNames';

type Props = {
  children: React.ReactNode;
  href: string;
};

const NavLink = ({ children, href }: Props) => {
  const hoverAnimationClass = getHoverAnimationClasses();
  return (
    <RouterNavLink
      className={({ isActive }) =>
        classNames(hoverAnimationClass.parent, isActive && '!bg-transparent')
      }
      to={href}
    >
      {({ isActive }) => (
        <span
          className={classNames(
            isActive
              ? 'underline decoration-purple-600 decoration-2 underline-offset-4'
              : hoverAnimationClass.child
          )}
        >
          {children}
        </span>
      )}
    </RouterNavLink>
  );
};

export default NavLink;
