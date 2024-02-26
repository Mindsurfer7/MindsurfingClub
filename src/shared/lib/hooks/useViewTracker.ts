import { useEffect, useRef } from 'react';

interface UseViewTrackerOptions {
  triggerOnce?: boolean;
}

export const useViewTracker = <T>(
  callback: Function,
  options?: UseViewTrackerOptions,
) => {
  const trigger = useRef<HTMLDivElement | null>(null);

  const callAndDisconect = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
        if (options?.triggerOnce) {
          observer.disconnect();
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callAndDisconect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      if (trigger.current) {
        observer.unobserve(trigger.current);
      }
    };
  }, [trigger.current, callback]);

  return { trigger };
};
