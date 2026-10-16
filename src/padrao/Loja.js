import { EventManager } from "./EventManager.js";

/**
 * Loja — a PUBLICADORA concreta.
 *
 * Ela gera os eventos. Repare: não tem nenhum "if" sobre clientes, não
 * importa nenhuma classe de assinante e não guarda e-mails. Tudo o que ela
 * faz é avisar o EventManager que algo aconteceu.
 */
export class Loja {
  constructor(nome) {
    this.nome = nome;
    this.events = new EventManager(); // composição: a lista mora aqui
  }

  // Fachada de inscrição: quem quiser ser avisado chama estes dois métodos.
  inscrever(evento, assinante) {
    this.events.subscribe(evento, assinante);
  }
  cancelarInscricao(evento, assinante) {
    this.events.unsubscribe(evento, assinante);
  }

  // --- A LÓGICA DE NEGÓCIO DA LOJA ---------------------------------------
  // Cada ação importante termina em um notify(). É só isso que a
  // publicadora precisa fazer.

  novoProduto(produto) {
    return this.events.notify("chegou-produto", produto);
  }
  lancarPromocao(produto) {
    return this.events.notify("promocao", produto);
  }
  estoqueAcabando(produto) {
    return this.events.notify("estoque-acabando", produto);
  }
}
