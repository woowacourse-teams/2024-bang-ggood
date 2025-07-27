import type { StorybookConfig } from '@storybook/react-webpack5';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// _dirname: 로컬(ESM)과 CI서버(CJS)에서 에러안뜨고 정상 동작하기 위함
const _dirname = (() => {
  if (typeof __dirname === 'undefined') {
    return dirname(fileURLToPath(import.meta.url));
  } else {
    return __dirname;
  }
})();

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    'storybook-addon-remix-react-router',
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  docs: {
    autodocs: true,
  },
  webpackFinal: async config => {
    if (!config.resolve) {
      config.resolve = {
        alias: {},
      };
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(_dirname, '../src'),
    };

    if (!config.module || !config.module.rules) {
      return config;
    }
    config.module.rules = [
      ...config.module.rules.map(rule => {
        if (!rule || rule === '...') {
          return rule;
        }
        if (rule.test && /svg/.test(String(rule.test))) {
          return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
      }),
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    ];

    return config;
  },
};
export default config;
