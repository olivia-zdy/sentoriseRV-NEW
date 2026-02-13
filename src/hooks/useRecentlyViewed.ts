import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sentorise-recently-viewed';
const MAX_ITEMS = 6;

export const useRecentlyViewed = (currentProductId?: string) => {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const ids: string[] = stored ? JSON.parse(stored) : [];
      setRecentIds(ids);
    } catch {
      setRecentIds([]);
    }
  }, []);

  // Track a product view
  const trackView = useCallback((productId: string) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let ids: string[] = stored ? JSON.parse(stored) : [];
      ids = ids.filter(id => id !== productId);
      ids.unshift(productId);
      ids = ids.slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      setRecentIds(ids);
    } catch {}
  }, []);

  // Get recent IDs excluding current product
  const recentlyViewed = currentProductId
    ? recentIds.filter(id => id !== currentProductId)
    : recentIds;

  return { recentlyViewed, trackView };
};
