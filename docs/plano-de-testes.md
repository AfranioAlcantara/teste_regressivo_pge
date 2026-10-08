# Plano de testes — Inventário CTI

| Campo | Valor |
| --- | --- |
| Sistema | Inventário CTI |
| Versão do plano | 1.3 |
| Origem | Histórias de usuário do Teste Prático — Analista de Testes — PGE-CE |
| Ambiente | Homologação / QA |
| Abordagem | Caixa-preta, BDD (Gherkin). O catálogo da seção 10 está automatizado, da HU01 à HU05, inclusive o login |

## 1. Objetivo

Garantir que as operações críticas do Inventário CTI — cadastro e edição de atribuições, vinculação de ativos, geração de termos, movimentação de ativos e atribuições por área — funcionam conforme os critérios de aceite. A automação cobre o catálogo da seção 10, com cenários positivos e negativos.

## 2. Escopo

### 2.1 Incluído nesta etapa

- Acesso ao sistema: CT-LOGIN-01 e CT-LOGIN-02
- Catálogo da seção 10, da HU01 à HU05

### 2.2 Fora desta etapa

- Cadastro de áreas, colaboradores, ativos e licenças (usados apenas como massa)
- Descarte/devolução fora do fluxo de atribuição
- Ambientes diferentes do QA informado no desafio

## 3. Referências

- Documento do desafio: *Teste Prático — Analista de Testes — Procuradoria Geral do Estado do Ceará — v2*
- Este repositório: README e suíte Cypress + Cucumber

## 4. Ambiente e ferramentas

| Item | Detalhe |
| --- | --- |
| URL | http://testeqa.pge.ce.gov.br |
| Tela de login | `/` |
| Usuário | `qa.teste@teste.pge.ce.gov.br` |
| Senha | Conforme documento do desafio (não versionar em arquivo público) |
| Perfil | Gestor do sistema |
| Automação | Cypress 16.1.1, Cucumber (Gherkin), Page Objects |
| Evidência automatizada | Print em falha em `cypress/screenshots`. Relatório Cucumber em `cypress/reports/cucumber-report.json`. A suíte não grava vídeo |
| Evidência de PDF | Conteúdo do termo (HU03) e do PDF da movimentação (HU04). No HU05, o link do relatório filtrado e a resposta HTTP |
| Navegador | Chrome (principal) |

## 5. Abordagem

O formato é BDD em Gherkin (`Dado` / `Quando` / `Então`) com Page Objects. Cada frase do cenário chama um passo, e o passo chama a página da tela. Área, subárea, colaborador e sistema operacional vêm da fixture. O ativo e a atribuição são criados pelo próprio cenário.

| História | Casos automatizados | O que a automação prova |
| --- | --- | --- |
| Pré-condição | CT-LOGIN-01, CT-LOGIN-02 | Login válido e senha inválida |
| HU01 | CT-HU01-01 a CT-HU01-10 | Cadastro presencial, home office, pacote Office, observação, dois ativos, consulta, cancelamento e bloqueio sem obrigatório. A subárea sem colaborador para na validação de usuário |
| HU02 | CT-HU02-01 a CT-HU02-08 | Dados carregados, edição, inclusão e remoção de ativo, defeito, substituição, cancelamento e bloqueio sem obrigatório |
| HU03 | CT-HU03-01 a CT-HU03-05 | Termos de Responsabilidade e Empréstimo, um único tipo, fechar o modal e conferir a descrição do ativo |
| HU04 | CT-HU04-01 a CT-HU04-06 | Tela, filtro, colunas, PDF, período sem movimentação e campo de data |
| HU05 | CT-HU05-01 a CT-HU05-05 | Tela própria, relatório sintético, relatório analítico, link do PDF e área sem atribuição |

O CT-HU02-03 grava dois ativos e remove o primeiro. A tela não conclui a edição se a atribuição ficar sem nenhum ativo; o cenário confere que o removido sai e o outro permanece.

Execução por tag, a partir da raiz do projeto:

```text
npm run cy:run --tag=@P1
npm run cy:run --tag=@CT-HU01-06
```

Sem `--tag`, roda a suíte automatizada inteira. `@P1` é o regressivo dos casos de prioridade alta. `@P2` e `@P3` reúnem os demais, pela tag de cada cenário.

## 6. Critérios de entrada

A execução só começa se:

- O ambiente QA estiver acessível e o login do gestor autenticar.
- Existir a massa de referência da fixture: área ADNIS, subárea ADNIS, colaborador Carlos Henrique Silva, sistema WINDOWS 10 PRO e aquisição 00/0001 no cadastro de ativo. Os cenários criam o ativo e a atribuição.
- O escopo das HUs e este plano estiverem alinhados.
- Ferramentas instaladas (`npm install`) e `baseUrl` apontando para o QA.

## 7. Critérios de saída

O ciclo desta etapa é encerrado quando:

- Os casos da tabela da seção 5 tiverem passado, ou o desvio estiver documentado como defeito.
- O comando `npm run cy:run --tag=@P1` reproduzir o regressivo.

**Critério de suspensão:** ambiente indisponível, senha inválida, ausência da massa de referência (área, colaborador ou sistema operacional) ou defeito bloqueante no login/menu.

**Retomada:** ambiente restabelecido, massa recriada e casos da seção 5 reexecutados com `npm run cy:run`.

## 8. Risco de especificação — HU04 e HU05

A HU05 copia título, objetivo e critérios da HU04 (Movimentação de Ativos), mas o fluxo citado é **Relatórios → Atribuições por Área → Gerar Relatório**.

Decisão deste plano:

- HU04 é testada na tela **Movimentação de Ativos**.
- HU05 é testada na tela real **Atribuições por Área/Subárea**, com tipo Sintético ou Analítico, filtro de área e o link Gerar Relatório. Não reutiliza o cenário da movimentação.
- A história escrita continua copiando a HU04. Essa inconsistência permanece como melhoria da especificação (seção 12). A execução segue a tela.

## 9. Matriz de rastreabilidade

| ID do critério | História | Critério de aceite | Casos |
| --- | --- | --- | --- |
| AC-LOGIN-01 | Pré-condição | Autenticar gestor para usar o sistema | CT-LOGIN-01, CT-LOGIN-02 |
| AC-01-01 | HU01 | Selecionar Área e Subárea | CT-HU01-01, CT-HU01-06 |
| AC-01-02 | HU01 | Atribuir a colaborador **ou** subárea sem colaborador | CT-HU01-01, CT-HU01-02 |
| AC-01-03 | HU01 | Campos com `*` obrigatórios | CT-HU01-06 |
| AC-01-04 | HU01 | Modalidade Presencial ou Home Office | CT-HU01-01, CT-HU01-03 |
| AC-01-05 | HU01 | Informar Sistema Operacional | CT-HU01-01 |
| AC-01-06 | HU01 | Pacote Office condicionado à checkbox | CT-HU01-04, CT-HU01-05 |
| AC-01-07 | HU01 | Observações opcionais | CT-HU01-01, CT-HU01-07 |
| AC-01-08 | HU01 | Vincular um ou mais ativos em “Atribuir Ativo” | CT-HU01-01, CT-HU01-08 |
| AC-01-09 | HU01 | Salvar e Cancelar; Cancelar descarta | CT-HU01-01, CT-HU01-09 |
| AC-01-10 | HU01 | Confirmação e ativos constam como atribuídos | CT-HU01-01, CT-HU01-10 |
| AC-02-01 | HU02 | Acessar atribuição existente para edição | CT-HU02-01 |
| AC-02-02 | HU02 | Carregar campos já preenchidos | CT-HU02-01 |
| AC-02-03 | HU02 | Alterar campo editável | CT-HU02-02 |
| AC-02-04 | HU02 | Seção de ativos com tombo, descrição e status | CT-HU02-01 |
| AC-02-05 | HU02 | Remover ativo | CT-HU02-03 |
| AC-02-06 | HU02 | Adicionar novos ativos | CT-HU02-04 |
| AC-02-07 | HU02 | Obrigatórios continuam validados | CT-HU02-05 |
| AC-02-08 | HU02 | Defeito: COM DEFEITO, informar defeito, Remover, incluir outro | CT-HU02-06 |
| AC-02-09 | HU02 | Substituição: DISPONÍVEL, Remover, incluir outro | CT-HU02-07 |
| AC-02-10 | HU02 | Salvar e Cancelar | CT-HU02-02, CT-HU02-08 |
| AC-02-11 | HU02 | Salvar atualiza com integridade | CT-HU02-02 |
| AC-02-12 | HU02 | Cancelar descarta alterações | CT-HU02-08 |
| AC-02-13 | HU02 | Confirmação após salvar | CT-HU02-02 |
| AC-03-01 | HU03 | Tipos Responsabilidade ou Empréstimo | CT-HU03-01, CT-HU03-02 |
| AC-03-02 | HU03 | Seleção mutuamente exclusiva | CT-HU03-03 |
| AC-03-03 | HU03 | Botão Gerar disponível | CT-HU03-01 |
| AC-03-04 | HU03 | Fechar modal pelo X | CT-HU03-04 |
| AC-03-05 | HU03 | PDF com título, texto legal, nome, CPF, área, ativos, local/data, assinatura | CT-HU03-01, CT-HU03-02, CT-HU03-05 |
| AC-04-01 | HU04 | Tela com filtros e visualização | CT-HU04-01 |
| AC-04-02 | HU04 | Filtro por Área | CT-HU04-02 |
| AC-04-03 | HU04 | Filtro por período dd/mm/aaaa | CT-HU04-02, CT-HU04-06 |
| AC-04-04 | HU04 | Pesquisar aplica filtros | CT-HU04-02 |
| AC-04-05 | HU04 | Resultados agrupados por área | CT-HU04-02 |
| AC-04-06 | HU04 | Data e quantidade de movimentações | CT-HU04-02 |
| AC-04-07 | HU04 | Colunas tombo, série, descrição, lotações, colaborador | CT-HU04-03 |
| AC-04-08 | HU04 | Gerar Relatório em PDF (nova aba), mesma estrutura | CT-HU04-04 |
| AC-04-09 | HU04 | Sem dados: informar indisponibilidade | CT-HU04-05 |
| AC-05-01 | HU05 | Acessar Relatórios → Atribuições por Área | CT-HU05-01 |
| AC-05-02 | HU05 | Filtros e listagem da tela real | CT-HU05-02, CT-HU05-03 |
| AC-05-03 | HU05 | Gerar Relatório em PDF | CT-HU05-04 |
| AC-05-04 | HU05 | Sem dados: mensagem adequada | CT-HU05-05 |

## 10. Casos de teste

Legenda: **P** positivo · **N** negativo · **P1** bloqueante/crítico · **P2** alto · **P3** médio

Pré-condição padrão (exceto login): usuário gestor autenticado.

### 10.1 Pré-condição — Login

**CT-LOGIN-01** · P · P1  
Autenticar com e-mail e senha válidos e acessar o inventário.

**CT-LOGIN-02** · N · P1  
Informar senha inválida: permanecer em `/admins/sign_in` e exibir “Email ou senha inválidos.”

### 10.2 HU01 — Cadastro de atribuição

Fluxo: **Atribuições → Nova Atribuição → Novo Ativo**  
Automação: CT-HU01-01 a CT-HU01-10.

**CT-HU01-01** · P · P1 · AC-01-01, 02, 04, 05, 07, 08, 09, 10  
Cadastrar atribuição para colaborador específico: Área, Subárea, colaborador, modalidade Presencial, SO, observação opcional, um ativo via “Atribuir Ativo”, Salvar.  
Esperado: confirmação de sucesso; ativo consta como atribuído no inventário.

**CT-HU01-02** · P · P1 · AC-01-02  
Escolher o tipo Subárea, sem o colaborador da fixture. O formulário aponta o colaborador sentinela SUBAREA.  
Esperado nesta base: o salvamento não conclui e a tela exibe “User é obrigatório(a)”. O usuário SUBAREA não está cadastrado no QA, então a gravação prevista na história fica bloqueada.

**CT-HU01-03** · P · P2 · AC-01-04  
Repetir cadastro válido com modalidade **Home Office**.  
Esperado: modalidade persistida.

**CT-HU01-04** · P · P2 · AC-01-06  
Marcar “Utilizará Pacote Office?”.  
Esperado: campo Pacote Office fica disponível e pode ser preenchido.

**CT-HU01-05** · N · P2 · AC-01-06  
Não marcar a checkbox.  
Esperado: campo Pacote Office indisponível ou irrelevante; cadastro não exige pacote.

**CT-HU01-06** · N · P1 · AC-01-01, AC-01-03  
Salvar sem preencher campos com `*` (Área/Subárea e demais obrigatórios).  
Esperado: cadastro não conclui; sistema indica pendências.

**CT-HU01-07** · P · P3 · AC-01-07  
Cadastrar sem observações.  
Esperado: sucesso; observações não são obrigatórias.

**CT-HU01-08** · P · P1 · AC-01-08  
Vincular **dois ou mais** ativos na mesma atribuição.  
Esperado: todos vinculados após salvar.

**CT-HU01-09** · N · P2 · AC-01-09  
Preencher dados e clicar em Cancelar.  
Esperado: nada persistido; dados descartados.

**CT-HU01-10** · P · P1 · AC-01-10  
Após CT-HU01-01, consultar o inventário/listagem do ativo.  
Esperado: status/responsabilidade coerentes com a atribuição.

### 10.3 HU02 — Editar atribuição

Fluxo: **Atribuições → Ações → Editar**  
Pré-condição extra: atribuição existente com ao menos um ativo (pode usar a gerada na HU01).  
Automação: CT-HU02-01 a CT-HU02-08.

**CT-HU02-01** · P · P1 · AC-02-01, 02, 04  
Abrir edição.  
Esperado: Área, Subárea, Colaborador, Atendido por, Modalidade, SO, Pacote Office, Observações carregados; seção “Ativos da Atribuição” com tombo, descrição e status.

**CT-HU02-02** · P · P1 · AC-02-03, 10, 11, 13  
Alterar um campo editável (ex.: modalidade ou observações) e Salvar.  
Esperado: confirmação; consulta posterior mostra o novo valor; demais dados íntegros.

**CT-HU02-03** · P · P1 · AC-02-05  
Remover um ativo pelo botão “Remover”.  
Esperado: item sai da seção; após salvar, não permanece vinculado.  
Na automação, a atribuição começa com dois ativos. O primeiro é removido; o segundo permanece, porque a tela não grava a edição sem nenhum ativo.

**CT-HU02-04** · P · P1 · AC-02-06  
Adicionar novo ativo (instruções em vermelho na tela).  
Esperado: novo item na lista; persiste ao salvar.

**CT-HU02-05** · N · P2 · AC-02-07  
Limpar/omitir campo obrigatório e Salvar.  
Esperado: validação impede gravar.

**CT-HU02-06** · P · P1 · AC-02-08  
Ativo com defeito: status **COM DEFEITO**, informar o defeito, Remover, incluir outro ativo, Salvar.  
Esperado: ativo defeituoso tratado conforme regra; novo ativo vinculado.

**CT-HU02-07** · P · P1 · AC-02-09  
Substituição: status **DISPONÍVEL**, Remover, incluir outro, Salvar.  
Esperado: ativo original disponível; substituto atribuído.

**CT-HU02-08** · N · P2 · AC-02-10, 12  
Alterar dados e Cancelar.  
Esperado: alterações descartadas; registro original inalterado.

### 10.4 HU03 — Geração de termos

Fluxo: **Atribuições → selecionar no checkbox → Gerar Termos**  
Pré-condição extra: atribuição com colaborador e ativos.  
Automação: CT-HU03-01 a CT-HU03-05.

**CT-HU03-01** · P · P1 · AC-03-01, 03, 05  
Selecionar atribuição, tipo **Responsabilidade**, Gerar.  
Esperado: PDF “TERMO DE RESPONSABILIDADE” com texto legal, nome do colaborador, campo/CPF, área, seção “ATIVOS ATRIBUÍDOS”, local e data, assinatura.

**CT-HU03-02** · P · P1 · AC-03-01, 05  
Gerar tipo **Empréstimo**.  
Esperado: PDF “TERMO DE EMPRÉSTIMO” com a mesma estrutura de dados, título correspondente.

**CT-HU03-03** · N · P2 · AC-03-02  
Tentar manter os dois tipos ao mesmo tempo.  
Esperado: apenas um tipo ativo (seleção exclusiva).

**CT-HU03-04** · P · P2 · AC-03-04  
Abrir o modal e fechar pelo **X**.  
Esperado: modal fecha; documento não é gerado.

**CT-HU03-05** · P · P2 · AC-03-05  
Conferir no PDF se a lista de ativos coincide com a atribuição selecionada.  
Esperado: tombos/descrições alinhados à tela.

### 10.5 HU04 — Relatório de movimentação de ativos

Fluxo: **Relatórios → Movimentação de Ativos → filtrar Área e período → Pesquisar**  
Automação: CT-HU04-01 a CT-HU04-06. O campo de data é `type="date"`: texto livre não permanece no valor.

**CT-HU04-01** · P · P1 · AC-04-01  
Abrir a tela.  
Esperado: título/contexto de movimentação, filtros e área de visualização.

**CT-HU04-02** · P · P1 · AC-04-02 a 06  
Filtrar Área e período (`dd/mm/aaaa`) com massa conhecida; Pesquisar.  
Esperado: listagem só do filtro; agrupamento por área; cabeçalho da área; linha de data e quantidade (ex.: “21 de Janeiro de 2026 - 2 movimentações”).

**CT-HU04-03** · P · P1 · AC-04-07  
Inspecionar um item.  
Esperado: Tombo, Nº de Série, Descrição, Lotação Anterior, Lotação Atual, Colaborador.

**CT-HU04-04** · P · P1 · AC-04-08  
Gerar Relatório.  
Esperado: PDF em nova aba; mesma estrutura de agrupamento por área e data da tela.

**CT-HU04-05** · N · P2 · AC-04-09  
Período/área sem movimentação.  
Esperado: mensagem de que não há dados disponíveis.

**CT-HU04-06** · N · P3 · AC-04-03  
Informar data em formato inválido (se a UI permitir digitação livre).  
Esperado: rejeição ou máscara `dd/mm/aaaa`; pesquisa não retorna lixo.

### 10.6 HU05 — Relatório de atribuições por área

Fluxo citado: **Relatórios → Atribuições por Área → Gerar Relatório**

Automação: CT-HU05-01 a CT-HU05-05, na tela Atribuições por Área/Subárea.

**CT-HU05-01** · P · P1 · AC-05-01  
Abrir Atribuições por Área.  
Esperado: título “Atribuições por Área/Subárea”, tipos Sintético e Analítico, área e Pesquisar. A tela de Movimentação de Ativos não é esta.

**CT-HU05-02** · P · P1 · AC-05-02  
Pesquisar a área ADNIS no tipo Sintético.  
Esperado: “Relatório Sintético - ADNIS”, total de atribuições e os agrupamentos por modalidade e por colaboradores.

**CT-HU05-03** · P · P2 · AC-05-02  
Pesquisar a mesma área no tipo Analítico.  
Esperado: “Relatório Analítico - ADNIS”.

**CT-HU05-04** · P · P1 · AC-05-03  
Gerar Relatório depois da pesquisa sintética.  
Esperado: o link aponta para o PDF da área filtrada e a resposta vem com status 200 e tipo PDF. Nesta base o corpo da resposta é vazio (`[]`); o cenário confere o link e o tipo, não o texto interno do arquivo.

**CT-HU05-05** · N · P2 · AC-05-04  
Pesquisar a área OUVIDORIA no tipo Sintético.  
Esperado: “Sem atribuições para: OUVIDORIA”.

## 11. Estratégia de evidência

| Tipo | Onde | Quando |
| --- | --- | --- |
| Print da falha | `cypress/screenshots` | Cenário que falha (`screenshotOnRunFailure`) |
| Relatório Cucumber | `cypress/reports/cucumber-report.json` | Cada execução da suíte |
| PDF do termo e da movimentação | Conferido no cenário | HU03 e CT-HU04-04 |
| Link do PDF de atribuições por área | Conferido no cenário | CT-HU05-04 |

Resultado por caso: **Passou**, **Falhou** ou **Bloqueado**.

## 12. Melhorias propostas (produto e especificação)

1. **HU05** deve ter critérios próprios de Atribuições por Área, não cópia de Movimentação de Ativos.
2. Explicitar mensagens de validação dos campos `*` (HU01/HU02) para tornar os negativos determinísticos.
3. Padronizar `data-cy` (ou equivalente) nos campos críticos para estabilizar a automação.
4. Na HU03, definir se o CPF vem cadastrado ou é só campo manual no PDF.
5. Garantir massa de QA isolada (ativos DISPONÍVEL) para o usuário `qa.teste` não depender de dados de outros testes.
6. Cadastrar o usuário sentinela SUBAREA que o formulário de atribuição usa ao marcar Subárea. Sem ele, CT-HU01-02 para em “User é obrigatório(a)”.
7. O PDF de Atribuições por Área responde `[]` com tipo PDF. O arquivo deveria trazer o relatório filtrado.

## 13. Ordem de execução desta etapa

1. Login
2. HU01, HU02, HU03, HU04 e HU05, na ordem dos arquivos em `cypress/e2e`

O regressivo de prioridade alta é `npm run cy:run --tag=@P1`. A suíte completa é `npm run cy:run`.
