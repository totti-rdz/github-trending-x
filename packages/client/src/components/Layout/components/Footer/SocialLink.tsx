import SocialIcon from '../../../icons/SocialIcon';
import { StringHelper } from '../../../../utils/StringHelper';
import { getHoverAnimationClasses } from '../../../../utils/getHoverAnimationClasses';

type Props = { href: string; icon: SocialIcon };

const SocialLink = ({ href, icon }: Props) => {
  const title = StringHelper.capitalize(icon);
  const hoverAnimationClass = getHoverAnimationClasses({ isIcon: true });

  return (
    <a
      href={href}
      className={hoverAnimationClass.parent}
      target="_blank"
      title={title}
    >
      <SocialIcon icon={icon} className={hoverAnimationClass.child} />
    </a>
  );
};

export default SocialLink;
