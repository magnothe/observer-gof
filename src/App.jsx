import { useCallback, useEffect, useState } from "react";
import Icones, { Ic } from "./componentes/Icones.jsx";
import PainelCodigo from "./componentes/PainelCodigo.jsx";
import Rodape from "./componentes/Rodape.jsx";
import Toasts from "./componentes/Toasts.jsx";
import Topbar from "./componentes/Topbar.jsx";
import Fase1 from "./fases/Fase1.jsx";
import Fase2 from "./fases/Fase2.jsx";
import Fase3 from "./fases/Fase3.jsx";
import Fase4 from "./fases/Fase4.jsx";
import { useToasts } from "./util/useToasts.js";

export default function App() {
  // Trocar a chave remonta o jogo inteiro: é o "Reiniciar".
  const [chave, setChave] = useState(0);
  const { toasts, toast } = useToasts();

  const reiniciar = useCallback(() => {
    setChave((k) => k + 1);
    toast("Jogo reiniciado.");
  }, [toast]);

  return (
    <>
      <Icones />
      <Jogo key={chave} aoReiniciarTudo={reiniciar} toast={toast} />
      <Toasts toasts={toasts} />
    </>
  );
}

function Jogo({ aoReiniciarTudo, toast }) {
  const [fase, setFase] = useState(1);
  const [f1ok, setF1ok] = useState(false);
  const [f2ok, setF2ok] = useState(false);
  const [f3ok, setF3ok] = useState(false);
  const [f4fim, setF4fim] = useState(false);
  const [codigoAberto, setCodigoAberto] = useState(false);

  // A única trava do jogo: a Fase 2 só abre depois de sentir o problema.
  const liberada = useCallback((n) => (n === 2 ? f1ok : true), [f1ok]);
  const feita = useCallback(
    (n) => [false, f1ok, f2ok, f3ok, f4fim][n] || false,
    [f1ok, f2ok, f3ok, f4fim]
  );

  const irPara = useCallback(
    (n) => {
      const destino = Math.max(1, Math.min(4, n));
      if (destino === fase) return;
      if (!liberada(destino)) {
        toast("Fase 2 ainda travada: desperdice 5 viagens e envie 1 spam.", "ruim");
        return;
      }
      setFase(destino);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [fase, liberada, toast]
  );

  // Teclado — essencial para apresentar sem procurar o mouse.
  // Na Fase 4 a seta direita pertence ao quiz (avança a pergunta), por isso
  // ela é ignorada aqui enquanto o quiz não terminou.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") return setCodigoAberto(false);
      if (e.key === "ArrowRight") {
        if (fase === 4 && !f4fim) return;
        return irPara(fase + 1);
      }
      if (e.key === "ArrowLeft") return irPara(fase - 1);
      if (e.key === "c" || e.key === "C") return setCodigoAberto((v) => !v);
      if (e.key === "r" || e.key === "R") return aoReiniciarTudo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fase, f4fim, irPara, aoReiniciarTudo]);

  return (
    <>
      <div className="app">
        <Topbar
          fase={fase}
          feita={feita}
          liberada={liberada}
          irPara={irPara}
          aoReiniciar={aoReiniciarTudo}
        />

        <main>
          {fase === 1 && (
            <Fase1
              concluida={f1ok}
              aoConcluir={() => setF1ok(true)}
              aoAvancar={() => irPara(2)}
              toast={toast}
            />
          )}
          {fase === 2 && (
            <Fase2
              confirmado={f2ok}
              aoConfirmar={() => setF2ok(true)}
              aoAvancar={() => irPara(3)}
              toast={toast}
            />
          )}
          {fase === 3 && (
            <Fase3
              concluida={f3ok}
              aoConcluir={() => setF3ok(true)}
              aoAvancar={() => irPara(4)}
              toast={toast}
            />
          )}
          {fase === 4 && (
            <Fase4
              fim={f4fim}
              aoTerminar={(v = true) => setF4fim(v)}
              aoReiniciarTudo={aoReiniciarTudo}
              toast={toast}
            />
          )}
        </main>
      </div>

      <Rodape fase={fase} irPara={irPara} />

      <button className="fab" onClick={() => setCodigoAberto((v) => !v)}>
        <Ic nome="cod" /> Ver o código
      </button>

      <PainelCodigo aberto={codigoAberto} aoFechar={() => setCodigoAberto(false)} />
    </>
  );
}
