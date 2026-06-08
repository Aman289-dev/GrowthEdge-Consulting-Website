import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { params, deps = [] } = options;

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(endpoint, { params });
      setData(response.data.data);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(params)]);

  useEffect(() => {
    fetch();
  }, [fetch, ...deps]);

  return { data, loading, error, refetch: fetch };
}
