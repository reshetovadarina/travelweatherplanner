import js from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
    js.configs.recommended,
    configPrettier,
    {
        files: ["js/**/*.js", "eslint.config.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
            "no-console": "warn",
            "eqeqeq": ["error", "always"],
            "curly": ["error", "all"]
        }
    }
];
