const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { merge } = require('webpack-merge');
const dotenv = require('dotenv');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// 공통 환경 변수 로드
const commonEnv = dotenv.config({ path: path.resolve(__dirname, '.env') }).parsed || {};

// API 모드에 따른 환경 변수 파일 로드
const apiEnv = process.env.API_ENV;
const envFilePath = `.env.${apiEnv}`;
const specificEnv = dotenv.config({ path: path.resolve(__dirname, envFilePath) }).parsed || {};

// 공통 환경 변수와 특정 환경 변수를 병합
const env = merge(commonEnv, specificEnv);

const isProduction = process.env.NODE_ENV === 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

// 환경 변수를 Webpack DefinePlugin에 적용할 형태로 변환
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    clean: true,
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    allowedHosts: 'all',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  performance: {
    hints: false,
    // maxEntrypointSize: 512000,
    // maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              postprocessor: (content, loaderContext) => {
                const isTemplateLiteralSupported = content[0] === '`';
                return content
                  .replace(/<%=/g, isTemplateLiteralSupported ? `\${` : '" +')
                  .replace(/%>/g, isTemplateLiteralSupported ? '}' : '+ "');
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
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
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
    // config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

    if (process.env.SENTRY_AUTH_TOKEN) {
      config.plugins.push(
        sentryWebpackPlugin({
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
        }),
      );
    }

    config.devtool = 'source-map';

    config.optimization = {
      sideEffects: false,
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            // reuseExistingChunk: true,
            filename: '[name].[chunkhash].js',
          },
        },
      },
    };

    if (process.env.BUNDLE_ANALYZE) {
      console.log('BundleAnalyzer Plugin : ON');
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  } else {
    config.mode = 'development';
  }

  return config;
};
