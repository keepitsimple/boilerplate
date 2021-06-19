module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'standard-jsx'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    "max-lines": [ "warn", 300],
    "max-lines-per-function": [ "warn", 30],
    "complexity": [ "warn", 5],
    "max-params": [ "warn", 3]

  }
}
