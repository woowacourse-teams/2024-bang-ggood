// @ts-check

import eslint from '@eslint/js';
import { flatConfigs as importPluginFlat } from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import storybookConfigs from 'eslint-plugin-storybook';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.config(
    {
      files: ['**/*.{ts,tsx,js,jsx}'],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { jsx: true },
          project: './tsconfig.json',
        },
        globals: {
          browser: true,
          es6: true,
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    reactHooksPlugin.configs['recommended-latest'], //  -latest : flat config 라는 의미
    jsxA11yPlugin.flatConfigs.recommended,
    storybookConfigs.configs['flat/recommended'],
    {
      rules: {
        'no-var': 'error',
        'no-multiple-empty-lines': 'error',
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
        eqeqeq: 'error',
        'dot-notation': 'warn',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
      },
    },
    // import 관리 규칙 (정렬, unused import)
    {
      plugins: {
        'unused-imports': unusedImportsPlugin,
        'simple-import-sort': simpleImportSortPlugin,
        import: importPluginFlat.recommended.plugins.import, // plugin을 tricky하게 뽑아 씀
      },

      rules: {
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
      },
    },
    // JSX 문자열 prop 규칙: {""} 대신 """ 사용
    {
      plugins: { react: reactPlugin },
      rules: {
        'react/jsx-curly-brace-presence': [
          'error',
          {
            props: 'never', // 문자열 리터럴: prop="text"만 허용
            children: 'ignore', // <Comp>{'text'}</Comp> 는 신경 쓰지 않음
            propElementValues: 'ignore', // <Icon icon={<Svg />} /> 같은 건 그대로
          },
        ],
      },
    },
  ),

  {
    ignores: ['dist/**', 'webpack.*.js', 'tsconfig.json', 'public/**', 'assets/**', '*.config.js'],
  },
];
