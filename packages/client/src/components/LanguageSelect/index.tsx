import Select from '../Select';
import Loading from '../Loading';
import { useLanguageOptions } from '../../hooks/useLanguageOptions';

type Props = {
  currentLanguage: string;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const LanguageSelect = ({ currentLanguage, setCurrentLanguage }: Props) => {
  const { languageOptions, isLoading } = useLanguageOptions();
  const clearLanguageOption = {
    label: !!currentLanguage ? '--Clear programming language--' : '',
    value: '',
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrentLanguage(event.target.value);

  return (
    <div className="h-14 grid place-content-center">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!!languageOptions ? (
            <Select
              name="language"
              label="Choose a programming language:"
              onChange={handleLanguageChange}
              options={[clearLanguageOption, ...languageOptions]}
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
