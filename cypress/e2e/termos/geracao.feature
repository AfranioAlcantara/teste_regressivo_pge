# language: pt
Funcionalidade: Geração de termos
  Como gestor do sistema
  Quero gerar o termo da atribuição selecionada
  Para formalizar a responsabilidade sobre os ativos

  @CT-HU03-01 @P1
  Cenário: Gerar termo de responsabilidade
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    Quando seleciono a atribuição para gerar termo
    E abro a geração de termos
    E marco o tipo Responsabilidade
    E gero o termo
    Então o documento é o termo de responsabilidade da atribuição

  @CT-HU03-02 @P1
  Cenário: Gerar termo de empréstimo
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    Quando seleciono a atribuição para gerar termo
    E abro a geração de termos
    E marco o tipo Empréstimo
    E gero o termo
    Então o documento é o termo de empréstimo da atribuição

  @CT-HU03-03 @P2
  Cenário: Manter apenas um tipo de termo selecionado
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    Quando seleciono a atribuição para gerar termo
    E abro a geração de termos
    E marco o tipo Responsabilidade
    E marco o tipo Empréstimo
    Então apenas o tipo Empréstimo permanece selecionado
    Quando marco o tipo Responsabilidade
    Então apenas o tipo Responsabilidade permanece selecionado

  @CT-HU03-04 @P2
  Cenário: Fechar a geração de termos
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    Quando seleciono a atribuição para gerar termo
    E abro a geração de termos
    E fecho a geração de termos
    Então o termo não é gerado

  @CT-HU03-05 @P2
  Cenário: Conferir os ativos do termo
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    Quando seleciono a atribuição para gerar termo
    E abro a geração de termos
    E marco o tipo Responsabilidade
    E gero o termo
    Então o documento é o termo de responsabilidade da atribuição
