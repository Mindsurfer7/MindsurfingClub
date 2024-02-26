import { useEffect, useRef } from 'react';

const useViewTracker = (callback: any) => {
  const trigger = useRef();

  // const callback = (entries: IntersectionObserverEntry[]) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         console.log('me2');
  //         setVal(1);
  //       }
  //     });
  //   };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
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
  }, []); //trigger.current, callback надо помещать в массив ?
};
