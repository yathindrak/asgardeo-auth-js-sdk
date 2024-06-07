/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import commonjs from "@rollup/plugin-commonjs";
import eslint from "@rollup/plugin-eslint";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import analyze from "rollup-plugin-analyzer";
import autoExternal from "rollup-plugin-auto-external";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

/**
 * Bundle types.
 */
enum BundleType {
    UMD = "umd",
    ESM = "esm"
}

/**
 * Environment types.
 */
enum Environment {
    PRODUCTION = "production",
    DEVELOPMENT = "development"
}

/**
 * The global variable to be used in UMD and IIFE bundles.
 *
 * @constant
 * @type {string}
 * @default
 */
const GLOBAL_VARIABLE = "AsgardeoAuth";

/**
 * This returns the name of the bundle file.
 *
 * @param {BundleType} bundleType - Specifies the type of the bundle.
 *
 * @return {string} The name of the output file.
 */
const resolveFileName = (bundleType: BundleType): string => {
    switch (bundleType) {
        case BundleType.UMD:
            return pkg.main;
        case BundleType.ESM:
            return pkg.module;
        default:
            return pkg.main;
    }
};

/**
 * This generates a rollup config object.
 *
 * @param {BundleType} bundleType - Specifies the type of the bundle.
 * @param {Environment} env - Specifies if the bundle is for production or development.
 *
 * @return Rollup config object.
 */
const generateConfig = (bundleType: BundleType, env: Environment = Environment.PRODUCTION) => {
    const fileName = resolveFileName(bundleType);

    const config = {
        input: "src/index.ts",
        output: {
            file: fileName,
            format: bundleType,
            sourcemap: true
        },
        plugins: [
            resolve({
                browser: true,
                preferBuiltins: true
            }),
            commonjs(),
            eslint(),
            json(),
            typescript(),
            replace({
                preventAssignment: true,
                "process.env.NODE_ENV":
                    env === Environment.PRODUCTION ? JSON.stringify("production") : JSON.stringify("development")
            })
        ]
    };

    if (bundleType === BundleType.UMD) {
        config.output.name = GLOBAL_VARIABLE;
    }

    if (env === Environment.DEVELOPMENT) {
        config.plugins.push(analyze());
    } else {
        config.plugins.push(terser());
        // To avoid `Missing shims` and `Missing global variable` warnings.
        if (bundleType !== BundleType.UMD) {
            config.plugins.push(
                autoExternal({
                    builtins: false,
                    dependencies: false
                })
            );
        }

        config.output.globals = {
            axios: "axios"
        };
    }

    return config;
};

export default [generateConfig(BundleType.ESM, process.env.NODE_ENV as Environment), generateConfig(BundleType.UMD, process.env.NODE_ENV as Environment)];