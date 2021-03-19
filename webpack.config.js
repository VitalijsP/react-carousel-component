const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  context: __dirname,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/main.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", 
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  devtool: "source-map", /* for debugging "cheap-module-eval-source-map" , prodaction No, after that restart server */
  devServer: {
    port: 8000,
    contentBase: path.resolve(__dirname, "dist"),
  },
};
