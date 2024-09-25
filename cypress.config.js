const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.mariomuzi.com.ua/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    "reporter":"mochawesome",
    "reporterOptions": {
      "charts":true,
      "overwrite":false,
      "html":false,
      "json":true,
      "reportDir":"cypress/reports"
    }
  },
});
