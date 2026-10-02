import { Skeleton } from "./ui/skeleton";

export function AppHeaderSkeleton() {
  return (
    <div className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="h-9 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function WorkspaceSkeleton() {
  return (
    <div
      className="min-h-screen bg-background"
      role="status"
      aria-label="Loading your workspace"
    >
      <AppHeaderSkeleton />
      <div className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-14 sm:px-6">
          <Skeleton className="h-7 w-56 rounded-full" />
          <Skeleton className="h-11 max-w-2xl" />
          <Skeleton className="h-6 max-w-xl" />
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <Skeleton className="h-96 rounded-xl" />
        <div className="grid gap-6">
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
        </div>
      </div>
      <span className="sr-only">Loading your workspace...</span>
    </div>
  );
}

export function ReportSkeleton() {
  return (
    <div
      className="min-h-screen bg-background"
      role="status"
      aria-label="Loading interview report"
    >
      <AppHeaderSkeleton />
      <div className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-10 sm:px-6">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-5 max-w-md" />
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div>
          <Skeleton className="mb-7 h-14 rounded-xl" />
          <div className="mb-6 flex justify-between">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-44 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
        </div>
      </div>
      <span className="sr-only">Loading your interview report...</span>
    </div>
  );
}
