const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

function tagSolicitada() {
  const informada = process.env.npm_config_tag;
  if (!informada || informada === "true") {
    return undefined;
  }

  const texto = informada.trim().replace(/^["']|["']$/g, "");
  return texto.includes("@") ? texto : `@${texto}`;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://testeqa.pge.ce.gov.br",
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    screenshotOnRunFailure: true,
    async setupNodeEvents(on, config) {
      const tags = tagSolicitada();
      if (tags) {
        config.expose.tags = tags;
      }

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      if (config.env.baseUrl) {
        config.baseUrl = config.env.baseUrl;
      }

      return config;
    },
  },
});
