import { Developer } from '../../hooks/useDevelopers';
import BuildingIcon from '../icons/BuildingIcon';
import ClockIcon from '../icons/ClockIcon';
import FlameIcon from '../icons/FlameIcon';

type Props = {
  developer: Developer;
};

const DeveloperCard = ({ developer }: Props) => {
  const {
    avatarImgSrc,
    company,
    dateJoined,
    link,
    name,
    popularRepo,
    userName,
  } = developer;

  return (
    <div
      className="max-w-xs rounded-xl border border-purple-600 bg-gray-900 sm:max-w-prose"
      key={link}
    >
      <div className="flex flex-row gap-4 rounded-lg bg-purple-600 px-4 py-2">
        <div className="grid place-content-center">
          <img
            src={avatarImgSrc}
            alt={`${userName}'s Avatar`}
            className="h-14 w-14 rounded-full border border-gray-400"
            loading="lazy"
          />
        </div>
        <div className="">
          <h2 className="text-xl font-semibold">{name}</h2>
          <h3 className="text-lg">{userName}</h3>
        </div>
      </div>
      <div className="p-4">
        {!!popularRepo?.title && (
          <div>
            <div className="flex flex-row items-center gap-1">
              <FlameIcon className="inline h-4 w-4 text-purple-600" />
              <span className="text-sm">Popular Repository:</span>
            </div>
            <h4 className="text-base font-medium">{popularRepo.title}</h4>
            <p>{popularRepo.description}</p>
          </div>
        )}
        {!!company && (
          <div className="flex flex-row items-center gap-1">
            <BuildingIcon className="inline h-4 w-4" />
            <span className="">{company}</span>
          </div>
        )}
        {!!dateJoined && (
          <div className="flex flex-row items-center gap-1">
            <ClockIcon className="inline h-4 w-4" />
            <span className="">{dateJoined}</span>
          </div>
        )}
        {/* <p className="overflow-hidden text-ellipsis text-gray-400">
          {description}
        </p> */}
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

export default DeveloperCard;
