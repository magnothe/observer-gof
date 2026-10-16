# Observer — minigame educativo

Minigame web que ensina o padrão de projeto **Observer** (GoF), em português, feito para ser
projetado e apresentado ao vivo para uma turma.

**Jogar:** basta abrir o link do site — ou baixar o `index.html` e dar duplo clique nele.

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
4. **Quiz da sala** — 6 perguntas em modo apresentação, com explicação após cada resposta,
   placar e um resumo com a definição formal e o diagrama da estrutura em SVG.

## As classes do padrão

| Classe | Papel no padrão |
|---|---|
| `EventManager` | gerencia a lista de assinantes (`subscribe` / `unsubscribe` / `notify`) |
| `Loja` | a publicadora concreta — tem um `EventManager` por composição |
| `Assinante` | a interface: obriga a implementar `update(evento, dados)` |
| `ClienteEmail`, `PainelLED`, `BotWhatsApp` | assinantes concretos: mesmo `update`, reações diferentes |

O botão flutuante **"Ver o código"** mostra o código dessas classes extraído em tempo de
execução com `.toString()` — é exatamente o código que está rodando na página, comentários
inclusive.

## Atalhos de teclado (para apresentar)

| Tecla | Ação |
|---|---|
| `→` / `←` | avança / volta de fase (no quiz, avança de pergunta) |
| `1`–`4` | responde a alternativa A, B, C ou D |
| `C` | abre/fecha o painel de código |
| `R` | reinicia |
| `Esc` | fecha o painel de código |

## Stack

HTML + CSS + JavaScript puro, **tudo em um único `index.html`**. Sem build, sem npm, sem CDN,
sem framework. Funciona offline, direto do `file://`.

## Arquivos

- `index.html` — o jogo completo
- `ROTEIRO.md` — roteiro de apresentação de 6 a 8 minutos, com as perguntas do quiz comentadas

Conteúdo baseado em [refactoring.guru/pt-br/design-patterns/observer](https://refactoring.guru/pt-br/design-patterns/observer).
