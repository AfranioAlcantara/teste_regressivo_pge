import BasePage from "./BasePage";

class EditarAtribuicaoPage extends BasePage {
  seletores = {
    titulo: "h6",
    observacao: "#bond_observation",
    atendidoPor: "#attended",
    linhaAtivo: ".add_ativo",
    tombo: "select.select_tombo",
    remover: "Remover",
    salvar: "input[value='Salvar']",
  };

  deveTrazerDados(dados, observacao, tombo) {
    cy.contains(this.seletores.titulo, "Atualizando Atribuição").should("be.visible");
    cy.get("#set_area").find("option:selected").should("have.text", dados.area);
    cy.get("#resp_subarea").find("option:selected").should("have.text", dados.subarea);
    cy.get("#collaborators").find("option:selected").should("contain.text", dados.colaborador);
    cy.get("#bond_modality_presencial").should("be.checked");
    cy.get(this.seletores.observacao).should("contain.value", observacao);
    cy.get(this.seletores.atendidoPor).should("be.visible");
    this.linhaDoAtivo(tombo).should("be.visible");
  }

  cancelar() {
    cy.get("a[href='/portal_service/bonds']").contains("Cancelar").click();
  }

  informarDefeito(texto) {
    cy.get("@tombo").then((tombo) => {
      this.linhaDoAtivo(tombo).within(() => {
        cy.get("#set_status").select("COM DEFEITO");
        cy.get("[name$='[observation]']").clear().type(texto);
      });
    });
  }

  marcarDisponivelParaSubstituicao() {
    cy.get("@tombo").then((tombo) => {
      this.linhaDoAtivo(tombo).within(() => {
        cy.get("#set_status").select("DISPONÍVEL");
      });
    });
  }

  vincularOutroAtivo(tombo) {
    cy.intercept("GET", "**/portal_service/listing_assets.json*").as("dadosAtivo");
    cy.get("#btn_asset").click({ force: true });
    cy.get(".add_ativo").last().find(this.seletores.tombo).select(tombo, { force: true });
    cy.wait("@dadosAtivo");
    cy.get(".add_ativo").last().find("#set_status").find("option").then(($opcoes) => {
      const vinculado = [...$opcoes].find((opcao) => /v[ií]nculado/i.test(opcao.textContent) && !/uso/i.test(opcao.textContent));
      cy.get(".add_ativo").last().find("#set_status").select(vinculado.textContent.trim());
    });
    cy.get("body").type("{esc}");
  }

  linhaDoAtivo(tombo) {
    return cy.get(this.seletores.linhaAtivo).filter((_, linha) => {
      const selecionado = linha.querySelector(`${this.seletores.tombo} option:checked`);
      return Boolean(selecionado && selecionado.textContent.includes(tombo));
    });
  }

  alterarObservacao(texto) {
    cy.contains(this.seletores.titulo, "Atualizando Atribuição").should("be.visible");
    cy.get("@observacao").then((observacao) => {
      cy.get(this.seletores.observacao).should("contain.value", observacao);
    });
    super.preencher(this.seletores.observacao, texto);
  }

  removerAtivoVinculado() {
    cy.contains(this.seletores.titulo, "Atualizando Atribuição").should("be.visible");
    cy.get("@tombo").then((tombo) => {
      cy.get(this.seletores.linhaAtivo)
        .filter((_, linha) => {
          const selecionado = linha.querySelector(`${this.seletores.tombo} option:checked`);
          return Boolean(selecionado && selecionado.textContent.includes(tombo));
        })
        .find("a.remove_fields")
        .click({ force: true })
        .closest(this.seletores.linhaAtivo)
        .should("not.be.visible");
    });
  }

  tentarSalvarSemObrigatorio() {
    cy.contains(this.seletores.titulo, "Atualizando Atribuição").should("be.visible");
    cy.get("#set_area").select("");
    cy.get(this.seletores.salvar).click();
  }

  deveBloquearEdicao() {
    cy.get("#set_area").should(($campo) => {
      expect($campo[0].checkValidity()).to.equal(false);
    });
    cy.url().should("include", "/edit");
  }

  salvar() {
    cy.get(this.seletores.atendidoPor).select("qa Teste");
    cy.get(`${this.seletores.linhaAtivo}:visible`).each(($linha) => {
      const tombo = $linha.find(this.seletores.tombo).val();
      if (!tombo) {
        cy.wrap($linha).find("a.remove_fields").click({ force: true });
      }
    });
    cy.get(this.seletores.salvar).click();
  }
}

export default new EditarAtribuicaoPage();
