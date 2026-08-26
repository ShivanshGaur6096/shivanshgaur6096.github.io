import { useState, useEffect } from 'react';
import { fetchAppStoreData } from '../../../services/appStoreService';

/**
 * useAppStoreData Hook
 * Asynchronously fetches live App Store telemetry for an app.
 * Utilizes Stale-While-Revalidate with instant local storage hydration.
 */
export function useAppStoreData(appStoreId, country = 'us') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(appStoreId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!appStoreId) {
      setData(null);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        const result = await fetchAppStoreData(appStoreId, country);
        if (isMounted) {
          if (result) {
            setData(result);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [appStoreId, country]);

  return { data, loading, error };
}

export default useAppStoreData;
