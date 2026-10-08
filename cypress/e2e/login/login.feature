# language: pt
Funcionalidade: Login
  Como gestor do sistema
  Quero autenticar com minhas credenciais
  Para acessar o inventário

  @CT-LOGIN-01 @P1
  Cenário: Acesso com credenciais válidas
    Dado que acesso a tela de login
    Quando informo as credenciais de acesso
    E confirmo o login
    Então devo ver a área autenticada

  @CT-LOGIN-02 @P1
  Cenário: Informar senha inválida
    Dado que acesso a tela de login
    Quando informo o e-mail válido e uma senha inválida
    E confirmo o login
    Então permaneço na tela de login
    E vejo a mensagem de erro de autenticação
