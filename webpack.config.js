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
        // CSS Modules только для *.module.css
        {
          test: /\.module\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
              },
            },
          ],
        },
        // Глобальные стили для остальных .css
        {
          test: /\.css$/i,
          exclude: /\.module\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: { modules: false },
            },
          ],
        },
        {
          test: /\.svg$/i,
          type: "asset/source",
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
    devtool: isProd ? false : "source-map",
    optimization: {
      minimize: isProd,
      minimizer: ["...", new CssMinimizerPlugin()],
    },
  };
};
