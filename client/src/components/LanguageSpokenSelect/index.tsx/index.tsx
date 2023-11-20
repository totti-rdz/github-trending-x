import Select from '../../Select';
import Loading from '../../Loading';
import { useSpokenLanguageOptions } from '../../../hooks/useSpokenLanguageOptions';

type Props = {
  currentSpokenLanguage: string;
  setCurrentSpokenLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const LanguageSpokenSelect = ({
  currentSpokenLanguage,
  setCurrentSpokenLanguage,
}: Props) => {
  const { spokenLanguageOptions, isLoading } = useSpokenLanguageOptions();
  const clearSpokenLanguageOption = {
    label: !!currentSpokenLanguage ? '--Clear language--' : '',
    value: '',
  };

  const handleSpokenLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrentSpokenLanguage(event.target.value);

  return (
    <div className="my-5 grid h-14 place-content-center">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!!spokenLanguageOptions ? (
            <Select
              name="spoken-language"
              label="Choose a language:"
              onChange={handleSpokenLanguageChange}
              options={[clearSpokenLanguageOption, ...spokenLanguageOptions]}
              value={currentSpokenLanguage}
            />
          ) : (
            <div>ERROR</div>
          )}
        </>
      )}
    </div>
  );
};

export default LanguageSpokenSelect;
