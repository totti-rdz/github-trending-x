import { useFetch } from './useFetch';

export type Language = { label: string; value: string };

export const useLanguageOptions = () => {
  const [languageOptions, isLoading] = useFetch<Language[]>(
    '/api/programming-languages'
  );

  return { languageOptions, isLoading };
};
