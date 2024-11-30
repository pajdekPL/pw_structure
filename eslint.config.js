import eslintConfigPrettier from "eslint-config-prettier";
import playwright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.strict,
  eslintConfigPrettier,
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
    },
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**"],
    rules: {
      "playwright/expect-expect": 0,
    },
  },
  {
    // disable type-aware linting on JS files
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: [
      "node_modules",
      "test-results",
      "playwright-report",
      "blob-report",
      "playwright/.cache",
      ".auth",
      ".env",
    ],
  },
);
