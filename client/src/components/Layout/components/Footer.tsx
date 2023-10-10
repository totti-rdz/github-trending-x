import { classNames } from '../../../utils/classNames';
import Copyright from './Copyright';
import SocialLinkList from './SocialLinkList';

const Footer = () => {
  return (
    <footer
      className={classNames(
        'flex flex-col items-center justify-center gap-2 px-2 py-2',
        'lg:flex-row-reverse lg:justify-around lg:gap-4 lg:px-4 lg:py-4'
      )}
    >
      <SocialLinkList />
      <Copyright />
    </footer>
  );
};

export default Footer;
