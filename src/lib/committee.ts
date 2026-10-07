import {
  Blocks,
  Database,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

export type TabId =
  | "inicio"
  | "participantes"
  | "fechas"
  | "formulario"
  | "pilares";

export interface TabDef {
  id: TabId;
  label: string;
}

export const TABS: TabDef[] = [
  { id: "inicio", label: "Inicio" },
  { id: "participantes", label: "Participantes" },
  { id: "fechas", label: "Próximas fechas" },
  { id: "pilares", label: "Pilares" },
];

export interface FunctionItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FUNCTIONS: FunctionItem[] = [
  {
    id: "datos",
    title: "Datos e interoperabilidad",
    description:
      "Establecer las condiciones para compartir datos de forma confiable, interoperable y segura.",
    icon: Database,
  },
  {
    id: "ecosistema",
    title: "Ecosistema tecnológico colaborativo",
    description:
      "Herramientas, plataformas y agentes de IA interoperables entre empresas, con LOGYCA como orquestador neutral del ecosistema.",
    icon: Blocks,
  },
  {
    id: "cultura",
    title: "Cultura de la colaboración",
    description:
      "Desarrollar las capacidades y la cultura de colaboración para una adopción sostenible.",
    icon: HeartHandshake,
  },
];

/** Tarjeta destacada de ancho completo, con estilo propio (sin icono ni descripción). */
export const GOVERNANCE_PILLAR = {
  id: "gobernanza",
  title: "Gobernanza, Riesgo y Ética (IA responsable)",
};

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
] as const;

export type ActorType = (typeof ACTOR_TYPES)[number];

export interface ParticipantLogo {
  id: string;
  /** Nombre de la organización para `alt`/`aria-label`. */
  name: string;
  /** Nombre de archivo dentro de `public/participantes/`. */
  file: string;
}

/**
 * Muro de logos reales de las organizaciones participantes.
 * Los archivos sin marca identificable usan un nombre genérico solo para `alt`.
 */
export const PARTICIPANT_LOGOS: ParticipantLogo[] = [
  { id: "ai-jump", name: "AI Jump", file: "AI+Jump+Cube+Color+Logo-640w.webp" },
  { id: "alizanza-tea", name: "Participante", file: "alizanza tea.png" },
  { id: "datup", name: "Datup", file: "datup_logo.jpg" },
  { id: "falabella", name: "Falabella", file: "Falabella.svg.webp" },
  { id: "harinera-pardo", name: "Harinera Pardo", file: "harinera-pardo.png" },
  { id: "participante-1", name: "Participante", file: "images (1).jpg" },
  { id: "participante-2", name: "Participante", file: "images (1).png" },
  { id: "participante-3", name: "Participante", file: "images (2).png" },
  { id: "participante-4", name: "Participante", file: "images (3).png" },
  { id: "participante-5", name: "Participante", file: "images (4).png" },
  { id: "participante-6", name: "Participante", file: "images.jpg" },
  { id: "participante-7", name: "Participante", file: "images.png" },
  { id: "participante-8", name: "Participante", file: "iw.png" },
  { id: "grupo-bimbo", name: "Grupo Bimbo", file: "Logo_Grupo_BIMBO.svg.webp" },
  { id: "participante-9", name: "Participante", file: "logo_vertical_ur_rojo.png" },
  { id: "datecsa", name: "Datecsa", file: "Logo-Datecsa-1500x460.webp" },
  { id: "participante-10", name: "Participante", file: "logo-footer.png" },
  { id: "participante-11", name: "Participante", file: "logo-name-color.png" },
  { id: "nestle", name: "Nestlé", file: "Nestle.jpg" },
  { id: "simoniz", name: "Simoniz", file: "simoniz.svg" },
  { id: "tecnoquimicas", name: "Tecnoquímicas", file: "tecnoquimicas.jpg" },
  { id: "tiendas-d1", name: "Tiendas D1", file: "Tiendas_D1_logo.svg.webp" },
  { id: "participante-12", name: "Participante", file: "unnamed.jpg" },
];

/** URL del logo respetando la ruta base de despliegue y codificando el archivo. */
export const participantLogoUrl = (file: string) =>
  `${import.meta.env.BASE_URL}participantes/${encodeURIComponent(file)}`;

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
