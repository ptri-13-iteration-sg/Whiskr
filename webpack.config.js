const path = require('path');
const dotenv = require('dotenv').config();
const DotenvWebpack = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './client/src/', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  mode: process.env.MODE,
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.(css|scss)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|JPG)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new DotenvWebpack(),
    new HtmlWebpackPlugin({
      title: 'Whiskr',
      template: path.join(__dirname, './client/public', 'index.html'),
    }),
  ],
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, '/build'),
  //     publicPath: '/',
  //   },
  //   hot: true,
  //   historyApiFallback: true,
  //   compress: true,
  //   port: process.env.DEV_PORT,
  //   proxy: {
  //     '/': {
  //       target: `http://localhost:3000`,
  //     },
  //   },
  // },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/': 'http://localhost:3000',
    },
    historyApiFallback: true,

    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/build/',
    },
  },
};
