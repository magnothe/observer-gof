import { useCallback, useRef, useState } from "react";

/**
 * Guarda o balão de fala de cada ator (por id) e o apaga sozinho.
 * É para cá que os update() dos assinantes mandam a reação deles.
 */
export function useBolhas(duracao = 3600) {
  const [bolhas, setBolhas] = useState({});
  const timers = useRef({});

  const mostrar = useCallback(
    (id, texto, tipo = "boa") => {
      setBolhas((b) => ({ ...b, [id]: { texto, tipo, nonce: Date.now() + Math.random() } }));
      clearTimeout(timers.current[id]);
      timers.current[id] = setTimeout(() => {
        setBolhas((b) => {
          const copia = { ...b };
          delete copia[id];
          return copia;
        });
      }, duracao);
    },
    [duracao]
  );

  const limpar = useCallback(() => {
    Object.values(timers.current).forEach(clearTimeout);
    timers.current = {};
    setBolhas({});
  }, []);

  return { bolhas, mostrar, limpar };
}
