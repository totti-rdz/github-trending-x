import { Repo } from '../../hooks/useRepositories';

type Props = {
  repo: Repo;
};

const RepositoryCard = ({ repo }: Props) => {
  const { description, link, owner, ownerImgSrc, title } = repo;

  return (
    <div
      className="max-w-xs rounded-xl border border-purple-600 bg-background-secondary sm:max-w-prose"
      key={link}
    >
      <div className="flex flex-row gap-4 rounded-lg bg-purple-600 px-4 py-2">
        <div className="grid place-content-center">
          <img
            src={ownerImgSrc}
            alt={`${owner}'s Avatar`}
            className="h-14 w-14 rounded-full border border-gray-400"
            loading="lazy"
          />
        </div>
        <div className="">
          <h2 className="text-xl font-semibold">{title}</h2>
          <h3 className="text-lg">by {owner}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="overflow-hidden text-ellipsis text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <a
          href={'https://www.github.com' + link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-purple-600 hover:underline"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default RepositoryCard;
