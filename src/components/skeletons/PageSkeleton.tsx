import { Skeleton } from '@/components/ui/skeleton'
import { ProjectsGridSkeleton } from './ProjectCardSkeleton'

export default function PageSkeleton() {
  return (
    <div className="min-h-screen relative z-10" aria-busy aria-label="Carregando">
      <header className="fixed top-0 left-0 right-0 z-50 glass shadow-lg">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Skeleton className="h-8 w-40" />
          <div className="hidden md:flex gap-4">
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-14" />
            <Skeleton className="h-9 w-18" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-12" />
            <Skeleton className="h-9 w-10" />
          </div>
        </div>
      </header>

      <section className="min-h-screen flex items-center pt-24 px-4">
        <div className="container mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-4 order-2 md:order-1">
            <Skeleton className="h-12 w-full max-w-md" />
            <Skeleton className="h-12 w-3/4 max-w-sm" />
            <Skeleton className="h-6 w-full max-w-lg" />
            <Skeleton className="h-5 w-full max-w-xl" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-36 rounded-xl" />
              <Skeleton className="h-12 w-36 rounded-xl" />
            </div>
          </div>
          <div className="flex justify-center order-1 md:order-2">
            <Skeleton className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl" />
          </div>
        </div>
      </section>

      <section className="px-4 py-8 max-w-6xl mx-auto">
        <Skeleton className="h-10 w-48 mx-auto mb-4" />
        <Skeleton className="h-5 w-full max-w-2xl mx-auto mb-8" />
        <div className="rounded-[30px] border-4 border-slate-700/40 p-4 bg-slate-900/50 max-w-6xl mx-auto h-[40rem] md:h-[48rem]">
          <ProjectsGridSkeleton count={9} />
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <Skeleton className="h-10 w-40 mx-auto mb-10" />
        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-32 w-40 mx-auto rounded-2xl" />
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <Skeleton className="h-10 w-56 mx-auto mb-10" />
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-8 w-40 mx-auto mb-8" />
        <div className="flex flex-wrap justify-center gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={`k-${i}`} className="h-9 w-28 rounded-full" />
          ))}
        </div>
      </section>
    </div>
  )
}


