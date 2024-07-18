const palette = {
  /*yellow*/
  yellow600: '#FFC107',
  yellow500: '#FFDB5D',
  yellow400: '#FFE27D',
  yellow300: '#FFEA9E',
  yellow200: '#FFF1BE',
  yellow100: '#FFF8DF',
  /*green*/
  green600: '#22BD6A',
  green500: '#49CE7F',
  green200: '#B6EBCC',
  /*subGreen*/
  subGreen600: '#8BB26B',
  subGreen500: '#A6CF85',
  subGreen200: '#D3ECAD',
  /* grey */
  grey600: '#484947',
  grey500: '#7C7C7C',
  grey400: '#A6A6A6',
  grey300: '#C7C7C7',
  grey200: '#E5E5E5',
  grey100: '#F1F1F1',
  /* original */
  black: '#363636',
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
