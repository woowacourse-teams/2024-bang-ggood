import '@emotion/react';

import theme from '@/styles/theme';

declare module '@emotion/react' {
  export type ThemeType = typeof theme;
  export interface Theme extends ThemeType {}
}
