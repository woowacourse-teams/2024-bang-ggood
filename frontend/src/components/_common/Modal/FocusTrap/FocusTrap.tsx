import React, { useEffect, useRef } from 'react';

interface FocusTrapProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
  onEscapeFocusTrap?: () => void;
}

const getFocusableElements = (element: HTMLElement | null): HTMLElement[] => {
  if (!element) return [];

  const focusableSelectors = [
    'a[href]',
    'button',
    'input',
    'textarea',
    'select',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  return Array.from(element.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
    el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
  );
};

const FocusTrap = ({ children, onEscapeFocusTrap }: FocusTrapProps) => {
  const focusTrapRef = useRef<HTMLDivElement>(null);
  const focusableElements = useRef<HTMLElement[]>([]);
  const currentFocusIndex = useRef<number>(-1);

  useEffect(() => {
    if (focusTrapRef.current) {
      focusableElements.current = getFocusableElements(focusTrapRef.current);

      // 첫 번째 포커스 요소로 이동
      if (focusableElements.current.length > 0) {
        currentFocusIndex.current = 0;
        focusableElements.current[0].focus();
      }
    }
  }, []);

  const focusNextElement = () => {
    currentFocusIndex.current = (currentFocusIndex.current + 1) % focusableElements.current.length;
    focusableElements.current[currentFocusIndex.current]?.focus();
  };

  const focusPrevElement = () => {
    currentFocusIndex.current =
      (currentFocusIndex.current - 1 + focusableElements.current.length) % focusableElements.current.length;
    focusableElements.current[currentFocusIndex.current]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        if (event.shiftKey) {
          focusPrevElement();
        } else {
          focusNextElement();
        }
        break;
      case 'Escape':
        if (onEscapeFocusTrap) onEscapeFocusTrap();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => handleKeyDown(event);
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const child = React.Children.only(children);

  const Component = React.cloneElement(child, {
    ref: focusTrapRef,
    tabIndex: -1,
  });

  return <div>{Component}</div>;
};

export default FocusTrap;
