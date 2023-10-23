import { useEffect, useState } from 'react';
import { ApiService } from '../services/ApiService';

export const useFetch = <T>(url: string, deps: unknown[] = []) => {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const apiService = new ApiService();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.fetch<T>(url);
        if (!!data) setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // only setIsLoading to false if request was not aborted - fix for React Strict Mode aborting request while mounting twice
        if (!apiService.isAborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      apiService.abort();
    };
  }, deps);

  return [data, isLoading] as const;
};
