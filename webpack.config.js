import * as path from "path";
import * as webpack from "webpack";
import "webpack-dev-server";

const config = {
  mode: "production",
  entry: "./src/app/server.ts",
  output: {
    path: path.resolve("./dist"),
    filename: "api.bundle.js",
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.ts?$/, loader: "ts-loader"},
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  target: "node",
  externals: {
    // You can use `false` or other values if you need something strange here,example will output `module.exports = {};`
    "node:path": "{}",
  },
};

export default config;
