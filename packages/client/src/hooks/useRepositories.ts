import { useFetch } from './useFetch';
import { Repo } from '@github-trending-x/shared/src/types';

export const useRepositories = (language: string, spokenLanguage = '') => {
  const path =
    '/api/trending-repositories/' +
    language +
    (spokenLanguage && '?spoken-language=' + spokenLanguage);

  const [repositories, isLoading, status] = useFetch<Repo[]>(path, [
    language,
    spokenLanguage,
  ]);

  return { repositories, isLoading, status };
};
