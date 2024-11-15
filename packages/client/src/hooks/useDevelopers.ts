import { Developer } from '@github-trending-x/shared/src/types';
import { useFetch } from './useFetch';

export const useDevelopers = (language: string) => {
  const [developers, isLoading, status] = useFetch<Developer[]>(
    '/api/trending-developers/' + language,
    [language]
  );

  return { developers, isLoading, status };
};
