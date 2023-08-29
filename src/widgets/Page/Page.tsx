import React, { MutableRefObject, ReactNode, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { useInfiniteScroll } from 'shared/lib/hooks/useInitialEffect/useInfiniteScroll';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

const Page: React.FC<PageProps> = ({ className, children, onScrollEnd }) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className as string])}
    >
      {children}
      <div ref={triggerRef}></div>
    </section>
  );
};

export default Page;
