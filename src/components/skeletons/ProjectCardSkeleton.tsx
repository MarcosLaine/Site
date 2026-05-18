import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface ProjectCardSkeletonProps {
  className?: string
}

export function ProjectCardSkeleton({ className }: ProjectCardSkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden border-2 border-slate-200/60 dark:border-slate-700/60',
        'bg-white dark:bg-slate-800 h-[10.5rem] sm:h-[11.5rem] md:h-[12.5rem] flex flex-col',
        className
      )}
      aria-hidden
    >
      <Skeleton className="flex-[1.35] min-h-[6.5rem] sm:min-h-[7rem] rounded-none" />
      <div className="shrink-0 px-3 py-2.5 space-y-2 border-t border-slate-200/60 dark:border-slate-700/60">
        <Skeleton className="h-3.5 sm:h-4 w-3/4" />
        <Skeleton className="h-2.5 sm:h-3 w-full" />
        <Skeleton className="h-2.5 sm:h-3 w-5/6" />
      </div>
    </div>
  )
}

export function ProjectsGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 pb-2">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  )
}
