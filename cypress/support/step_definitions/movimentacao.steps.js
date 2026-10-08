import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { movimentacaoPage } from "../pages";

When("abro a movimentação de ativos", () => {
  movimentacaoPage.acessar();
});

Then("a tela de movimentação está pronta", () => {
  movimentacaoPage.deveEstarPronta();
});

Then("a movimentação mostra as colunas do ativo", () => {
  movimentacaoPage.deveMostrarColunas();
});

Then("o relatório de movimentação é gerado em PDF", () => {
  cy.fixture("atribuicao").then((dados) => {
    movimentacaoPage.deveGerarPdf(dados.area);
  });
});

Then("o período não aceita texto livre", () => {
  movimentacaoPage.deveRecusarDataLivre();
});

When("consulto a movimentação da área no período de hoje", () => {
  cy.fixture("atribuicao").then((dados) => {
    const { inicio, fim } = movimentacaoPage.periodoDeHoje();
    movimentacaoPage.acessar();
    movimentacaoPage.filtrar(dados.area, inicio, fim);
  });
});

When("consulto a movimentação da área em um período sem dados", () => {
  cy.fixture("atribuicao").then((dados) => {
    const { inicio, fim } = movimentacaoPage.periodoSemMovimentacao();
    movimentacaoPage.acessar();
    movimentacaoPage.filtrar(dados.area, inicio, fim);
  });
});

Then("o relatório informa que não há movimentação", () => {
  cy.fixture("atribuicao").then((dados) => {
    movimentacaoPage.deveInformarAusencia(dados.area);
  });
});

Then("a listagem mostra a movimentação filtrada dessa atribuição", () => {
  cy.fixture("atribuicao").then((dados) => {
    cy.get("@tombo").then((tombo) => {
      movimentacaoPage.deveListarMovimentacao(dados.area, tombo, dados.colaborador);
    });
  });
});
