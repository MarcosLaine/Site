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
  // Se priority ou eager, sempre carregar imediatamente
  const shouldLoadImmediately = priority || loading === 'eager'
  const [shouldLoad, setShouldLoad] = useState(shouldLoadImmediately)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Se já deve carregar imediatamente (priority ou eager), sempre carregar
    if (shouldLoadImmediately) {
      setShouldLoad(true)
      return
    }

    // Para lazy loading, usar Intersection Observer apenas se ainda não carregou
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
        rootMargin: '100px', // Começa a carregar 100px antes de entrar na viewport
      }
    )

    // Usar um timeout pequeno para garantir que o elemento está no DOM
    const timeoutId = setTimeout(() => {
      if (imgRef.current) {
        observer.observe(imgRef.current)
      }
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [shouldLoad, shouldLoadImmediately])

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
  // Para animações, sempre renderizar o elemento para que o Intersection Observer funcione
  if (initial || animate || transition) {
    // Para imagens com animação, sempre renderizar, mas carregar apenas quando shouldLoad for true
    // Usar fragmento para não adicionar wrapper que afeta o layout
    return (
      <>
        {!isLoaded && !error && shouldLoad && (
          <div className={`${className} bg-slate-200 dark:bg-slate-700 animate-pulse absolute inset-0 z-0`} />
        )}
        {error && (
          <div className={`${className} bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 text-xs absolute inset-0 z-10`}>
            Erro ao carregar
          </div>
        )}
        <motion.img
          ref={imgRef}
          src={shouldLoad ? src : undefined}
          alt={alt}
          className={className}
          loading={shouldLoadImmediately ? 'eager' : loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          initial={initial}
          animate={animate}
          transition={transition}
        />
      </>
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

