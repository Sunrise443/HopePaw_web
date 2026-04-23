import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "./vite.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      include: ["src/tests/**/*.unit.test.ts", "src/tests/**/*.unit.test.tsx"],
      passWithNoTests: true,
    },
  }),
);
