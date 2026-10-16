import { Assinante } from "./Assinante.js";
import { ROTULO } from "./eventos.js";

/**
 * ASSINANTES CONCRETOS — mesma interface, reações diferentes.
 *
 * É aqui que o Observer brilha: para somar um comportamento novo ao
 * sistema, basta criar uma classe nova com update(). A Loja não muda.
 */

export class ClienteEmail extends Assinante {
  update(evento, dados) {
    // Reação concreta deste assinante: "receber um e-mail".
    this.aoReagir(this, `E-mail recebido — ${ROTULO[evento]}: ${dados}`);
  }
}

export class PainelLED extends Assinante {
  update(evento, dados) {
    // Mesmo contrato (update), reação totalmente diferente.
    this.aoReagir(this, `>>> ${ROTULO[evento].toUpperCase()}: ${dados} <<<`);
  }
}

export class BotWhatsApp extends Assinante {
  update(evento, dados) {
    this.aoReagir(this, `Mensagem no grupo: "${ROTULO[evento]} — ${dados}"`);
  }
}
