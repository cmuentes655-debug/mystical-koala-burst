import * as React from "react";

/**
 * Devuelve `true` mientras la pestaña del navegador es visible, de modo que
 * las animaciones y el render WebGL puedan pausarse en segundo plano.
 */
export function usePageVisible() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return visible;
}
