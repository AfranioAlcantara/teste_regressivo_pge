# language: pt
Funcionalidade: Cadastro de atribuição
  Como gestor do sistema
  Quero cadastrar uma atribuição para um colaborador
  Para vincular um ativo ao inventário

  @CT-HU01-01 @P1
  Cenário: Cadastrar atribuição para colaborador específico
    Dado que estou autenticado como gestor
    E existe um ativo disponível para atribuição
    Quando acesso o cadastro de nova atribuição
    E preencho a atribuição presencial para o colaborador
    E vinculo o ativo disponível
    E salvo a atribuição
    Então vejo a confirmação de cadastro
    E o ativo consta como atribuído

  @CT-HU01-06 @P1
  Cenário: Impedir cadastro sem campos obrigatórios
    Dado que estou autenticado como gestor
    Quando acesso o cadastro de nova atribuição
    E salvo a atribuição sem preencher os obrigatórios
    Então o cadastro não é concluído

  @CT-HU01-08 @P1
  Cenário: Vincular dois ativos na mesma atribuição
    Dado que estou autenticado como gestor
    E existem dois ativos disponíveis para atribuição
    Quando acesso o cadastro de nova atribuição
    E preencho a atribuição presencial para o colaborador
    E vinculo os dois ativos disponíveis
    E salvo a atribuição
    Então vejo a confirmação de cadastro
    E os dois ativos constam como atribuídos

  @CT-HU01-02 @P1
  Cenário: Cadastrar atribuição para a subárea sem colaborador
    Dado que estou autenticado como gestor
    E existe um ativo disponível para atribuição
    Quando acesso o cadastro de nova atribuição
    E preencho a atribuição da subárea sem colaborador
    E vinculo o ativo disponível
    E salvo a atribuição
    Então o cadastro da subárea informa que o usuário é obrigatório

  @CT-HU01-03 @P2
  Cenário: Cadastrar atribuição em home office
    Dado que estou autenticado como gestor
    E existe um ativo disponível para atribuição
    Quando acesso o cadastro de nova atribuição
    E preencho a atribuição em home office
    E vinculo o ativo disponível
    E salvo a atribuição
    Então vejo a confirmação de cadastro em home office

  @CT-HU01-04 @P2
  Cenário: Informar pacote Office
    Dado que estou autenticado como gestor
    E existe um ativo disponível para atribuição
    Quando acesso o cadastro de nova atribuição
    E preencho a atribuição presencial para o colaborador
    E marco o pacote Office
    E vinculo o ativo disponível
    E salvo a atribuição
    Então o pacote Office fica gravado na atribuição

  @CT-HU01-05 @P2
  Cenário: Cadastrar sem pacote Office
    Dado que estou autenticado como gestor
    Quando acesso o cadastro de nova atribuição
    Então o pacote Office permanece indisponível

  @CT-HU01-07 @P3
  Cenário: Cadastrar sem observações
    Dado que estou autenticado como gestor
    E existe um ativo disponível para atribuição
    Quando acesso o cadastro de nova atribuição
    E preencho a atribuição sem observação
    E vinculo o ativo disponível
    E salvo a atribuição
    Então a atribuição é gravada sem observação

  @CT-HU01-09 @P2
  Cenário: Cancelar o cadastro
    Dado que estou autenticado como gestor
    Quando acesso o cadastro de nova atribuição
    E preencho uma observação e cancelo o cadastro
    Então a atribuição não é gravada

  @CT-HU01-10 @P1
  Cenário: Consultar o ativo atribuído
    Dado que estou autenticado como gestor
    E existe um ativo disponível para atribuição
    Quando acesso o cadastro de nova atribuição
    E preencho a atribuição presencial para o colaborador
    E vinculo o ativo disponível
    E salvo a atribuição
    Então o ativo consta como atribuído
