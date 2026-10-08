import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { homePage, loginPage } from "../pages";

Given("que acesso a tela de login", () => {
  loginPage.acessar();
});

When("informo as credenciais de acesso", () => {
  cy.env(["usuario", "senha"]).then(({ usuario, senha }) => {
    loginPage.preencherCredenciais(usuario, senha);
  });
});

When("confirmo o login", () => {
  loginPage.confirmar();
});

When("informo o e-mail válido e uma senha inválida", () => {
  cy.env(["usuario"]).then(({ usuario }) => {
    loginPage.preencherCredenciais(usuario, "senha-invalida");
  });
});

Then("devo ver a área autenticada", () => {
  homePage.deveEstarVisivel();
});

Then("permaneço na tela de login", () => {
  loginPage.devePermanecerNaTela();
});

Then("vejo a mensagem de erro de autenticação", () => {
  loginPage.deveExibirMensagemDeErro();
});
