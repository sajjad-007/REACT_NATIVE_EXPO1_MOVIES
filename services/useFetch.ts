import { useEffect, useState } from 'react';

//<T>(fetchFunction: () => Promise<T>) means “I accept a fetch function that returns a promise of some type T, and I’ll make sure to return that same type.”
const useFetch = <T>(thefunction: () => Promise<T>, autoFetch: true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await thefunction();
      setData(results);
    } catch (err) {
      setError(
        //In JavaScript (and React Native), Error is a built-in class that represents an error object.
        //instanceof checks if a value is an instance of a specific class.
        err instanceof Error ? err : new Error('An error has occoured!')
      );
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return {
    data,
    error,
    loading,
    reset,
    refetch: fetchData,
  };
};

export default useFetch;
