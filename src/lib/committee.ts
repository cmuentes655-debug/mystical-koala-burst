import {
  BookOpen,
  FlaskConical,
  Gauge,
  Lightbulb,
  Network,
  type LucideIcon,
} from "lucide-react";

export type TabId =
  | "inicio"
  | "participantes"
  | "fechas"
  | "formulario"
  | "miembros";

export interface TabDef {
  id: TabId;
  label: string;
}

export const TABS: TabDef[] = [
  { id: "inicio", label: "Inicio" },
  { id: "participantes", label: "Participantes" },
  { id: "fechas", label: "Próximas fechas" },
  { id: "formulario", label: "Formulario" },
  { id: "miembros", label: "Pilares" },
];

export interface FunctionItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FUNCTIONS: FunctionItem[] = [
  {
    id: "articular",
    title: "Articular actores",
    description:
      "Conectamos empresas, instituciones y gremios de la cadena logística.",
    icon: Network,
  },
  {
    id: "guias",
    title: "Guías, manuales y protocolos",
    description:
      "Desarrollamos lineamientos prácticos para adoptar IA de forma responsable.",
    icon: BookOpen,
  },
  {
    id: "practicas",
    title: "Buenas prácticas",
    description:
      "Compartimos información, casos y aprendizajes entre miembros.",
    icon: Lightbulb,
  },
  {
    id: "pilotos",
    title: "Pilotos y validación",
    description:
      "Implementamos pilotos y validamos herramientas de IA en operaciones reales.",
    icon: FlaskConical,
  },
  {
    id: "indicadores",
    title: "Indicadores comunes",
    description: "Monitoreamos los avances con métricas compartidas.",
    icon: Gauge,
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

export type EventModality = "Virtual" | "Presencial" | "Híbrido";

export interface CommitteeEvent {
  id: string;
  title: string;
  description: string;
  /** Fecha en formato ISO (YYYY-MM-DD). */
  date: string;
  /** Hora legible para mostrar en la agenda. */
  time: string;
  place: string;
  modality: EventModality;
}

export const EVENTS: CommitteeEvent[] = [
  {
    id: "plenaria-oct",
    title: "Sesión plenaria del comité",
    description:
      "Revisión de avances de los pilotos y validación de la hoja de ruta trimestral.",
    date: "2026-10-15",
    time: "9:00 a. m.",
    place: "Sala virtual del comité",
    modality: "Virtual",
  },
  {
    id: "taller-protocolos",
    title: "Taller: protocolos de IA responsable",
    description:
      "Construcción colaborativa de guías prácticas para adopción segura en operaciones.",
    date: "2026-10-29",
    time: "2:30 p. m.",
    place: "Cámara de Comercio, Bogotá",
    modality: "Presencial",
  },
  {
    id: "demo-day",
    title: "Demo day de pilotos",
    description:
      "Los equipos presentan resultados de los pilotos de IA en operación real.",
    date: "2026-11-12",
    time: "8:30 a. m.",
    place: "Auditorio central + transmisión en vivo",
    modality: "Híbrido",
  },
  {
    id: "cierre-anual",
    title: "Cierre anual y hoja de ruta 2027",
    description:
      "Balance de indicadores compartidos y prioridades del comité para el próximo año.",
    date: "2026-12-03",
    time: "4:00 p. m.",
    place: "Sala virtual del comité",
    modality: "Virtual",
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
