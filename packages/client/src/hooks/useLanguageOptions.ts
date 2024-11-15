import { Language } from '@github-trending-x/shared/src/types';
import { useFetch } from './useFetch';

export const useLanguageOptions = () => {
  const [languageOptions, isLoading] = useFetch<Language[]>(
    '/api/programming-languages'
  );

  return { languageOptions, isLoading };
};
