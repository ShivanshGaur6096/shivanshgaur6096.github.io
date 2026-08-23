import { useState, useCallback } from 'react';
import { descriptorItems, endMessages } from '../heroData';

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * useDescriptorQueue hook
 * Starts with 'iOS Developer', then shuffles the remaining 9 items randomly without duplicates.
 * Total items = 10.
 * At item index 6 (tap 6, 7th item), reveals end message 0.
 * At item index 7 (tap 7, 8th item), reveals end message 1.
 * At item index 8 (tap 8, 9th item), reveals end message 2.
 * At item index 9 (tap 9, 10th item), reveals end message 3 and locks.
 */
export function useDescriptorQueue(
  initialItems = descriptorItems,
  customEndMessages = endMessages
) {
  // Always keep 'iOS Developer' as first item, randomize remaining
  const [items] = useState(() => {
    const firstItem = initialItems[0] || 'iOS Developer';
    const remaining = initialItems.slice(1);
    const randomizedRemaining = shuffleArray(remaining);
    return [firstItem, ...randomizedRemaining];
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const isGameOver = currentIndex >= items.length - 1;

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= items.length - 1) {
        return prev; // locked at final state
      }
      return prev + 1;
    });
  }, [items.length]);

  const current = items[currentIndex];

  // End messages mapping:
  // currentIndex 0 to 5 -> null (quiet)
  // currentIndex 6 (7th item) -> endMessages[0]
  // currentIndex 7 (8th item) -> endMessages[1]
  // currentIndex 8 (9th item) -> endMessages[2]
  // currentIndex 9 (10th item) -> endMessages[3]
  let currentEndMessage = null;
  if (currentIndex === 6) currentEndMessage = customEndMessages[0];
  else if (currentIndex === 7) currentEndMessage = customEndMessages[1];
  else if (currentIndex === 8) currentEndMessage = customEndMessages[2];
  else if (currentIndex >= 9) currentEndMessage = customEndMessages[3];

  return {
    current,
    currentIndex,
    totalItems: items.length,
    currentEndMessage,
    isGameOver,
    next,
  };
}

export default useDescriptorQueue;
