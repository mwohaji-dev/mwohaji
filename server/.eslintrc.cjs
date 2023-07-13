module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "root": true,
  "parserOptions": {
    "ecmaVersion": 2022,
    "project": true,
    "tsconfigRootDir": __dirname,
  },
  "rules": {
    "prettier/prettier": "error"
  },
  "ignorePatterns": ['.eslintrc.cjs']
}
