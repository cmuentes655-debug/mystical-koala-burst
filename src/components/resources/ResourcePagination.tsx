import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_CLASS =
  "inline-flex items-center gap-1.5 rounded-full border border-resource-border bg-resource-page px-3 py-1.5 text-[12.5px] font-semibold text-resource-text transition-colors duration-200 hover:border-resource-focus hover:text-resource-tag focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-resource-border disabled:hover:text-resource-text";

type PageItem = number | "ellipsis";

/** Números visibles con elipsis cuando hay muchas páginas. */
function pageItems(page: number, pageCount: number): PageItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  const items: PageItem[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(pageCount - 1, page + 1);

  if (start > 2) items.push("ellipsis");
  for (let number = start; number <= end; number += 1) items.push(number);
  if (end < pageCount - 1) items.push("ellipsis");
  items.push(pageCount);
  return items;
}

interface ResourcePaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

/** Paginación numerada con anterior/siguiente deshabilitados en los extremos. */
export function ResourcePagination({
  page,
  pageCount,
  onPageChange,
}: ResourcePaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Paginación de recursos" className="flex items-center justify-center">
      <ul className="flex flex-wrap items-center justify-center gap-1.5">
        <li>
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className={NAV_CLASS}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
        </li>

        {pageItems(page, pageCount).map((item, index) =>
          item === "ellipsis" ? (
            <li
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="px-1 font-mono text-xs text-resource-muted"
            >
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={item === page ? "page" : undefined}
                aria-label={`Página ${item}`}
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full border font-mono text-[12.5px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resource-focus focus-visible:ring-offset-2",
                  item === page
                    ? "border-resource-tag bg-resource-tag text-resource-tag-fg"
                    : "border-resource-border bg-resource-page text-resource-text hover:border-resource-focus hover:text-resource-tag",
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount}
            className={NAV_CLASS}
            aria-label="Página siguiente"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
