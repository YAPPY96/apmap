import { useEffect, useState } from 'react';

interface UseRemoteDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useRemoteData<T>(remoteUrl: string): UseRemoteDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(remoteUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const remoteData = await response.json();
        setData(remoteData);
      } catch (e) {
        console.error(`Failed to fetch remote data from ${remoteUrl}.`, e);
        setError(e as Error);
        setData(null); // Set data to null on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [remoteUrl]);

  return { data, loading, error };
}
