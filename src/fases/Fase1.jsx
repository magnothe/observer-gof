import { useEffect, useRef, useState } from "react";
import Ator from "../componentes/Ator.jsx";
import { Ic } from "../componentes/Icones.jsx";
import { PESSOAS } from "../dados/pessoas.js";
import { useBolhas } from "../util/useBolhas.js";
import { voar } from "../util/voar.js";

/**
 * FASE 1 — o problema, sem Observer.
 * O jogador sente os dois custos: polling (viagem perdida) e spam.
 */
export default function Fase1({ concluida, aoConcluir, aoAvancar, toast }) {
  const [viagens, setViagens] = useState(0);
  const [envios, setEnvios] = useState(0);
  const [spam, setSpam] = useState(0);
  const [chegou, setChegou] = useState(false);
  const [viajando, setViajando] = useState(null);
  const [irritados, setIrritados] = useState([]);
  const proximo = useRef(0);
  const lojaRef = useRef(null);
  const cartoes = useRef({});
  const { bolhas, mostrar } = useBolhas();

  useEffect(() => {
    if (viagens >= 5 && envios >= 1 && !concluida) aoConcluir();
  }, [viagens, envios, concluida, aoConcluir]);

  function irALoja() {
    const p = PESSOAS[proximo.current % PESSOAS.length];
    proximo.current++;
    setViajando(null);
    requestAnimationFrame(() => setViajando(p.id));
    voar(cartoes.current[p.id], lojaRef.current, 0, "", "i-pessoa");

    // As 5 primeiras viagens falham sempre: é o desperdício que o jogador
    // precisa sentir. Depois disso, uma chance pequena de dar sorte.
    const sorte = viagens >= 5 && Math.random() < 0.3;
    setTimeout(() => {
      if (sorte) {
        mostrar(p.id, "Hoje deu sorte: o produto chegou!", "boa");
        setChegou(true);
        toast(`Deu sorte — mas foram ${viagens} viagens perdidas até aqui.`);
      } else {
        setViagens((v) => {
          if (v + 1 === 5) toast("5 viagens perdidas. Esse é o custo do polling.", "ruim");
          return v + 1;
        });
        mostrar(p.id, "Fui até a loja... produto ainda não chegou.", "ruim");
      }
      setTimeout(() => setViajando(null), 600);
    }, 480);
  }

  function emailParaTodos() {
    setEnvios((e) => e + 1);
    setIrritados([]);
    PESSOAS.forEach((p, i) => {
      voar(lojaRef.current, cartoes.current[p.id], i * 110, "p-spam", "i-mail");
      setTimeout(() => {
        if (p.quer) {
          mostrar(p.id, "Era o que eu queria. Mas a loja teve que guardar meu e-mail...", "boa");
        } else {
          setIrritados((lista) => [...lista, p.id]);
          mostrar(p.id, "De novo esse e-mail? Eu nem quero esse produto!", "ruim");
          setSpam((s) => s + 1);
        }
      }, i * 110 + 780);
    });
    toast("A loja mandou e-mail para 4 pessoas. Só 2 queriam.", "ruim");
  }

  return (
    <section className="fase ativa">
      <div className="cab">
        <span className="tag ruim">Fase 1 &middot; o problema</span>
        <h2>Um mundo sem Observer</h2>
        <p className="sub">
          A <b>Loja</b> vai receber o <b>iPhone 17</b>: Ana e Bruno querem; Carlos e Duda não.
          Sem um mecanismo de inscrição só existem dois caminhos, e os dois são ruins. Experimente.
        </p>
      </div>

      <div className="cena">
        <div className="card loja" ref={lojaRef}>
          <Ic nome="loja" className="ic grande" />
          <h3>Loja TechStore</h3>
          <p className="muted">a publicadora &mdash; quem gera o evento</p>
          <div className="estoque">
            iPhone 17:{" "}
            {chegou ? (
              <b style={{ color: "var(--verde)" }}>chegou (hoje)</b>
            ) : (
              <b>ainda não chegou</b>
            )}
          </div>
        </div>

        <div>
          <div className="titulo-painel">
            <Ic nome="pessoa" /> os 4 clientes
          </div>
          <div className="clientes">
            {PESSOAS.map((p) => (
              <Ator
                key={p.id}
                id={p.id}
                nome={p.nome}
                papel={p.desejo}
                bolha={bolhas[p.id]}
                refCartao={(el) => (cartoes.current[p.id] = el)}
                classes={[
                  p.quer ? "quer" : "",
                  viajando === p.id ? "viajando" : "",
                  irritados.includes(p.id) ? "irritado" : "",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="controles">
        <button className="btn alto" onClick={irALoja}>
          Cliente vai até a loja
        </button>
        <button className="btn alto aviso" onClick={emailParaTodos}>
          Loja manda e-mail para TODOS
        </button>
      </div>

      <div className="placas">
        <div className="placa ruim pulsa" key={`v${viagens}`}>
          <span className="num">{viagens}</span>
          <span>
            viagens perdidas &mdash; o cliente fica consultando (<i>polling</i>)
          </span>
          <small>precisa de 5 para liberar a Fase 2</small>
        </div>
        <div className="placa ruim pulsa" key={`s${spam}`}>
          <span className="num">{spam}</span>
          <span>mensagens de spam &mdash; a loja avisa quem não tem interesse</span>
          <small>precisa de 1 envio para liberar a Fase 2</small>
        </div>
      </div>

      {concluida && (
        <div className="banner">
          <div className="txt">
            <h4>É esse o conflito.</h4>
            <p>
              Se o <b>cliente</b> fica consultando, ele desperdiça viagens. Se a <b>loja</b> avisa
              todo mundo, ela gera spam. O Observer resolve invertendo a responsabilidade: quem tem
              interesse se <b>inscreve</b>, e a loja <b>notifica</b> só a lista de inscritos.
            </p>
          </div>
          <button className="btn alto verde" onClick={aoAvancar}>
            Ver a solução &rarr;
          </button>
        </div>
      )}
    </section>
  );
}
