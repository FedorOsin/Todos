module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@typescript-eslint", "eslint-plugin-import"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "warn",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@app", "./src/app"],
          ["@assets", "./src/assets"],
          ["@components", "./src/components"],
          ["@features", "./src/features"],
          ["@pages", "./src/pages"],
          ["@store", "./src/store"],
          ["@types", "./src/types.ts"],
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
