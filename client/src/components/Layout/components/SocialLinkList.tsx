import SocialLink from './SocialLink';

const socialLinks = [
  { href: 'https://github.com/totti-rdz/', icon: 'github' },
  {
    href: 'https://www.linkedin.com/in/thorsten-herfurtner/',
    icon: 'linkedin',
  },
  { href: 'mailto:thorsten_herfurtner@gmx.de', icon: 'email' },
] as const;

const SocialLinkList = () => {
  return (
    <ul className="flex flex-row gap-1">
      {socialLinks.map((link) => (
        <li key={link.href}>
          <SocialLink href={link.href} icon={link.icon} />
        </li>
      ))}
    </ul>
  );
};

export default SocialLinkList;
