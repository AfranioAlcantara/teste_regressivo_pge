import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { atribuicoesPorAreaPage } from "../pages";

When("abro as atribuições por área", () => {
  atribuicoesPorAreaPage.acessar();
});

Then("a tela de atribuições por área está pronta", () => {
  atribuicoesPorAreaPage.deveEstarPronta();
});

When("pesquiso as atribuições sintéticas da área", () => {
  cy.fixture("atribuicao").then((dados) => {
    atribuicoesPorAreaPage.acessar();
    atribuicoesPorAreaPage.pesquisar(dados.area, "sintetico");
  });
});

Then("vejo o relatório sintético da área", () => {
  cy.fixture("atribuicao").then((dados) => {
    atribuicoesPorAreaPage.deveMostrarSintetico(dados.area);
  });
});

When("pesquiso as atribuições analíticas da área", () => {
  cy.fixture("atribuicao").then((dados) => {
    atribuicoesPorAreaPage.acessar();
    atribuicoesPorAreaPage.pesquisar(dados.area, "analitico");
  });
});

Then("vejo o relatório analítico da área", () => {
  cy.fixture("atribuicao").then((dados) => {
    atribuicoesPorAreaPage.deveMostrarAnalitico(dados.area);
  });
});

Then("o relatório de atribuições por área é gerado em PDF", () => {
  cy.fixture("atribuicao").then((dados) => {
    atribuicoesPorAreaPage.deveGerarPdf(dados.area);
  });
});

When("pesquiso uma área sem atribuição", () => {
  atribuicoesPorAreaPage.acessar();
  atribuicoesPorAreaPage.pesquisar("OUVIDORIA", "sintetico");
});

Then("o relatório informa que não há atribuição", () => {
  atribuicoesPorAreaPage.deveInformarAusencia("OUVIDORIA");
});
