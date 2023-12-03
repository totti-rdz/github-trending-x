import { useState } from 'react';
import Layout from '../../components/Layout';
import LanguageSelect from '../../components/LanguageSelect';
import Loading from '../../components/Loading';
import { useRepositories } from '../../hooks/useRepositories';
import RepositoryCard from '../../components/RepositoryCard';
import Title from '../../components/Title';
import { getHttpCodeMessage } from '../../utils/getHttpCodeMessage';
import LanguageSpokenSelect from '../../components/LanguageSpokenSelect/index.tsx';

const Home = () => {
  const [language, setLanguage] = useState('');
  const [spokenLanguage, setSpokenLanguage] = useState('');
  const { repositories, isLoading, status } = useRepositories(
    language,
    spokenLanguage
  );

  const errorMessage = getHttpCodeMessage(status);

  return (
    <Layout>
      <Title text="GitHub Trending Repositories" />
      <div className="mx-auto my-5 flex flex-col justify-center gap-2 sm:flex-row">
        <LanguageSpokenSelect
          currentSpokenLanguage={spokenLanguage}
          setCurrentSpokenLanguage={setSpokenLanguage}
        />
        <LanguageSelect
          currentLanguage={language}
          setCurrentLanguage={setLanguage}
        />
      </div>
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
