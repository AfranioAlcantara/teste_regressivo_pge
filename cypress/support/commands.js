import { homePage, loginPage } from "./pages";

Cypress.Commands.add("autenticar", () => {
  cy.env(["usuario", "senha"]).then(({ usuario, senha }) => {
    cy.session([usuario], () => {
      loginPage.acessar();
      loginPage.preencherCredenciais(usuario, senha);
      loginPage.confirmar();
      homePage.deveEstarVisivel();
    });
  });
});
