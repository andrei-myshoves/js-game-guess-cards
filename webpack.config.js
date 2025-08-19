const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|png|jpg|jpeg|webp)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html") }),
      ...(isProd ? [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })] : []),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, "public"),
      },
      hot: true,
      port: 3000,
      open: true,
    },
    devtool: isProd ? "source-map" : "eval-source-map",
    optimization: {
      minimize: isProd,
      minimizer: ["...", new CssMinimizerPlugin()],
    },
  };
};
