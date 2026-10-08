import BasePage from "./BasePage";

class AtribuicoesPorAreaPage extends BasePage {
  caminho = "/portal_service/reports/assignments_by_area";

  seletores = {
    titulo: "h1",
    tipoSintetico: "#type_syntetic",
    tipoAnalitico: "#type_analytic",
    area: "#search_area",
    subarea: "#search_subarea",
    pesquisar: "input[value='Pesquisar']",
    pdf: "a[href*='assignments_by_area_pdf']",
  };

  acessar() {
    this.visitar(this.caminho);
    cy.contains(this.seletores.titulo, "Atribuições por Área/Subárea").should("be.visible");
    cy.contains(this.seletores.titulo, "Movimentação de Ativos").should("not.exist");
  }

  deveEstarPronta() {
    cy.get(this.seletores.tipoSintetico).should("exist");
    cy.get(this.seletores.tipoAnalitico).should("exist");
    cy.get(this.seletores.area).should("exist");
    cy.get(this.seletores.pesquisar).should("exist");
    cy.get(this.seletores.pdf).should("be.visible");
  }

  pesquisar(area, tipo = "sintetico") {
    if (tipo === "analitico") {
      cy.get(this.seletores.tipoAnalitico).check({ force: true });
    } else {
      cy.get(this.seletores.tipoSintetico).check({ force: true });
    }
    cy.get(this.seletores.area).select(area, { force: true });
    cy.get(this.seletores.pesquisar).click({ force: true });
  }

  deveMostrarSintetico(area) {
    cy.contains("h6", `Relatório Sintético - ${area}`).should("be.visible");
    cy.contains("Total de Atribuições:").should("be.visible");
    cy.contains("Atribuições por Modalidade").should("be.visible");
    cy.contains("Atribuições por Colaboradores").should("be.visible");
  }

  deveMostrarAnalitico(area) {
    cy.contains("h6", `Relatório Analítico - ${area}`).should("be.visible");
  }

  deveInformarAusencia(area) {
    cy.contains("td", `Sem atribuições para: ${area}`).should("be.visible");
  }

  deveGerarPdf(area) {
    cy.contains("h6", `Relatório Sintético - ${area}`).should("be.visible");
    cy.get(this.seletores.pdf).invoke("attr", "href").then((caminho) => {
      expect(caminho).to.include("area=");
      cy.request({ url: caminho, encoding: "binary", timeout: 60000 }).then((resposta) => {
        expect(resposta.status).to.eq(200);
        expect(resposta.headers["content-type"]).to.include("pdf");
      });
    });
  }
}

export default new AtribuicoesPorAreaPage();
