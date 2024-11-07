import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}
type Handler = (start: MousePosition, end: MousePosition) => void;

const useMouseDrag = (handler: Handler) => {
  const [startPosition, setStartPosition] = useState<MousePosition | null>(null);

  useEffect(() => {
    const pointerdownListener = (e: MouseEvent) => {
      setStartPosition({ x: e.clientX, y: e.clientY });
    };
    const touchStartListener = (e: TouchEvent) => {
      setStartPosition({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientX });
    };

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

    window.addEventListener('mousedown', pointerdownListener);
    window.addEventListener('touchstart', touchStartListener);
    window.addEventListener('mouseup', pointerupListener);
    window.addEventListener('touchend', touchEndListener);

    return () => {
      window.removeEventListener('mousedown', pointerdownListener);
      window.removeEventListener('mouseup', pointerupListener);
      window.removeEventListener('touchstart', touchStartListener);
      window.removeEventListener('touchend', touchEndListener);
    };
  }, [startPosition, handler]);
};

export default useMouseDrag;
