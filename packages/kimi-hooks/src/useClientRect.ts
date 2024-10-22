import { useRef, useState, useEffect, useCallback } from "react";

import { useEventListener } from "./useEventListener";

// ----------------------------------------------------------------------

type ScrollElValue = {
  scrollWidth: number;
  scrollHeight: number;
};

type DOMRectValue = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type UseClientRectReturn = DOMRectValue &
  ScrollElValue & {
    elementRef: React.RefObject<HTMLDivElement>;
  };

export function useClientRect(
  inputRef?: React.RefObject<HTMLDivElement>
): UseClientRectReturn {
  const initialRef = useRef<HTMLDivElement>(null);

  const elementRef = inputRef || initialRef;

  const [state, setState] = useState<UseClientRectReturn>({
    elementRef,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scrollWidth: 0,
    scrollHeight: 0,
  });

  const handleResize = useCallback(() => {
    if (elementRef?.current) {
      const clientRect = elementRef.current.getBoundingClientRect();

      setState({
        elementRef,
        top: clientRect.top,
        right: clientRect.right,
        bottom: clientRect.bottom,
        left: clientRect.left,
        x: clientRect.x,
        y: clientRect.y,
        width: clientRect.width,
        height: clientRect.height,
        scrollWidth: elementRef.current.scrollWidth,
        scrollHeight: elementRef.current.scrollHeight,
      });
    }
  }, [elementRef]);

  useEventListener("resize", handleResize);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return state;
}
