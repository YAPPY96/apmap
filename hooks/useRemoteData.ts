import { useEffect, useState, useCallback } from 'react';

interface UseRemoteDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useRemoteData<T>(remoteUrl: string): UseRemoteDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(remoteUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const remoteData = await response.json();
      setData(remoteData);
    } catch (e) {
      console.error(`Failed to fetch remote data from ${remoteUrl}.`, e);
      setError(e as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [remoteUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}