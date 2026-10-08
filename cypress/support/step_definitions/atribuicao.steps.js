import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ativoPage, atribuicoesPage, editarAtribuicaoPage, novaAtribuicaoPage } from "../pages";

Given("que estou autenticado como gestor", () => {
  cy.autenticar();
});

Given("existe um ativo disponível para atribuição", () => {
  ativoPage.cadastrarDisponivel();
});

When("acesso o cadastro de nova atribuição", () => {
  atribuicoesPage.acessar();
  atribuicoesPage.iniciarNovaAtribuicao();
});

When("preencho a atribuição presencial para o colaborador", () => {
  cy.fixture("atribuicao").then((dados) => {
    const observacao = `CT-HU01-01 ${Date.now()}`;
    cy.wrap(observacao).as("observacao");
    novaAtribuicaoPage.preencherAtribuicao({ ...dados, observacao });
  });
});

When("vinculo o ativo disponível", () => {
  cy.get("@tombo").then((tombo) => {
    novaAtribuicaoPage.vincularAtivo(tombo);
  });
});

When("salvo a atribuição", () => {
  novaAtribuicaoPage.salvar();
});

Then("vejo a confirmação de cadastro", () => {
  atribuicoesPage.deveConfirmarCadastro();
});

Then("o ativo consta como atribuído", () => {
  cy.get("@observacao").then((observacao) => {
    atribuicoesPage.deveMostrarAtivoAtribuido(observacao);
  });
});

When("salvo a atribuição sem preencher os obrigatórios", () => {
  novaAtribuicaoPage.salvarSemPreencher();
});

Then("o cadastro não é concluído", () => {
  novaAtribuicaoPage.deveBloquearCadastro();
});

Given("existem dois ativos disponíveis para atribuição", () => {
  ativoPage.cadastrarDisponivel("tombo");
  ativoPage.cadastrarDisponivel("tombo2");
});

When("vinculo os dois ativos disponíveis", () => {
  cy.get("@tombo").then((tombo) => {
    novaAtribuicaoPage.vincularAtivo(tombo);
  });
  cy.get("@tombo2").then((tombo) => {
    novaAtribuicaoPage.vincularAtivo(tombo);
  });
});

When("preencho a atribuição da subárea sem colaborador", () => {
  cy.fixture("atribuicao").then((dados) => {
    const observacao = `CT-HU01-02 ${Date.now()}`;
    cy.wrap(observacao).as("observacao");
    novaAtribuicaoPage.preencherAtribuicao({ ...dados, observacao, semColaborador: true });
  });
});

Then("o cadastro da subárea informa que o usuário é obrigatório", () => {
  cy.contains(".alert-danger", "User é obrigatório(a)").should("be.visible");
  cy.get("@observacao").then((observacao) => {
    cy.contains("tr", observacao).should("not.exist");
  });
});

When("preencho a atribuição em home office", () => {
  cy.fixture("atribuicao").then((dados) => {
    const observacao = `CT-HU01-03 ${Date.now()}`;
    cy.wrap(observacao).as("observacao");
    novaAtribuicaoPage.preencherAtribuicao({ ...dados, observacao, modalidade: "Home Office" });
  });
});

Then("vejo a confirmação de cadastro em home office", () => {
  atribuicoesPage.deveConfirmarCadastro("Home Office");
});

When("marco o pacote Office", () => {
  novaAtribuicaoPage.marcarPacoteOffice("OF-POEPE");
});

Then("o pacote Office fica gravado na atribuição", () => {
  cy.get("@observacao").then((observacao) => {
    atribuicoesPage.editar(observacao);
  });
  novaAtribuicaoPage.deveManterPacoteOffice("OF-POEPE");
});

Then("o pacote Office permanece indisponível", () => {
  novaAtribuicaoPage.deveManterPacoteOfficeIndisponivel();
});

When("preencho a atribuição sem observação", () => {
  cy.fixture("atribuicao").then((dados) => {
    novaAtribuicaoPage.preencherAtribuicao({ ...dados, observacao: "" });
  });
});

Then("a atribuição é gravada sem observação", () => {
  cy.get(".bootstrap-growl").should("be.visible").and("contain", "Parabéns!");
  cy.get("@tombo").then((tombo) => {
    cy.get("tbody tr").first().find("i.fa-eye").closest("a").click();
    cy.get("#bondmodal .modal-content").should("be.visible").and("contain", tombo);
  });
});

When("preencho uma observação e cancelo o cadastro", () => {
  const observacao = `CT-HU01-09 ${Date.now()}`;
  cy.wrap(observacao).as("observacaoCancelada");
  cy.get("#bond_observation").clear().type(observacao);
  novaAtribuicaoPage.cancelar();
});

Then("a atribuição não é gravada", () => {
  cy.get("@observacaoCancelada").then((observacao) => {
    atribuicoesPage.naoDeveTerGravado(observacao);
  });
});

Then("os dois ativos constam como atribuídos", () => {
  cy.get("@observacao").then((observacao) => {
    cy.get("@tombo").then((tombo) => {
      cy.get("@tombo2").then((tombo2) => {
        atribuicoesPage.deveMostrarAtivosAtribuidos(observacao, [tombo, tombo2]);
      });
    });
  });
});

Given("existe uma atribuição com ativo vinculado", () => {
  ativoPage.cadastrarDisponivel();
  atribuicoesPage.acessar();
  atribuicoesPage.iniciarNovaAtribuicao();
  cy.fixture("atribuicao").then((dados) => {
    const observacao = `CT-HU01-01 ${Date.now()}`;
    cy.wrap(observacao).as("observacao");
    novaAtribuicaoPage.preencherAtribuicao({ ...dados, observacao });
  });
  cy.get("@tombo").then((tombo) => {
    novaAtribuicaoPage.vincularAtivo(tombo);
  });
  novaAtribuicaoPage.salvar();
  atribuicoesPage.deveConfirmarCadastro();
});

When("abro a edição dessa atribuição", () => {
  cy.get("@observacao").then((observacao) => {
    atribuicoesPage.editar(observacao);
  });
});

Given("existe uma atribuição com dois ativos vinculados", () => {
  ativoPage.cadastrarDisponivel("tombo");
  ativoPage.cadastrarDisponivel("tombo2");
  atribuicoesPage.acessar();
  atribuicoesPage.iniciarNovaAtribuicao();
  cy.fixture("atribuicao").then((dados) => {
    const observacao = `CT-HU02-03 ${Date.now()}`;
    cy.wrap(observacao).as("observacao");
    novaAtribuicaoPage.preencherAtribuicao({ ...dados, observacao });
  });
  cy.get("@tombo").then((tombo) => {
    novaAtribuicaoPage.vincularAtivo(tombo);
  });
  cy.get("@tombo2").then((tombo) => {
    novaAtribuicaoPage.vincularAtivo(tombo);
  });
  novaAtribuicaoPage.salvar();
  atribuicoesPage.deveConfirmarCadastro();
});

When("removo o primeiro ativo dessa atribuição", () => {
  cy.get("@observacao").then((observacao) => {
    atribuicoesPage.editar(observacao);
  });
  editarAtribuicaoPage.removerAtivoVinculado();
});

When("salvo a edição sem preencher o obrigatório", () => {
  editarAtribuicaoPage.tentarSalvarSemObrigatorio();
});

Then("a edição não é concluída", () => {
  editarAtribuicaoPage.deveBloquearEdicao();
});

Then("o ativo removido não permanece vinculado", () => {
  cy.get("@observacao").then((observacao) => {
    cy.get("@tombo").then((removido) => {
      cy.get("@tombo2").then((mantido) => {
        atribuicoesPage.deveTerRemovidoAtivo(observacao, removido, mantido);
      });
    });
  });
});

When("edito a observação dessa atribuição", () => {
  const observacaoAlterada = `CT-HU02-02 ${Date.now()}`;
  cy.wrap(observacaoAlterada).as("observacaoAlterada");
  cy.get("@observacao").then((observacao) => {
    atribuicoesPage.editar(observacao);
  });
  editarAtribuicaoPage.alterarObservacao(observacaoAlterada);
});

When("salvo a edição da atribuição", () => {
  editarAtribuicaoPage.salvar();
});

Then("vejo a confirmação da edição", () => {
  cy.get("@observacaoAlterada").then((observacao) => {
    atribuicoesPage.deveConfirmarEdicao(observacao);
  });
});

Then("a consulta mostra a observação alterada", () => {
  cy.get("@observacaoAlterada").then((observacaoAlterada) => {
    cy.get("@observacao").then((observacao) => {
      atribuicoesPage.deveMostrarObservacaoAlterada(observacaoAlterada, observacao);
    });
  });
});

Then("os dados da atribuição estão carregados", () => {
  cy.fixture("atribuicao").then((dados) => {
    cy.get("@observacao").then((observacao) => {
      cy.get("@tombo").then((tombo) => {
        editarAtribuicaoPage.deveTrazerDados(dados, observacao, tombo);
      });
    });
  });
});

Given("existe outro ativo disponível", () => {
  ativoPage.cadastrarDisponivel("tombo2");
});

When("adiciono o outro ativo nessa atribuição", () => {
  atribuicoesPage.acessar();
  cy.get("@observacao").then((observacao) => {
    atribuicoesPage.editar(observacao);
  });
  cy.get("@tombo2").then((tombo) => {
    editarAtribuicaoPage.vincularOutroAtivo(tombo);
  });
});

Then("os dois ativos da edição permanecem vinculados", () => {
  cy.get("@observacao").then((observacao) => {
    cy.get("@tombo").then((tombo) => {
      cy.get("@tombo2").then((tombo2) => {
        atribuicoesPage.deveMostrarAtivosAtribuidos(observacao, [tombo, tombo2]);
      });
    });
  });
});

When("informo o defeito e substituo o ativo", () => {
  atribuicoesPage.acessar();
  cy.get("@observacao").then((observacao) => {
    atribuicoesPage.editar(observacao);
  });
  editarAtribuicaoPage.informarDefeito("Tela quebrada");
  editarAtribuicaoPage.removerAtivoVinculado();
  cy.get("@tombo2").then((tombo) => {
    editarAtribuicaoPage.vincularOutroAtivo(tombo);
  });
});

Then("o ativo com defeito não permanece vinculado", () => {
  cy.get("@observacao").then((observacao) => {
    cy.get("@tombo").then((removido) => {
      cy.get("@tombo2").then((mantido) => {
        atribuicoesPage.deveTerRemovidoAtivo(observacao, removido, mantido);
      });
    });
  });
});

When("marco o ativo como disponível e substituo", () => {
  atribuicoesPage.acessar();
  cy.get("@observacao").then((observacao) => {
    atribuicoesPage.editar(observacao);
  });
  editarAtribuicaoPage.marcarDisponivelParaSubstituicao();
  editarAtribuicaoPage.removerAtivoVinculado();
  cy.get("@tombo2").then((tombo) => {
    editarAtribuicaoPage.vincularOutroAtivo(tombo);
  });
});

Then("o ativo substituído não permanece vinculado", () => {
  cy.get("@observacao").then((observacao) => {
    cy.get("@tombo").then((removido) => {
      cy.get("@tombo2").then((mantido) => {
        atribuicoesPage.deveTerRemovidoAtivo(observacao, removido, mantido);
      });
    });
  });
});

When("altero a observação e cancelo a edição", () => {
  const observacaoCancelada = `CT-HU02-08 ${Date.now()}`;
  cy.wrap(observacaoCancelada).as("observacaoCancelada");
  cy.get("@observacao").then((observacao) => {
    atribuicoesPage.editar(observacao);
  });
  editarAtribuicaoPage.alterarObservacao(observacaoCancelada);
  editarAtribuicaoPage.cancelar();
});

Then("a alteração não é gravada", () => {
  cy.get("@observacao").then((observacao) => {
    cy.contains("tr", observacao).should("be.visible");
  });
  cy.get("@observacaoCancelada").then((observacao) => {
    cy.contains("tr", observacao).should("not.exist");
  });
});

Then("os demais dados da atribuição permanecem", () => {
  cy.fixture("atribuicao").then((dados) => {
    cy.get("@observacaoAlterada").then((observacao) => {
      cy.get("@tombo").then((tombo) => {
        atribuicoesPage.deveManterDados(observacao, dados, tombo);
      });
    });
  });
});
