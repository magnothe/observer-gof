import { Ic } from "./Icones.jsx";

export const FASES = [
  { n: 1, rot: "O problema" },
  { n: 2, rot: "Inscrição" },
  { n: 3, rot: "Aberto/Fechado" },
  { n: 4, rot: "Quiz da sala" },
];

export default function Topbar({ fase, feita, liberada, irPara, aoReiniciar }) {
  return (
    <header className="topbar">
      <div className="brand">
        <Ic nome="bell" />
        <div>
          <h1>Observer</h1>
          <p>padrão comportamental &middot; GoF</p>
        </div>
      </div>

      <nav className="progresso" aria-label="Progresso das fases">
        {FASES.map((f) => (
          <button
            key={f.n}
            className={[
              "etapa",
              fase === f.n ? "ativa" : "",
              feita(f.n) ? "feita" : "",
              liberada(f.n) ? "" : "travada",
            ].join(" ")}
            onClick={() => irPara(f.n)}
          >
            <span className="n">{f.n}</span>
            <span className="rot">{f.rot}</span>
          </button>
        ))}
      </nav>

      <div className="acoes">
        <button className="btn ghost" onClick={aoReiniciar}>
          Reiniciar
        </button>
      </div>
    </header>
  );
}
