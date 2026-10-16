import { useEffect, useMemo, useRef, useState } from "react";
import Ator from "../componentes/Ator.jsx";
import Codigo from "../componentes/Codigo.jsx";
import { Ic } from "../componentes/Icones.jsx";
import { Loja } from "../padrao/Loja.js";
import { BotWhatsApp, ClienteEmail, PainelLED } from "../padrao/assinantesConcretos.js";
import { useBolhas } from "../util/useBolhas.js";
import { destacar } from "../util/destacar.js";
import { voar } from "../util/voar.js";

import srcLoja from "../padrao/Loja.js?raw";
import srcConcretos from "../padrao/assinantesConcretos.js?raw";

/** Recorta uma classe do arquivo-fonte real (as classes são todas de topo). */
function recortarClasse(fonte, nome) {
  const i = fonte.indexOf(`export class ${nome}`);
  if (i < 0) return "";
  const fim = fonte.indexOf("\n}", i);
  return fonte.slice(i, fim + 2);
}

const NOVOS = {
  led: { Classe: PainelLED, nome: "Painel de LED", icone: "led", arquivo: "PainelLED.js" },
  bot: { Classe: BotWhatsApp, nome: "Bot do WhatsApp", icone: "bot", arquivo: "BotWhatsApp.js" },
};

/**
 * FASE 3 — princípio Aberto/Fechado.
 * Assinantes novos entram no sistema sem alterar uma linha da classe Loja.
 */
export default function Fase3({ concluida, aoConcluir, aoAvancar, toast }) {
  const { bolhas, mostrar } = useBolhas();
  const [adicionados, setAdicionados] = useState([]);
  const [digitando, setDigitando] = useState(false);
  const [alvo, setAlvo] = useState(null); // qual classe está sendo "escrita"
  const [texto, setTexto] = useState("");
  const [piscar, setPiscar] = useState(false);
  const [versao, setVersao] = useState(0);

  const lojaRef = useRef(null);
  const cartoes = useRef({});
  const preRef = useRef(null);

  const { loja, atores } = useMemo(() => {
    const loja = new Loja("TechStore");
    const reagir = (assinante, txt) => mostrar(assinante.id, txt, "boa");
    const atores = {
      ana: new ClienteEmail("Ana", "ana", reagir),
      bruno: new ClienteEmail("Bruno", "bruno", reagir),
      led: new PainelLED("Painel de LED", "led", reagir),
      bot: new BotWhatsApp("Bot do WhatsApp", "bot", reagir),
    };
    // Os dois clientes de e-mail já existiam no sistema.
    loja.inscrever("chegou-produto", atores.ana);
    loja.inscrever("chegou-produto", atores.bruno);
    return { loja, atores };
  }, [mostrar]);

  // Efeito de "código sendo escrito". A quantidade de caracteres vem do
  // tempo decorrido, então a duração é sempre a mesma — mesmo num projetor
  // com taxa de quadros baixa.
  useEffect(() => {
    if (!alvo) return;
    const completo = recortarClasse(srcConcretos, alvo === "led" ? "PainelLED" : "BotWhatsApp");
    const duracao = Math.min(2600, 600 + completo.length * 3);
    const inicio = performance.now();
    let vivo = true;

    const passo = () => {
      if (!vivo) return;
      const k = Math.min(1, (performance.now() - inicio) / duracao);
      setTexto(completo.slice(0, Math.round(k * completo.length)));
      if (preRef.current) preRef.current.scrollTop = preRef.current.scrollHeight;
      if (k < 1) requestAnimationFrame(passo);
      else finalizar();
    };

    function finalizar() {
      setDigitando(false);
      loja.inscrever("chegou-produto", atores[alvo]); // entra na lista
      setAdicionados((a) => (a.includes(alvo) ? a : [...a, alvo]));
      setVersao((v) => v + 1);
      setPiscar(true);
      setTimeout(() => setPiscar(false), 2900);
      toast(`class ${alvo === "led" ? "PainelLED" : "BotWhatsApp"} extends Assinante — e a classe Loja: 0 linhas alteradas.`, "boa");
    }

    requestAnimationFrame(passo);
    return () => {
      vivo = false;
    };
  }, [alvo, loja, atores, toast]);

  useEffect(() => {
    if (adicionados.length === 2 && !concluida) aoConcluir();
  }, [adicionados, concluida, aoConcluir]);

  function implementar(qual) {
    if (digitando) return;
    setDigitando(true);
    setTexto("");
    setAlvo(qual);
  }

  function notificar() {
    const lista = loja.events.assinantesDe("chegou-produto");
    lista.forEach((a, i) =>
      voar(lojaRef.current, cartoes.current[a.id], i * 130, "", "i-mail")
    );
    setTimeout(() => loja.novoProduto("PlayStation 6"), 650);
    toast(
      `notify("chegou-produto") → ${lista.length} update() chamados. A Loja não sabe de que classe cada um é.`
    );
  }

  const inscritos = loja.events.assinantesDe("chegou-produto");
  const CLASSE_DE = {
    ana: "ClienteEmail",
    bruno: "ClienteEmail",
    led: "PainelLED",
    bot: "BotWhatsApp",
  };
  const ICONE_DE = { ana: "pessoa", bruno: "pessoa", led: "led", bot: "bot" };

  return (
    <section className="fase ativa" data-versao={versao}>
      <div className="cab">
        <span className="tag bom">Fase 3 &middot; princípio Aberto/Fechado</span>
        <h2>Assinantes novos, publicadora intacta</h2>
        <p className="sub">
          Dois assinantes que não existiam quando a <code>Loja</code> foi escrita: um{" "}
          <b>Painel de LED</b> e um <b>Bot do WhatsApp</b>. Basta cada um{" "}
          <b>implementar a interface Assinante</b> (ter um método <code>update</code>). Observe o
          contador de linhas alteradas na <code>Loja</code>.
        </p>
      </div>

      <div className="f3grid">
        <div className="card">
          <div className="cod-cab">
            <div className="titulo-painel" style={{ margin: 0 }}>
              <Ic nome="loja" /> class Loja &mdash; a publicadora
            </div>
            <span className={`selo ${piscar ? "destaque" : ""}`}>
              <Ic nome="check" /> <span>0 linhas alteradas</span>
            </span>
          </div>
          <Codigo fonte={srcLoja} className={`cod ${piscar ? "pisca" : ""}`} />
        </div>

        <div className="card">
          <div className="cod-cab">
            <div className="titulo-painel" style={{ margin: 0 }}>
              <Ic nome="cod" />{" "}
              <span>{alvo ? `${NOVOS[alvo].arquivo} — escrito agora` : "novo assinante concreto"}</span>
            </div>
          </div>
          <pre className="cod" id="codNovo" ref={preRef}>
            {alvo ? (
              <>
                <span dangerouslySetInnerHTML={{ __html: destacar(texto) }} />
                {digitando && <span className="caret" />}
              </>
            ) : (
              <span className="muted">
                Clique em "implementar interface Assinante" abaixo e o código aparece aqui, sendo
                escrito.
              </span>
            )}
          </pre>
        </div>
      </div>

      <div className="f3pool">
        {Object.entries(NOVOS).map(([chave, info]) => (
          <div className="oferta" key={chave}>
            <Ic nome={info.icone} />
            <div className="info">
              <b>{info.nome}</b>
              <small>
                {chave === "led"
                  ? "mostra o aviso no letreiro da vitrine"
                  : "manda mensagem no grupo de clientes"}
              </small>
            </div>
            <button
              className="btn roxo"
              disabled={adicionados.includes(chave) || digitando}
              onClick={() => implementar(chave)}
            >
              {adicionados.includes(chave)
                ? "já implementa Assinante"
                : "implementar interface Assinante"}
            </button>
          </div>
        ))}
      </div>

      <div className="sistema">
        <div className="card loja" ref={lojaRef}>
          <Ic nome="loja" className="ic grande" />
          <h3>Loja TechStore</h3>
          <p className="muted">a publicadora &mdash; inalterada</p>
          <button
            className="btn verde"
            style={{ marginTop: ".8em", width: "100%" }}
            onClick={notificar}
          >
            <span className="mono">novoProduto("PlayStation 6")</span>
          </button>
        </div>

        <div>
          <div className="titulo-painel">
            <Ic nome="lista" /> assinantes inscritos em{" "}
            <span className="mono" style={{ color: "var(--amarelo)" }}>
              "chegou-produto"
            </span>{" "}
            &mdash; {inscritos.length}
          </div>
          <div className="clientes">
            {inscritos.map((a) => (
              <Ator
                key={a.id}
                id={a.id}
                nome={a.nome}
                icone={ICONE_DE[a.id]}
                papel={<span style={{ fontFamily: "var(--mono)" }}>{CLASSE_DE[a.id]}</span>}
                bolha={bolhas[a.id]}
                classes={a.id === "led" || a.id === "bot" ? "novo" : ""}
                refCartao={(el) => (cartoes.current[a.id] = el)}
              />
            ))}
          </div>
        </div>
      </div>

      {concluida && (
        <div className="banner">
          <div className="txt">
            <h4>Princípio Aberto/Fechado, na prática.</h4>
            <p>
              A classe <code>Loja</code> ficou <b>aberta para extensão</b> (ganhou dois tipos novos
              de assinante) e <b>fechada para modificação</b> (<b>0 linhas alteradas</b>). Ela nunca
              soube com quem estava falando: só chamou <code>update()</code> na interface{" "}
              <code>Assinante</code>.
            </p>
          </div>
          <button className="btn alto verde" onClick={aoAvancar}>
            Ir para o quiz &rarr;
          </button>
        </div>
      )}
    </section>
  );
}
