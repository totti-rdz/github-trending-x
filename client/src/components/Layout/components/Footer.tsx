import { classNames } from '../../utils/classNames';
import { lg } from '../../utils/prefixClassNames';
import Copyright from './Copyright';
import SocialLinkList from './SocialLinkList';

const Footer = () => {
  return (
    <footer
      className={classNames(
        'flex flex-col items-center justify-center gap-2 px-2 py-2',
        lg('flex-row-reverse justify-around gap-4 px-4 py-4')
      )}
    >
      <SocialLinkList />
      <Copyright />
    </footer>
  );
};

export default Footer;
