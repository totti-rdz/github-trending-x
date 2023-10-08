import EmailIcon from '../../Icons/social/EmailIcon';
import GithubIcon from '../../Icons/social/GithubIcon';
import LinkedinIcon from '../../Icons/social/LinkedinIcon';
import { StringHelper } from '../../utils/StringHelper';
import { classNames } from '../../utils/classNames';

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: EmailIcon,
};

type Props = { href: string; icon: keyof typeof iconMap };

const SocialLink = ({ href, icon }: Props) => {
  const Icon = iconMap[icon];
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
      <Icon
        className={classNames(
          'h-5 w-5 transition-transform',
          'group-hover:rotate-12 group-hover:scale-110'
        )}
      />
    </a>
  );
};

export default SocialLink;
