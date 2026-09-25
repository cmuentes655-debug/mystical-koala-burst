import * as React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { ARCS, type ArcDef, type TabId } from "@/lib/committee";
import { buildArcCurve } from "./globeMath";
import { r3f } from "./r3f";

type LineHandle = React.ComponentRef<typeof r3f.Line>;

const BASE_COLOR = new THREE.Color("#00B398");
const HIGHLIGHT_COLOR = new THREE.Color("#5FE3CC");

interface ArcProps {
  def: ArcDef;
  points: THREE.Vector3[];
  curve: THREE.QuadraticBezierCurve3;
  activeTab: TabId;
  highlighted: boolean;
  reduced: boolean;
  seed: number;
}

function Arc({
  def,
  points,
  curve,
  activeTab,
  highlighted,
  reduced,
  seed,
}: ArcProps) {
  const lineRef = React.useRef<LineHandle>(null);
  const dotRef = React.useRef<THREE.Mesh>(null);
  const colorRef = React.useRef(BASE_COLOR.clone());

  const active = def.tabs.includes(activeTab);
  const baseOpacity = highlighted ? 0.92 : active ? 0.34 : 0.11;
  const travelSpeed = 0.05 + (seed % 5) * 0.016;

  useFrame((state) => {
    const line = lineRef.current;
    if (line) {
      const material = line.material as THREE.Material & { color?: THREE.Color };
      if (reduced) {
        material.opacity = baseOpacity;
      } else {
        const pulse = 0.72 + 0.28 * Math.sin(state.clock.elapsedTime * 0.7 + seed);
        material.opacity = baseOpacity * pulse;
      }
      colorRef.current.lerp(
        highlighted ? HIGHLIGHT_COLOR : BASE_COLOR,
        0.08,
      );
      if (material.color) {
        material.color.copy(colorRef.current);
      }
    }

    const dot = dotRef.current;
    if (dot) {
      if (reduced || !active) {
        dot.visible = false;
      } else {
        dot.visible = true;
        const travel = (seed * 0.17 + state.clock.elapsedTime * travelSpeed) % 1;
        curve.getPointAt(travel, dot.position);
      }
    }
  });

  return (
    <r3f.group>
      <r3f.Line
        ref={lineRef}
        points={points}
        color="#00B398"
        lineWidth={highlighted ? 2.2 : 1.3}
        transparent
        opacity={baseOpacity}
        depthWrite={false}
        toneMapped={false}
      />
      <r3f.mesh ref={dotRef}>
        <r3f.sphereGeometry args={[0.032, 8, 8]} />
        <r3f.meshBasicMaterial color="#FC4C02" transparent toneMapped={false} />
      </r3f.mesh>
    </r3f.group>
  );
}

interface ArcsProps {
  activeTab: TabId;
  hoveredArcId: string | null;
  reduced: boolean;
}

/** Arcos de rutas logísticas con puntos naranjas en tránsito. */
export function Arcs({ activeTab, hoveredArcId, reduced }: ArcsProps) {
  const prepared = React.useMemo(
    () =>
      ARCS.map((def) => {
        const curve = buildArcCurve(def.from, def.to);
        return { def, curve, points: curve.getPoints(48) };
      }),
    [],
  );

  return (
    <r3f.group>
      {prepared.map((item, index) => (
        <Arc
          key={item.def.id}
          def={item.def}
          curve={item.curve}
          points={item.points}
          activeTab={activeTab}
          highlighted={hoveredArcId === item.def.id}
          reduced={reduced}
          seed={index + 1}
        />
      ))}
    </r3f.group>
  );
}
