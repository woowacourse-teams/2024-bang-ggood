export const getOpacityColor = (color: string, opacity: number): string => {
  const fullHex =
    color.length === 4
      ? '#' +
        color
          .slice(1)
          .split('')
          .map(c => c + c)
          .join('')
      : color;

  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  if (!rgb) return color;

  const [r, g, b] = [1, 2, 3].map(i => parseInt(rgb[i], 16));
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
