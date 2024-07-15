const palette = {
  /*yellow*/
  yellow500: '#F7CA58',
  yellow400: '#FFDB5D',
  yellow300: '#FFE27D',
  yellow200: '#FFDB5D',
  yellow100: '#FCF6E2',
  /*green*/
  green500: '#49CE7F',
  green200: '#B6EBCC',
  subGreen500: '#A6CF85',
  subGreen200: '#D3ECAD',
  /* grey */
  grey600: '#FC6A4B',
  grey500: '#7C7C7C',
  grey400: '#A6A6A6',
  grey300: '#C7C7C7',
  grey200: '#DFDFDF',
  grey100: '#F3F3F3',
  /* original */
  black: '#1B1C19',
  white: '#FFFFFF',
};

const text = {
  size: {
    xSmall: '12px',
    small: '14px',
    medium: '16px',
    large: '18px',
    xLarge: '24px',
  },
  weight: {
    thin: 200,
    medium: 400,
    bold: 700,
  },
};

const theme = {
  palette,
  text,
};

export default theme;

export type ThemeType = typeof theme;
