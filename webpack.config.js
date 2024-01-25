// Modules
const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // generate an HTML file and inject the necessary script tags automatically

dotenv.config();

module.exports = {
  entry: path.join(__dirname, "./client/src/", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
  },
  mode: process.env.MODE,
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: /\.(css|scss)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|JPG)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Whiskr",
      template: path.join(__dirname, "./client/public", "index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "/build"),
      publicPath: "/",
    },
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: process.env.DEV_PORT,
    proxy: {
      "/": {
        target: `http://localhost:${process.env.SERV_PORT}`,
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  performance: {
    hints: false, // webpack won't emit warnings based on these size limits during the build
    maxEntrypointSize: 512000, // sets the max size, in bytes, that the entry point (main bundle) file should be before triggering a warning or error
    maxAssetSize: 512000, // sets the maximum size for individual assets (like images, stylesheets, etc.)
  },
};
