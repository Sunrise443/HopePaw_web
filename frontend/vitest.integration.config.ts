import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "./vite.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      include: [
        "src/tests/**/*.integration.test.ts",
        "src/tests/**/*.integration.test.tsx",
      ],
      passWithNoTests: true,
    },
  }),
);
