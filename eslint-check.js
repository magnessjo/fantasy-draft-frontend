if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'airbnb', 'prettier'],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  plugins: ['graphql'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    camelcase: 'off',
    'import/no-cycle': [0],
    'import/extensions': ['error', 'never', { '.tsx': 'never' }],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.ts', '.tsx'],
      },
    ],
    'import/no-named-as-default': [0],
    'react/jsx-indent': [0],
    'react/jsx-one-expression-per-line': [0],
    'react/jsx-wrap-multilines': [0],
    'react/jsx-boolean-value': [1, 'always'],
    'react/no-danger': [0, 'always'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['source'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
