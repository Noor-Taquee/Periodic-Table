import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  // Base JS & TS Recommended rules
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React Recommended Flat Configs
  reactPlugin.configs.flat.recommended,

  // Disables 'React must be in scope' rules for React 17+
  reactPlugin.configs.flat["jsx-runtime"],

  // Configures the rules of React Hooks
  reactHooksPlugin.configs.flat.recommended,

  // Custom environment and parser settings
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    rules: {
      "no-redeclare": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {
      "no-undef": "error",
    },
  },
  eslintConfigPrettier,
];
