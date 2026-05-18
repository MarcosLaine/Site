import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface ImageWithSkeletonProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  loading?: 'lazy' | 'eager'
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
  wrapperClassName,
  loading = 'lazy',
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      {!loaded && !error && <Skeleton className="absolute inset-0 rounded-[inherit]" />}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200/80 dark:bg-slate-800 text-xs text-slate-500">
          -
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(className, 'transition-opacity duration-300', !loaded && !error && 'opacity-0')}
      />
    </div>
  )
}
