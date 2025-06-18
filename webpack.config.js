const path = require("path");

/** Common rule for .ts files */
const tsRule = {
  test: /\.ts$/,
  use: "ts-loader",
  exclude: /node_modules/,
};

/** Resolve config */
const resolve = {
  alias: {
    "@": path.resolve(__dirname, "src/"),
  },
  extensions: [".ts", ".js"],
};

/** 1. UMD minified build for CDN */
const cdnBuild = {
  entry: "./src/cdn.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "cdn.min.js",
    library: {
      name: "CSPine",
      type: "umd",
    },
    globalObject: "this",
  },
  module: { rules: [tsRule] },
  resolve,
  mode: "production", // enables minification
  devtool: "source-map",
};

const esmBuild = {
  entry: {
    module: "./src/CSPine.ts",
    utils: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].mjs",
    library: { type: "module" },
  },
  module: { rules: [tsRule] },
  resolve,
  experiments: {
    outputModule: true, // key for ES Modules
  },
  mode: "production",
  devtool: "source-map",
};

const cjsBuild = {
  entry: {
    module: "./src/CSPine.ts",
    utils: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: { type: "commonjs2" },
  },
  module: { rules: [tsRule] },
  resolve,
  mode: "production",
  devtool: "source-map",
};

module.exports = [cdnBuild, esmBuild, cjsBuild];
