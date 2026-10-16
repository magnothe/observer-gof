import { useCallback, useRef, useState } from "react";

/** Avisos curtos no topo da tela. */
export function useToasts(duracao = 2600) {
  const [toasts, setToasts] = useState([]);
  const seq = useRef(0);

  const toast = useCallback(
    (texto, tipo = "") => {
      const id = ++seq.current;
      setToasts((t) => [...t, { id, texto, tipo }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duracao);
    },
    [duracao]
  );

  return { toasts, toast };
}
