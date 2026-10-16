// Destaque de sintaxe simples, feito à mão (sem biblioteca).
// Recebe código-fonte e devolve HTML com <span> por tipo de token.

const PALAVRAS =
  /^(class|extends|constructor|new|this|if|else|return|for|of|in|const|let|var|function|throw|super|true|false|null|undefined|delete|import|export|from)$/;
const METODOS =
  /^(update|notify|subscribe|unsubscribe|inscrever|cancelarInscricao|notificar)$/;

// Ordem importa: comentário, depois string, depois identificador, depois número.
const TOKENS = new RegExp(
  [
    "(/\\*[\\s\\S]*?\\*/|//[^\\n]*)", // 1: comentário de bloco ou de linha
    "(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)", // 2: string
    "\\b([A-Za-z_$][\\w$]*)\\b", // 3: identificador
    "\\b(\\d+)\\b", // 4: número
  ].join("|"),
  "g"
);

export function escapar(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function destacar(codigo) {
  return escapar(codigo).replace(TOKENS, (m, com, str, ident, num) => {
    if (com) return `<span class="c-com">${com}</span>`;
    if (str) return `<span class="c-str">${str}</span>`;
    if (num) return `<span class="c-num">${num}</span>`;
    if (ident) {
      if (PALAVRAS.test(ident)) return `<span class="c-kw">${ident}</span>`;
      if (METODOS.test(ident)) return `<span class="c-fn">${ident}</span>`;
      if (/^[A-Z]/.test(ident)) return `<span class="c-cls">${ident}</span>`;
      return ident;
    }
    return m;
  });
}
