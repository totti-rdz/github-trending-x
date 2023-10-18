import SocialIcon from '../../icons/SocialIcon';
import { StringHelper } from '../../../utils/StringHelper';
import { classNames } from '../../../utils/classNames';

type Props = { href: string; icon: SocialIcon };

const SocialLink = ({ href, icon }: Props) => {
  const title = StringHelper.capitalize(icon);

  return (
    <a
      href={href}
      className={classNames(
        'group block rounded-lg p-1',
        'hover:scale-105 hover:bg-gray-700 hover:text-white'
      )}
      target="_blank"
      title={title}
    >
      <SocialIcon
        icon={icon}
        className={classNames(
          'h-5 w-5 transition-transform',
          'group-hover:rotate-12 group-hover:scale-110'
        )}
      />
    </a>
  );
};

export default SocialLink;
