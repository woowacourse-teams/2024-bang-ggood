const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

// 공통 환경 변수 로드
const commonEnv = dotenv.config({ path: path.resolve(__dirname, '.env') }).parsed || {};

// API 모드에 따른 환경 변수 파일 로드
const apiEnv = process.env.API_ENV || 'development';
const envFilePath = `.env.${apiEnv}`;
const specificEnv = dotenv.config({ path: path.resolve(__dirname, envFilePath) }).parsed || {};

// 공통 환경 변수와 특정 환경 변수를 병합
const env = { ...commonEnv, ...specificEnv };

// 환경 변수를 Webpack DefinePlugin에 적용할 형태로 변환
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      { test: /\.(eot|ttf|woff|woff2)$/i, type: 'asset' },
      { test: /\.(png|jpg|gif|webp|mp4)/i, type: 'asset/resource' },
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
                  'prefixIds',
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    allowedHosts: 'all',
    historyApiFallback: true,
  },
};
