import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5174",
    video: false,
    setupNodeEvents(on, config) {
      // node event listeners
    },
  },
});
