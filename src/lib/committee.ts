import {
  BookOpen,
  FlaskConical,
  Gauge,
  Lightbulb,
  Network,
  type LucideIcon,
} from "lucide-react";

export type TabId = "inicio" | "funciones" | "indicadores" | "miembros";

export interface TabDef {
  id: TabId;
  label: string;
}

export const TABS: TabDef[] = [
  { id: "inicio", label: "Inicio" },
  { id: "funciones", label: "Funciones" },
  { id: "indicadores", label: "Indicadores" },
  { id: "miembros", label: "Miembros" },
];

export interface FunctionItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Id del arco del globo que se ilumina al pasar el cursor (mapeo 1:1). */
  arcId: string;
}

export const FUNCTIONS: FunctionItem[] = [
  {
    id: "articular",
    title: "Articular actores",
    description:
      "Conectamos empresas, instituciones y gremios de la cadena logística.",
    icon: Network,
    arcId: "arc-shanghai-rotterdam",
  },
  {
    id: "guias",
    title: "Guías, manuales y protocolos",
    description:
      "Desarrollamos lineamientos prácticos para adoptar IA de forma responsable.",
    icon: BookOpen,
    arcId: "arc-singapore-la",
  },
  {
    id: "practicas",
    title: "Buenas prácticas",
    description:
      "Compartimos información, casos y aprendizajes entre miembros.",
    icon: Lightbulb,
    arcId: "arc-rotterdam-ny",
  },
  {
    id: "pilotos",
    title: "Pilotos y validación",
    description:
      "Implementamos pilotos y validamos herramientas de IA en operaciones reales.",
    icon: FlaskConical,
    arcId: "arc-santos-rotterdam",
  },
  {
    id: "indicadores",
    title: "Indicadores comunes",
    description: "Monitoreamos los avances con métricas compartidas.",
    icon: Gauge,
    arcId: "arc-dubai-singapore",
  },
];

export interface Indicator {
  id: string;
  value: number;
  prefix: string;
  label: string;
  detail: string;
}

export const INDICATORS: Indicator[] = [
  {
    id: "orgs",
    value: 40,
    prefix: "+",
    label: "organizaciones",
    detail: "en la red de valor",
  },
  {
    id: "pilotos",
    value: 12,
    prefix: "",
    label: "pilotos activos",
    detail: "en operación real",
  },
  {
    id: "guias",
    value: 5,
    prefix: "",
    label: "guías publicadas",
    detail: "protocolos y manuales",
  },
];

export const ACTOR_TYPES = [
  "Empresa / Operador logístico",
  "Transportista / Proveedor",
  "Institución, gremio o academia",
  "Proveedor tecnológico",
];

export type FileKind = "pdf" | "sheet" | "doc" | "image";

export interface SampleFile {
  id: string;
  name: string;
  size: string;
  kind: FileKind;
}

export const SAMPLE_FILES: SampleFile[] = [
  {
    id: "f1",
    name: "Practicas_IA_Logistica_2025.pdf",
    size: "2.4 MB",
    kind: "pdf",
  },
  { id: "f2", name: "Indicadores_Comite_Q3.xlsx", size: "684 KB", kind: "sheet" },
  { id: "f3", name: "Protocolo_Pilotos_v3.docx", size: "1.1 MB", kind: "doc" },
  { id: "f4", name: "Mapa_Redes_Valor.png", size: "3.8 MB", kind: "image" },
];

/** Coordenadas [latitud, longitud] de nodos logísticos usados por los arcos. */
export type LatLon = [number, number];

export interface ArcDef {
  id: string;
  from: LatLon;
  to: LatLon;
  /** Pestañas en las que el arco aparece activo. */
  tabs: TabId[];
}

export const ARCS: ArcDef[] = [
  {
    id: "arc-shanghai-rotterdam",
    from: [31.2, 121.5],
    to: [51.9, 4.0],
    tabs: ["inicio", "funciones", "indicadores"],
  },
  {
    id: "arc-singapore-la",
    from: [1.35, 103.8],
    to: [33.7, -118.2],
    tabs: ["inicio", "funciones", "indicadores"],
  },
  {
    id: "arc-rotterdam-ny",
    from: [51.9, 4.0],
    to: [40.7, -74.0],
    tabs: ["inicio", "miembros", "indicadores"],
  },
  {
    id: "arc-santos-rotterdam",
    from: [-23.9, -46.3],
    to: [51.9, 4.0],
    tabs: ["funciones", "miembros", "indicadores"],
  },
  {
    id: "arc-dubai-singapore",
    from: [25.2, 55.3],
    to: [1.35, 103.8],
    tabs: ["funciones", "indicadores"],
  },
  {
    id: "arc-ny-santos",
    from: [40.7, -74.0],
    to: [-23.9, -46.3],
    tabs: ["miembros", "indicadores"],
  },
  {
    id: "arc-mumbai-capetown",
    from: [19.0, 72.8],
    to: [-33.9, 18.4],
    tabs: ["indicadores"],
  },
  {
    id: "arc-tokyo-sydney",
    from: [35.7, 139.7],
    to: [-33.9, 151.2],
    tabs: ["indicadores"],
  },
];

/** Rotación objetivo (radianes) del globo según la pestaña activa. */
export const TAB_ROTATION: Record<TabId, number> = {
  inicio: 0,
  funciones: -0.42,
  indicadores: 0.2,
  miembros: 0.62,
};

export const globeArcsForTab = (tab: TabId): ArcDef[] =>
  ARCS.filter((arc) => arc.tabs.includes(tab));

export const ALL_ARCS_ACTIVE: TabId = "indicadores";
