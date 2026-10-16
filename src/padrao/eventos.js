// Os três tipos de evento que a Loja publica, e os rótulos em português
// usados pelos assinantes ao reagir.

export const EVENTOS = ["chegou-produto", "promocao", "estoque-acabando"];

export const ROTULO = {
  "chegou-produto": "Chegou produto",
  "promocao": "Promoção",
  "estoque-acabando": "Estoque acabando",
};

export const DADOS_EVENTO = {
  "chegou-produto": "iPhone 17",
  "promocao": "iPhone 17 -20%",
  "estoque-acabando": "iPhone 17",
};

export const METODO_DA_LOJA = {
  "chegou-produto": "novoProduto",
  "promocao": "lancarPromocao",
  "estoque-acabando": "estoqueAcabando",
};

export const CLASSE_PARTICULA = {
  "chegou-produto": "",
  "promocao": "p-promocao",
  "estoque-acabando": "p-estoque",
};
