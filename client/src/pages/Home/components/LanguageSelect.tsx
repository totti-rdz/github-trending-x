import { useEffect, useState } from 'react';
import Select from '../../../components/Select';
import Loading from '../../../components/Loading';

type Language = { label: string; value: string };

type Props = {
  currentLanguage: string;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const LanguageSelect = ({ currentLanguage, setCurrentLanguage }: Props) => {
  const [languageOptions, setLanguageOptions] = useState<
    Language[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrentLanguage(event.target.value);

  useEffect(() => {
    const fetchLanguageOptions = async () => {
      try {
        const response = await fetch('/api/programming-languages');
        const languageOptions = (await response.json()) as Language[];
        const languageOptionsFiltered = languageOptions.filter(
          (lang) => lang.value !== undefined
        );
        setLanguageOptions(languageOptionsFiltered);
      } catch (error) {
        console.error('Error fetching languages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLanguageOptions();
  }, []);
  return (
    <div className="my-5 grid h-14 place-content-center">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!!languageOptions ? (
            <Select
              name="language"
              label="Choose a programming language:"
              onChange={handleLanguageChange}
              options={languageOptions}
              value={currentLanguage}
            />
          ) : (
            <div>ERROR</div>
          )}
        </>
      )}
    </div>
  );
};

export default LanguageSelect;
