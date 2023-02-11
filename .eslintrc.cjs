module.exports = {
    ignorePatterns: ["**/*.svg"],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
        // "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
};