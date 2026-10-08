import BasePage from "./BasePage";

class AtivoPage extends BasePage {
  caminho = "/portal_service/listing_assets/new";

  seletores = {
    novo: "a[href='/portal_service/listing_assets/new']",
    tipo: "#type",
    marca: "#asset_brand",
    modelo: "#asset_model",
    serial: "#asset_serial",
    tombo: "#asset_tombo",
    aquisicao: "#asset_acquisition_id",
    salvar: "input[value='Salvar']",
  };

  cadastrarDisponivel(alias = "tombo") {
    cy.on("uncaught:exception", (erro) => {
      if (erro.message.includes("disabled")) {
        return false;
      }
    });

    const tombo = `CT${Date.now()}${alias === "tombo" ? "" : "B"}`;
    cy.wrap(tombo).as(alias);
    this.visitar("/portal_service/listing_assets");
    this.clicar(this.seletores.novo);
    cy.get(this.seletores.tipo).select("DESKTOP");
    super.preencher(this.seletores.marca, "Dell");
    super.preencher(this.seletores.modelo, "OptiPlex");
    super.preencher(this.seletores.serial, tombo);
    super.preencher(this.seletores.tombo, tombo);
    cy.get(this.seletores.aquisicao).select("00/0001");
    cy.get(this.seletores.salvar).click();
    cy.get(".alert-success").should("be.visible");
  }
}

export default new AtivoPage();
