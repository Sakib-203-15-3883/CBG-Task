module.exports = {
  root: true,
  extends: ['@react-native', 'eslint:recommended', 'plugin:react-native/all'],

  plugins: ['react-native'],
  rules: {
    'react-native/no-raw-text': 'warn',  
  },
};
