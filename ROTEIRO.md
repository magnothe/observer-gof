# Roteiro de apresentação — Padrão Observer

**Duração alvo: 7 minutos** (6 no ritmo rápido, 8 se a turma interagir bastante).
Tudo o que está em _itálico_ é ação sua na tela. O que está em "aspas" é o que você fala.

---

## Antes de começar (30 segundos, antes da aula)

1. Abra **https://observer-gof.vercel.app** no navegador da TV.
2. `F11` para tela cheia. Confira se o texto está legível do fundo da sala.
3. Atalhos que você vai usar (não precisa procurar o mouse):

| Tecla | O que faz |
|---|---|
| `→` | avança de fase (no quiz, avança de pergunta) |
| `←` | volta de fase |
| `1` `2` `3` `4` | responde a alternativa A, B, C ou D no quiz |
| `C` | abre/fecha o painel "Ver o código" |
| `R` | reinicia o jogo inteiro |
| `Esc` | fecha o painel de código |

> **Dica de ensaio:** rode o jogo uma vez sozinho antes. A Fase 2 exige que você inscreva
> a Ana e o Bruno em `promocao` — saiba de cor onde clicar.

> **Plano B sem internet:** o arquivo `offline/index.html` do repositório é o jogo inteiro
> num arquivo só. Leve num pendrive: abre com duplo clique, sem servidor e sem rede.

---

## Abertura (20 segundos)

> "Hoje eu vou mostrar o padrão **Observer**. Ele tem um nome difícil, mas o problema que
> ele resolve é uma coisa que todo mundo aqui já viveu: você quer saber quando um produto
> chega na loja. Vou mostrar primeiro o problema, depois a solução."

_Não leia a tela em voz alta — a turma já está lendo. Fale por cima._

---

## FASE 1 — O problema (1 min 30)

**Tela:** a Loja de um lado, quatro clientes do outro, dois botões e dois contadores vermelhos.

> "Essa é a Loja. Ela vai receber o iPhone 17. A Ana e o Bruno querem esse produto.
> O Carlos e a Duda não querem — o Carlos só queria um cabo USB.
> Sem nenhum padrão, existem exatamente dois jeitos de resolver isso. Os dois são ruins."

_Clique em **"Cliente vai até a loja"** umas 6 vezes, com ritmo, sem pressa._

> "Primeiro jeito: o cliente vai lá conferir. Não chegou. Vai de novo. Não chegou.
> Esse é o **polling** — ficar perguntando. Olha o contador: seis viagens perdidas.
> Na vida real seriam seis dias de gasolina. O custo cai todo no cliente."

_Clique em **"Loja manda e-mail para TODOS"** uma vez e deixe a animação rodar._

> "Segundo jeito: a loja resolve avisar. Mas ela avisa **todo mundo**. Olha o Carlos e a
> Duda: eles receberam um e-mail de um produto que não querem. Isso é **spam**.
> E tem uma coisa pior, que não aparece na tela: para mandar esse e-mail, a loja precisou
> guardar o contato de todo mundo. A loja virou um cadastro de clientes."

> "Então o conflito é esse: **ou o cliente fica perguntando, ou a loja incomoda quem não
> quer**. É esse problema que o Observer resolve."

_A Fase 2 destrava sozinha. Pressione `→`._

**O que a turma precisa sair sabendo daqui:** polling de um lado, spam do outro.

---

## FASE 2 — O mecanismo de assinatura (2 min)

**Tela:** três colunas — a publicadora (Loja), o `EventManager` com três faixas de evento,
e o Console mostrando as chamadas reais.

> "A virada do Observer é simples: em vez da loja decidir quem avisar, **quem tem interesse
> se inscreve**. A loja só mantém uma lista."

_Arraste a **Ana** para a faixa `"promocao"`. (Ou clique no chip `promocao` no cartão dela.)_

> "Inscrevi a Ana no evento 'promoção'. Olha o Console à direita: isso aqui não é
> enfeite, é a chamada de verdade que o código fez — `events.subscribe("promocao", ana)`.
> Por baixo, isso é só um `push` num array."

_Arraste o **Bruno** para `"promocao"` também. Deixe o Carlos de fora._

> "Bruno também. O Carlos eu deixo de fora — ele não quer promoção de iPhone."

_Clique no botão amarelo **`lancarPromocao("iPhone 17 -20%")`**._

> "Agora a loja dispara o evento. Repara: a notificação sai da loja e chega **só** em quem
> assinou. O Carlos e a Duda nem ficaram sabendo. Zero viagem perdida, zero spam."

_Aponte para o Console._

> "E olha a sequência no Console, porque é isso que vai cair na prova:
> a loja chamou `notify("promocao", ...)`, e o `notify` percorreu a lista chamando
> **`ana.update(...)`** e **`bruno.update(...)`**.
> `notify` é da loja. `update` é do assinante. Decora esses dois nomes."

_Clique em **"cancelar inscrição"** no Bruno e dispare a promoção de novo._

> "E a lista é **dinâmica**: cancelei a inscrição do Bruno agora, em tempo de execução,
> e a próxima notificação já não chega nele. Não precisei recompilar nada, não mexi na Loja."

_Reinscreva o Bruno para fechar o desafio e seguir._

**O que a turma precisa sair sabendo daqui:** `subscribe` / `unsubscribe` / `notify` de um
lado, `update` do outro.

_Pressione `→`._

---

## FASE 3 — Por que isso é bom (1 min 30)

**Tela:** o código da classe `Loja` à esquerda, um painel vazio à direita, dois assinantes
novos embaixo.

> "Agora a parte que o professor mais gosta. Chegaram dois dispositivos que **não existiam**
> quando essa Loja foi escrita: um painel de LED na vitrine e um bot do WhatsApp.
> Em um sistema sem Observer, você teria que abrir a classe Loja e acrescentar um `if`."

_Clique em **"implementar interface Assinante"** no Painel de LED e deixe o código ser escrito._

> "Para entrar no sistema, o painel de LED só precisou de uma coisa: ter um método
> **`update`**. É só isso que a interface `Assinante` exige. Repara que o `update` dele faz
> uma coisa completamente diferente do `update` do cliente — ele escreve no letreiro."

_Aponte para o selo verde no painel da esquerda._

> "E olha a classe Loja aqui do lado: **zero linhas alteradas**. Ela nem piscou."

_Clique em **"implementar interface Assinante"** no Bot do WhatsApp._

> "O bot também. Zero linhas alteradas de novo."

_Clique em **`novoProduto("PlayStation 6")`**._

> "Uma notificação só, quatro reações diferentes: dois e-mails, um letreiro e uma mensagem
> no grupo. A Loja não sabe com quem ela está falando. Ela chamou `update` numa lista de
> coisas que implementam a interface, e pronto."

> "Isso tem nome: **princípio Aberto/Fechado**. Aberto para extensão — eu adicionei
> funcionalidade nova. Fechado para modificação — eu não toquei no código que já funcionava."

_Se sobrar tempo, pressione `C` e mostre a aba `EventManager` do painel de código:_

> "Esse é o padrão inteiro, ó: um objeto com uma lista, um método para entrar na lista,
> um para sair, e um laço que chama `update` em todo mundo. Dá umas 20 linhas."

_Pressione `Esc` e depois `→`._

---

## FASE 4 — Quiz da sala (2 min)

**Modo apresentação: fonte gigante, uma pergunta por tela.**

> "Agora é com vocês. Eu leio a pergunta, vocês respondem em voz alta, e só depois eu clico."

**Regras de condução:**
- Leia a pergunta em voz alta, conte até três mentalmente, deixe a sala responder.
- Só então clique (ou use as teclas `1` a `4`).
- **Leia a explicação em voz alta.** É ela que fixa o conteúdo.
- As alternativas são **embaralhadas** a cada partida — não decore a letra, decore o conteúdo.

### As 6 perguntas, com resposta e justificativa

**1. Qual problema o padrão Observer resolve?**
**Resposta:** o conflito entre o cliente ficar consultando a loja (viagem perdida) e a loja
avisar todo mundo (spam) — ou seja, o acoplamento entre quem gera o evento e quem reage.
**Por quê:** sem o padrão só existem duas saídas, e as duas são caras: *polling* desperdiça
o tempo do assinante, e a notificação em massa gera spam e ainda obriga a publicadora a
conhecer cada cliente. O Observer inverte: quem tem interesse se inscreve, a publicadora
notifica apenas a lista.

**2. Quem é a publicadora e quem são os assinantes?**
**Resposta:** a Loja é a publicadora; os clientes, o painel de LED e o bot são os assinantes.
**Por quê:** publicadora (*publisher*, ou *subject*) é quem gera o evento e mantém a lista de
inscritos — no nosso código ela delega essa lista ao `EventManager`. Assinante (*subscriber*,
ou *observer*) é quem reage ao evento. Quem gera, publica; quem reage, assina.

**3. Qual método todo assinante é obrigado a implementar?**
**Resposta:** `update(evento, dados)`.
**Por quê:** é o único método do contrato, e é exatamente ele que a publicadora chama dentro
do `notify`. Cuidado com a pegadinha: `notify`, `subscribe` e `unsubscribe` existem no
sistema, mas pertencem ao lado da **publicadora / EventManager**, não ao assinante.

**4. Por que todos os assinantes implementam a mesma interface?**
**Resposta:** para a publicadora poder notificar qualquer um deles chamando só `update()`,
sem conhecer as classes concretas — desacoplamento.
**Por quê:** a Loja depende da abstração `Assinante`, não de `ClienteEmail`, `PainelLED` ou
`BotWhatsApp`. Como todos respondem ao mesmo `update`, ela percorre a lista e notifica sem
um único `if` sobre tipos. É polimorfismo sendo usado para baixar o acoplamento.

**5. Qual princípio SOLID o Observer favorece?**
**Resposta:** o princípio **Aberto/Fechado** (*Open/Closed*).
**Por quê:** é literalmente o que a Fase 3 mostrou — entraram dois tipos novos de assinante e
a classe `Loja` teve **0 linhas alteradas**. Aberta para extensão, fechada para modificação.
Se alguém argumentar "mas também tem inversão de dependência", está correto que o padrão se
apoia nela; a resposta esperada, porém, é Aberto/Fechado.

**6. Qual é a principal desvantagem do Observer?**
**Resposta:** os assinantes são notificados em **ordem aleatória** — o padrão não garante
ordem de notificação.
**Por quê:** nenhum assinante pode depender de ter sido avisado antes ou depois de outro.
Se a sua regra de negócio exige ordem, o Observer puro não serve. (Na prática há mais dois
cuidados conhecidos: vazamento de memória quando se esquece de cancelar a inscrição, e
dificuldade de depurar um `notify` que dispara muita coisa em cascata.)

---

## Fechamento (20 segundos)

_Na tela final, aponte para o diagrama em SVG._

> "Resumindo o desenho: a **publicadora** não conhece ninguém em concreto. Ela conhece só a
> **interface Assinante**. Quem implementa essa interface pode ser um cliente, um painel de
> LED, um bot, um log, o que for — e a publicadora continua igual."

> "E a definição formal, para anotar: **o Observer é um padrão comportamental que define um
> mecanismo de inscrição para notificar vários objetos sobre eventos que acontecem com o
> objeto que eles observam.**"

---

## Cola rápida (leia nos 2 minutos antes de apresentar)

| Termo | O que é, em uma linha |
|---|---|
| **Publicadora** (*publisher*/*subject*) | quem gera o evento e mantém a lista de inscritos — a `Loja` |
| **Assinante** (*subscriber*/*observer*) | quem reage ao evento — precisa ter `update()` |
| **EventManager** | o objeto que guarda a lista `{ evento: [assinantes] }` e faz o trabalho de inscrição |
| **inscrever / `subscribe`** | entra na lista de um evento |
| **cancelar inscrição / `unsubscribe`** | sai da lista, em tempo de execução |
| **notificar / `notify`** | a publicadora percorre a lista e chama `update` em cada um |
| **`update`** | o método do assinante; o mesmo nome em todos, comportamentos diferentes |
| **Tipo do padrão** | comportamental (GoF) |
| **Também chamado de** | Event-Subscriber, Listener, Publish-Subscribe |
| **Princípio SOLID** | Aberto/Fechado |
| **Desvantagem** | ordem de notificação aleatória |

### Três perguntas que o professor pode fazer além das do quiz

- **"Onde você já usou isso sem saber?"** — `addEventListener` no navegador é Observer puro:
  o botão é a publicadora, a sua função é o assinante, `click` é o evento. Também: notificações
  do celular, `@Observable` do Angular/Vue, listeners de Java Swing.
- **"Qual a diferença entre Observer e Pub/Sub?"** — no Observer clássico a publicadora conhece
  a própria lista de assinantes. No Pub/Sub completo existe um *broker* no meio, e publicadora e
  assinante não se conhecem de jeito nenhum. Nosso `EventManager` é o meio do caminho entre os dois.
- **"E se o assinante sumir sem cancelar a inscrição?"** — a lista continua segurando a
  referência: o objeto não é liberado da memória e continua sendo notificado. É o vazamento de
  memória clássico do padrão — por isso o `unsubscribe` existe e precisa ser chamado.
