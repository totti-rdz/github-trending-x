import { NavLink as RouterNavLink } from 'react-router-dom';
import { classNames } from '../../../utils/classNames';

type NavLinkMobileProps = {
  children: React.ReactNode;
  href: string;
};

const NavLinkMobile = ({ children, href }: NavLinkMobileProps) => (
  <RouterNavLink
    className={
      'w-full border-b border-purple-600 bg-[linear-gradient(to_right,_transparent_50%,_var(--accent-600)_50%)] bg-[length:200%_100%] transition-[background-position] duration-150 first:border-t active:bg-[position:-100%_0] [@media(hover:hover)]:hover:bg-[position:-100%_0]'
    }
    to={href}
  >
    {({ isActive }) => (
      <div
        className={classNames(
          'px-10 py-12 text-foreground duration-500', // setting color and duration to mitigate additive transition-duration in children when switching dark mode - see https://stackoverflow.com/q/39600138
          isActive && 'cursor-default bg-background-secondary'
        )}
      >
        <span className={classNames('text-xl', isActive && 'opacity-50')}>
          {children}
        </span>
      </div>
    )}
  </RouterNavLink>
);

export default NavLinkMobile;
