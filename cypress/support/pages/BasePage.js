class BasePage {
  visitar(caminho = "/") {
    cy.visit(caminho);
  }

  clicar(seletor) {
    cy.get(seletor).should("be.visible").click();
  }

  preencher(seletor, texto) {
    cy.get(seletor).should("be.visible").clear().type(texto);
  }

  deveEstarVisivel(seletor) {
    cy.get(seletor).should("be.visible");
  }

  deveConterTexto(seletor, texto) {
    cy.get(seletor).should("be.visible").and("contain.text", texto);
  }
}

export default BasePage;
