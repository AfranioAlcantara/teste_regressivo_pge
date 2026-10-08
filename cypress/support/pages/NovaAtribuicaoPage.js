import BasePage from "./BasePage";

class NovaAtribuicaoPage extends BasePage {
  caminho = "/portal_service/bonds/new";

  seletores = {
    area: "#set_area",
    subarea: "#resp_subarea",
    colaborador: "#bond_employee_type_colaborador",
    colaboradorSelect: "#collaborators",
    modalidadePresencial: "#bond_modality_presencial",
    modalidadeHomeOffice: "#bond_modality_home_office",
    semColaborador: "#bond_employee_type_subarea",
    pacoteOffice: "#check_office",
    pacote: "#key",
    sistemaOperacional: "#so",
    observacao: "#bond_observation",
    cancelar: "a[href='/portal_service/bonds']",
    atribuirAtivo: "#btn_asset",
    tombo: "#set_tombo",
    status: "#set_status",
    salvar: "input[value='Salvar']",
  };

  preencherAtribuicao({
    area,
    subarea,
    colaborador,
    sistemaOperacional,
    observacao,
    modalidade = "Presencial",
    semColaborador = false,
  }) {
    cy.intercept("GET", "**/portal_service/subareas.json*").as("subareas");
    cy.get(this.seletores.area).select(area);
    cy.wait("@subareas");
    cy.get(this.seletores.subarea).select(subarea);
    if (semColaborador) {
      cy.get(this.seletores.semColaborador).check({ force: true });
      cy.window().then((janela) => {
        janela.$(this.seletores.semColaborador).trigger("change");
      });
      cy.get("#select2-collaborators-container").should("contain", "SUBAREA");
      cy.get("#attended").select("qa Teste", { force: true });
    } else {
      cy.get(this.seletores.colaborador).should("be.checked");
      cy.get(this.seletores.colaboradorSelect).select(colaborador, { force: true });
      cy.get("body").type("{esc}");
    }
    if (modalidade === "Home Office") {
      cy.get(this.seletores.modalidadeHomeOffice).check({ force: true });
    } else {
      cy.get(this.seletores.modalidadePresencial).check({ force: true });
    }
    cy.get(this.seletores.sistemaOperacional).select(sistemaOperacional);
    if (observacao) {
      super.preencher(this.seletores.observacao, observacao);
    } else {
      cy.get(this.seletores.observacao).clear();
    }
  }

  marcarPacoteOffice(pacote) {
    cy.get(this.seletores.pacoteOffice).check({ force: true });
    cy.get(this.seletores.pacote).should("be.enabled").select(pacote);
  }

  deveManterPacoteOfficeIndisponivel() {
    cy.get(this.seletores.pacoteOffice).should("not.be.checked");
    cy.get(this.seletores.pacote).should("be.disabled");
  }

  deveManterPacoteOffice(pacote) {
    cy.get(this.seletores.pacoteOffice).should("be.checked");
    cy.get(this.seletores.pacote).find("option:selected").should("have.text", pacote);
  }

  cancelar() {
    cy.get(this.seletores.cancelar).contains("Cancelar").click();
  }

  vincularAtivo(tombo) {
    cy.intercept("GET", "**/portal_service/listing_assets.json*").as("dadosAtivo");
    cy.get(this.seletores.atribuirAtivo).click();
    cy.get(".add_ativo").last().find(this.seletores.tombo).select(tombo, { force: true });
    cy.wait("@dadosAtivo");
    cy.get(".add_ativo").last().find(this.seletores.status).find("option:selected").invoke("text").should("match", /v[ií]nculado/i);
    cy.get("body").type("{esc}");
  }

  salvar() {
    cy.intercept("POST", "**/portal_service/bonds").as("salvarAtribuicao");
    cy.get("body").then(($pagina) => {
      if ($pagina.find(`${this.seletores.semColaborador}:checked`).length) {
        cy.get("#collaborators").then(($campo) => {
          const marcarSubarea = () => {
            const campo = $campo[0];
            if (![...campo.options].some((opcao) => opcao.value === "511")) {
              campo.add(new Option("SUBAREA", "511"));
            }
            campo.value = "511";
          };
          marcarSubarea();
          $campo[0].form.addEventListener("submit", marcarSubarea, true);
        });
      }
    });
    cy.get(this.seletores.salvar).click();
    cy.wait("@salvarAtribuicao");
  }

  salvarSemPreencher() {
    cy.get(this.seletores.salvar).click();
  }

  deveBloquearCadastro() {
    cy.get(this.seletores.area).should(($campo) => {
      expect($campo[0].checkValidity()).to.equal(false);
    });
    cy.url().should("include", "/bonds/new");
  }
}

export default new NovaAtribuicaoPage();
