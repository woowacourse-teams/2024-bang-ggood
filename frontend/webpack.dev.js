const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const startTime = Date.now();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // js, jsx, ts, tsx
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    {
      apply: compiler => {
        compiler.hooks.done.tap('BuildTimeLogger', stats => {
          const endTime = Date.now();
          const buildTime = ((endTime - startTime) / 1000).toFixed(2);
          console.log(`✅ Webpack Dev Server started in ${buildTime}s`);
        });
      },
    },
  ],
});
