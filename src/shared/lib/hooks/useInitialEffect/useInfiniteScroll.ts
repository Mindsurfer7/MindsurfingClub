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
  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;

    if (callback) {
      const options = {
        root: null, //wrapperElement ЪЪ null
        rootMargin: '100px', // rootMargin: '0px', 100px было у меня 200 также стояло когда кажется все работало
        threshold: 1.0, //даун надо было коммитить пока все работает))
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          console.log('isIntersecting');

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
