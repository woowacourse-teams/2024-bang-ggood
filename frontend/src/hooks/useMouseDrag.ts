import { MutableRefObject, useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}
type Handler = (start: MousePosition, end: MousePosition) => void;

const useMouseDrag = (ref: MutableRefObject<HTMLElement | null>, handler: Handler) => {
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

    ref.current?.addEventListener('mousedown', pointerdownListener);
    ref.current?.addEventListener('touchstart', touchStartListener);
    ref.current?.addEventListener('mouseup', pointerupListener);
    ref.current?.addEventListener('touchend', touchEndListener);

    return () => {
      ref.current?.removeEventListener('mousedown', pointerdownListener);
      ref.current?.removeEventListener('mouseup', pointerupListener);
      ref.current?.removeEventListener('touchstart', touchStartListener);
      ref.current?.removeEventListener('touchend', touchEndListener);
    };
  }, [startPosition, handler]);
};

export default useMouseDrag;
