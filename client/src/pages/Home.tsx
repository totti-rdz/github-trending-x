import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

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

type Language = { label: string; value: string | undefined };

const Home = () => {
  const [data, setData] = useState<Repo[] | undefined>(undefined);
  const [languageOptions, setLanguageOptions] = useState<
    Language[] | undefined
  >(undefined);
  const [language, setLanguage] = useState('javascript');
  const [isLoading, setIsLoading] = useState(true);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setLanguage(e.target.value);

  useEffect(() => {
    const fetchLanguageOptions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/programming-languages');
        const languageOptions = await response.json();
        setLanguageOptions(languageOptions);
      } catch (error) {
        console.error('Error fetching languages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLanguageOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/trending-repositories/' + language);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [language]);

  return (
    <Layout>
      <div className="text-center">
        <h1 className="mb-6 text-3xl font-bold text-purple-600">
          Trending GitHub Repositories
        </h1>
      </div>
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <>
          {!!languageOptions && (
            <div className="my-5 grid place-content-center">
              <label htmlFor="language-select">
                Choose a programming language:
              </label>
              <select
                name="language"
                id="language-select"
                className="rounded-lg bg-purple-600 px-2 py-1"
                value={language}
                onChange={handleLanguageChange}
              >
                {languageOptions.map(({ label, value }) => {
                  return (
                    <option value={value} key={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {!!data ? (
            <div className="no-scrollbar grid flex-1 justify-center gap-5 overflow-auto px-10">
              {data.map((repo) => (
                <div
                  className="max-w-prose rounded-xl border border-purple-600 bg-gray-900"
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
                    <p className="text-gray-400">{repo.description}</p>
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
