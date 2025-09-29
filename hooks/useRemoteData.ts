import { useCallback, useEffect, useRef, useState } from 'react';

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

  const eTagRef = useRef<string | null>(null);
  const lastModifiedRef = useRef<string | null>(null);

  const fetchData = useCallback(async () => {
    // Show loading indicator only on the initial fetch
    const isInitialFetch = !eTagRef.current && !lastModifiedRef.current;
    if (isInitialFetch) {
      setLoading(true);
    }
    setError(null);

    try {
      const headers: Record<string, string> = {};
      if (eTagRef.current) {
        headers['If-None-Match'] = eTagRef.current;
      }
      if (lastModifiedRef.current) {
        headers['If-Modified-Since'] = lastModifiedRef.current;
      }

      const response = await fetch(remoteUrl, {
        cache: 'no-store',
        headers,
      });

      if (response.status === 304) {
        // Data has not changed, do nothing.
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      eTagRef.current = response.headers.get('ETag');
      lastModifiedRef.current = response.headers.get('Last-Modified');

      const remoteData = await response.json();
      setData(remoteData);
    } catch (e) {
      setError(e as Error);
      setData(null);
    } finally {
      if (isInitialFetch) {
        setLoading(false);
      }
    }
  }, [remoteUrl]);

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}