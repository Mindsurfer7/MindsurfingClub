import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
  callback?: () => void;
}
export function useInfiniteScroll({
  triggerRef,
  wrapperRef,
  callback,
}: UseInfiniteScrollOptions) {
  let observer: IntersectionObserver | null;
  console.log('hooked');
  useEffect(() => {
    console.log('inside useeffect');
    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;

    if (callback) {
      console.log('if callback');

      const options = {
        root: null,
        rootMargin: '100px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerElement);
    }

    return () => {
      if (observer && triggerElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerElement);
      }
    };
  }, [triggerRef, wrapperRef]);
}
