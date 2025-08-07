import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Zmieniam nieużywane importy na warnings zamiast errors
      "@typescript-eslint/no-unused-vars": "warn",
      // Pozostawiam błędy związane z nieescapowanymi cudzysłowami jako errors
      "react/no-unescaped-entities": "error",
      // Pozostawiam błędy związane z any jako errors
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];

export default eslintConfig;
