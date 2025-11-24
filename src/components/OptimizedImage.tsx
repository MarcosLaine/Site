import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  onLoad?: () => void
  initial?: any
  animate?: any
  transition?: any
}

/**
 * Componente de imagem otimizado que:
 * - Carrega apenas quando visível (Intersection Observer)
 * - Suporta lazy loading nativo
 * - Adiciona placeholder durante carregamento
 */
export const OptimizedImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  priority = false,
  onLoad,
  initial,
  animate,
  transition,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(priority || loading === 'eager')
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Se já deve carregar (priority ou eager), não precisa do observer
    if (shouldLoad) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Começa a carregar 50px antes de entrar na viewport
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [shouldLoad])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
  }

  const imageProps = {
    ref: imgRef,
    src: shouldLoad ? src : undefined,
    alt,
    className: `${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    loading: shouldLoad ? loading : 'lazy',
    decoding: 'async' as const,
    onLoad: handleLoad,
    onError: handleError,
  }

  // Se houver props de animação do framer-motion, usar motion.img
  if (initial || animate || transition) {
    return (
      <div className="relative">
        {!isLoaded && !error && shouldLoad && (
          <div className={`${className} bg-slate-200 dark:bg-slate-700 animate-pulse absolute inset-0`} />
        )}
        {error && (
          <div className={`${className} bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 text-xs`}>
            Erro ao carregar
          </div>
        )}
        {shouldLoad && (
          <motion.img
            {...imageProps}
            initial={initial}
            animate={animate}
            transition={transition}
            style={{ ...(isLoaded ? {} : { opacity: 0 }) }}
          />
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      {!isLoaded && !error && shouldLoad && (
        <div className={`${className} bg-slate-200 dark:bg-slate-700 animate-pulse absolute inset-0`} />
      )}
      {error && (
        <div className={`${className} bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 text-xs`}>
          Erro ao carregar
        </div>
      )}
      {shouldLoad && <img {...imageProps} />}
    </div>
  )
}

