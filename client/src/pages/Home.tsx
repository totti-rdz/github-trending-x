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

function Home() {
  const [data, setData] = useState<Repo[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/trending-repositories');
        const data = await response.json();
        setData(data);
        setIsLoading(false);
        console.log('data', data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
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
          {!!data ? (
            <div className="no-scrollbar grid h-[calc(100%-60px)] w-full justify-center gap-5 overflow-auto px-10">
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
}

export default Home;
