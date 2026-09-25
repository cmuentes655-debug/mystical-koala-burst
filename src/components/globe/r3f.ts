import { Line } from "@react-three/drei";

/**
 * Elementos JSX referenciados como expresiones de miembro.
 *
 * El plugin de desarrollo de Dyad (`@dyad-sh/react-vite-component-tagger`)
 * inyecta `data-dyad-id` y `data-dyad-name` en todo elemento JSX con nombre
 * simple. React Three Fiber intenta aplicar esos atributos a los objetos de
 * three.js y falla con "R3F: Cannot set ...".
 *
 * El plugin ignora las expresiones de miembro (`nombre.tipo`), así que
 * `<r3f.mesh>` equivale a `<mesh>` en runtime pero no recibe atributos
 * inyectados. TypeScript sigue resolviendo el tipado de R3F y de drei.
 */
export const r3f = {
  group: "group",
  mesh: "mesh",
  points: "points",
  pointsMaterial: "pointsMaterial",
  sphereGeometry: "sphereGeometry",
  meshBasicMaterial: "meshBasicMaterial",
  Line,
} as const;
