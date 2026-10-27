import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-reveal animations using IntersectionObserver.
 * Adds the 'visible' class to elements with the 'reveal' class when they
 * enter the viewport.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1), default 0.1
 * @param {string} options.rootMargin - Root margin for observer, default '0px 0px -60px 0px'
 * @param {number} options.staggerDelay - Delay between staggered reveals in ms, default 80
 */
export function useScrollReveal({
  threshold = 0.1,
  rootMargin = '0px 0px -60px 0px',
  staggerDelay = 80,
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * staggerDelay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [threshold, rootMargin, staggerDelay]);

  return containerRef;
}

export default useScrollReveal;
