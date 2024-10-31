import { useEffect, useState, useRef, MutableRefObject, ForwardedRef } from 'react';

export const useCheckWrap = (externalRef?: ForwardedRef<HTMLDivElement>) => {
  const internalRef = useRef<HTMLDivElement | null>(null);
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    const container = internalRef.current;
    if (externalRef) {
      if (typeof externalRef === 'function') {
        externalRef(container);
      } else if ('current' in externalRef) {
        externalRef.current = container;
      }
    }

    const checkWrap = () => {
      if (container) {
        setIsWrapped(container.scrollHeight > container.clientHeight);
      }
    };

    checkWrap(); // Initial check
    window.addEventListener('resize', checkWrap); // Recheck on resize
    return () => window.removeEventListener('resize', checkWrap);
  }, [externalRef]);

  return { containerRef: internalRef, isWrapped };
};