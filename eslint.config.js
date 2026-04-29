const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.extends("universe/native", "universe/shared/typescript-analysis"),
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    plugins: {
      "unused-imports": require("eslint-plugin-unused-imports"),
      "simple-import-sort": require("eslint-plugin-simple-import-sort"),
    },
    rules: {
      "prettier/prettier": "off",
      "node/handle-callback-err": "off",
      "no-void": "off",
      "import/order": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "unused-imports/no-unused-imports": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "max-lines": ["warn", 800],
      "max-lines-per-function": ["warn", 500],
    },
  },
];
