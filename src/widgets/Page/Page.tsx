import React, { MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { useInfiniteScroll } from 'shared/lib/hooks/useInitialEffect/useInfiniteScroll';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { setScrollPosition } from 'features/ScrollSaver/model/slice/scrollSaverSlice';
import { useSelector } from 'react-redux';
import { getScrollByPath, getScrollPosition } from 'features/ScrollSaver';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StateScheme } from 'App/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

const Page: React.FC<PageProps> = ({ className, children, onScrollEnd }) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateScheme) =>
    getScrollByPath(state, pathname),
  );

  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.scrollTop);

    dispatch(
      setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      }),
    );
  }, 500);

  return (
    <section
      ref={wrapperRef}
      onScroll={onScroll}
      className={classNames(cls.Page, {}, [className as string])}
    >
      {children}
      {onScrollEnd ? (
        <div className={cls.trigger} ref={triggerRef}></div>
      ) : null}
    </section>
  );
};

export default Page;
