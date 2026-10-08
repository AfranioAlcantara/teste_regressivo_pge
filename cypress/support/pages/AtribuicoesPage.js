import BasePage from "./BasePage";

class AtribuicoesPage extends BasePage {
  caminho = "/portal_service/bonds";

  seletores = {
    novaAtribuicao: "a[href='/portal_service/bonds/new']",
    editar: "a[href$='/edit']",
    selecionar: "input.marcar",
    ativosDaLinha: "i.fa-eye",
    modalAtivos: "#bondmodal .modal-content",
  };

  acessar() {
    this.visitar(this.caminho);
  }

  iniciarNovaAtribuicao() {
    this.clicar(this.seletores.novaAtribuicao);
  }

  editar(observacao) {
    cy.contains("tr", observacao).find(this.seletores.editar).click();
  }

  selecionar(observacao) {
    cy.contains("tr", observacao).find(this.seletores.selecionar).check();
  }

  deveConfirmarCadastro(modalidade = "Presencial") {
    cy.get(".bootstrap-growl").should("be.visible").and("contain", "Parabéns!");
    cy.get("@observacao").then((observacao) => {
      cy.contains("tr", observacao).should("be.visible").and("contain", modalidade);
    });
  }

  naoDeveTerGravado(observacao) {
    cy.url().should("include", "/portal_service/bonds");
    cy.contains("tr", observacao).should("not.exist");
  }

  deveConfirmarEdicao(observacaoAlterada) {
    cy.contains("tr", observacaoAlterada).should("be.visible");
  }

  deveMostrarObservacaoAlterada(observacaoAlterada, observacaoOriginal) {
    cy.contains("tr", observacaoAlterada).should("be.visible");
    cy.contains("tr", observacaoOriginal).should("not.exist");
  }

  deveManterDados(observacao, dados, tombo) {
    cy.contains("tr", observacao)
      .should("contain", dados.area)
      .and("contain", dados.subarea)
      .and("contain", dados.colaborador)
      .and("contain", "Presencial");
    cy.contains("tr", observacao).find(this.seletores.ativosDaLinha).closest("a").click();
    cy.get(this.seletores.modalAtivos).should("be.visible").and("contain", tombo);
  }

  deveMostrarAtivosAtribuidos(observacao, tombos) {
    cy.contains("tr", observacao).find(this.seletores.ativosDaLinha).closest("a").click();
    cy.get(this.seletores.modalAtivos).should("be.visible");
    tombos.forEach((tombo) => {
      cy.get(this.seletores.modalAtivos).should("contain", tombo);
    });
  }

  deveTerRemovidoAtivo(observacao, removido, mantido) {
    cy.contains("tr", observacao).should("be.visible");
    cy.contains("tr", observacao).find(this.seletores.ativosDaLinha).closest("a").click();
    cy.get(this.seletores.modalAtivos).should("be.visible").and("not.contain", removido).and("contain", mantido);
  }

  deveMostrarAtivoAtribuido(observacao) {
    cy.get("@tombo").then((tombo) => {
      cy.contains("tr", observacao).should("be.visible").and("contain", "Presencial");
      cy.contains("tr", observacao).find(this.seletores.ativosDaLinha).closest("a").click();
      cy.get(this.seletores.modalAtivos).should("be.visible").and("contain", tombo);
    });
  }
}

export default new AtribuicoesPage();
