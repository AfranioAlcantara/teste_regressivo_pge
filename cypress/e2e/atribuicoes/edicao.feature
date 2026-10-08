# language: pt
Funcionalidade: Edição de atribuição
  Como gestor do sistema
  Quero alterar uma atribuição existente
  Para manter os dados do inventário atualizados

  @CT-HU02-02 @P1
  Cenário: Alterar a observação e salvar
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    Quando edito a observação dessa atribuição
    E salvo a edição da atribuição
    Então vejo a confirmação da edição
    E a consulta mostra a observação alterada
    E os demais dados da atribuição permanecem

  @CT-HU02-03 @P1
  Cenário: Remover um ativo da atribuição
    Dado que estou autenticado como gestor
    E existe uma atribuição com dois ativos vinculados
    Quando removo o primeiro ativo dessa atribuição
    E salvo a edição da atribuição
    Então o ativo removido não permanece vinculado

  @CT-HU02-05 @P2
  Cenário: Impedir edição sem campo obrigatório
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    Quando abro a edição dessa atribuição
    E salvo a edição sem preencher o obrigatório
    Então a edição não é concluída

  @CT-HU02-01 @P1
  Cenário: Abrir a edição com os dados carregados
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    Quando abro a edição dessa atribuição
    Então os dados da atribuição estão carregados

  @CT-HU02-04 @P1
  Cenário: Adicionar outro ativo na edição
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    E existe outro ativo disponível
    Quando adiciono o outro ativo nessa atribuição
    E salvo a edição da atribuição
    Então os dois ativos da edição permanecem vinculados

  @CT-HU02-06 @P1
  Cenário: Tratar ativo com defeito
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    E existe outro ativo disponível
    Quando informo o defeito e substituo o ativo
    E salvo a edição da atribuição
    Então o ativo com defeito não permanece vinculado

  @CT-HU02-07 @P1
  Cenário: Substituir o ativo
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    E existe outro ativo disponível
    Quando marco o ativo como disponível e substituo
    E salvo a edição da atribuição
    Então o ativo substituído não permanece vinculado

  @CT-HU02-08 @P2
  Cenário: Cancelar a edição
    Dado que estou autenticado como gestor
    E existe uma atribuição com ativo vinculado
    Quando altero a observação e cancelo a edição
    Então a alteração não é gravada
