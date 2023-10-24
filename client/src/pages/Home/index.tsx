import { useState } from 'react';
import Layout from '../../components/Layout';
import LanguageSelect from './components/LanguageSelect';
import Loading from '../../components/Loading';
import { useRepositories } from '../../hooks/useRepositories';
import RepositoryCard from '../../components/RepositoryCard';

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
                <RepositoryCard repo={repo} />
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
