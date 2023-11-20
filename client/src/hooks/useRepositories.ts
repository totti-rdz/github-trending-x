import { useFetch } from './useFetch';

export type Repo = {
  description: string;
  forks: number;
  id: number;
  link: string;
  owner: string;
  ownerImgSrc: string;
  stars: number;
  title: string;
};

export const useRepositories = (
  language: string,
  spokenLanguage: string = ''
) => {
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
