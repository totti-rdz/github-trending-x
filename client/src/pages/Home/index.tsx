import { useState } from 'react';
import Layout from '../../components/Layout';
import LanguageSelect from './components/LanguageSelect';
import Loading from '../../components/Loading';
import { useRepositories } from '../../hooks/useRepositories';
import RepositoryCard from '../../components/RepositoryCard';
import Title from '../../components/Title';
import { getHttpCodeMessage } from '../../utils/getHttpCodeMessage';

const Home = () => {
  const [language, setLanguage] = useState('');
  const { repositories, isLoading, status } = useRepositories(language);

  const errorMessage = getHttpCodeMessage(status);

  return (
    <Layout>
      <Title text="Trending GitHub Repositories" />
      <LanguageSelect
        currentLanguage={language}
        setCurrentLanguage={setLanguage}
      />
      <div className="grid flex-1 place-content-center overflow-auto px-10">
        {isLoading ? (
          <Loading size="lg" />
        ) : (
          <>
            {!!repositories ? (
              <div className="no-scrollbar space-y-5 overflow-auto">
                {repositories.map((repo) => (
                  <RepositoryCard repo={repo} key={repo.id} />
                ))}
              </div>
            ) : (
              <h3 className="text-2xl">{errorMessage}</h3>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
