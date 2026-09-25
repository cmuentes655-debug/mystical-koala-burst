import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { TAB_ROTATION, type TabId } from "@/lib/committee";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePageVisible } from "@/hooks/usePageVisible";
import { cn } from "@/lib/utils";
import { PointsGlobe } from "./PointsGlobe";
import { Arcs } from "./Arcs";
import { FallbackGlobe } from "./FallbackGlobe";
import { r3f } from "./r3f";

interface GlobeSceneProps {
  activeTab: TabId;
  hoveredArcId: string | null;
  reduced: boolean;
}

function GlobeScene({ activeTab, hoveredArcId, reduced }: GlobeSceneProps) {
  const tiltRef = React.useRef<THREE.Group>(null);
  const spinRef = React.useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const tilt = tiltRef.current;
    if (!tilt) return;

    const pointerX = reduced ? 0 : state.pointer.x;
    const pointerY = reduced ? 0 : state.pointer.y;
    const targetY = TAB_ROTATION[activeTab] + pointerX * 0.24;
    const targetX = -pointerY * 0.16;

    tilt.rotation.y = THREE.MathUtils.lerp(tilt.rotation.y, targetY, 0.045);
    tilt.rotation.x = THREE.MathUtils.lerp(tilt.rotation.x, targetX, 0.045);

    if (spinRef.current && !reduced) {
      spinRef.current.rotation.y += delta * 0.042;
    }
  });

  return (
    <r3f.group ref={tiltRef}>
      <r3f.group ref={spinRef} rotation={[0.32, 0.6, 0]}>
        <PointsGlobe />
        <Arcs
          activeTab={activeTab}
          hoveredArcId={hoveredArcId}
          reduced={reduced}
        />
      </r3f.group>
    </r3f.group>
  );
}

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const context = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!context) return false;
    // Libera el contexto de prueba para no gastar el cupo del navegador.
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

interface GlobeCanvasProps {
  activeTab: TabId;
  hoveredArcId: string | null;
  className?: string;
}

export function GlobeCanvas({
  activeTab,
  hoveredArcId,
  className,
}: GlobeCanvasProps) {
  const reduced = useReducedMotion();
  const visible = usePageVisible();
  const [webglOk] = React.useState(detectWebGL);

  if (!webglOk) {
    return <FallbackGlobe className={className} />;
  }

  const paused = reduced || !visible;

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, rgba(0,179,152,0.22) 0%, rgba(0,33,29,0) 62%)",
        }}
      />
      <Canvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        frameloop={paused ? "demand" : "always"}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0.25, 4.3], fov: 42 }}
      >
        <GlobeScene
          activeTab={activeTab}
          hoveredArcId={hoveredArcId}
          reduced={reduced}
        />
      </Canvas>
    </div>
  );
}
