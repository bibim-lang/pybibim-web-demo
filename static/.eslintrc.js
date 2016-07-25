module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'xo',
  globals: {
    goog: true
  },
  rules: {
    'indent': [2, 2, {
      SwitchCase: 1
    }],
    'space-before-function-paren': [2, 'never'],
    'valid-jsdoc': [2, {
      requireReturn: false,
      prefer: {
        returns: 'return'
      }
    }],
    'require-jsdoc': 1,
    'max-len': [1, 80, 4, {
      ignoreComments: true,
      ignoreUrls: true
    }],

    //  Resetting things that eslint-config-xo has an opinion about, but the
    //  Google Style Guide doesn't.
    'curly': 0,
    'no-floating-decimal': 0,
    'no-unused-vars': [2, {
      "args": "none"
    }],

  }
};
