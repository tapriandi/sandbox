module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'prettier'],
  ignorePatterns: ['public/**/*.js', 'static/**/*.js'],

  rules: {
    "@next/next/no-img-element": "off"
  },
}
