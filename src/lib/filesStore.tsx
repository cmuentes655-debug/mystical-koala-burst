import * as React from "react";
import {
  searchFiles,
  type AccessLevel,
  type FileKind,
  type SearchableFile,
} from "@/lib/committee";

/** Documento nuevo creado desde el modal de carga (id y fecha los pone el store). */
export type NewRecordInput = Omit<SearchableFile, "id" | "updatedAt">;

interface FilesContextValue {
  /** Documentos agregados por la persona usuaria en esta sesión. */
  records: SearchableFile[];
  addRecord: (input: NewRecordInput) => SearchableFile;
  recordsForPillar: (pillarId: string) => SearchableFile[];
  /** Catálogo base + lo agregado, filtrado por texto, tipo y nivel de acceso. */
  searchAll: (
    query: string,
    kinds?: FileKind[],
    access?: AccessLevel[],
  ) => SearchableFile[];
}

const FilesContext = React.createContext<FilesContextValue | null>(null);

/**
 * Estado EN MEMORIA de los documentos agregados por la persona usuaria (se
 * pierde al recargar; no hay backend todavía). Vive en un provider a nivel de
 * `App` para que lo cargado desde el detalle de un pilar aparezca también en el
 * buscador y viceversa.
 */
export function FilesProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = React.useState<SearchableFile[]>([]);

  const addRecord = React.useCallback((input: NewRecordInput) => {
    // TODO: aquí iría la carga real antes de dar de alta el registro:
    // - Documentos PÚBLICOS → subir el binario al contenedor de Azure Blob y
    //   guardar la URL devuelta (`url` / `previewUrl`).
    // - Documentos de MIEMBROS → no hay destino definido aún; solo se registra
    //   el metadato y el acceso se resuelve en MEMBER_AUTH_URL.
    const record: SearchableFile = {
      ...input,
      id: `user-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 7)}`,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setRecords((prev) => [record, ...prev]);
    return record;
  }, []);

  const recordsForPillar = React.useCallback(
    (pillarId: string) =>
      records.filter((record) => record.pillarId === pillarId),
    [records],
  );

  const searchAll = React.useCallback(
    (query: string, kinds: FileKind[] = [], access: AccessLevel[] = []) => {
      const term = query.trim().toLowerCase();
      const matchesFilters = (file: SearchableFile) =>
        (kinds.length === 0 || kinds.includes(file.kind)) &&
        (access.length === 0 || access.includes(file.accessLevel));
      const own = records.filter(
        (record) =>
          matchesFilters(record) &&
          (term === "" || record.name.toLowerCase().includes(term)),
      );
      // Lo agregado por la persona usuaria se antepone al catálogo base.
      return [...own, ...searchFiles(query, kinds, access)];
    },
    [records],
  );

  const value = React.useMemo<FilesContextValue>(
    () => ({ records, addRecord, recordsForPillar, searchAll }),
    [records, addRecord, recordsForPillar, searchAll],
  );

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
}

export function useFiles(): FilesContextValue {
  const context = React.useContext(FilesContext);
  if (!context) {
    throw new Error("useFiles debe usarse dentro de <FilesProvider>.");
  }
  return context;
}
