import { useFetch } from './useFetch';

export type Developer = {
  avatarImgSrc: string | undefined;
  company: string;
  dateJoined?: string;
  link: string | undefined;
  id: number;
  name: string;
  popularRepo: {
    title: string;
    description?: string;
    link?: string;
  };
  userName: string;
};

export const useDevelopers = (language: string) => {
  const [developers, isLoading, status] = useFetch<Developer[]>(
    '/api/trending-developers/' + language,
    [language]
  );

  return { developers, isLoading, status };
};
