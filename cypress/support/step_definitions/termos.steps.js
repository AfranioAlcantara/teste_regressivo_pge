import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { atribuicoesPage, gerarTermosPage } from "../pages";

When("seleciono a atribuição para gerar termo", () => {
  cy.get("@observacao").then((observacao) => {
    atribuicoesPage.selecionar(observacao);
  });
});

When("abro a geração de termos", () => {
  gerarTermosPage.abrir();
});

When("marco o tipo Responsabilidade", () => {
  gerarTermosPage.marcarResponsabilidade();
});

When("marco o tipo Empréstimo", () => {
  gerarTermosPage.marcarEmprestimo();
});

When("gero o termo", () => {
  gerarTermosPage.gerar();
});

Then("o documento é o termo de empréstimo da atribuição", () => {
  cy.fixture("atribuicao").then((dados) => {
    cy.get("@tombo").then((tombo) => {
      gerarTermosPage.deveSerTermoDeEmprestimo(dados, tombo);
    });
  });
});

Then("o documento é o termo de responsabilidade da atribuição", () => {
  cy.fixture("atribuicao").then((dados) => {
    cy.get("@tombo").then((tombo) => {
      gerarTermosPage.deveSerTermoDeResponsabilidade(dados, tombo);
    });
  });
});

Then("apenas o tipo Empréstimo permanece selecionado", () => {
  gerarTermosPage.deveTerApenasEmprestimo();
});

When("fecho a geração de termos", () => {
  gerarTermosPage.fechar();
});

Then("o termo não é gerado", () => {
  cy.get("#generate_term").should("not.be.visible");
  cy.url().should("include", "/portal_service/bonds");
});

Then("apenas o tipo Responsabilidade permanece selecionado", () => {
  gerarTermosPage.deveTerApenasResponsabilidade();
});
