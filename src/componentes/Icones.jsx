/**
 * Sprite de ícones em SVG, renderizado uma única vez no topo da aplicação.
 * Os componentes referenciam cada símbolo com <use href="#i-nome" />.
 * Nada de emoji: todos os ícones são desenhados em SVG.
 */
export default function Icones() {
  const traco = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  return (
    <svg className="svgdefs" aria-hidden="true">
      <symbol id="i-loja" viewBox="0 0 24 24" {...traco}>
        <path d="M4 10h16v10H4z" />
        <path d="M2.2 10 4.4 4.6h15.2L21.8 10" />
        <path d="M9.5 20v-5.5h5V20" />
      </symbol>
      <symbol id="i-pessoa" viewBox="0 0 24 24" {...traco}>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M4.6 20c0-4.1 3.3-6 7.4-6s7.4 1.9 7.4 6" />
      </symbol>
      <symbol id="i-led" viewBox="0 0 24 24" {...traco}>
        <rect x="2.5" y="4" width="19" height="12" rx="1.8" />
        <path d="M8 20.5h8M12 16v4.5" />
        <path d="M5.6 10h3.2M11 10h7.4" />
      </symbol>
      <symbol id="i-bot" viewBox="0 0 24 24" {...traco}>
        <rect x="4" y="8.5" width="16" height="11" rx="3.4" />
        <circle cx="9.6" cy="14" r="1.25" />
        <circle cx="14.4" cy="14" r="1.25" />
        <path d="M12 8.5V5.6" />
        <circle cx="12" cy="4.1" r="1.4" />
        <path d="M2.2 13.5v2.5M21.8 13.5v2.5" />
      </symbol>
      <symbol id="i-mail" viewBox="0 0 24 24" {...traco} strokeWidth={1.8}>
        <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
        <path d="M3.6 7.2 12 13l8.4-5.8" />
      </symbol>
      <symbol id="i-bell" viewBox="0 0 24 24" {...traco}>
        <path d="M6 16.4v-4.6a6 6 0 1 1 12 0v4.6l1.6 2.4H4.4z" />
        <path d="M9.8 19.2a2.3 2.3 0 0 0 4.4 0" />
      </symbol>
      <symbol id="i-tag" viewBox="0 0 24 24" {...traco}>
        <path d="M20.5 13.3 13 20.8a2 2 0 0 1-2.8 0l-7-7V3.4h10.4l6.9 6.9a2 2 0 0 1 0 3z" />
        <circle cx="7.6" cy="7.6" r="1.4" />
      </symbol>
      <symbol id="i-box" viewBox="0 0 24 24" {...traco}>
        <path d="M20.5 7.5 12 3.2 3.5 7.5v9L12 20.8l8.5-4.3z" />
        <path d="M3.5 7.5 12 11.8l8.5-4.3M12 11.8v9" />
      </symbol>
      <symbol id="i-alerta" viewBox="0 0 24 24" {...traco}>
        <path d="M12 3.6 1.8 20.4h20.4z" />
        <path d="M12 9.5v5M12 17.4h.01" />
      </symbol>
      <symbol id="i-cod" viewBox="0 0 24 24" {...traco} strokeWidth={1.9}>
        <path d="M8.5 17 3 12l5.5-5M15.5 7 21 12l-5.5 5" />
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24" {...traco} strokeWidth={2.4}>
        <path d="M4 12.6 9.2 18 20 6.6" />
      </symbol>
      <symbol id="i-x" viewBox="0 0 24 24" {...traco} strokeWidth={2.4}>
        <path d="M6 6l12 12M18 6 6 18" />
      </symbol>
      <symbol id="i-lista" viewBox="0 0 24 24" {...traco}>
        <path d="M8.5 6.5h12M8.5 12h12M8.5 17.5h12" />
        <circle cx="4.2" cy="6.5" r="1.3" />
        <circle cx="4.2" cy="12" r="1.3" />
        <circle cx="4.2" cy="17.5" r="1.3" />
      </symbol>
      <symbol id="i-terminal" viewBox="0 0 24 24" {...traco}>
        <rect x="2.5" y="4" width="19" height="16" rx="2.2" />
        <path d="M6.5 10l2.6 2.4-2.6 2.4M11.6 15.2h5.4" />
      </symbol>
    </svg>
  );
}

/** Atalho para usar um símbolo do sprite. */
export function Ic({ nome, className = "ic", ...resto }) {
  return (
    <svg className={className} {...resto}>
      <use href={`#i-${nome}`} />
    </svg>
  );
}
