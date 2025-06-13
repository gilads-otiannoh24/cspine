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
    "@src": path.resolve(__dirname, "src/"),
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
      name: "AlpineCSPUtils",
      type: "umd",
    },
    globalObject: "this",
  },
  module: { rules: [tsRule] },
  resolve,
  mode: "production", // enables minification
  devtool: "source-map",
};

/** 2. ESM build */
const esmBuild = {
  entry: "./src/utils.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "utils.esm.js",
    library: {
      type: "module",
    },
  },
  module: { rules: [tsRule] },
  resolve,
  experiments: {
    outputModule: true,
  },
  mode: "production",
  devtool: "source-map",
};

/** 3. CommonJS build */
const cjsBuild = {
  entry: "./src/utils.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "utils.cjs.js",
    library: {
      type: "commonjs2",
    },
  },
  module: { rules: [tsRule] },
  resolve,
  mode: "production",
  devtool: "source-map",
};

module.exports = [cdnBuild, esmBuild, cjsBuild];
