import { useCallback, useMemo, useState } from 'react';

interface UseEnterPressBind {
  onKeyDown: () => void;
}

type UseEnterPressResult = [UseEnterPressBind];

export const useEnterPress = (callback: () => void) => {
  const onKeyDown = useCallback((e: any, callback) => {
    if (e.key === 'Enter') {
      callback();
    }
  }, []);

  return useMemo(() => [onKeyDown], [onKeyDown]);
};
