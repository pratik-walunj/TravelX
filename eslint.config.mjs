import next from "eslint-config-next";

/** Flat ESLint config for Next.js 16 (next lint was removed; use the ESLint CLI). */
const eslintConfig = [
  ...next,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "data/cms/**", // generated from the CMS
      "content/**", // CMS content files
      "scripts/**", // node/tsx utility scripts
    ],
  },
  {
    rules: {
      // These patterns (mount flags, hydrating from localStorage) intentionally
      // set state inside an effect — the canonical SSR-safe approach.
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
