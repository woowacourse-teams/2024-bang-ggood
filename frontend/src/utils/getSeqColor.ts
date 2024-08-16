import theme from '@/styles/theme';

const getSeqColor = (index: number, color?: string[]) => {
  const colorList = color ?? ['green', 'yellow', 'blue', 'red'];
  const colorKey = colorList[index % colorList.length];

  const palette = theme.palette as Record<string, string>;
  return {
    color200: palette[`${colorKey}200`],
    color500: palette[`${colorKey}500`],
    color600: palette[`${colorKey}600`],
  };
};

export default getSeqColor;
