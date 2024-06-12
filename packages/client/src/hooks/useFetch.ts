import { useEffect, useState } from 'react';
import { ApiService } from '../services/ApiService';

export const useFetch = <T>(
  url: string,
  deps: unknown[] = [],
  initialValue: T | null = null
) => {
  const [data, setData] = useState<T | null>(initialValue);
  const [status, setStatus] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const apiService = new ApiService();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [data, status] = await apiService.fetch<T>(url);
        if (!!data) setData(data);
        // if data is falsy, reset to initial value
        else setData(initialValue);
        if (!!status) setStatus(status);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Only set isLoading to false if request was not aborted due to React Strict Mode mounting twice and aborting the first request resulting in an error displaying in the UI
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

  return [data, isLoading, status] as const;
};
