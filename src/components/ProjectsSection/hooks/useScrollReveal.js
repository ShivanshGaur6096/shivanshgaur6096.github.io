import { useInView } from 'react-intersection-observer';

/**
 * useScrollReveal hook
 * Wraps react-intersection-observer to trigger entrance animation once in view.
 */
export function useScrollReveal(options = { threshold: 0.15, triggerOnce: true }) {
  const { ref, inView } = useInView(options);
  return { ref, inView };
}

export default useScrollReveal;
