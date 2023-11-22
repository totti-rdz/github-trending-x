import { useState } from 'react';
import Layout from '../../components/Layout';
import LanguageSelect from '../../components/LanguageSelect';
import Loading from '../../components/Loading';
import DeveloperCard from '../../components/DeveloperCard';
import Title from '../../components/Title';
import { getHttpCodeMessage } from '../../utils/getHttpCodeMessage';
import { useDevelopers } from '../../hooks/useDevelopers';

const DevelopersPage = () => {
  const [language, setLanguage] = useState('');
  const { developers, isLoading, status } = useDevelopers(language);

  const errorMessage = getHttpCodeMessage(status);

  return (
    <Layout>
      <Title text="Trending GitHub Developers" />
      <div className="mx-auto my-5 flex flex-col justify-center gap-2 sm:flex-row">
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
            {!!developers ? (
              <div className="no-scrollbar space-y-5 overflow-auto">
                {developers.map((developer) => (
                  <DeveloperCard developer={developer} key={developer.id} />
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

export default DevelopersPage;
