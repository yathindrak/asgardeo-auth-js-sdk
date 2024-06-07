export enum Environment {
    Browser = "browser",
    ES6 = "es6",
    Jest = "jest",
    Node = "node"
}

export enum Extends {
    EslintRecommended = "eslint:recommended",
    PluginImportTypescript = "plugin:import/typescript",
    PluginTypescriptEslintRecommended = "plugin:@typescript-eslint/recommended",
    PluginTypescriptEslintEslintRecommended = "plugin:@typescript-eslint/eslint-recommended"
}

export enum Parser {
    TypescriptEslintParser = "@typescript-eslint/parser"
}

export enum Rule {
    ExplicitFunctionReturnType = "@typescript-eslint/explicit-function-return-type",
    NoExplicitAny = "@typescript-eslint/no-explicit-any",
    NoInferrableTypes = "@typescript-eslint/no-inferrable-types",
    NoUnusedVars = "@typescript-eslint/no-unused-vars",
    NoUseBeforeDefine = "@typescript-eslint/no-use-before-define",
    EolLast = "eol-last",
    NoDebugger = "no-debugger",
    CommaDangle = "comma-dangle",
    ImportOrder = "import/order",
    MaxLen = "max-len",
    NoConsole = "no-console",
    NoDuplicateImports = "no-duplicate-imports",
    ObjectCurlySpacing = "object-curly-spacing",
    Quotes = "quotes",
    SortImports = "sort-imports",
    SortKeys = "sort-keys"
}

export enum SourceType {
    Module = "module"
}

export enum Order {
    Asc = "asc"
}

export interface EcmaVersionOptions {
    ecmaVersion: number;
    sourceType: SourceType;
}

export interface RuleOptions {
    [key: string]: any;
}

export interface Override {
    env: {
        browser: boolean;
        es6: boolean;
        node: boolean;
    };
    extends: Extends[];
    files: string[];
    parser: Parser;
    parserOptions: EcmaVersionOptions;
    rules: RuleOptions;
}

export interface ESLintConfig {
    env: {
        browser: boolean;
        es6: boolean;
        jest: boolean;
        node: boolean;
    };
    extends: Extends[];
    overrides: Override[];
    parserOptions: EcmaVersionOptions;
    plugins: string[];
    rules: RuleOptions;
}

const eslintConfig: ESLintConfig = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true
    },
    extends: [ Extends.EslintRecommended, Extends.PluginImportTypescript ],
    overrides: [ {
        env: {
            browser: true,
            es6: true,
            node: true
        },
        extends: [
            Extends.EslintRecommended,
            Extends.PluginTypescriptEslintEslintRecommended,
            Extends.PluginTypescriptEslintRecommended
        ],
        files: [ "**/*.ts" ],
        parser: Parser.TypescriptEslintParser,
        parserOptions: {
            ecmaVersion: 9,
            sourceType: SourceType.Module
        },
        rules: {
            [Rule.ExplicitFunctionReturnType]: 0,
            [Rule.NoExplicitAny]: 0,
            [Rule.NoInferrableTypes]: "off",
            [Rule.NoUnusedVars]: "warn",
            [Rule.NoUseBeforeDefine]: [ "warn", {
                classes: false,
                functions: false,
                typedefs: false,
                variables: false
            } ],
            [Rule.EolLast]: "error",
            [Rule.NoDebugger]: "warn",
            [Rule.NoUseBeforeDefine]: "off"
        }
    } ],
    parserOptions: {
        ecmaVersion: 9,
        sourceType: SourceType.Module
    },
    plugins: [ "import", "@typescript-eslint" ],
    rules: {
        [Rule.CommaDangle]: [ "warn", "never" ],
        [Rule.EolLast]: "error",
        [Rule.ImportOrder]: [ "warn", {
            "alphabetize": {
                caseInsensitive: true,
                order: Order.Asc
            },
            "groups": [ "builtin", "external", "index", "sibling", "parent", "internal" ]
        } ],
        [Rule.MaxLen]: [ "warn", {
            "code": 120
        } ],
        [Rule.NoConsole]: "warn",
        [Rule.NoDuplicateImports]: "warn",
        [Rule.ObjectCurlySpacing]: [ "warn", "always" ],
        [Rule.Quotes]: [ "warn", "double" ],
        [Rule.SortImports]: [ "warn", {
            "ignoreCase": false,
            "ignoreDeclarationSort": true,
            "ignoreMemberSort": false
        } ],
        [Rule.SortKeys]: [ "warn", "asc", {
            "caseSensitive": true,
            "minKeys": 2,
            "natural": false
        } ]
    }
};

export default eslintConfig;