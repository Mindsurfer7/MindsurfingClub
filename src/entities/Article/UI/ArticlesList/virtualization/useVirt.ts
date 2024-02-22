import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/*
    Фичи:
    - только горизонтальная виртуализация
    - фиксированный размер элементов
    - overscan
    - isScrolling
    */

interface UseFixedSizeListProps {
  itemsCount: number;
  itemHeight: number;
  listHeight: number;
  overscan?: number;
  scrollingDelay?: number;
  getScrollElement: () => HTMLElement | null;
}

const DEFAULT_OVERSCAN = 3;
const DEFAULT_SCROLLING_DELAY = 150;

export function useFixedSizeList(props: UseFixedSizeListProps) {
  const {
    itemHeight,
    itemsCount,
    scrollingDelay = DEFAULT_SCROLLING_DELAY,
    overscan = DEFAULT_OVERSCAN,
    listHeight,
    getScrollElement,
  } = props;

  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useLayoutEffect(() => {
    const scrollElement = getScrollElement();

    if (!scrollElement) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop;

      setScrollTop(scrollTop);
    };

    handleScroll();

    scrollElement.addEventListener('scroll', handleScroll);

    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [getScrollElement]);

  useEffect(() => {
    const scrollElement = getScrollElement();

    if (!scrollElement) {
      return;
    }

    let timeoutId: number | null = null;

    const handleScroll = () => {
      setIsScrolling(true);

      if (typeof timeoutId === 'number') {
        clearTimeout(timeoutId);
      }
      //@ts-ignore
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, scrollingDelay);
    };

    scrollElement.addEventListener('scroll', handleScroll);

    return () => {
      if (typeof timeoutId === 'number') {
        clearTimeout(timeoutId);
      }
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [getScrollElement]);

  const { virtualItems, startIndex, endIndex } = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + listHeight;

    let startIndex = Math.floor(rangeStart / itemHeight);
    let endIndex = Math.ceil(rangeEnd / itemHeight);

    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(itemsCount - 1, endIndex + overscan);

    const virtualItems = [];

    for (let index = startIndex; index <= endIndex; index++) {
      virtualItems.push({
        index,
        offsetTop: index * itemHeight,
      });
    }
    return { virtualItems, startIndex, endIndex };
  }, [scrollTop, listHeight, itemsCount]);

  const totalHeight = itemHeight * itemsCount;

  return {
    virtualItems,
    totalHeight,
    startIndex,
    endIndex,
    isScrolling,
  };
}
