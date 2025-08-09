module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off', // Handled by @typescript-eslint/no-unused-vars from react-app
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/no-anonymous-default-export': ['error', {
      allowArray: true,
      allowArrowFunction: false,
      allowAnonymousClass: false,
      allowAnonymousFunction: false,
      allowCallExpression: true,
      allowLiteral: false,
      allowObject: true
    }]
  }
};