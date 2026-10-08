# language: pt
Funcionalidade: Relatório de atribuições por área
  Como gestor do sistema
  Quero consultar as atribuições por área
  Para ver um relatório diferente da movimentação de ativos

  @CT-HU05-01 @P1
  Cenário: Abrir atribuições por área
    Dado que estou autenticado como gestor
    Quando abro as atribuições por área
    Então a tela de atribuições por área está pronta

  @CT-HU05-02 @P1
  Cenário: Filtrar o relatório sintético por área
    Dado que estou autenticado como gestor
    Quando pesquiso as atribuições sintéticas da área
    Então vejo o relatório sintético da área

  @CT-HU05-03 @P2
  Cenário: Consultar o agrupamento do relatório
    Dado que estou autenticado como gestor
    Quando pesquiso as atribuições analíticas da área
    Então vejo o relatório analítico da área

  @CT-HU05-04 @P1
  Cenário: Gerar o PDF de atribuições por área
    Dado que estou autenticado como gestor
    Quando pesquiso as atribuições sintéticas da área
    Então o relatório de atribuições por área é gerado em PDF

  @CT-HU05-05 @P2
  Cenário: Pesquisar área sem atribuição
    Dado que estou autenticado como gestor
    Quando pesquiso uma área sem atribuição
    Então o relatório informa que não há atribuição
