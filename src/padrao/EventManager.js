/**
 * EventManager — gerencia a LISTA DE ASSINANTES.
 *
 * A publicadora delega para ele toda a parte de inscrição. Isso evita
 * duplicar esse código em cada publicadora do sistema.
 */
export class EventManager {
  constructor() {
    // Mapa: tipo de evento -> array de assinantes inscritos nesse evento.
    // Ex.: { "promocao": [ana, bruno], "chegou-produto": [painelLED] }
    this.listeners = {};
  }

  // INSCREVER: coloca um assinante na lista de um tipo de evento.
  subscribe(eventType, listener) {
    if (!this.listeners[eventType]) this.listeners[eventType] = [];
    // evita inscrição duplicada do mesmo assinante no mesmo evento
    if (!this.listeners[eventType].includes(listener)) {
      this.listeners[eventType].push(listener);
    }
  }

  // CANCELAR INSCRIÇÃO: tira o assinante da lista. Pode ser feito a
  // qualquer momento — a lista é dinâmica, em tempo de execução.
  unsubscribe(eventType, listener) {
    const lista = this.listeners[eventType] || [];
    const i = lista.indexOf(listener);
    if (i >= 0) lista.splice(i, 1);
  }

  // NOTIFICAR: o coração do padrão. Percorre a lista do evento e chama
  // update() em cada assinante. O EventManager não sabe (e não precisa
  // saber) de que classe cada assinante é — só que ele tem update().
  //
  // ATENÇÃO: a ordem desse laço é a ordem de inserção; o padrão NÃO
  // garante ordem de notificação. Não dependa dela.
  notify(eventType, data) {
    const lista = this.listeners[eventType] || [];
    for (const listener of lista) {
      listener.update(eventType, data);
    }
    return lista.slice(); // devolve quem foi notificado (só para a tela)
  }

  // Consulta auxiliar usada pela interface para desenhar a lista.
  assinantesDe(eventType) {
    return (this.listeners[eventType] || []).slice();
  }
}
