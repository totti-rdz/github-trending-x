import { useState, useEffect } from 'react';

export type Language = { label: string; value: string };

export const useLanguageOptions = () => {
  const [languageOptions, setLanguageOptions] = useState<Language[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLanguageOptions = async () => {
      try {
        const response = await fetch('/api/programming-languages');
        const languageOptions = (await response.json()) as Language[];
        const languageOptionsFiltered = languageOptions.filter(
          (lang) => lang.value !== undefined
        );
        setLanguageOptions(languageOptionsFiltered);
      } catch (error) {
        console.error('Error fetching languages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLanguageOptions();
  }, []);

  return { languageOptions, isLoading };
};
