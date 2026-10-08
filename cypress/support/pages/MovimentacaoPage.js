import BasePage from "./BasePage";

class MovimentacaoPage extends BasePage {
  caminho = "/portal_service/reports/index";

  seletores = {
    area: "#area_name",
    inicio: "#initial_date",
    fim: "#final_date",
    pesquisar: "input[value='Pesquisar']",
    grupo: "td.text-center.text-success",
  };

  acessar() {
    this.visitar(this.caminho);
    cy.contains("h1", "Movimentação de Ativos").should("be.visible");
  }

  periodoSemMovimentacao() {
    return { inicio: "1990-01-01", fim: "1990-01-02" };
  }

  deveInformarAusencia(area) {
    cy.contains("td", `Sem movimentações para: ${area}`).should("be.visible");
  }

  periodoDeHoje() {
    const agora = new Date();
    const data = [
      agora.getFullYear(),
      String(agora.getMonth() + 1).padStart(2, "0"),
      String(agora.getDate()).padStart(2, "0"),
    ].join("-");
    return { inicio: data, fim: data };
  }

  filtrar(area, inicio, fim) {
    cy.get(this.seletores.area).select(area, { force: true });
    cy.get(this.seletores.inicio).invoke("val", inicio);
    cy.get(this.seletores.fim).invoke("val", fim);
    cy.get(this.seletores.pesquisar).click({ force: true });
  }

  deveEstarPronta() {
    cy.contains("h1", "Movimentação de Ativos").should("be.visible");
    cy.get(this.seletores.area).should("be.visible");
    cy.get(this.seletores.inicio).should("be.visible");
    cy.get(this.seletores.fim).should("be.visible");
    cy.get(this.seletores.pesquisar).should("be.visible");
  }

  deveMostrarColunas() {
    ["Tombo", "Nº de Série", "Descrição", "Lotação Anterior", "Lotação Atual", "Colaborador"].forEach((coluna) => {
      cy.contains("th", coluna).should("be.visible");
    });
  }

  deveGerarPdf(area) {
    cy.get("a[href*='pdf_create']").invoke("attr", "href").then((caminho) => {
      cy.request({ url: caminho, encoding: "binary", timeout: 60000 }).then((resposta) => {
        expect(resposta.headers["content-type"]).to.include("pdf");
        expect(this.textoDoPdf(resposta.body).toUpperCase()).to.include(area.toUpperCase());
      });
    });
  }

  deveRecusarDataLivre() {
    cy.get(this.seletores.inicio).should("have.attr", "type", "date");
    cy.get(this.seletores.inicio).invoke("val", "32/13/2026");
    cy.get(this.seletores.inicio).should("have.value", "");
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

  deveListarMovimentacao(area, tombo, colaborador) {
    cy.get(this.seletores.grupo).should(($grupos) => {
      const textos = [...$grupos].map((grupo) => grupo.innerText.trim());
      expect(textos[0]).to.eq(area);
      textos.forEach((texto) => {
        const ehArea = texto === area;
        const ehData = /^\d{2} de .+ de \d{4} - \d+ movimentações$/.test(texto);
        expect(ehArea || ehData, texto).to.eq(true);
      });
    });
    cy.contains("tbody tr", tombo).should("be.visible").and("contain", colaborador).and("contain", area);
  }
}

export default new MovimentacaoPage();
