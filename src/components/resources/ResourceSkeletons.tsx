interface ResourceSkeletonsProps {
  count?: number;
}

/** Esqueleto de card: portada + líneas de título, fecha y extracto. */
export function ResourceCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-resource-border bg-resource-page"
    >
      <div className="aspect-[16/10] w-full animate-pulse bg-resource-surface2" />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="h-3.5 w-4/5 animate-pulse rounded-full bg-resource-surface2" />
        <div className="h-3.5 w-3/5 animate-pulse rounded-full bg-resource-surface2" />
        <div className="mt-1 h-2.5 w-24 animate-pulse rounded-full bg-resource-surface2" />
        <div className="mt-1 flex flex-col gap-2">
          <div className="h-2.5 w-full animate-pulse rounded-full bg-resource-surface2" />
          <div className="h-2.5 w-11/12 animate-pulse rounded-full bg-resource-surface2" />
          <div className="h-2.5 w-2/3 animate-pulse rounded-full bg-resource-surface2" />
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-resource-border pt-3">
          <div className="h-2.5 w-24 animate-pulse rounded-full bg-resource-surface2" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-resource-surface2" />
        </div>
        <div className="h-9 w-full animate-pulse rounded-full bg-resource-surface2" />
      </div>
    </div>
  );
}

export function ResourceSkeletons({ count = 9 }: ResourceSkeletonsProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ResourceCardSkeleton key={index} />
      ))}
    </>
  );
}
