import { useCallback, useEffect, useMemo, useState } from "react";
import Diagrama from "../componentes/Diagrama.jsx";
import { PERGUNTAS, sortearOrdem } from "../dados/perguntas.js";

const LETRA = ["A", "B", "C", "D"];

/**
 * FASE 4 — quiz da sala, em modo apresentação.
 * A turma responde em voz alta antes do clique.
 */
export default function Fase4({ fim, aoTerminar, aoReiniciarTudo, toast }) {
  const [rodada, setRodada] = useState(0); // trocar isto re-sorteia tudo
  const [i, setI] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [escolha, setEscolha] = useState(null);

  // Uma ordem sorteada por pergunta, estável durante a rodada.
  const ordens = useMemo(
    () => PERGUNTAS.map((q) => sortearOrdem(q.o.length)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rodada]
  );

  const q = PERGUNTAS[i];
  const ordem = ordens[i];
  const correta = ordem.indexOf(q.c); // onde a certa caiu na tela
  const respondida = escolha !== null;

  const responder = useCallback(
    (pos) => {
      if (escolha !== null) return;
      setEscolha(pos);
      if (pos === correta) setAcertos((a) => a + 1);
    },
    [escolha, correta]
  );

  const avancar = useCallback(() => {
    if (escolha === null) {
      toast("Responda a pergunta para avançar.");
      return;
    }
    if (i === PERGUNTAS.length - 1) aoTerminar();
    else {
      setI((x) => x + 1);
      setEscolha(null);
    }
  }, [escolha, i, aoTerminar, toast]);

  // Teclado próprio da fase: 1–4 responde, seta direita avança a pergunta.
  useEffect(() => {
    if (fim) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        avancar();
        return;
      }
      if (/^[1-4]$/.test(e.key)) responder(Number(e.key) - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fim, avancar, responder]);

  function refazerQuiz() {
    setRodada((r) => r + 1);
    setI(0);
    setAcertos(0);
    setEscolha(null);
  }

  if (fim) {
    const msg =
      acertos === PERGUNTAS.length
        ? "Placar perfeito. A turma está pronta para a pergunta do professor."
        : acertos >= 4
        ? "Bom resultado. Reveja as explicações das que erraram antes da pergunta do professor."
        : "Vale rodar o quiz de novo — as explicações ficam logo abaixo de cada resposta.";

    return (
      <section className="fase ativa">
        <div id="fimWrap">
          <div className="placarFinal">
            <div className="big">
              {acertos}/{PERGUNTAS.length}
            </div>
            <div className="de">{msg}</div>
            <div className="quizNav">
              <button className="btn alto verde" onClick={aoReiniciarTudo}>
                Jogar de novo
              </button>
              <button
                className="btn alto ghost"
                onClick={() => {
                  refazerQuiz();
                  aoTerminar(false);
                }}
              >
                Refazer só o quiz
              </button>
            </div>
          </div>

          <div className="definicao">
            <span className="tag roxa">definição formal</span>
            <blockquote>
              O <b>Observer</b> é um padrão de projeto comportamental que permite definir um{" "}
              <b>mecanismo de inscrição</b> para notificar múltiplos objetos sobre quaisquer
              eventos que aconteçam com o objeto que eles estão observando.
            </blockquote>
            <p className="muted" style={{ fontSize: ".8em", marginTop: ".7em" }}>
              Vocabulário: a <b>publicadora</b> mantém a lista de <b>assinantes</b>; quem quiser
              receber avisos chama <b>inscrever</b> e pode <b>cancelar inscrição</b> a qualquer
              momento; quando o <b>evento</b> acontece, a publicadora <b>notifica</b> a lista
              chamando <b>update</b> em cada assinante.
            </p>
          </div>

          <Diagrama />
        </div>
      </section>
    );
  }

  return (
    <section className="fase ativa">
      <div id="quizWrap">
        <div className="quizTop">
          <span>
            Pergunta {i + 1} de {PERGUNTAS.length}
          </span>
          <span className="placar">Acertos: {acertos}</span>
        </div>

        <h2 id="qPergunta">{q.p}</h2>

        <div className="opcoes" id="qOpcoes">
          {ordem.map((orig, pos) => {
            let extra = "";
            if (respondida) {
              if (pos === correta) extra = "certa";
              else if (pos === escolha) extra = "errada";
              else extra = "apagada";
            }
            return (
              <button
                key={pos}
                className={`opc ${extra}`}
                disabled={respondida}
                onClick={() => responder(pos)}
              >
                <span className="letra">{LETRA[pos]}</span>
                <span className="txt">{q.o[orig]}</span>
              </button>
            );
          })}
        </div>

        {respondida && (
          <div className={`explic ${escolha === correta ? "ok" : "no"}`}>
            <h4>
              {escolha === correta ? "Correto." : `A resposta certa é a ${LETRA[correta]}.`}
            </h4>
            <p>{q.e}</p>
          </div>
        )}

        <div className="quizNav">
          {respondida && (
            <button className="btn alto verde" onClick={avancar}>
              {i === PERGUNTAS.length - 1 ? "Ver o resultado →" : "Próxima pergunta →"}
            </button>
          )}
        </div>

        <p className="muted" style={{ fontSize: ".7em", marginTop: "1.4em" }}>
          A turma responde em voz alta &mdash; depois clique. Atalhos: <kbd>1</kbd>&hellip;
          <kbd>4</kbd> para responder, <kbd>&rarr;</kbd> para avançar.
        </p>
      </div>
    </section>
  );
}
