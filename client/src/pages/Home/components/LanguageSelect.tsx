import Select from '../../../components/Select';
import Loading from '../../../components/Loading';
import { useLanguageOptions } from '../../../hooks/useLanguageOptions';

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
