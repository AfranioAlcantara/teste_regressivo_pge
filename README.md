# Testes regressivos — Inventário CTI

Suíte Cypress do Inventário CTI (PGE-CE). Os cenários automatizados cobrem o login, o cadastro e a edição de atribuições, a vinculação de ativos, a geração dos termos, a movimentação de ativos e as atribuições por área.

O plano de testes está em [docs/plano-de-testes.md](docs/plano-de-testes.md). A HU05 usa a tela Atribuições por Área/Subárea, que é diferente da movimentação.

## Como o teste é escrito

Cada cenário fica em um arquivo `.feature`, em linguagem de negócio. Cada frase chama um passo, e o passo chama a página da tela.

```text
cypress/e2e/**/*.feature              cenário (Gherkin)
cypress/support/step_definitions/     frase do cenário → página
cypress/support/pages/                clique e conferência na tela
```

## Pré-requisitos

- Node.js 22 ou 24 (compatíveis com a versão do Cypress deste projeto)
- Google Chrome instalado para as execuções locais padrão
- Acesso ao QA: http://testeqa.pge.ce.gov.br
- Usuário gestor do desafio

> **Atenção:** os cenários criam ativos e atribuições no ambiente de QA. Execute a suíte apenas no ambiente configurado e considere que os registros criados permanecem no sistema.

## Configuração

Na raiz do projeto:

```powershell
npm install
```

Crie `cypress.env.json` na raiz. Esse arquivo fica de fora do Git.

```json
{
  "usuario": "usuario-do-qa",
  "senha": "senha-do-qa"
}
```

A URL padrão do QA está em `cypress.config.js`, na propriedade `baseUrl`. Para executar contra outra URL sem alterar o arquivo:

```powershell
npm run cy:run -- --env baseUrl=https://url-do-ambiente
```

Use apenas ambientes autorizados para testes.

## Execução

O navegador principal local é o Chrome. Os comandos abaixo já selecionam esse navegador:

```powershell
npm run cy:run
npm run cy:open
```

`cy:run` executa os testes em modo headless por padrão. Para assistir à execução no Chrome:

```powershell
npm run cy:run -- --headed
```

O modo interativo abre a interface do Cypress e usa Chrome para executar os testes. Para selecionar Electron explicitamente:

```powershell
npm run cy:run -- --browser chrome
```

Um caso, ou o regressivo, pela tag do cenário:

```powershell
npm run cy:run --tag=@CT-HU01-01
npm run cy:run --tag=@P1
```

`@P1` reúne os casos de prioridade alta. `@P2` e `@P3` reúnem os demais. Dá para combinar expressões:

```powershell
npm run cy:run --tag="@P1 and not @CT-LOGIN-02"
```

Sem `--tag`, todos os cenários automatizados rodam. A tag pode ir com ou sem `@`.

## Como analisar falhas

- Confira no terminal o nome do cenário e do passo que falhou; use o ID `CT-*` da tag para localizá-lo na feature e no [plano de testes](docs/plano-de-testes.md).
- Consulte a captura de tela correspondente em `cypress/screenshots`.
- O relatório Cucumber em `cypress/reports/cucumber-report.json` registra o resultado e a duração dos passos da execução.
- Na CI, consulte os artifacts `cypress-evidencias` da execução que falhou. O artifact pode incluir screenshots, vídeos e relatório, conforme os arquivos gerados.
- Compare a falha com o comportamento esperado e com defeitos já registrados antes de classificá-la como falha intermitente ou problema do teste.

## O que está automatizado

| História | Casos |
| --- | --- |
| Login | CT-LOGIN-01, CT-LOGIN-02 |
| HU01 — Cadastro | CT-HU01-01 a CT-HU01-10 |
| HU02 — Edição | CT-HU02-01 a CT-HU02-08 |
| HU03 — Termos | CT-HU03-01 a CT-HU03-05 |
| HU04 — Movimentação | CT-HU04-01 a CT-HU04-06 |
| HU05 — Atribuições por área | CT-HU05-01 a CT-HU05-05 |

Os arquivos estão em `cypress/e2e/login`, `cypress/e2e/atribuicoes`, `cypress/e2e/termos` e `cypress/e2e/relatorios`.

## Integração contínua

O workflow `.github/workflows/CiCd.yml` roda no push e no pull request da branch `main`, com a tag `@P1` e o Chrome. Na execução manual, o menu lista as tags dos cenários.

Localmente, `npm run cy:run` também usa Chrome; isso ajuda a reproduzir o navegador usado na CI. A execução local é headless por padrão, enquanto `npm run cy:run -- --headed` abre o Chrome visivelmente.

O job espera dois secrets no repositório, com os mesmos valores do `cypress.env.json`:

- `USUARIO`
- `SENHA`

## Evidências

Quando um cenário falha, o Cypress grava o print em `cypress/screenshots`. O relatório Cucumber sai em `cypress/reports/cucumber-report.json`. Essas pastas não vão para o Git.
