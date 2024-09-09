// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const fs = require('fs');

// env
const dotenv = require('dotenv');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const env = dotenv.config().parsed;
const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const envKeys = env
  ? Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {})
  : {};

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
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
                // When you environment supports template literals (using browserslist or options) we will generate code using them
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
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[hash:8].[ext]',
            },
          },
        ],
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

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    config.plugins.push(
      sentryWebpackPlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
      }),
    );
    config.devtool = 'source-map';

    config.optimization = {
      // splitChunks: {
      //   chunks: 'all',
      //   minSize: 20000,
      //   maxSize: 250000, // 250KB 단위로 청크를 나눔
      //   cacheGroups: {
      //     defaultVendors: {
      //       test: /[\\/]node_modules[\\/]/,
      //       priority: -10,
      //       reuseExistingChunk: true,
      //       filename: '[name].js',
      //     },
      //     default: {
      //       minChunks: 2,
      //       priority: -20,
      //       reuseExistingChunk: true,
      //     },
      //   },
      // },
    };
    config.plugins.push(new BundleAnalyzerPlugin()); /* 원할때만 켜기 */
  } else {
    config.mode = 'development';
  }
  return config;
};
