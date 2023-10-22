import { useState, useEffect } from 'react';

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
  const [repositories, setRepositories] = useState<Repo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/trending-repositories/' + language);
        if (!response.ok) {
          throw new Error('Network response was not OK - repos');
        }
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [language]);

  return { repositories, isLoading };
};
