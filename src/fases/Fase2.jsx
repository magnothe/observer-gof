import { useMemo, useRef, useState } from "react";
import { AtorCompacto } from "../componentes/Ator.jsx";
import { Ic } from "../componentes/Icones.jsx";
import { Loja } from "../padrao/Loja.js";
import { ClienteEmail } from "../padrao/assinantesConcretos.js";
import {
  CLASSE_PARTICULA,
  DADOS_EVENTO,
  EVENTOS,
  METODO_DA_LOJA,
} from "../padrao/eventos.js";
import { PESSOAS } from "../dados/pessoas.js";
import { useBolhas } from "../util/useBolhas.js";
import { voar } from "../util/voar.js";

const s = (v) => `<span class="st">"${v}"</span>`;

/**
 * FASE 2 — o mecanismo de assinatura.
 *
 * Esta fase usa a Loja e o EventManager de verdade. Como o EventManager
 * guarda a lista dentro dele (estado mutável, fora do React), cada
 * inscrição/cancelamento incrementa `versao` para disparar o re-render.
 */
export default function Fase2({ confirmado, aoConfirmar, aoAvancar, toast }) {
  const { bolhas, mostrar } = useBolhas();
  const [versao, setVersao] = useState(0);
  const [linhas, setLinhas] = useState([
    { cls: "nv", html: "// arraste um cliente para um evento, ou clique nos chips do cartão" },
  ]);
  const [selecionado, setSelecionado] = useState(null);
  const [sobre, setSobre] = useState(null);
  const [disparando, setDisparando] = useState(null);

  const lojaRef = useRef(null);
  const cartoes = useRef({});
  const consoleRef = useRef(null);

  // A publicadora e os assinantes concretos vivem fora do ciclo de render.
  const { loja, atores } = useMemo(() => {
    const loja = new Loja("TechStore");
    const atores = {};
    for (const p of PESSOAS) {
      atores[p.id] = new ClienteEmail(p.nome, p.id, (assinante, texto) =>
        mostrar(assinante.id, texto, "boa")
      );
    }
    return { loja, atores };
  }, [mostrar]);

  function log(html, cls = "") {
    setLinhas((l) => [...l, { html, cls }]);
    requestAnimationFrame(() => {
      if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    });
  }

  function inscrever(id, ev) {
    if (loja.events.assinantesDe(ev).includes(atores[id])) {
      toast(`${atores[id].nome} já está inscrito em "${ev}".`);
      return;
    }
    loja.inscrever(ev, atores[id]); // <<< o padrão em ação
    log(`&gt; loja.inscrever(${s(ev)}, ${id})`, "pr");
    log(`events.subscribe(${s(ev)}, ${id})   // listeners[${s(ev)}].push(${id})`, "mt ind");
    setVersao((v) => v + 1);
  }

  function cancelar(id, ev) {
    loja.cancelarInscricao(ev, atores[id]); // <<< o padrão em ação
    log(`&gt; loja.cancelarInscricao(${s(ev)}, ${id})`, "pr");
    log(`events.unsubscribe(${s(ev)}, ${id})   // a lista é dinâmica`, "av ind");
    setVersao((v) => v + 1);
  }

  function alternar(id, ev) {
    if (loja.events.assinantesDe(ev).includes(atores[id])) cancelar(id, ev);
    else inscrever(id, ev);
  }

  function disparar(ev) {
    const dados = DADOS_EVENTO[ev];
    setDisparando(null);
    requestAnimationFrame(() => setDisparando(ev));

    log(`&gt; loja.${METODO_DA_LOJA[ev]}(${s(dados)})`, "pr");
    log(`events.<span class="mt">notify</span>(${s(ev)}, ${s(dados)})`, "ind");

    const lista = loja.events.assinantesDe(ev);
    if (!lista.length) {
      log(`// listeners[${s(ev)}] está vazio: nenhum update() foi chamado`, "er ind2");
      toast(`Ninguém assinou "${ev}" — a notificação não chegou a ninguém.`, "ruim");
    }

    lista.forEach((a, i) => {
      voar(lojaRef.current, cartoes.current[a.id], i * 130, CLASSE_PARTICULA[ev], "i-mail");
      log(
        `&rarr; ${a.id}.<span class="mt">update</span>(${s(ev)}, ${s(dados)})`,
        "ok ind2"
      );
    });

    // Só depois da animação os assinantes reagem de fato.
    setTimeout(() => {
      loja.events.notify(ev, dados); // <<< NOTIFICAR de verdade
      if (ev === "promocao") validarDesafio();
      setTimeout(() => setDisparando(null), 500);
    }, lista.length ? 700 : 0);
  }

  // --- desafio: só Ana e Bruno recebem a promoção -------------------------
  const prom = loja.events.assinantesDe("promocao");
  const st = {
    ana: prom.includes(atores.ana),
    bruno: prom.includes(atores.bruno),
    carlos: prom.includes(atores.carlos),
  };
  const pronto = st.ana && st.bruno && !st.carlos;

  function validarDesafio() {
    const p = loja.events.assinantesDe("promocao");
    const ok = p.includes(atores.ana) && p.includes(atores.bruno) && !p.includes(atores.carlos);
    if (ok) {
      if (!confirmado) {
        aoConfirmar();
        log("// DESAFIO OK: a promoção chegou só a quem se inscreveu", "ok");
        toast("Desafio concluído.", "boa");
      }
      return;
    }
    const msg = p.includes(atores.carlos)
      ? 'O Carlos recebeu: cancele a inscrição dele em "promocao".'
      : `Falta inscrever ${!p.includes(atores.ana) ? "a Ana" : ""}${
          !p.includes(atores.ana) && !p.includes(atores.bruno) ? " e " : ""
        }${!p.includes(atores.bruno) ? "o Bruno" : ""} em "promocao".`;
    log(`// DESAFIO AINDA NÃO: ${msg}`, "er");
    toast(msg, "ruim");
  }

  const marca = (b) =>
    b ? (
      <b style={{ color: "var(--verde)" }}>sim</b>
    ) : (
      <b style={{ color: "var(--vermelho)" }}>não</b>
    );

  return (
    <section className="fase ativa" data-versao={versao}>
      <div className="cab">
        <span className="tag">Fase 2 &middot; o mecanismo de assinatura</span>
        <h2>Inscrever, notificar, cancelar inscrição</h2>
        <p className="sub">
          Arraste um cliente para dentro de um <b>evento</b> (ou clique nos chips) para{" "}
          <b>inscrever</b> esse <b>assinante</b> na lista do <code>EventManager</code>. Depois
          faça a <b>publicadora</b> notificar e acompanhe as chamadas no Console.
        </p>
      </div>

      <div className="f2grid">
        {/* coluna 1: publicadora + clientes */}
        <div>
          <div className="card loja" id="loja2" ref={lojaRef}>
            <Ic nome="loja" className="ic grande" />
            <h3>Loja TechStore</h3>
            <p className="muted">a publicadora</p>
          </div>

          <div className="lista-eventos">
            <button className="btn" onClick={() => disparar("chegou-produto")}>
              <Ic nome="box" />
              <span className="mono">novoProduto("iPhone 17")</span>
            </button>
            <button className="btn aviso" onClick={() => disparar("promocao")}>
              <Ic nome="tag" />
              <span className="mono">lancarPromocao("iPhone 17 &minus;20%")</span>
            </button>
            <button className="btn roxo" onClick={() => disparar("estoque-acabando")}>
              <Ic nome="alerta" />
              <span className="mono">estoqueAcabando("iPhone 17")</span>
            </button>
          </div>

          <div style={{ marginTop: "1em" }} className="titulo-painel">
            <Ic nome="pessoa" /> clientes disponíveis
          </div>

          <div className="clientes" id="clientes2">
            {PESSOAS.map((p) => (
              <AtorCompacto
                key={p.id}
                id={p.id}
                nome={p.nome}
                papel="assinante"
                bolha={bolhas[p.id]}
                classes={selecionado === p.id ? "sel" : ""}
                refCartao={(el) => (cartoes.current[p.id] = el)}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", p.id);
                  e.dataTransfer.effectAllowed = "copy";
                }}
                onClick={(e) => {
                  if (e.target.closest(".chip")) return;
                  const novo = selecionado === p.id ? null : p.id;
                  setSelecionado(novo);
                  if (novo) toast(`Agora clique em um evento do EventManager para inscrever ${p.nome}.`);
                }}
                filhos={
                  <div className="chips">
                    {EVENTOS.map((ev) => (
                      <button
                        key={ev}
                        className={`chip ${
                          loja.events.assinantesDe(ev).includes(atores[p.id]) ? "on" : ""
                        }`}
                        onClick={() => alternar(p.id, ev)}
                      >
                        {ev}
                      </button>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>

        {/* coluna 2: EventManager */}
        <div className="card">
          <div className="titulo-painel">
            <Ic nome="lista" /> EventManager &mdash; lista de assinantes
          </div>

          <div>
            {EVENTOS.map((ev) => {
              const lista = loja.events.assinantesDe(ev);
              return (
                <div
                  key={ev}
                  className={`lane ${sobre === ev ? "over" : ""} ${
                    disparando === ev ? "disparando" : ""
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setSobre(ev);
                  }}
                  onDragLeave={() => setSobre(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setSobre(null);
                    const id = e.dataTransfer.getData("text/plain");
                    if (id) inscrever(id, ev);
                  }}
                  onClick={(e) => {
                    if (e.target.closest(".x")) return;
                    if (selecionado) {
                      inscrever(selecionado, ev);
                      setSelecionado(null);
                    }
                  }}
                >
                  <div className="lane-cab">
                    <span className="ev">"{ev}"</span>
                    <span className="cont">
                      {lista.length} {lista.length === 1 ? "assinante" : "assinantes"}
                    </span>
                  </div>
                  <div className="assinantes">
                    {lista.length === 0 ? (
                      <span className="vazio">lista vazia &mdash; ninguém será notificado</span>
                    ) : (
                      lista.map((a) => (
                        <span className="pill" key={a.id}>
                          <Ic nome="pessoa" className="ic" style={{ width: "1em", height: "1em", color: "var(--azul)" }} />
                          <b>{a.nome}</b>
                          <button
                            className="x"
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelar(a.id, ev);
                            }}
                          >
                            cancelar inscrição
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="muted" style={{ fontSize: ".7em" }}>
            Cada faixa é uma chave de <code>this.listeners</code>. A lista é <b>dinâmica</b>: dá
            para inscrever e cancelar inscrição em tempo de execução, sem tocar na classe{" "}
            <code>Loja</code>.
          </p>
        </div>

        {/* coluna 3: console */}
        <div className="card col-console">
          <div className="titulo-painel">
            <Ic nome="terminal" /> Console &mdash; chamadas reais
          </div>
          <div className="console" ref={consoleRef}>
            {linhas.map((l, i) => (
              <div
                key={i}
                className={`ln ${l.cls}`}
                dangerouslySetInnerHTML={{ __html: l.html }}
              />
            ))}
          </div>
          <div style={{ marginTop: ".7em", display: "flex", gap: ".5em", flexWrap: "wrap" }}>
            <button
              className="btn ghost"
              style={{ fontSize: ".78em" }}
              onClick={() => setLinhas([])}
            >
              Limpar console
            </button>
          </div>
        </div>
      </div>

      <div className={`desafio ${confirmado ? "ok" : ""}`}>
        <h4>
          <Ic nome="check" className="ic" style={{ width: "1.1em", height: "1.1em", color: "var(--roxo)" }} />{" "}
          Desafio da fase
        </h4>
        <p style={{ fontSize: ".86em" }}>
          Faça <b>só a Ana e o Bruno</b> receberem a <b>promoção</b>, sem que o <b>Carlos</b>{" "}
          receba. Depois clique em <code>lancarPromocao(...)</code> para confirmar.
        </p>
        <div className="status">
          listeners["promocao"] &rarr; Ana: {marca(st.ana)} &middot; Bruno: {marca(st.bruno)}{" "}
          &middot; Carlos:{" "}
          {st.carlos ? (
            <b style={{ color: "var(--vermelho)" }}>inscrito (precisa cancelar)</b>
          ) : (
            <b style={{ color: "var(--verde)" }}>fora da lista</b>
          )}
          {confirmado ? (
            <>
              {" "}
              &mdash; <b style={{ color: "var(--verde)" }}>confirmado</b>
            </>
          ) : pronto ? (
            <> &mdash; <b>configuração correta: clique em lancarPromocao()</b></>
          ) : null}
        </div>
      </div>

      {confirmado && (
        <div className="banner">
          <div className="txt">
            <h4>Desafio concluído.</h4>
            <p>
              A loja não decidiu nada: ela só chamou <code>notify("promocao", ...)</code>. Quem
              definiu o destino foi a <b>lista de assinantes</b>. Zero viagem perdida, zero spam.
            </p>
          </div>
          <button className="btn alto verde" onClick={aoAvancar}>
            E por que isso é bom? &rarr;
          </button>
        </div>
      )}
    </section>
  );
}
