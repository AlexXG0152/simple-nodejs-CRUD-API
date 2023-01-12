import * as path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config = {
  mode: "production",
  entry: "./src/app/server.ts",
  output: {
    path: path.resolve("./dist"),
    filename: "api.bundle.cjs",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: "ts-loader" }],
  },
  experiments: {
    topLevelAwait: true,
  },
  target: "node",
  externals: {
    "node:path": "{}",
  },
};

export default config;
