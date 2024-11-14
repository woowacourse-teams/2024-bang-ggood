import { MutableRefObject, useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}
type Handler = (start: MousePosition, end: MousePosition) => void;

const useMouseDrag = (ref: MutableRefObject<HTMLElement | null>, handler: Handler) => {
  const [startPosition, setStartPosition] = useState<MousePosition | null>(null);

  useEffect(() => {
    const pointerdownListener = (e: MouseEvent) => setStartPosition({ x: e.clientX, y: e.clientY });

    const touchStartListener = (e: TouchEvent) =>
      setStartPosition({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientX });

    const pointerupListener = (e: MouseEvent) => {
      const endPosition = { x: e.clientX, y: e.clientY };
      if (!startPosition) return;
      handler(startPosition, endPosition);
      setStartPosition(null);
    };
    const touchEndListener = (e: TouchEvent) => {
      const endPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      if (!startPosition) return;
      handler(startPosition, endPosition);
      setStartPosition(null);
    };

    const el = ref.current;

    el?.addEventListener('mousedown', pointerdownListener);
    el?.addEventListener('touchstart', touchStartListener);
    el?.addEventListener('mouseup', pointerupListener);
    el?.addEventListener('touchend', touchEndListener);

    return () => {
      el?.removeEventListener('mousedown', pointerdownListener);
      el?.removeEventListener('mouseup', pointerupListener);
      el?.removeEventListener('touchstart', touchStartListener);
      el?.removeEventListener('touchend', touchEndListener);
    };
  }, [startPosition, ref, handler]);
};

export default useMouseDrag;
