import { Language } from '@github-trending-x/shared/src/types';
import { useFetch } from './useFetch';

export const useSpokenLanguageOptions = () => {
  const [spokenLanguageOptions, isLoading] = useFetch<Language[]>(
    '/api/spoken-languages'
  );

  return { spokenLanguageOptions, isLoading };
};
