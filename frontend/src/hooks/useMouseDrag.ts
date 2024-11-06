import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}
type Handler = (start: MousePosition, end: MousePosition) => void;

const useMouseDrag = (handler: Handler) => {
  const [startPosition, setStartPosition] = useState<MousePosition | null>(null);

  useEffect(() => {
    const pointerdownListener = (e: PointerEvent) => setStartPosition({ x: e.clientX, y: e.clientY });

    const pointerupListener = (e: PointerEvent) => {
      const endPosition = { x: e.clientX, y: e.clientY };
      if (!startPosition) return;
      handler(startPosition, endPosition);
      setStartPosition(null);
    };

    window.addEventListener('pointerdown', pointerdownListener);
    window.addEventListener('pointerup', pointerupListener);

    return () => {
      window.removeEventListener('pointerdown', pointerdownListener);
      window.removeEventListener('pointerup', pointerupListener);
    };
  }, [startPosition, handler]);
};

export default useMouseDrag;
