import {
  Blocks,
  Database,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileType2,
  Globe,
  HeartHandshake,
  Lock,
  ShieldCheck,
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
  { id: "fechas", label: "Calendario" },
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
  /**
   * Si el registro está abierto (`true`) se muestra el botón de inscripción;
   * en los encuentros ya realizados (`false` o ausente) se marca como finalizado.
   */
  registrationOpen?: boolean;
}

export const EVENTS: CommitteeEvent[] = [
  {
    id: "comite-oct",
    title: "Sesión plenaria del comité",
    description:
      "Próxima fecha del comité: revisión de avances de los pilotos y validación de la hoja de ruta.",
    date: "2026-10-27",
    time: "9:00 a. m.",
    place: "Cámara de Comercio, Bogotá",
    modality: "Presencial",
    registrationOpen: true,
  },
  {
    id: "demo-sep",
    title: "Demo day de pilotos",
    description:
      "Los equipos presentaron los resultados de los pilotos de IA en operación real.",
    date: "2026-09-18",
    time: "8:30 a. m.",
    place: "Auditorio central + transmisión en vivo",
    modality: "Híbrido",
  },
  {
    id: "taller-ago",
    title: "Taller: protocolos de IA responsable",
    description:
      "Construcción colaborativa de guías prácticas para la adopción segura en operaciones.",
    date: "2026-08-06",
    time: "2:30 p. m.",
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
  /**
   * Ajuste vertical fino en px (positivo = hacia arriba) para logos cuyo
   * contenido viene descentrado dentro de su propio archivo.
   */
  nudgeY?: number;
  /**
   * Escala del logo dentro de la tarjeta (p. ej. 0.8 = 80 %). Sirve para
   * reducir los archivos cuya imagen es muy grande y apenas deja aire.
   */
  scale?: number;
}

/** Desplazamiento por defecto para los logos descentrados en su lienzo. */
const NUDGE_Y = 6;
/** Escala por defecto para los logos cuyos archivos vienen muy grandes. */
const SHRINK = 0.8;

/**
 * Muro de logos reales de las organizaciones participantes.
 * Los archivos con nombre poco descriptivo usan un nombre legible derivado
 * solo para `alt`/`aria-label` (no se muestran en pantalla).
 */
export const PARTICIPANT_LOGOS: ParticipantLogo[] = [
  { id: "agv", name: "AGV", file: "agv.jpg" },
  { id: "ai-jump", name: "AI Jump", file: "jump cube.webp" },
  { id: "alianza-tea", name: "Alianza Tea", file: "alizanza tea.png" },
  { id: "ccl", name: "CCL", file: "ccl.png", nudgeY: NUDGE_Y },
  { id: "controlt", name: "ControlT", file: "controlt.png", nudgeY: 17, scale: SHRINK },
  { id: "corona", name: "Corona", file: "corona.jpg", nudgeY: 0 },
  { id: "datecsa", name: "Datecsa", file: "datecsa.webp" },
  { id: "datup", name: "Datup", file: "datup_logo.jpg", nudgeY: 17, scale: SHRINK },
  { id: "enalia", name: "Enalia", file: "enalia.png" },
  { id: "falabella", name: "Falabella", file: "Falabella.svg.webp" },
  { id: "grupo-bimbo", name: "Grupo Bimbo", file: "bimbo.webp" },
  { id: "harinera-pardo", name: "Harinera Pardo", file: "harinera-pardo.png", nudgeY: NUDGE_Y },
  { id: "heinsohn", name: "Heinsohn", file: "heinsohn.png" },
  { id: "henkel", name: "Henkel", file: "henkel.png", nudgeY: NUDGE_Y },
  { id: "iw", name: "IW", file: "iw.png" },
  { id: "kenvue", name: "Kenvue", file: "kenvue.png", nudgeY: 3 },
  { id: "makro", name: "Makro", file: "makro.png" },
  { id: "nestle", name: "Nestlé", file: "Nestle.jpg", nudgeY: NUDGE_Y },
  { id: "pcs", name: "PCS", file: "pcs.jpg", nudgeY: 14, scale: SHRINK },
  { id: "simoniz", name: "Simoniz", file: "simoniz.svg", nudgeY: 17, scale: SHRINK },
  { id: "tecnoquimicas", name: "Tecnoquímicas", file: "tecnoquimicas.jpg" },
  { id: "tiendas-d1", name: "Tiendas D1", file: "D1.webp", nudgeY: 18, scale: SHRINK },
  { id: "universidad-rosario", name: "Universidad del Rosario", file: "universidad_rosario.png", nudgeY: 10, scale: SHRINK },
];

/** URL del logo respetando la ruta base de despliegue y codificando el archivo. */
export const participantLogoUrl = (file: string) =>
  `${import.meta.env.BASE_URL}participantes/${encodeURIComponent(file)}`;

export type FileKind = "pdf" | "sheet" | "doc" | "image";

/**
 * Nivel de acceso de un documento:
 * - `publico`: abierto a cualquiera (vista previa y descarga).
 * - `miembros`: requiere autenticarse en el portal externo de miembros.
 */
export type AccessLevel = "publico" | "miembros";

/**
 * Portal externo donde se autentican los miembros del comité. Todo documento
 * con acceso `miembros` redirige aquí en lugar de abrirse o descargarse.
 *
 * TODO: cuando el portal soporte el regreso, enviar de vuelta al documento
 * solicitado tras el login (p. ej. un parámetro `?redirect=` respetado por
 * `miembros.logyca.org`).
 */
export const MEMBER_AUTH_URL = "https://miembros.logyca.org/user/login";

/** Etiqueta legible e ícono de cada nivel de acceso: fuente única de verdad. */
export const ACCESS_LEVEL_META: Record<
  AccessLevel,
  { label: string; icon: LucideIcon }
> = {
  publico: { label: "Público", icon: Globe },
  miembros: { label: "Miembros", icon: Lock },
};

/** Orden de exhibición de los filtros de acceso. */
export const ACCESS_LEVEL_ORDER: AccessLevel[] = ["publico", "miembros"];

export interface SampleFile {
  id: string;
  name: string;
  size: string;
  kind: FileKind;
  /** Pilar al que pertenece (`datos | ecosistema | cultura | gobernanza`). */
  pillarId: string;
  /** Quién puede verlo: abierto al público o solo miembros autenticados. */
  accessLevel: AccessLevel;
  /** Cómo se incorporó el documento: archivo subido o enlace a una URL. */
  source?: "archivo" | "enlace";
  /**
   * URL del documento. En los públicos apuntará al contenedor de Azure Blob;
   * en los de miembros queda pendiente de definir el almacenamiento.
   */
  url?: string;
}

/** Etiqueta legible e ícono de cada tipo de archivo: fuente única de verdad. */
export const FILE_KIND_META: Record<
  FileKind,
  { label: string; icon: LucideIcon }
> = {
  pdf: { label: "PDF", icon: FileText },
  sheet: { label: "Excel", icon: FileSpreadsheet },
  doc: { label: "Word", icon: FileType2 },
  image: { label: "Imagen", icon: FileImage },
};

/** Deduce el tipo de documento a partir de su nombre o de una URL. */
export function inferFileKind(fileName: string): FileKind {
  const extension = fileName.split(/[?#]/)[0].split(".").pop()?.toLowerCase() ?? "";
  if (["xlsx", "xls", "csv"].includes(extension)) return "sheet";
  if (["docx", "doc", "txt", "rtf"].includes(extension)) return "doc";
  if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(extension)) {
    return "image";
  }
  return "pdf";
}

export interface SearchableFile extends SampleFile {
  /** URL real de vista previa (Azure Blob); ausente en los datos de ejemplo. */
  previewUrl?: string;
  /** Fecha ISO (YYYY-MM-DD) de la última actualización. */
  updatedAt?: string;
}

/**
 * Catálogo único de documentos de la red: de él se derivan tanto los recursos
 * de cada pilar (`getPillarResources`) como los resultados del buscador
 * (`searchFiles`), para que ambas vistas nunca se desalineen.
 *
 * TODO: reemplazar por el inventario real —los públicos desde el contenedor de
 * Azure Blob y los de miembros desde el origen que aún está por definir—.
 */
export const DOCUMENT_CATALOG: SearchableFile[] = [
  // Pilar 01 · Datos
  {
    id: "dr1",
    name: "Marco_Interoperabilidad_Datos.pdf",
    size: "1.8 MB",
    kind: "pdf",
    pillarId: "datos",
    accessLevel: "publico",
    source: "archivo",
    updatedAt: "2026-09-12",
  },
  {
    id: "dr2",
    name: "Catalogo_APIs_Compartidas.xlsx",
    size: "512 KB",
    kind: "sheet",
    pillarId: "datos",
    accessLevel: "miembros",
    source: "archivo",
    updatedAt: "2026-08-21",
  },
  {
    id: "dr3",
    name: "Plantilla_Acuerdo_Uso_Datos.docx",
    size: "420 KB",
    kind: "doc",
    pillarId: "datos",
    accessLevel: "publico",
    source: "archivo",
    updatedAt: "2026-07-30",
  },
  {
    id: "f1",
    name: "Practicas_IA_Logistica_2025.pdf",
    size: "2.4 MB",
    kind: "pdf",
    pillarId: "datos",
    accessLevel: "publico",
    source: "archivo",
    updatedAt: "2026-09-02",
  },
  {
    id: "f2",
    name: "Indicadores_Comite_Q3.xlsx",
    size: "684 KB",
    kind: "sheet",
    pillarId: "datos",
    accessLevel: "miembros",
    source: "archivo",
    updatedAt: "2026-09-28",
  },

  // Pilar 02 · Ecosistema
  {
    id: "er1",
    name: "Arquitectura_Ecosistema_Referencia.pdf",
    size: "2.2 MB",
    kind: "pdf",
    pillarId: "ecosistema",
    accessLevel: "publico",
    source: "archivo",
    updatedAt: "2026-08-14",
  },
  {
    id: "er2",
    name: "Directorio_Soluciones_Q3.xlsx",
    size: "768 KB",
    kind: "sheet",
    pillarId: "ecosistema",
    accessLevel: "miembros",
    source: "archivo",
    updatedAt: "2026-09-09",
  },
  {
    id: "er3",
    name: "Diagrama_Integracion_Agentes.png",
    size: "1.4 MB",
    kind: "image",
    pillarId: "ecosistema",
    accessLevel: "publico",
    source: "archivo",
    updatedAt: "2026-06-27",
  },
  {
    id: "f3",
    name: "Protocolo_Pilotos_v3.docx",
    size: "1.1 MB",
    kind: "doc",
    pillarId: "ecosistema",
    accessLevel: "miembros",
    source: "archivo",
    updatedAt: "2026-08-05",
  },
  {
    id: "s8",
    name: "Diagrama_Ecosistema_IA.jpg",
    size: "2.1 MB",
    kind: "image",
    pillarId: "ecosistema",
    accessLevel: "publico",
    source: "enlace",
    updatedAt: "2026-07-22",
  },

  // Pilar 03 · Cultura
  {
    id: "cr1",
    name: "Ruta_Formacion_IA_Logistica.pdf",
    size: "1.5 MB",
    kind: "pdf",
    pillarId: "cultura",
    accessLevel: "publico",
    source: "archivo",
    updatedAt: "2026-09-16",
  },
  {
    id: "cr2",
    name: "Kit_Adopcion_Gestion_Cambio.docx",
    size: "980 KB",
    kind: "doc",
    pillarId: "cultura",
    accessLevel: "publico",
    source: "archivo",
    updatedAt: "2026-08-26",
  },
  {
    id: "cr3",
    name: "Calendario_Comunidad.xlsx",
    size: "256 KB",
    kind: "sheet",
    pillarId: "cultura",
    accessLevel: "miembros",
    source: "archivo",
    updatedAt: "2026-09-20",
  },
  {
    id: "f4",
    name: "Mapa_Redes_Valor.png",
    size: "3.8 MB",
    kind: "image",
    pillarId: "cultura",
    accessLevel: "publico",
    source: "archivo",
    updatedAt: "2026-05-19",
  },

  // Pilar 04 · Gobernanza
  {
    id: "gr1",
    name: "Marco_Gobernanza_IA.pdf",
    size: "2.0 MB",
    kind: "pdf",
    pillarId: "gobernanza",
    accessLevel: "publico",
    source: "archivo",
    updatedAt: "2026-09-11",
  },
  {
    id: "gr2",
    name: "Matriz_Riesgos_IA.xlsx",
    size: "640 KB",
    kind: "sheet",
    pillarId: "gobernanza",
    accessLevel: "miembros",
    source: "archivo",
    updatedAt: "2026-08-30",
  },
  {
    id: "gr3",
    name: "Guia_IA_Responsable_v2.pdf",
    size: "1.7 MB",
    kind: "pdf",
    pillarId: "gobernanza",
    accessLevel: "miembros",
    source: "archivo",
    updatedAt: "2026-09-25",
  },
  {
    id: "s5",
    name: "Guia_Logistica_Colaborativa.pdf",
    size: "1.6 MB",
    kind: "pdf",
    pillarId: "gobernanza",
    accessLevel: "publico",
    source: "enlace",
    updatedAt: "2026-09-18",
  },
  {
    id: "s7",
    name: "Acta_Plenaria_Septiembre.docx",
    size: "320 KB",
    kind: "doc",
    pillarId: "gobernanza",
    accessLevel: "miembros",
    source: "archivo",
    updatedAt: "2026-09-05",
  },
];

/** Documento del catálogo asignado a un pilar (mismo modelo que el buscador). */
export type PillarResource = SearchableFile;

/** Normaliza para comparar sin distinguir mayúsculas ni acentos. */
const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/**
 * Busca en el catálogo por nombre (parcial, sin acentos ni mayúsculas), tipo y
 * nivel de acceso. Pura: único punto a cambiar cuando la fuente de datos pase a
 * ser Azure Blob (misma firma, sin tocar la UI).
 */
export function searchFiles(
  query: string,
  kinds: FileKind[] = [],
  access: AccessLevel[] = [],
): SearchableFile[] {
  const term = normalizeText(query.trim());
  return DOCUMENT_CATALOG.filter((file) => {
    const matchesName = term === "" || normalizeText(file.name).includes(term);
    const matchesKind = kinds.length === 0 || kinds.includes(file.kind);
    const matchesAccess =
      access.length === 0 || access.includes(file.accessLevel);
    return matchesName && matchesKind && matchesAccess;
  });
}

/** Recursos descargables de un pilar, derivados del catálogo único. */
export function getPillarResources(pillarId: string): PillarResource[] {
  return DOCUMENT_CATALOG.filter((file) => file.pillarId === pillarId);
}

export interface PillarInitiative {
  id: string;
  title: string;
  description: string;
}

export interface PillarDetail {
  id: string;
  title: string;
  /** Frase corta sobre el título (p. ej. "Pilar 01 · Confianza en los datos"). */
  eyebrow: string;
  icon: LucideIcon;
  /** Descripción ampliada que encabeza la página de detalle. */
  summary: string;
  objectives: string[];
  initiatives: PillarInitiative[];
}

/**
 * Título e ícono base de un pilar: se toman de `FUNCTIONS` y de
 * `GOVERNANCE_PILLAR` para que la lista y el detalle nunca se desalineen.
 * Gobernanza recibe aquí su ícono, ya que en la lista no lo tiene.
 */
function pillarBase(id: string): { title: string; icon: LucideIcon } {
  const fn = FUNCTIONS.find((item) => item.id === id);
  if (fn) return { title: fn.title, icon: fn.icon };
  return { title: GOVERNANCE_PILLAR.title, icon: ShieldCheck };
}

/** Contenido ampliado de cada pilar; datos de ejemplo listos para reemplazar. */
export const PILLAR_DETAILS: Record<string, PillarDetail> = {
  datos: {
    id: "datos",
    ...pillarBase("datos"),
    eyebrow: "Pilar 01 · Confianza en los datos",
    summary:
      "Definimos estándares, modelos y acuerdos para que las organizaciones de la red intercambien datos logísticos de forma confiable, interoperable y segura. El pilar articula catálogos comunes, identificadores compartidos y reglas claras de gobierno del dato que reducen la fricción entre empresas y habilitan nuevos servicios.",
    objectives: [
      "Establecer un marco común de intercambio de datos entre los participantes.",
      "Homologar identificadores, catálogos y estándares de calidad del dato.",
      "Garantizar trazabilidad, privacidad y seguridad en cada intercambio.",
      "Reducir el costo y el tiempo de integración entre organizaciones.",
    ],
    initiatives: [
      {
        id: "d1",
        title: "Modelo de datos de referencia",
        description:
          "Definición de entidades, atributos y relaciones mínimas para operar en la red.",
      },
      {
        id: "d2",
        title: "Catálogo de APIs interoperables",
        description:
          "Contratos de servicio documentados y versionados para los participantes.",
      },
      {
        id: "d3",
        title: "Tablero de calidad del dato",
        description:
          "Métricas compartidas de completitud, oportunidad y consistencia por fuente.",
      },
      {
        id: "d4",
        title: "Acuerdos de uso de datos",
        description:
          "Plantillas legales y técnicas que habilitan el intercambio con confianza.",
      },
    ],
  },
  ecosistema: {
    id: "ecosistema",
    ...pillarBase("ecosistema"),
    eyebrow: "Pilar 02 · Plataformas compartidas",
    summary:
      "Promovemos un ecosistema de herramientas, plataformas y agentes de IA que se integran entre empresas, con LOGYCA como orquestador neutral. Buscamos que los participantes accedan a capacidades tecnológicas compartidas sin replicar infraestructura y sin quedar atados a un solo proveedor.",
    objectives: [
      "Construir capacidades tecnológicas compartidas y reutilizables.",
      "Facilitar la integración de agentes de IA en procesos logísticos reales.",
      "Evitar la dependencia tecnológica mediante estándares abiertos.",
      "Acelerar la adopción con pilotos conectados entre empresas.",
    ],
    initiatives: [
      {
        id: "e1",
        title: "Sandbox de pilotos conectados",
        description:
          "Entorno controlado para probar integraciones entre participantes antes de producción.",
      },
      {
        id: "e2",
        title: "Directorio de soluciones",
        description:
          "Catálogo de herramientas y proveedores validados que cumplen los estándares del comité.",
      },
      {
        id: "e3",
        title: "Protocolo de agentes de IA",
        description:
          "Convenciones para que los agentes interoperen de forma segura entre plataformas.",
      },
      {
        id: "e4",
        title: "Comunidad de práctica técnica",
        description:
          "Espacios periódicos donde los equipos comparten arquitecturas y aprendizajes.",
      },
    ],
  },
  cultura: {
    id: "cultura",
    ...pillarBase("cultura"),
    eyebrow: "Pilar 03 · Capacidades y adopción",
    summary:
      "Desarrollamos las capacidades y la cultura de colaboración necesarias para una adopción sostenible. Formación, mentoría y comunidades de práctica ayudan a que las personas usen la IA con criterio y a que los cambios se sostengan en el tiempo.",
    objectives: [
      "Formar equipos capaces de adoptar IA con criterio y seguridad.",
      "Instalar la colaboración como práctica cotidiana entre organizaciones.",
      "Compartir aprendizajes y casos de uso entre los participantes.",
      "Sostener la adopción más allá de los pilotos iniciales.",
    ],
    initiatives: [
      {
        id: "c1",
        title: "Ruta de formación",
        description:
          "Programa modular de cursos y talleres sobre IA aplicada a la logística.",
      },
      {
        id: "c2",
        title: "Programa de mentoría",
        description:
          "Acompañamiento de organizaciones con más experiencia hacia las que inician.",
      },
      {
        id: "c3",
        title: "Comunidad de práctica",
        description:
          "Encuentros periódicos para compartir retos, soluciones y aprendizajes.",
      },
      {
        id: "c4",
        title: "Kit de adopción",
        description:
          "Guías y plantillas para gestionar el cambio en las organizaciones participantes.",
      },
    ],
  },
  gobernanza: {
    id: "gobernanza",
    ...pillarBase("gobernanza"),
    eyebrow: "Pilar 04 · IA responsable",
    summary:
      "Aseguramos que la adopción de IA en la red se sostenga sobre principios de gobernanza, gestión del riesgo y ética. Definimos marcos de decisión, controles y guías de IA responsable que protegen a las organizaciones, a las personas y a los datos que comparten.",
    objectives: [
      "Definir un marco de gobernanza común para toda la red de valor.",
      "Gestionar riesgos técnicos, operativos y reputacionales de la IA.",
      "Aplicar principios de IA responsable, equidad y transparencia.",
      "Alinear las prácticas con la regulación y los estándares vigentes.",
    ],
    initiatives: [
      {
        id: "g1",
        title: "Marco de gobernanza de IA",
        description:
          "Roles, responsabilidades y criterios de decisión compartidos entre participantes.",
      },
      {
        id: "g2",
        title: "Gestión de riesgos de IA",
        description:
          "Metodología para identificar, evaluar y mitigar riesgos en cada caso de uso.",
      },
      {
        id: "g3",
        title: "Guías de IA responsable",
        description:
          "Recomendaciones prácticas de equidad, explicabilidad y supervisión humana.",
      },
      {
        id: "g4",
        title: "Comité de ética",
        description:
          "Instancia de revisión para casos de alto impacto o de alta sensibilidad.",
      },
    ],
  },
};

/** Orden de exhibición de los pilares (para breadcrumb y chips). */
export const PILLAR_ORDER: string[] = ["datos", "ecosistema", "cultura", "gobernanza"];

/** Nombre corto del pilar, para etiquetas compactas (chips y metadatos). */
export const PILLAR_SHORT_LABELS: Record<string, string> = {
  datos: "Datos",
  ecosistema: "Ecosistema",
  cultura: "Cultura",
  gobernanza: "Gobernanza",
};

export const pillarShortLabel = (pillarId: string) =>
  PILLAR_SHORT_LABELS[pillarId] ?? pillarId;

/** Lista ligera (id + título) para navegación entre pilares. */
export const PILLAR_LINKS: { id: string; title: string }[] = PILLAR_ORDER.map((id) => ({
  id,
  title: PILLAR_DETAILS[id].title,
}));

export function getPillarDetail(id: string): PillarDetail | undefined {
  return PILLAR_DETAILS[id];
}
