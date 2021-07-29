module.exports = {
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/ban-types': ['warn'],
        '@typescript-eslint/explicit-function-return-type': ['warn'],
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
    },
    overrides: [
        {
            files: ['src/apiInterfaces/**/*.ts', 'src/schemas/generated.ts'],
            rules: {
                '@typescript-eslint/camelcase': 'off',
                '@typescript-eslint/no-use-before-define': 'off',
            }
        }
    ]
};
