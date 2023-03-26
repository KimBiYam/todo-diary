module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    '@typescript-eslint/no-redeclare': 'off',
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
};
