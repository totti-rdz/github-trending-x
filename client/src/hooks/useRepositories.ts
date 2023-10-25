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

export const useRepositories = (language: string) => {
  const [repositories, isLoading, status] = useFetch<Repo[]>(
    '/api/trending-repositories/' + language,
    [language]
  );

  return { repositories, isLoading, status };
};
