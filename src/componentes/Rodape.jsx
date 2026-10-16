export default function Rodape({ fase, irPara }) {
  return (
    <footer className="rodape">
      <button className="btn ghost" disabled={fase === 1} onClick={() => irPara(fase - 1)}>
        &larr; Fase anterior
      </button>
      <span className="dica">
        navegue com <kbd>&larr;</kbd> <kbd>&rarr;</kbd> &middot; <kbd>C</kbd> abre o código
        &middot; <kbd>R</kbd> reinicia
      </span>
      <button className="btn" disabled={fase === 4} onClick={() => irPara(fase + 1)}>
        Próxima fase &rarr;
      </button>
    </footer>
  );
}
