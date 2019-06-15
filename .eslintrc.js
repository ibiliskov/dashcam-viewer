module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],

    // Possible Errors
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'warn',
    'no-extra-parens': ['error', 'all'],
    'no-misleading-character-class': 'error',
    'no-template-curly-in-string': 'error',
    'require-atomic-updates': 'error',

    // Best Practices
    'array-callback-return': 'error',
    'consistent-return': 'error',
    curly: ['error', 'all'],
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',

    eqeqeq: 'error',
    'max-classes-per-file': ['error', 1],
    'no-alert': 'error',
    'no-caller': 'error',
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-empty-function': ['error', { allow: ['constructors'] }],

    'no-eq-null': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-multi-spaces': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-concat': 'error',
    'no-void': 'error',

    // "no-warning-comments": ["warning", { "terms": ["todo", "fixme"], "location": "anywhere" }], // we need this, but is shows many todos
    'no-with': 'error',
    'prefer-promise-reject-errors': 'error',
    radix: ['error', 'as-needed'],

    // "vars-on-top": "error", // would be nice to have this
    'wrap-iife': ['error', 'outside'],
    yoda: 'error',

    // Variables
    'no-label-var': 'error',
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undefined': 'error',
    'no-undef-init': 'error',
    'no-use-before-define': 'error',

    // Stylistic Issues
    'array-bracket-newline': ['error', { multiline: true }],
    'array-bracket-spacing': ['error', 'never'],
    'array-element-newline': [
      'off',
      {
        multiline: true,
        minItems: 3,
      },
    ],
    'block-spacing': 'error',
    'brace-style': ['error', '1tbs'],
    camelcase: [
      'error',
      {
        properties: 'always',
        allow: ['InnerLinesGuide_Serialize', 'revs_info', 'access_token'],
      },
    ],
    'capitalized-comments': [
      'error',
      'always',
      {
        ignoreConsecutiveComments: true,
        ignorePattern: 'webpack|tslint',
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'consistent-this': ['error', 'that'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'func-name-matching': ['error', 'always', { considerPropertyDescriptor: true }],
    'func-names': ['error', 'as-needed'],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'function-paren-newline': ['error', 'consistent'],
    'implicit-arrow-linebreak': ['error', 'beside'],
    indent: 'off',
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    'keyword-spacing': ['error'],
    // 'linebreak-style': ['error', 'windows'],
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        beforeLineComment: true,
      },
    ],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'multiline-comment-style': ['error', 'separate-lines'],
    'multiline-ternary': ['error', 'always-multiline'],
    'new-cap': [
      'error',
      {
        capIsNew: false,
        newIsCap: true,
        properties: true,
      },
    ],
    'new-parens': 'error',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-array-constructor': 'error',
    'no-lonely-if': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-new-object': 'error',
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',

    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': ['error', 'below'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          consistent: true,
          minProperties: 2,
        },
        ObjectPattern: { multiline: true },
        ImportDeclaration: { consistent: true },
        ExportDeclaration: {
          multiline: true,
          minProperties: 1,
        },
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    'one-var': ['error', 'never'],
    'one-var-declaration-per-line': ['error', 'always'],
    'operator-assignment': ['error', 'always'],
    'operator-linebreak': ['error', 'before'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      }, // Enforces newline before return
      // { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
      // { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]},
    ],

    // "prefer-object-spread": ["error"], // Needs webpack update
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single', { avoidEscape: false }],
    semi: ['error', 'never'],
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'semi-style': ['error', 'last'],
    'space-before-blocks': [
      'error',
      {
        functions: 'always',
        keywords: 'always',
        classes: 'always',
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error', { int32Hint: false }],
    'space-unary-ops': ['error'],
    'spaced-comment': ['error'],
    'switch-colon-spacing': ['error'],
    'template-tag-spacing': ['error', 'never'],
    'unicode-bom': ['error', 'never'],
    'wrap-regex': 'error',

    // ECMAScript 6
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'generator-star-spacing': [
      'error',
      {
        before: true,
        after: false,
      },
    ],
    'no-duplicate-imports': ['error', { includeExports: true }],
    'no-useless-computed-key': 'error',
    //'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-shorthand': [
      'error',
      'always',
      {
        avoidQuotes: true,
        ignoreConstructors: false,
        avoidExplicitReturnArrows: true,
      },
    ],
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false,
      },
    ],

    // "prefer-destructuring": "error", // Enable when --fix implemented
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'rest-spread-spacing': ['error', 'never'],

    // "sort-imports": ["error"], // This is incompatible with import/ plugin, so commenting this out
    'symbol-description': 'error',
    'template-curly-spacing': ['error', 'never'],
    'yield-star-spacing': [
      'error',
      {
        before: true,
        after: false,
      },
    ],

    // Plugin import
    // "import/no-unresolved": ["error"],
    // "import/named": ["error"],
    // "import/default": ["error"],
    // "import/namespace": ["error"],
    // "import/no-absolute-path": ["error"],
    // "import/no-dynamic-require": ["error"],
    // "import/no-webpack-loader-syntax": ["error"],
    // "import/no-self-import": ["error"],
    // "import/no-cycle": ["error"],
    // "import/no-useless-path-segments": ["error"],
    // "import/export": ["error"],
    // "import/no-named-as-default": ["error"],
    // "import/no-named-as-default-member": ["error"],
    // "import/no-deprecated": ["error"],
    // "import/no-extraneous-dependencies": ["error"],
    // "import/no-mutable-exports": ["error"],

    // "import/first": ["error"],
    // "import/exports-last": ["error"],
    // "import/no-duplicates": ["error"],
    // "import/extensions": ["error", { "js": "never", "json": "always" }],
    // "import/order": ["error", { "newlines-between": "never" }],
    // "import/newline-after-import": ["error", { "count": 1 }],
    // "import/group-exports": ["error"],

    // Plugin promise
    // "promise/catch-or-return": "error",
    // "promise/no-return-wrap": "error",
    // "promise/param-names": "error",
    // "promise/always-return": "off",
    // "promise/no-nesting": "error",
    // "promise/no-promise-in-callback": "error",
    // "promise/no-callback-in-promise": "error",
    // "promise/no-new-statics": "error",
    // "promise/no-return-in-finally": "error",
    // "promise/valid-params": "error",
    // "promise/prefer-await-to-then": "error",
    // "promise/prefer-await-to-callbacks": "error",
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
      },
    },
  ],
}
