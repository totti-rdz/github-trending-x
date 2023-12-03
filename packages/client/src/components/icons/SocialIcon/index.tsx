import EmailIcon from './icons/EmailIcon';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: EmailIcon,
};

type SocialIcon = keyof typeof iconMap;

type Props = {
  className?: string;
  icon: SocialIcon;
};

const SocialIcon = ({ className = '', icon }: Props) => {
  const Icon = iconMap[icon];
  return <Icon className={className} />;
};

export default SocialIcon;
