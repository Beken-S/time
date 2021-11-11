const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}
const filename = (dir, ext) =>
  mode === "development"
    ? `${dir}/[name].${ext}`
    : `${dir}/[name].[contenthash].${ext}`;

module.exports = {
  mode: mode,
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",
  output: {
    filename: filename("scripts", "js"),
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true,
  },
  plugins: [
    new MiniCSSExtractPlugin({ filename: filename("styles", "css") }),
    new HTMLWebpackPlugin({ template: "./index.html" }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          mode === "development" ? "style-loader" : MiniCSSExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.mp3$/i,
        type: "asset/resource",
        generator: {
          filename: "sounds/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
    ],
  },
};
