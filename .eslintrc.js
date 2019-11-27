module.exports = {
    'env': {
        'es6': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 2018,
        sourceType: "module",
        project: './tsconfig.json'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'indent': 0,
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': 0,
        'semi': [
            'error',
            'always'
        ],
        'no-unused-vars': 0,
        'no-case-declarations': 0,
        '@typescript-eslint/array-type': ['error', {default: 'array'}],
        '@typescript-eslint/explicit-member-accessibility': ['error', {accessibility: 'explicit'}],
        '@typescript-eslint/prefer-for-of': ['error'],
        '@typescript-eslint/prefer-readonly': ['error'],

    }
};