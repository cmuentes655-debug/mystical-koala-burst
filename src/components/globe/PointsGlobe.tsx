import * as React from "react";
import * as THREE from "three";
import { GLOBE_RADIUS } from "./globeMath";
import { r3f } from "./r3f";

const POINT_COUNT = 2400;
const TURQUOISE = new THREE.Color("#00B398");
const GLOW = new THREE.Color("#5FE3CC");

/**
 * Esfera de puntos con distribución de Fibonacci. La esfera oscura interior
 * ocluye los puntos del hemisferio lejano para dar profundidad.
 */
export function PointsGlobe() {
  const geometry = React.useMemo(() => {
    const positions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const color = new THREE.Color();

    for (let i = 0; i < POINT_COUNT; i++) {
      const y = 1 - (i / (POINT_COUNT - 1)) * 2;
      const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const x = Math.cos(theta) * ringRadius;
      const z = Math.sin(theta) * ringRadius;

      positions[i * 3] = x * GLOBE_RADIUS;
      positions[i * 3 + 1] = y * GLOBE_RADIUS;
      positions[i * 3 + 2] = z * GLOBE_RADIUS;

      // Mezcla determinista: base turquesa con algunos destellos brillantes.
      const t = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const flash = Math.max(0, t);
      color.copy(TURQUOISE).lerp(GLOW, flash * flash * flash);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return buffer;
  }, []);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <r3f.group>
      <r3f.mesh>
        <r3f.sphereGeometry args={[GLOBE_RADIUS * 0.982, 48, 48]} />
        <r3f.meshBasicMaterial color="#02261f" />
      </r3f.mesh>
      <r3f.points geometry={geometry}>
        <r3f.pointsMaterial
          vertexColors
          size={0.02}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          toneMapped={false}
        />
      </r3f.points>
    </r3f.group>
  );
}
