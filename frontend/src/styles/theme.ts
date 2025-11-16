import color from '@/styles/color';
import font from '@/styles/font';

const palette = {
  /* yellow */
  yellow700: '#D09808',
  yellow600: '#FFC107',
  yellow500: '#FFDB5D',
  yellow400: '#FFE27D',
  yellow300: '#FFEA9E',
  yellow200: '#FFF1BE',
  yellow100: '#FFF8DF',
  /* green */
  green600: '#22BD6A',
  green500: '#49CE7F',
  green400: '#6DD899',
  green300: '#92E2B2',
  green200: '#B6EBCC',
  green100: '#DBF5E5',
  green50: '#E6F8ED',
  /* subGreen */
  subGreen600: '#8BB26B',
  subGreen500: '#A6CF85',
  subGreen400: '#B8D99E',
  subGreen300: '#CAE2B6',
  subGreen200: '#D3ECAD',
  subGreen100: '#EDF5E7',
  /* red */
  red600: '#D9593E',
  red500: '#FC6A4B',
  red200: '#FFC7AF',
  /* blue */
  blue600: '#4F66E0',
  blue500: '#5F79FF',
  blue200: '#B4D6FD',
  /* grey */
  grey600: '#484947',
  grey500: '#7C7C7C',
  grey400: '#A6A6A6',
  grey300: '#C7C7C7',
  grey200: '#E5E5E5',
  grey100: '#F1F1F1',
  grey50: '#F5F5F5',
  /* original */
  black: '#363636',
  white: '#FFFFFF',
  background: '#F5F5F5',

  /* etc */
  kakao: '#FEE500',
} as const;

const text = {
  size: {
    xxSmall: '1.2rem',
    xSmall: '1.4rem',
    small: '1.6rem',
    medium: '1.8rem',
    large: '2.2rem',
    xLarge: '2.6rem',
  },
  weight: {
    thin: 200,
    medium: 400,
    semiBold: 600,
    bold: 700,
  },
};

const viewport = {
  MOBILE: 576,
  TABLET: 800,
  DESKTOP: 1280,
};

/*range: 10~50 */
const zIndex = {
  DROPDOWN: 5,
  FLOATING_BUTTON: 10,
  TABS: 10,
  HEADER: 10,
  MODAL: 20,
  TOAST: 30,
  MAP_MESSAGE: 100,
};

const theme = {
  palette, //TODO: 마이그레이션이 끝나면 삭제
  text, //TODO: 마이그레이션이 끝나면 삭제
  font,
  color,
  zIndex,
  viewport,
};

export default theme;

export type ThemeType = typeof theme;
