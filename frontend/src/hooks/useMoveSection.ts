const useMoveSection = (sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>) => {
  const scrollToPrevSection = (index: number) => {
    if (index === 0) return;
    const nextSection = sectionRefs.current[index - 1];

    if (nextSection) {
      const nextSectionTop = nextSection.offsetTop;
      window.scrollTo({
        top: nextSectionTop,
        behavior: 'smooth',
      });
    }
  };

  const scrollToNextSection = (index: number) => {
    if (index >= sectionRefs.current.length - 1) return;
    const nextSection = sectionRefs.current[index + 1];

    if (nextSection) {
      const nextSectionTop = nextSection.offsetTop;
      window.scrollTo({
        top: nextSectionTop,
        behavior: 'smooth',
      });
    }
  };

  const handleSectionClick = (index: number, event: React.MouseEvent) => {
    const sectionElement = sectionRefs.current[index];
    if (!sectionElement) return;

    const sectionHeight = sectionElement.offsetHeight;
    const clickYPosition = event.clientY - sectionElement.getBoundingClientRect().top;

    if (clickYPosition < sectionHeight / 2) {
      scrollToPrevSection(index);
    } else {
      scrollToNextSection(index);
    }
  };

  return { scrollToPrevSection, scrollToNextSection, handleSectionClick };
};

export default useMoveSection;
