import { basename, dirname, join } from "node:path"
import { loadEnvFile } from "node:process"
import { coverageConfigDefaults, defineConfig } from "vite-plus"

try {
  loadEnvFile(join(import.meta.dirname, ".env"))
} catch {}

const ignorePatterns = ["**/generated/**", "**/*.gen.ts"]

export default defineConfig({
  fmt: {
    semi: false,
    printWidth: 80,
    arrowParens: "avoid",
    ignorePatterns,
  },
  lint: {
    ignorePatterns,
    options: {
      typeAware: false,
      typeCheck: false,
    },
  },
  test: {
    include: ["**/*.unit.(ts|tsx)"],
    exclude: ["**/node_modules/**", "**/build/**"],
    env: { NODE_OPTIONS: "--no-warnings" },
    testTimeout: 60 * 1000,
    passWithNoTests: true,
    silent: "passed-only",
    coverage: {
      enabled: true,
      reporter: ["html", "json"],
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/@*",
        "**/build/**",
        "**/compile/**",
        "**/coverage/**",
        "**/entrypoints/**",
        "**/examples/**",
        "**/messages.js",
        "**/program.ts",
        "**/index.ts",
        "**/main.ts",
        "portal/**",
        "browser/**",
        "mobile/**",
        "service/**",
      ],
    },
    resolveSnapshotPath: (testPath: string, snapExtension: string) => {
      return (
        join(dirname(testPath), "fixtures", "generated", basename(testPath)) +
        snapExtension
      )
    },
  },
})
