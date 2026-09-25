import * as THREE from "three";
import type { LatLon } from "@/lib/committee";

export const GLOBE_RADIUS = 1.62;

/** Convierte latitud/longitud a un punto sobre la esfera del globo. */
export function latLonToVector3(lat: number, lon: number, radius = GLOBE_RADIUS) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Curva cuadrática elevada entre dos nodos, para simular la ruta logística. */
export function buildArcCurve(from: LatLon, to: LatLon) {
  const start = latLonToVector3(from[0], from[1]);
  const end = latLonToVector3(to[0], to[1]);
  const mid = start.clone().add(end).multiplyScalar(0.5);
  if (mid.lengthSq() < 1e-6) {
    mid.copy(start);
  }
  const altitude = GLOBE_RADIUS + start.distanceTo(end) * 0.34;
  const control = mid.normalize().multiplyScalar(altitude);
  return new THREE.QuadraticBezierCurve3(start, control, end);
}
