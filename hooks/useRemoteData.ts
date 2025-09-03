import { useEffect, useState } from 'react';

interface UseRemoteDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useRemoteData<T>(remoteUrl: string, localFallback: T): UseRemoteDataResult<T> {
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
        console.warn(`Failed to fetch remote data from ${remoteUrl}. Falling back to local version.`, e);
        setError(e as Error);
        setData(localFallback); // Fallback to local data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [remoteUrl, localFallback]);

  return { data, loading, error };
}
