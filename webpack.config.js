const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');;

module.exports = (env) => {
  const isProd = env.mode === "production";
  return {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html") }),
      ...(isProd ? [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })] : []),
    ],
  };
};
