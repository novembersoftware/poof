import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores([
        "node_modules/**",
        ".bun/**",
        ".nitro/**",
        ".output/**",
        "dist/**",
        "src/routeTree.gen.ts"
    ])
]);
