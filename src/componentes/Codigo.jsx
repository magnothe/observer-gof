import { destacar } from "../util/destacar.js";

/** <pre> com destaque de sintaxe. */
export default function Codigo({ fonte, className = "cod", ...resto }) {
  return (
    <pre
      className={className}
      {...resto}
      dangerouslySetInnerHTML={{ __html: destacar(fonte) }}
    />
  );
}
