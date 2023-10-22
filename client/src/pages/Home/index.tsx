import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import LanguageSelect from './components/LanguageSelect';
import Loading from '../../components/Loading';
import { useRepositories } from '../../hooks/useRepositories';

type Repo = {
  description: string;
  forks: number;
  id: number;
  link: string;
  owner: string;
  ownerImgSrc: string;
  stars: number;
  title: string;
};

const Home = () => {
  const [language, setLanguage] = useState('javascript');
  const { repositories, isLoading } = useRepositories(language);

  return (
    <Layout>
      <div className="text-center">
        <h1 className="mb-6 text-3xl font-bold text-purple-600">
          Trending GitHub Repositories
        </h1>
      </div>
      <LanguageSelect
        currentLanguage={language}
        setCurrentLanguage={setLanguage}
      />
      {isLoading ? (
        <div className="grid flex-1 place-content-center">
          <Loading size="lg" />
        </div>
      ) : (
        <>
          {!!repositories ? (
            <div className="no-scrollbar grid flex-1 justify-center gap-5 overflow-auto px-10">
              {repositories.map((repo) => (
                <div
                  className="max-w-xs rounded-xl border border-purple-600 bg-gray-900 sm:max-w-prose"
                  key={repo.link}
                >
                  <div className="flex flex-row gap-4 rounded-lg bg-purple-600 px-4 py-2">
                    <div className="grid place-content-center">
                      <img
                        src={repo.ownerImgSrc}
                        alt={`${repo.owner}'s Avatar`}
                        className="h-14 w-14 rounded-full border border-gray-400"
                      />
                    </div>
                    <div className="">
                      <h2 className="text-xl font-semibold">{repo.title}</h2>
                      <h3 className="text-lg">by {repo.owner}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="overflow-hidden text-ellipsis text-gray-400">
                      {repo.description}
                    </p>
                    <a
                      href={'https://www.github.com' + repo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-purple-600 hover:underline"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>ERROR</div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Home;
