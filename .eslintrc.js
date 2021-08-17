module.exports = {
  root: true, // Important - this is root ESLint config
  extends: [
    'standard',
    'plugin:import/recommended'
  ],
  plugins: [
    'node',
    'promise'
  ],
  // globals: {
  //   Atomics: 'readonly',
  //   SharedArrayBuffer: 'readonly'
  // },
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'max-lines': ['warn', 300],
    'max-lines-per-function': ['warn', 30],
    complexity: ['warn', 5],
    'max-params': ['warn', 3]
  }
}
