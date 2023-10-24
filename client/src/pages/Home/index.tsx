import { useState } from 'react';
import Layout from '../../components/Layout';
import LanguageSelect from './components/LanguageSelect';
import Loading from '../../components/Loading';
import { useRepositories } from '../../hooks/useRepositories';
import RepositoryCard from '../../components/RepositoryCard';
import Title from '../../components/Title';

const Home = () => {
  const [language, setLanguage] = useState('javascript');
  const { repositories, isLoading } = useRepositories(language);

  return (
    <Layout>
      <Title text='Trending GitHub Repositories'/>
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
                <RepositoryCard repo={repo} key={repo.id} />
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
