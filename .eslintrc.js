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
    "linebreak-style": ["error", "windows"],
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-closing-tag-location": 0,
    "react/destructuring-assignment": 0,
    "react/no-unused-state": 0,
    "jsx-a11y/no-noninteractive-element-interactions":0,
    "no-nested-ternary": 0,
    "no-control-regex": 0,
    "no-shadow": 0,
    "import/no-extraneous-dependencies": 0,
    "max-len": 0,
    "react/prop-types": 0,
    "no-restricted-globals": 0,
    "no-unused-expressions": 0,
    "react/sort-comp": 0,
    "no-param-reassign": 0,
    "react/prefer-stateless-function": 0,
    "camelcase": 0,
    "consistent-return": 0,
    "class-methods-use-this": 0,
    "import/no-unresolved": 0,
    "no-trailing-spaces": 0,
    "template-curly-spacing": "off",
    "indent": "off"
  },
};
