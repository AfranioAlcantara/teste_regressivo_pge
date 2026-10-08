import BasePage from "./BasePage";

class LoginPage extends BasePage {
  caminho = "/";

  seletores = {
    usuario: "#admin_email",
    senha: "#admin_password",
    entrar: "[name='commit']",
  };

  acessar() {
    this.visitar(this.caminho);
  }

  preencherCredenciais(usuario, senha) {
    this.preencher(this.seletores.usuario, usuario);
    this.preencher(this.seletores.senha, senha);
  }

  confirmar() {
    this.clicar(this.seletores.entrar);
  }
   devePermanecerNaTela() {
    cy.url().should("eq", Cypress.config("baseUrl") + "/admins/sign_in");
    cy.get(this.seletores.usuario).should("be.visible");
    cy.get(this.seletores.senha).should("be.visible");
  }
  deveExibirMensagemDeErro() {
    cy.contains("Email ou senha inválidos.").should("be.visible");
  }
}

export default new LoginPage();
