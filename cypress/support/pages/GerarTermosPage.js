import BasePage from "./BasePage";

class GerarTermosPage extends BasePage {
  seletores = {
    abrir: "button[data-target='#generate_term']",
    modal: "#generate_term",
    responsabilidade: "#term_type_liability",
    emprestimo: "#term_type_loan",
  };

  fechar() {
    cy.get(`${this.seletores.modal} button[data-dismiss='modal']`).then(($botao) => {
      $botao[0].dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    cy.get(this.seletores.modal).invoke("removeClass", "show").invoke("css", "display", "none");
    cy.get(".modal-backdrop").invoke("remove");
    cy.get(this.seletores.modal).should("not.be.visible");
  }

  abrir() {
    cy.get(this.seletores.abrir).click();
    cy.get(this.seletores.modal).should("be.visible");
  }

  marcarResponsabilidade() {
    cy.get(this.seletores.responsabilidade).check();
  }

  marcarEmprestimo() {
    cy.get(this.seletores.emprestimo).check();
  }

  deveTerApenasEmprestimo() {
    cy.get(this.seletores.emprestimo).should("be.checked");
    cy.get(this.seletores.responsabilidade).should("not.be.checked");
  }

  deveTerApenasResponsabilidade() {
    cy.get(this.seletores.responsabilidade).should("be.checked");
    cy.get(this.seletores.emprestimo).should("not.be.checked");
  }

  gerar() {
    cy.window().then((win) => {
      cy.stub(win, "open").as("documento");
    });
    cy.get("#btn-termo").click();
    cy.get("@documento")
      .should("have.been.calledOnce")
      .then((documento) => {
        cy.request({ url: documento.getCall(0).args[0], encoding: "binary" }).then((resposta) => {
          expect(resposta.headers["content-type"]).to.include("pdf");
          cy.wrap(this.textoDoPdf(resposta.body)).as("termo");
        });
      });
  }

  deveSerTermoDeEmprestimo(dados, tombo) {
    this.deveConterTermo(/TERMO DE EMPR[EÉ]STIMO/, dados, tombo);
  }

  deveSerTermoDeResponsabilidade(dados, tombo) {
    this.deveConterTermo(/TERMO DE RESPONSABILIDADE/, dados, tombo);
  }

  deveConterTermo(titulo, dados, tombo) {
    cy.get("@termo").should((texto) => {
      expect(texto).to.match(titulo);
      expect(texto).to.include("Pelo presente termo");
      expect(texto).to.include(dados.colaborador);
      expect(texto).to.include("CPF");
      expect(texto).to.include(dados.area);
      expect(texto).to.match(/ATIVOS ATRIBU[IÍ]DOS/);
      expect(texto).to.include(tombo);
      expect(texto).to.include("DESKTOP Dell OptiPlex");
      expect(texto).to.match(/Fortaleza,\s+\d{2} de /);
      expect(texto).to.include("Assinatura");
    });
  }

  textoDoPdf(binario) {
    return [...binario.matchAll(/<([0-9A-Fa-f]+)>/g)]
      .map((trecho) => {
        let texto = "";
        for (let indice = 0; indice < trecho[1].length; indice += 2) {
          texto += String.fromCharCode(parseInt(trecho[1].slice(indice, indice + 2), 16));
        }
        return texto;
      })
      .join("");
  }
}

export default new GerarTermosPage();
