/**
 * Assinante — a INTERFACE (em JavaScript, uma classe base abstrata).
 *
 * Este é o contrato que desacopla tudo: a publicadora conhece apenas este
 * tipo, nunca as classes concretas.
 */
export class Assinante {
  constructor(nome, id, aoReagir) {
    this.nome = nome;
    this.id = id;
    // Para onde este assinante manda a reação dele. Quem constrói o
    // assinante decide: na tela do jogo é um balão de fala; num sistema
    // real seria um envio de e-mail, uma gravação no banco, etc.
    this.aoReagir = aoReagir || (() => {});
  }

  // Único método obrigatório do padrão. A publicadora chama exatamente este.
  update(evento, dados) {
    throw new Error("Todo assinante precisa implementar update(evento, dados)");
  }
}
