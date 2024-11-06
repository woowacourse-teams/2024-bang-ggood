import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}
type Handler = (start: MousePosition, end: MousePosition) => void;

const useMouseDrag = (handler: Handler) => {
  const [startPosition, setStartPosition] = useState<MousePosition | null>(null);

  useEffect(() => {
    const mousedownListener = (e: MouseEvent) => setStartPosition({ x: e.clientX, y: e.clientY });

    const mouseupListener = (e: MouseEvent) => {
      const endPosition = { x: e.clientX, y: e.clientY };
      if (!startPosition) return;
      handler(startPosition, endPosition);
      setStartPosition(null);
    };

    window.addEventListener('mousedown', mousedownListener);
    window.addEventListener('mouseup', mouseupListener);

    return () => {
      window.removeEventListener('mousedown', mousedownListener);
      window.removeEventListener('mouseup', mouseupListener);
    };
  }, [startPosition, handler]);
};

export default useMouseDrag;
