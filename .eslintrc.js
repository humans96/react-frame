module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // "strict": 0
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/destructuring-assignment": 0,
    "react/prop-types": 0,
    "no-restricted-globals": 0,
    "no-unused-expressions": 0,
    "react/sort-comp": 0,
    "no-param-reassign": 0,
    "react/prefer-stateless-function": 0,
    "camelcase": 0,
    "consistent-return": 0,
    "class-methods-use-this": 0,
    "import/no-unresolved": 0
  },
};
