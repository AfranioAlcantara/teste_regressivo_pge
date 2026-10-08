# language: pt
Funcionalidade: Relatório de movimentação de ativos
  Como gestor do sistema
  Quero filtrar a movimentação por área e período
  Para consultar apenas as movimentações do recorte escolhido

  @CT-HU04-02 @P1
  Cenário: Filtrar movimentação por área e período
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    Quando consulto a movimentação da área no período de hoje
    Então a listagem mostra a movimentação filtrada dessa atribuição

  @CT-HU04-05 @P2
  Cenário: Pesquisar período sem movimentação
    Dado que estou autenticado como gestor
    Quando consulto a movimentação da área em um período sem dados
    Então o relatório informa que não há movimentação

  @CT-HU04-01 @P1
  Cenário: Abrir a movimentação de ativos
    Dado que estou autenticado como gestor
    Quando abro a movimentação de ativos
    Então a tela de movimentação está pronta

  @CT-HU04-03 @P1
  Cenário: Consultar as colunas da movimentação
    Dado que estou autenticado como gestor
    Quando consulto a movimentação da área no período de hoje
    Então a movimentação mostra as colunas do ativo

  @CT-HU04-04 @P1
  Cenário: Gerar o PDF da movimentação
    Dado que estou autenticado como gestor
    Quando consulto a movimentação da área no período de hoje
    Então o relatório de movimentação é gerado em PDF

  @CT-HU04-06 @P3
  Cenário: Rejeitar data fora do calendário
    Dado que estou autenticado como gestor
    Quando abro a movimentação de ativos
    Então o período não aceita texto livre
