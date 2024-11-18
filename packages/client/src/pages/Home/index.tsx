import { useState } from 'react';
import Layout from '../../components/Layout/index.tsx';
import LanguageSelect from '../../components/LanguageSelect/index.tsx';
import Loading from '../../components/Loading/index.tsx';
import { useRepositories } from '../../hooks/useRepositories.ts';
import RepositoryCard from '../../components/RepositoryCard/index.tsx';
import Title from '../../components/Title/index.tsx';
import { getHttpCodeMessage } from '../../utils/getHttpCodeMessage.ts';
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
      <div className="mx-auto my-5 grid w-80 grid-cols-1 justify-center gap-2 sm:w-[65ch] sm:grid-cols-2">
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
            {repositories ? (
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
