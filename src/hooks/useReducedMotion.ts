import * as React from "react";

/**
 * Detecta `prefers-reduced-motion: reduce` y se mantiene sincronizado con
 * cambios del sistema operativo.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
