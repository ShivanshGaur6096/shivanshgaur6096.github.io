import { useState, useCallback } from 'react';
import { VISITED_LINKS_STORAGE_KEY } from '../projectsData';

/**
 * useVisitedLinks hook
 * Reads/writes visited repository URLs to localStorage with safe try/catch.
 */
export function useVisitedLinks() {
  const [visitedLinks, setVisitedLinks] = useState(() => {
    try {
      const stored = localStorage.getItem(VISITED_LINKS_STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const markVisited = useCallback((url) => {
    setVisitedLinks((prev) => {
      const next = new Set(prev);
      next.add(url);
      try {
        localStorage.setItem(VISITED_LINKS_STORAGE_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // storage disabled or full
      }
      return next;
    });
  }, []);

  return { visitedLinks, markVisited };
}

export default useVisitedLinks;
