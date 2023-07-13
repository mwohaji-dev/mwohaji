module.exports = {
  "plugins": [
    "jest"
  ],
  "extends": [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:jest/recommended",
    "prettier"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
