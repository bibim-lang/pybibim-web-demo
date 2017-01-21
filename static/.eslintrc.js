module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'xo',
  globals: {
    'monaco': true,
    '$': true
  },
  rules: {
    'indent': ['error', 2, {
      SwitchCase: 1
    }],
    'linebreak-style': ['off', 'unix'],
    'space-before-function-paren': ['error', 'never'],
    'valid-jsdoc': ['error', {
      requireReturn: false,
      prefer: {
        returns: 'return'
      }
    }],
    'require-jsdoc': 'off',
    'max-len': ['warn', 80, 4, {
      ignoreComments: true,
      ignoreUrls: true
    }],

    //  Resetting things that eslint-config-xo has an opinion about, but the
    //  Google Style Guide doesn't.
    'curly': 'off',
    'no-floating-decimal': 'off',
    'no-unused-vars': ['error', {
      "args": "none"
    }],

  }
};
