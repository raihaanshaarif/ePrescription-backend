module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    "no-unused-vars": "error",
    "prefer-const": "error",
    "no-unused-expressions": "error",
    "no-undef": "error",
    "no-console": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    process: "readonly",
  },
  ignorePatterns: [
    // List of patterns to ignore, these would replace your .eslintignore file content
    "node_modules/",
    "build/",
    "dist/",
    "*.min.js",
    "coverage/",
    // Add more patterns as required
  ],
};