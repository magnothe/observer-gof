# Observer — minigame educativo

Minigame web que ensina o padrão de projeto **Observer** (GoF), em português, feito para ser
projetado e apresentado ao vivo para uma turma.

**Jogar agora:** https://observer-gof.vercel.app

## O que tem no jogo

Quatro fases, com barra de progresso:

1. **O problema** — a loja e quatro clientes sem nenhum mecanismo de inscrição. O jogador
   sente na prática o custo do *polling* (viagem perdida) e o custo do spam (avisar todo mundo).
2. **O mecanismo de assinatura** — arraste clientes para dentro dos eventos `chegou-produto`,
   `promocao` e `estoque-acabando`, dispare notificações e acompanhe as chamadas reais
   (`events.notify(...)` → `cliente.update(...)`) num console ao vivo.
3. **Princípio Aberto/Fechado** — dois assinantes novos (um painel de LED e um bot de WhatsApp)
   entram no sistema só implementando a interface `Assinante`, e a classe `Loja` fica com
   **0 linhas alteradas**.
4. **Quiz da sala** — 6 perguntas em modo apresentação, com alternativas embaralhadas a cada
   partida, explicação após cada resposta, placar e um resumo com a definição formal e o
   diagrama da estrutura em SVG.

## As classes do padrão

Ficam em [`src/padrao/`](src/padrao), separadas da interface e sem nenhuma dependência de React:

| Arquivo | Papel no padrão |
|---|---|
| [`EventManager.js`](src/padrao/EventManager.js) | gerencia a lista de assinantes (`subscribe` / `unsubscribe` / `notify`) |
| [`Loja.js`](src/padrao/Loja.js) | a publicadora concreta — tem um `EventManager` por composição |
| [`Assinante.js`](src/padrao/Assinante.js) | a interface: obriga a implementar `update(evento, dados)` |
| [`assinantesConcretos.js`](src/padrao/assinantesConcretos.js) | `ClienteEmail`, `PainelLED`, `BotWhatsApp`: mesmo `update`, reações diferentes |
| [`exemploDeUso.js`](src/padrao/exemploDeUso.js) | exemplo mínimo de uso, exibido no painel de código |

O botão flutuante **"Ver o código"** mostra esses arquivos importados com `?raw` — ou seja, o
conteúdo real do arquivo-fonte, com comentários, e não uma cópia escrita à mão que poderia ficar
desatualizada.

## Atalhos de teclado (para apresentar)

| Tecla | Ação |
|---|---|
| `→` / `←` | avança / volta de fase (no quiz, avança de pergunta) |
| `1`–`4` | responde a alternativa A, B, C ou D |
| `C` | abre/fecha o painel de código |
| `R` | reinicia |
| `Esc` | fecha o painel de código |

## Stack

React 18 + Vite, JavaScript puro (sem TypeScript), CSS escrito à mão — sem framework de UI e
sem nenhuma dependência em tempo de execução além do React.

```bash
npm install
npm run dev            # desenvolvimento em http://localhost:5173
npm run build          # build de produção em dist/
npm run build:offline  # versão de arquivo único em offline/index.html
```

O deploy é automático no Vercel a cada push na branch `main`.

## Rodar sem internet

`npm run build:offline` embute o CSS e o JS dentro de um HTML só e grava em
[`offline/index.html`](offline/index.html) (já versionado). Esse arquivo abre com **duplo
clique**, sem servidor e sem rede — é o plano B para apresentar se o Wi-Fi da sala cair.

> O build normal (`dist/`) **não** abre por duplo clique: o navegador bloqueia módulos ES
> vindos de `file://` por CORS. Daí a existência da versão de arquivo único.

## Estrutura

```
src/
  padrao/        as classes do Observer, sem nada de interface
  componentes/   peças de tela reaproveitadas (ícones, painel de código, diagrama…)
  fases/         uma fase do jogo por arquivo
  dados/         personagens e perguntas do quiz
  util/          destaque de sintaxe, animação de partícula, hooks de balão e aviso
  estilos.css    todo o CSS
offline/         build de arquivo único, para abrir sem servidor
legado/          a primeira versão do jogo, em HTML/CSS/JS puro num arquivo só
```

## Arquivos de apoio

- [`ROTEIRO.md`](ROTEIRO.md) — roteiro de apresentação de 6 a 8 minutos, com as perguntas do
  quiz comentadas
- [`legado/index-vanilla.html`](legado/index-vanilla.html) — a versão original, sem build

Conteúdo baseado em [refactoring.guru/pt-br/design-patterns/observer](https://refactoring.guru/pt-br/design-patterns/observer).
