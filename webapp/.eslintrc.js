module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-redeclare': 'off',
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
};
