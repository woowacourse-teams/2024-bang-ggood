
const color = {
  /* Primary */
  primary: {
    100: '#FFF9E5',
    200: '#FFF4CC',
    300: '#FEEA9A',
    400: '#FEE067',
    500: '#FFD53D',
    600: '#FFBC0A',
  },

  /* Secondary */
  secondary: {
    100: '#DCFCE9',
    200: '#B9F8D4',
    300: '#7BF1B2',
    400: '#05E073',
    500: '#00C96B',
    600: '#009952',
  },

  /* Green */
  green: {
    100: '#C8E6C9',
    200: '#ADDAAF',
    300: '#87C98A',
    400: '#70BF73',
  },

  /* Blue */
  blue: {
    100: '#B0D4FD',
    200: '#8DC1FC',
    300: '#526DFF',
    400: '#4F66E0',
    500: '#4F66E0',
  },

  /* Red */
  red: {
    100: '#FEBDAF',
    200: '#FD9F8C',
    300: '#FC7254',
    400: '#DD6950',
  },

  /* Black/White */
  mono: {
    black: '#171719',
    white: '#FFFFFF',
  },

  /* Gray */
  gray: {
    50: '#F7F7F7',
    100: '#F1F1F1',
    200: '#E5E5E5',
    300: '#C7C7C7',
    400: '#A6A6A6',
    500: '#7C7C7C',
    600: '#484947',
  },
} as const;

export default color;

export type ColorType = typeof color;
