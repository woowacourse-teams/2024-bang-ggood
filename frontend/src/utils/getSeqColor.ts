import theme from '@/styles/theme';

const getSeqColor = (index: number) => {
  const colorList = ['green', 'yellow', 'blue', 'red'];
  const colorKey = colorList[index % colorList.length];

  const palette = theme.palette as Record<string, string>;
  return {
    color300: palette[`${colorKey}300`],
    color500: palette[`${colorKey}500`],
    color600: palette[`${colorKey}600`],
  };
};

export default getSeqColor;
