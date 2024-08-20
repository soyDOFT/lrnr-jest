const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseURL: 'http://localhost:8000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
