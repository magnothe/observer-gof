import { Ic } from "./Icones.jsx";

const MONO = "ui-monospace,Consolas,monospace";
const SANS = "ui-sans-serif,system-ui";

/** Estrutura do padrão: publicadora → interface Assinante → assinantes concretos. */
export default function Diagrama() {
  return (
    <div className="diagrama">
      <div className="titulo-painel">
        <Ic nome="cod" /> estrutura do padrão
      </div>

      <svg
        viewBox="0 0 1060 440"
        role="img"
        aria-label="Diagrama: Loja publicadora notifica a interface Assinante, implementada por ClienteEmail, PainelLED e BotWhatsApp"
      >
        <defs>
          <marker
            id="seta"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="#60a5fa" />
          </marker>
          <marker
            id="heranca"
            viewBox="0 0 12 12"
            refX="11"
            refY="6"
            markerWidth="11"
            markerHeight="11"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L11 6 L0 12 z" fill="#0a0e1a" stroke="#a78bfa" strokeWidth="1.6" />
          </marker>
        </defs>

        {/* publicadora */}
        <g>
          <rect x="20" y="130" width="300" height="180" rx="12" fill="#141b2f" stroke="#fbbf24" strokeWidth="2" />
          <rect x="20" y="130" width="300" height="42" rx="12" fill="#2a2110" stroke="#fbbf24" strokeWidth="2" />
          <text x="170" y="158" textAnchor="middle" fill="#fcd34d" fontFamily={MONO} fontSize="19" fontWeight="700">
            Loja  (publicadora)
          </text>
          <text x="38" y="198" fill="#93a0c0" fontFamily={MONO} fontSize="15">
            - events: EventManager
          </text>
          <line x1="20" y1="212" x2="320" y2="212" stroke="#263252" strokeWidth="1.5" />
          <text x="38" y="238" fill="#e8ecf8" fontFamily={MONO} fontSize="15">
            + inscrever(evento, a)
          </text>
          <text x="38" y="263" fill="#e8ecf8" fontFamily={MONO} fontSize="15">
            + cancelarInscricao(evento, a)
          </text>
          <text x="38" y="288" fill="#4ade80" fontFamily={MONO} fontSize="15">
            + notificar(evento, dados)
          </text>
        </g>

        {/* publicadora -> interface */}
        <line x1="320" y1="220" x2="430" y2="220" stroke="#60a5fa" strokeWidth="2.5" markerEnd="url(#seta)" />
        <text x="375" y="208" textAnchor="middle" fill="#60a5fa" fontFamily={SANS} fontSize="15" fontWeight="700">
          notifica
        </text>
        <text x="375" y="243" textAnchor="middle" fill="#93a0c0" fontFamily={MONO} fontSize="14">
          0..*
        </text>

        {/* interface */}
        <g>
          <rect x="432" y="170" width="276" height="100" rx="12" fill="#141b2f" stroke="#a78bfa" strokeWidth="2" strokeDasharray="7 5" />
          <text x="570" y="200" textAnchor="middle" fill="#ddd6fe" fontFamily={MONO} fontSize="15">
            &#171;interface&#187;
          </text>
          <text x="570" y="224" textAnchor="middle" fill="#fff" fontFamily={MONO} fontSize="19" fontWeight="700">
            Assinante
          </text>
          <line x1="432" y1="236" x2="708" y2="236" stroke="#263252" strokeWidth="1.5" />
          <text x="570" y="258" textAnchor="middle" fill="#4ade80" fontFamily={MONO} fontSize="15" fontWeight="700">
            + update(evento, dados)
          </text>
        </g>

        {/* assinantes concretos */}
        <g fontFamily={MONO}>
          <rect x="818" y="40" width="222" height="76" rx="11" fill="#141b2f" stroke="#60a5fa" strokeWidth="2" />
          <text x="929" y="72" textAnchor="middle" fill="#bfdbfe" fontSize="17" fontWeight="700">ClienteEmail</text>
          <text x="929" y="97" textAnchor="middle" fill="#93a0c0" fontSize="14">+ update(...)</text>

          <rect x="818" y="182" width="222" height="76" rx="11" fill="#141b2f" stroke="#60a5fa" strokeWidth="2" />
          <text x="929" y="214" textAnchor="middle" fill="#bfdbfe" fontSize="17" fontWeight="700">PainelLED</text>
          <text x="929" y="239" textAnchor="middle" fill="#93a0c0" fontSize="14">+ update(...)</text>

          <rect x="818" y="324" width="222" height="76" rx="11" fill="#141b2f" stroke="#60a5fa" strokeWidth="2" />
          <text x="929" y="356" textAnchor="middle" fill="#bfdbfe" fontSize="17" fontWeight="700">BotWhatsApp</text>
          <text x="929" y="381" textAnchor="middle" fill="#93a0c0" fontSize="14">+ update(...)</text>
        </g>

        {/* heranças: concretos -> interface */}
        <path d="M818 78 L768 78 L768 220 L720 220" fill="none" stroke="#a78bfa" strokeWidth="2.2" markerEnd="url(#heranca)" />
        <path d="M818 220 L720 220" fill="none" stroke="#a78bfa" strokeWidth="2.2" markerEnd="url(#heranca)" />
        <path d="M818 362 L768 362 L768 220 L720 220" fill="none" stroke="#a78bfa" strokeWidth="2.2" markerEnd="url(#heranca)" />

        <text x="20" y="352" fill="#93a0c0" fontFamily={SANS} fontSize="15">
          a publicadora conhece só a interface &mdash;
        </text>
        <text x="20" y="376" fill="#93a0c0" fontFamily={SANS} fontSize="15">
          nunca as classes concretas (desacoplamento)
        </text>
        <text x="20" y="414" fill="#f87171" fontFamily={SANS} fontSize="15">
          desvantagem: a ordem de notificação é aleatória
        </text>
      </svg>
    </div>
  );
}
