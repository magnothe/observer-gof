import { useState } from "react";
import Codigo from "./Codigo.jsx";

// O Vite entrega o conteúdo bruto do arquivo com "?raw". Ou seja: o painel
// mostra o próprio arquivo-fonte do projeto, com comentários e tudo, e não
// uma cópia escrita à mão que poderia ficar desatualizada.
import srcEventManager from "../padrao/EventManager.js?raw";
import srcLoja from "../padrao/Loja.js?raw";
import srcAssinante from "../padrao/Assinante.js?raw";
import srcConcretos from "../padrao/assinantesConcretos.js?raw";
import srcUso from "../padrao/exemploDeUso.js?raw";

const ABAS = {
  EventManager: srcEventManager,
  Loja: srcLoja,
  Assinante: srcAssinante,
  "Assinantes concretos": srcConcretos,
  "Como usar": srcUso,
};

export default function PainelCodigo({ aberto, aoFechar }) {
  const [aba, setAba] = useState("EventManager");

  return (
    <>
      <div
        className={`backdrop ${aberto ? "on" : ""}`}
        onClick={aoFechar}
      />
      <aside
        className={`drawer ${aberto ? "aberto" : ""}`}
        aria-hidden={!aberto}
        id="painelCodigo"
      >
        <div className="drawer-cab">
          <h3>O código real do padrão</h3>
          <button className="btn ghost" onClick={aoFechar}>
            Fechar (Esc)
          </button>
        </div>

        <div className="abas">
          {Object.keys(ABAS).map((nome) => (
            <button
              key={nome}
              className={`aba ${nome === aba ? "on" : ""}`}
              onClick={() => setAba(nome)}
            >
              {nome}
            </button>
          ))}
        </div>

        <Codigo fonte={ABAS[aba]} id="codBox" />

        <p className="muted" style={{ fontSize: ".66em", marginTop: ".6em" }}>
          Este texto é o conteúdo do arquivo-fonte correspondente em{" "}
          <code>src/padrao/</code>, importado com <code>?raw</code> — é
          exatamente o código que está rodando nesta página.
        </p>
      </aside>
    </>
  );
}
