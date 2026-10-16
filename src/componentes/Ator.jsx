import { Ic } from "./Icones.jsx";

/**
 * Cartão de um personagem (cliente, painel de LED, bot...).
 * O balão de fala é o que o update() do assinante produz.
 *
 * `refCartao` recebe o nó do DOM: a animação da partícula precisa da
 * posição real do cartão na tela.
 */
export default function Ator({
  id,
  nome,
  papel,
  icone = "pessoa",
  bolha,
  classes = "",
  refCartao,
  ...resto
}) {
  return (
    <div
      className={`ator ${classes}`}
      data-id={id}
      ref={refCartao}
      {...resto}
    >
      <Ic nome={icone} />
      <div className="nome">{nome}</div>
      {papel && <div className="papel">{papel}</div>}
      {bolha && (
        <div className={`bolha ${bolha.tipo || ""}`} key={bolha.nonce}>
          {bolha.texto}
        </div>
      )}
    </div>
  );
}

/** Variante compacta usada na Fase 2: nome e chips lado a lado. */
export function AtorCompacto({ id, nome, papel, bolha, classes = "", refCartao, filhos, ...resto }) {
  return (
    <div className={`ator ${classes}`} data-id={id} ref={refCartao} {...resto}>
      <div className="topo">
        <Ic nome="pessoa" />
        <span className="nome">{nome}</span>
        <span className="papel">{papel}</span>
      </div>
      {filhos}
      {bolha && (
        <div className={`bolha ${bolha.tipo || ""}`} key={bolha.nonce}>
          {bolha.texto}
        </div>
      )}
    </div>
  );
}
