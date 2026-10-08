import BasePage from "./BasePage";

class HomePage extends BasePage {
  deveEstarVisivel() {
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
    cy.get("span:contains('qa Teste')").should("be.visible");
    cy.get(".sidebar-brand").should("be.visible");
  }
 
}

export default new HomePage();
