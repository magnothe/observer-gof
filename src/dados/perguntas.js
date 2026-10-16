// As 6 perguntas do quiz. `c` é o índice da alternativa correta dentro de
// `o` — a ordem na tela é sorteada a cada partida (ver Fase4), justamente
// para a turma não acertar pela posição.
export const PERGUNTAS = [
  {
    p: "Qual problema o padrão Observer resolve?",
    o: [
      "O conflito entre o cliente ficar consultando a loja (viagem perdida) e a loja avisar todo mundo (spam) — ou seja, o acoplamento entre quem gera o evento e quem reage a ele",
      "Deixar o programa mais rápido, porque evita laços de repetição",
      "Criar objetos sem usar o operador new",
      "Garantir que exista apenas uma instância da classe Loja",
    ],
    c: 0,
    e: "Sem Observer você escolhe entre dois males: o assinante fica consultando a publicadora (polling — a viagem perdida da Fase 1) ou a publicadora avisa todo mundo (spam, e ainda precisa conhecer cada cliente). O Observer inverte isso: quem tem interesse se inscreve, e a publicadora notifica somente a lista de inscritos.",
  },
  {
    p: "No nosso exemplo, quem é a publicadora e quem são os assinantes?",
    o: [
      "A Loja é a publicadora; os clientes, o painel de LED e o bot são os assinantes",
      "Os clientes são as publicadoras, porque são eles que querem a informação",
      "O EventManager é o assinante e a Loja é o evento",
      "Todos são publicadoras, porque todos podem emitir eventos",
    ],
    c: 0,
    e: "A publicadora (publisher/subject) é quem gera o evento e mantém a lista de inscritos — aqui a Loja, que delega a lista ao EventManager. Os assinantes (subscribers/observers) são os objetos que reagem ao evento implementando update().",
  },
  {
    p: "Qual método todo assinante é obrigado a implementar?",
    o: [
      "update(evento, dados)",
      "notify(evento, dados)",
      "subscribe(evento, assinante)",
      "main()",
    ],
    c: 0,
    e: "update() é o único método do contrato: é exatamente ele que a publicadora chama ao notificar. notify(), subscribe() e unsubscribe() pertencem ao lado da publicadora / EventManager, não ao assinante.",
  },
  {
    p: "Por que todos os assinantes implementam a mesma interface?",
    o: [
      "Para que a publicadora possa notificar qualquer um deles chamando só update(), sem conhecer as classes concretas — desacoplamento",
      "Para economizar memória, porque a interface não ocupa espaço",
      "Porque o JavaScript obriga toda classe a ter uma interface",
      "Para que os assinantes possam conversar diretamente entre si",
    ],
    c: 0,
    e: "A publicadora depende da abstração Assinante, não de ClienteEmail, PainelLED ou BotWhatsApp. Como todos respondem ao mesmo update(), a Loja consegue percorrer a lista e notificar sem um único if sobre tipos — acoplamento baixo.",
  },
  {
    p: "Qual princípio SOLID o Observer favorece diretamente?",
    o: [
      "Aberto/Fechado — aberto para extensão, fechado para modificação",
      "Responsabilidade Única",
      "Segregação de Interface",
      "Substituição de Liskov",
    ],
    c: 0,
    e: "Foi o que a Fase 3 mostrou: entraram dois tipos novos de assinante (Painel de LED e Bot do WhatsApp) e a classe Loja teve 0 linhas alteradas. Novas classes de assinante podem ser introduzidas sem mudar o código da publicadora.",
  },
  {
    p: "Qual é a principal desvantagem do padrão Observer?",
    o: [
      "Os assinantes são notificados em ordem aleatória — o padrão não garante a ordem",
      "Só funciona se existir exatamente um assinante",
      "Obriga a publicadora a conhecer o e-mail de cada cliente",
      "Não permite cancelar a inscrição depois de inscrito",
    ],
    c: 0,
    e: "Essa é a desvantagem citada no Refactoring Guru: assinantes são notificados em ordem aleatória, então nenhum assinante pode depender de ter sido avisado antes ou depois de outro. As alternativas erradas descrevem justamente o que o padrão resolve.",
  },
];

/** Sorteio de Fisher-Yates: devolve a ordem das alternativas na tela. */
export function sortearOrdem(n) {
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let j = idx.length - 1; j > 0; j--) {
    const k = Math.floor(Math.random() * (j + 1));
    [idx[j], idx[k]] = [idx[k], idx[j]];
  }
  return idx;
}
