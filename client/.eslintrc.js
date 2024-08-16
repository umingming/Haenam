module.exports = {
    root: true,
    env: {
        jest: true,
        node: true,
    },
    plugins: ["vue", "prettier"],
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript",
    ],
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
                tabWidth: 4,
            },
        ],
        "vue/attributes-order": [
            "error",
            {
                order: [
                    "DEFINITION",
                    "LIST_RENDERING",
                    "CONDITIONALS",
                    "RENDER_MODIFIERS",
                    "GLOBAL",
                    [("UNIQUE", "SLOT")],
                    "TWO_WAY_BINDING",
                    "OTHER_DIRECTIVES",
                    "OTHER_ATTR",
                    "EVENTS",
                    "CONTENT",
                ],
                alphabetical: true,
            },
        ],
    },
};
