const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    // new WorkboxWebpackPlugin.GenerateSW(), 안쓰니까 그냥 주석 해둠
    process.env.SENTRY_AUTH_TOKEN &&
      sentryWebpackPlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        sourcemaps: {
          filesToDeleteAfterUpload: ['**/*.js.map', '**/*.css.map', '**/*.LICENSE.txt'],
        },
      }),

    process.env.BUNDLE_ANALYZE && new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: '[name].[chunkhash].js',
        },
      },
    },
  },
});

if (process.env.BUNDLE_ANALYZE) {
  console.log('Bundle Anlazyer ON');
}
