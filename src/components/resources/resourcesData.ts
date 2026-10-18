import type { Resource } from "./ResourceTypes";

/**
 * Datos de ejemplo del repositorio. Reemplazar este array por el resultado de
 * un `fetch` que devuelva el mismo shape (snake_case) basta para migrar a
 * Supabase sin tocar la UI.
 */
export const RESOURCES: Resource[] = [
  {
    id: "ia-planeacion-logistica",
    titulo: "Cómo la IA está redefiniendo la planeación logística",
    extracto:
      "Los modelos predictivos ya no solo anticipan la demanda: ajustan rutas, capacidad y nivel de inventario en cuestión de minutos. Repasamos los casos que están funcionando en la red de valor y qué hace falta para escalarlos.",
    tipo_recurso: "blog",
    tipo_archivo: null,
    origen: "archivo",
    portada_url: "https://picsum.photos/seed/ia-planeacion-logistica/900/560",
    portada_orientacion: "ancha",
    autor: "Camila Restrepo",
    fecha_publicacion: "2026-09-28",
    nivel_acceso: "publico",
  },
  {
    id: "marco-interoperabilidad-datos",
    titulo: "Marco de interoperabilidad de datos 2026",
    extracto:
      "Documento de referencia con los modelos, identificadores y reglas de calidad que las organizaciones de la red deben cumplir para intercambiar datos logísticos sin fricción.",
    tipo_recurso: "documento",
    tipo_archivo: "pdf",
    origen: "archivo",
    portada_url: "https://picsum.photos/seed/marco-interoperabilidad/700/980",
    portada_orientacion: "vertical",
    autor: "Andrés Beltrán",
    fecha_publicacion: "2026-09-12",
    nivel_acceso: "publico",
  },
  {
    id: "guia-ia-responsable",
    titulo: "Guía de IA responsable en operaciones logísticas",
    extracto:
      "Principios de equidad, explicabilidad y supervisión humana aplicados a casos reales de la cadena de suministro, con listas de verificación por etapa del proyecto.",
    tipo_recurso: "documento",
    tipo_archivo: "pdf",
    origen: "archivo",
    portada_url: "https://picsum.photos/seed/guia-ia-responsable/700/980",
    portada_orientacion: "vertical",
    autor: "Laura Cifuentes",
    fecha_publicacion: "2026-09-25",
    nivel_acceso: "miembros",
  },
  {
    id: "senales-agentes-ia",
    titulo: "Cinco señales de que tu operación está lista para agentes de IA",
    extracto:
      "Antes de automatizar decisiones conviene revisar la calidad del dato, la trazabilidad de los procesos y la capacidad del equipo para supervisar al agente. Estas son las señales que observamos en los pilotos.",
    tipo_recurso: "blog",
    tipo_archivo: null,
    origen: "archivo",
    portada_url: "https://picsum.photos/seed/agentes-ia-operacion/900/560",
    portada_orientacion: "ancha",
    autor: "Javier Montoya",
    fecha_publicacion: "2026-08-14",
    nivel_acceso: "publico",
  },
  {
    id: "matriz-riesgos-ia",
    titulo: "Matriz de riesgos de IA en la cadena de suministro",
    extracto:
      "Plantilla de trabajo para identificar, valorar y mitigar riesgos técnicos, operativos y reputacionales en cada caso de uso de IA de la red.",
    tipo_recurso: "documento",
    tipo_archivo: "excel",
    origen: "archivo",
    autor: "Laura Cifuentes",
    fecha_publicacion: "2026-08-30",
    nivel_acceso: "miembros",
  },
  {
    id: "informe-madurez-digital",
    titulo: "Informe global de madurez digital logística",
    extracto:
      "Estudio internacional sobre adopción de analítica avanzada, interoperabilidad y agentes de IA en operadores de la región. Publicado originalmente por el observatorio sectorial.",
    tipo_recurso: "documento",
    tipo_archivo: "enlace",
    origen: "enlace",
    url_externa: "https://www.logyca.org",
    portada_url: "https://picsum.photos/seed/madurez-digital-logistica/900/560",
    portada_orientacion: "ancha",
    autor: "Comité de IA",
    fecha_publicacion: "2026-07-22",
    nivel_acceso: "publico",
  },
  {
    id: "plantilla-acuerdo-datos",
    titulo: "Plantilla de acuerdo de uso de datos",
    extracto:
      "Modelo legal y técnico editable para habilitar el intercambio de datos entre dos organizaciones de la red, con anexos de seguridad y trazabilidad.",
    tipo_recurso: "documento",
    tipo_archivo: "word",
    origen: "archivo",
    autor: "Andrés Beltrán",
    fecha_publicacion: "2026-07-30",
    nivel_acceso: "publico",
  },
  {
    id: "datos-compartidos-activo",
    titulo: "Datos compartidos: el nuevo activo de la red de valor",
    extracto:
      "Compartir datos no es regalarlos. Analizamos cómo los acuerdos de uso, la homologación de catálogos y la confianza operativa convierten el dato en un activo que crece con cada participante.",
    tipo_recurso: "blog",
    tipo_archivo: null,
    origen: "archivo",
    portada_url: "https://picsum.photos/seed/datos-compartidos-red/900/560",
    portada_orientacion: "ancha",
    autor: "Camila Restrepo",
    fecha_publicacion: "2026-06-18",
    nivel_acceso: "publico",
  },
  {
    id: "pilotos-conectados-2026",
    titulo: "Presentación: pilotos conectados 2026",
    extracto:
      "Resultados consolidados de los doce pilotos activos del comité: alcance, ahorros estimados, aprendizajes y próximos pasos para escalar a producción.",
    tipo_recurso: "documento",
    tipo_archivo: "powerpoint",
    origen: "archivo",
    portada_url: "https://picsum.photos/seed/pilotos-conectados/900/560",
    portada_orientacion: "ancha",
    autor: "Equipo LOGYCA",
    fecha_publicacion: "2026-09-02",
    nivel_acceso: "publico",
  },
  {
    id: "catalogo-apis-interoperables",
    titulo: "Catálogo de APIs interoperables",
    extracto:
      "Contratos de servicio documentados y versionados que permiten a los participantes integrarse sin desarrollos a medida. Incluye convenciones de autenticación y errores.",
    tipo_recurso: "documento",
    tipo_archivo: "pdf",
    origen: "archivo",
    portada_url: "https://picsum.photos/seed/catalogo-apis/700/980",
    portada_orientacion: "vertical",
    autor: "Equipo LOGYCA",
    fecha_publicacion: "2025-11-14",
    nivel_acceso: "miembros",
  },
  {
    id: "gobernanza-sin-frenar",
    titulo: "Gobernanza de IA sin frenar la innovación",
    extracto:
      "Un marco de gobernanza mal calibrado paraliza equipos; uno inexistente expone a la organización. Proponemos un enfoque proporcional al riesgo de cada caso de uso.",
    tipo_recurso: "blog",
    tipo_archivo: null,
    origen: "archivo",
    portada_url: "https://picsum.photos/seed/gobernanza-ia-innovacion/900/560",
    portada_orientacion: "ancha",
    autor: "Laura Cifuentes",
    fecha_publicacion: "2025-10-08",
    nivel_acceso: "publico",
  },
  {
    id: "indicadores-comite-q3",
    titulo: "Indicadores del comité · Q3 2026",
    extracto:
      "Tablero con las métricas compartidas de la red: organizaciones vinculadas, pilotos en operación, guías publicadas y avance por pilar.",
    tipo_recurso: "documento",
    tipo_archivo: "excel",
    origen: "archivo",
    autor: "Comité de IA",
    fecha_publicacion: "2026-09-28",
    nivel_acceso: "publico",
  },
  {
    id: "kit-adopcion-cambio",
    titulo: "Kit de adopción y gestión del cambio",
    extracto:
      "Guías, plantillas y guiones de conversación para acompañar a los equipos durante la adopción de nuevas herramientas de IA en la operación diaria.",
    tipo_recurso: "documento",
    tipo_archivo: "otro",
    origen: "archivo",
    autor: "Javier Montoya",
    fecha_publicacion: "2025-12-05",
    nivel_acceso: "publico",
  },
  {
    id: "hbr-ia-cadena-suministro",
    titulo: "Harvard Business Review: IA en la cadena de suministro",
    extracto:
      "Selección de artículos sobre automatización de decisiones, resiliencia y nuevos modelos operativos publicados por la revista en su edición regional.",
    tipo_recurso: "documento",
    tipo_archivo: "enlace",
    origen: "enlace",
    url_externa: "https://hbr.org",
    portada_url: "https://picsum.photos/seed/hbr-cadena-suministro/900/560",
    portada_orientacion: "ancha",
    autor: "Comité de IA",
    fecha_publicacion: "2026-05-19",
    nivel_acceso: "publico",
  },
];

/** Lista de autores derivada del catálogo, ordenada alfabéticamente en `es`. */
export const RESOURCE_AUTHORS: string[] = Array.from(
  new Set(RESOURCES.map((resource) => resource.autor)),
).sort((a, b) => a.localeCompare(b, "es"));

/** Búsqueda por id (usada por la página de detalle). */
export const getResourceById = (id: string) =>
  RESOURCES.find((resource) => resource.id === id);
