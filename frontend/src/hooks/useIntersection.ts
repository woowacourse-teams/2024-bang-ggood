import { useCallback, useEffect, useState } from 'react';

const useIntersection = (
  options: IntersectionObserverInit,
  externalRef: React.MutableRefObject<HTMLElement | null>,
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const onIntersection: IntersectionObserverCallback = useCallback(([entry]) => {
    setIsIntersecting(entry.isIntersecting);
  }, []);

  useEffect(() => {
    if (!externalRef.current) return;

    const observer = new IntersectionObserver(onIntersection, {
      ...options,
    });
    observer.observe(externalRef.current);

    return () => {
      observer.disconnect();
    };
  }, [options, onIntersection, externalRef]);

  return { isIntersecting };
};

export default useIntersection;
