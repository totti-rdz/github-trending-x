import { useFetch } from './useFetch';

export type Language = { label: string; value: string };

export const useSpokenLanguageOptions = () => {
  const [spokenLanguageOptions, isLoading] = useFetch<Language[]>(
    '/api/spoken-languages'
  );

  return { spokenLanguageOptions, isLoading };
};
