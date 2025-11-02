import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import { projectsAPI } from '../services/api'

interface Project {
  id: number
  name: string
  description: string
  description_key?: string // Chave para tradução
  description_en?: string // Descrição em inglês (alternativa)
  media_url: string | string[]  // Pode ser URL única ou array de URLs
  media_type: 'image' | 'video'
  test_link?: string
  github_link?: string
  is_github_private: boolean
  category: string
  technologies?: string | string[] // JSON string ou array de tecnologias
}

const Projects = () => {
  const { t } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const data = await projectsAPI.getAll()
        setProjects(data)
        setError(null)
      } catch (err) {
        setError('Erro ao carregar projetos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Agrupar projetos por categoria automaticamente
  const projectsByCategory = projects.reduce((acc, project) => {
    const category = project.category || 'geral'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(project)
    return acc
  }, {} as Record<string, Project[]>)

  // Mapear nomes das categorias
  const categoryNames: Record<string, string> = {
    'frontend': t('projects.carousel1.title'),
    'mercado': t('projects.carousel2.title'),
    'mobile': 'Mobile / Apps',
    'backend': 'Backend / APIs',
    'fullstack': 'Full Stack',
    'geral': 'Outros Projetos'
  }

  if (loading) {
    return (
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-900/30 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Carregando projetos...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-900/30 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-red-500 dark:text-red-400">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-900/30 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center">
            <span className="text-gradient">{t('projects.title')}</span>
          </h2>
          <p className="text-center text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            {t('projects.lead')}
          </p>

          {/* Carrosséis dinâmicos - aparecem automaticamente conforme categorias no banco */}
          {Object.entries(projectsByCategory).map(([category, categoryProjects], index) => (
            <Carousel 
              key={category}
              title={categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1)}
              projects={categoryProjects}
              delay={index * 0.2}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

interface CarouselProps {
  title: string
  projects: Project[]
  delay: number
}

const Carousel = ({ title, projects, delay }: CarouselProps) => {
  const { t } = useLanguage()
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`carousel-${title}`)
    if (container) {
      const scrollAmount = 320
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount)
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }

  return (
    <motion.div
      className="mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
        <div className="flex gap-1 sm:gap-2">
          <motion.button
            onClick={() => handleScroll('left')}
            className="p-1.5 sm:p-2 text-lg sm:text-xl rounded-lg glass-light dark:glass hover:bg-slate-200/50 dark:hover:bg-white/20 transition-colors text-slate-800 dark:text-slate-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous"
          >
            ‹
          </motion.button>
          <motion.button
            onClick={() => handleScroll('right')}
            className="p-1.5 sm:p-2 text-lg sm:text-xl rounded-lg glass-light dark:glass hover:bg-slate-200/50 dark:hover:bg-white/20 transition-colors text-slate-800 dark:text-slate-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next"
          >
            ›
          </motion.button>
        </div>
      </div>

      <div
        id={`carousel-${title}`}
        className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 items-start"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
      
      {/* Observação sobre clique nas imagens */}
      {projects.some(p => p.media_type === 'image') && (
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 px-1 italic flex items-center gap-1">
          <span>*</span>
          <span>{t('projects.imageClickHint')}</span>
        </p>
      )}
    </motion.div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { t, language } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showAllTechnologies, setShowAllTechnologies] = useState(false)
  const [descriptionRef, setDescriptionRef] = useState<HTMLParagraphElement | null>(null)
  const [needsExpandButton, setNeedsExpandButton] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  
  // Obter descrição traduzida
  const getTranslatedDescription = () => {
    if (language === 'en') {
      // Prioridade: description_key > description_en > description
      if (project.description_key) {
        const translated = t(project.description_key)
        return translated !== project.description_key ? translated : project.description_en || project.description
      }
      if (project.description_en) {
        return project.description_en
      }
    }
    // Em português, usar description_key se existir, senão usar description direto
    if (project.description_key) {
      const translated = t(project.description_key)
      return translated !== project.description_key ? translated : project.description
    }
    return project.description
  }
  
  const translatedDescription = useMemo(() => getTranslatedDescription(), [project.description, project.description_key, project.description_en, language, t])
  
  // Processar media_url (pode ser string ou array)
  const mediaUrls = useMemo(() => {
    if (typeof project.media_url === 'string') {
      // Tentar parsear como JSON
      try {
        const parsed = JSON.parse(project.media_url)
        return Array.isArray(parsed) ? parsed : [project.media_url]
      } catch {
        return [project.media_url]
      }
    }
    return Array.isArray(project.media_url) ? project.media_url : [project.media_url]
  }, [project.media_url])

  // Processar technologies (pode ser string JSON ou array)
  const technologiesList = useMemo(() => {
    if (!project.technologies) return []
    
    if (Array.isArray(project.technologies)) {
      return project.technologies
    }
    
    if (typeof project.technologies === 'string') {
      try {
        const parsed = JSON.parse(project.technologies)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        // Se não for JSON válido, retorna como array com um único item
        return project.technologies ? [project.technologies] : []
      }
    }
    
    return []
  }, [project.technologies])

  // Limitar tecnologias visíveis inicialmente (máximo 2 linhas de balões)
  // Assumindo ~5-6 balões por linha no card de 280-380px, então 2 linhas = ~10-12 balões
  // Usando um valor mais conservador (8) para garantir que caiba em 2 linhas em todos os tamanhos
  const MAX_TECHNOLOGIES_VISIBLE = 8
  // Mostrar todas as tecnologias se explicitamente expandido (independente da descrição)
  const visibleTechnologies = showAllTechnologies 
    ? technologiesList 
    : technologiesList.slice(0, MAX_TECHNOLOGIES_VISIBLE)
  const hasMoreTechnologies = technologiesList.length > MAX_TECHNOLOGIES_VISIBLE
  // Só mostrar o balão "+X" se não estiver mostrando todas as tecnologias
  const shouldShowMoreTechBalloon = hasMoreTechnologies && !showAllTechnologies

  const hasMultipleImages = mediaUrls.length > 1

  // Carrossel automático - troca a cada 5 segundos
  useEffect(() => {
    if (!hasMultipleImages) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % mediaUrls.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [hasMultipleImages, mediaUrls.length])

  // Verificar se a descrição precisa do botão "ver mais"
  useEffect(() => {
    if (descriptionRef && !showFullDescription) {
      // Verificar se o conteúdo ultrapassa a altura visível
      // Quando line-clamp está ativo, scrollHeight será maior que clientHeight
      const checkHeight = () => {
        if (descriptionRef) {
          // Forçar reflow para garantir que line-clamp está aplicado
          const hasLineClamp = descriptionRef.classList.contains('line-clamp-2') || 
                               descriptionRef.style.webkitLineClamp === '2'
          
          if (hasLineClamp) {
            const scrollHeight = descriptionRef.scrollHeight
            const clientHeight = descriptionRef.clientHeight
            setNeedsExpandButton(scrollHeight > clientHeight + 2) // +2 para margem de erro
          } else {
            // Se não tem line-clamp, criar elemento temporário para medir
            const tempElement = document.createElement('p')
            tempElement.textContent = project.description
            tempElement.className = descriptionRef.className.replace('line-clamp-2', '').trim()
            tempElement.style.position = 'absolute'
            tempElement.style.visibility = 'hidden'
            tempElement.style.width = descriptionRef.offsetWidth + 'px'
            tempElement.style.padding = '0'
            tempElement.style.margin = '0'
            document.body.appendChild(tempElement)
            
            const fullHeight = tempElement.offsetHeight
            const clampedHeight = descriptionRef.offsetHeight
            
            document.body.removeChild(tempElement)
            setNeedsExpandButton(fullHeight > clampedHeight + 2)
          }
        }
      }
      
      // Executar após o DOM atualizar
      setTimeout(checkHeight, 0)
      
      // Também verificar em resize
      window.addEventListener('resize', checkHeight)
      return () => window.removeEventListener('resize', checkHeight)
    }
  }, [descriptionRef, translatedDescription, showFullDescription])

  const isExpanded = showFullDescription || showAllTechnologies

  return (
    <motion.div
      className="w-[280px] sm:w-[340px] md:w-[380px] glass-light dark:glass rounded-xl sm:rounded-2xl shadow-xl flex flex-col flex-shrink-0"
      style={{
        minHeight: '380px',
        height: isExpanded ? 'auto' : 'auto'
      }}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="relative h-44 sm:h-52 md:h-60 overflow-hidden bg-slate-200 dark:bg-slate-800/50">
        {project.media_type === 'video' ? (
          <video
            src={mediaUrls[0]}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
            onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
          />
        ) : (
          <>
            {/* Área clicável para abrir popup */}
            <div
              className="absolute inset-0 w-full h-full cursor-pointer z-10"
              onClick={() => setSelectedImageIndex(currentImageIndex)}
            />
            {/* Carrossel de imagens */}
            {mediaUrls.map((url, idx) => (
              <motion.img
                key={idx}
                src={url}
                alt={`${project.name} - ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentImageIndex === idx ? 1 : 0,
                  scale: currentImageIndex === idx ? 1 : 1.05
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
            
            {/* Indicadores de imagem */}
            {hasMultipleImages && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20 pointer-events-none">
                {mediaUrls.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      currentImageIndex === idx 
                        ? 'bg-white w-4' 
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-4 sm:p-5 flex flex-col w-full flex-grow min-h-0">
        {/* Nome e Descrição - Sempre visíveis */}
        <div className="flex-shrink-0 space-y-1.5 mb-2 w-full">
          <h4 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
            {project.name}
          </h4>
          <div className="space-y-1 w-full">
            <p 
              ref={setDescriptionRef}
              className={`text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 w-full ${
                !showFullDescription ? 'line-clamp-2' : ''
              }`}
            >
              {translatedDescription}
            </p>
            {needsExpandButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (showFullDescription) {
                    // Ver menos: colapsar descrição (tecnologias mantêm seu próprio estado)
                    setShowFullDescription(false)
                  } else {
                    // Ver mais: expandir descrição e todas as tecnologias
                    setShowFullDescription(true)
                    if (hasMoreTechnologies) {
                      setShowAllTechnologies(true)
                    }
                  }
                }}
                className="text-[10px] sm:text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium underline decoration-dotted"
              >
                {showFullDescription ? 'Ver menos' : 'Ver mais'}
              </button>
            )}
          </div>
        </div>
        
        {/* Seção de Tecnologias - Controlada */}
        {technologiesList.length > 0 && (
          <div className={`flex-shrink-0 border-t border-slate-200/30 dark:border-slate-700/30 w-full ${showAllTechnologies ? 'pt-2 pb-2' : 'pt-1.5 pb-1'}`}>
            {!showAllTechnologies ? (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide flex-shrink-0">
                    Tech:
                  </span>
                </div>
                <div className={`flex flex-wrap gap-1 w-full ${!showAllTechnologies ? 'max-h-[3.5rem] overflow-hidden' : ''}`}>
                  {visibleTechnologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 text-[9px] sm:text-[10px] rounded bg-primary-500/10 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 border border-primary-400/20 dark:border-primary-500/30 font-medium whitespace-nowrap flex-shrink-0"
                    >
                      {tech}
                    </span>
                  ))}
                  {shouldShowMoreTechBalloon && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowAllTechnologies(true)
                      }}
                      className="px-1.5 py-0.5 text-[9px] sm:text-[10px] rounded bg-primary-500/10 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 border border-primary-400/20 dark:border-primary-500/30 font-medium whitespace-nowrap flex-shrink-0 cursor-pointer hover:bg-primary-500/20 dark:hover:bg-primary-500/30 transition-colors"
                      title={`Clique para ver mais ${technologiesList.length - MAX_TECHNOLOGIES_VISIBLE} tecnologias`}
                    >
                      +{technologiesList.length - MAX_TECHNOLOGIES_VISIBLE}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <motion.div 
                className="space-y-1.5"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                    Tech ({technologiesList.length}):
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowAllTechnologies(false)
                    }}
                    className="px-1.5 py-0.5 text-[9px] sm:text-[10px] text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium underline flex-shrink-0"
                  >
                    Fechar
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 w-full">
                  {technologiesList.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.02 }}
                      className="px-1.5 py-0.5 text-[9px] sm:text-[10px] rounded bg-primary-500/10 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 border border-primary-400/20 dark:border-primary-500/30 font-medium whitespace-nowrap flex-shrink-0"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
        
        {/* Links - Sempre no final */}
        <div className="flex gap-1.5 sm:gap-2 flex-shrink-0 mt-auto pt-2 w-full flex-wrap">
          {project.test_link && (
            <motion.a
              href={project.test_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors text-center whitespace-nowrap flex-1 min-w-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden sm:inline">🚀 </span>{t('projects.testButton')}
            </motion.a>
          )}
          {project.github_link && !project.is_github_private && (
            <motion.a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium transition-colors text-center whitespace-nowrap flex-1 min-w-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden sm:inline">💻 </span>GitHub
            </motion.a>
          )}
        </div>
      </div>

      {/* Popup de imagem */}
      {selectedImageIndex !== null && project.media_type === 'image' && (
        <ImagePopup
          images={mediaUrls}
          currentIndex={selectedImageIndex}
          projectName={project.name}
          onClose={() => setSelectedImageIndex(null)}
          onNext={() => setSelectedImageIndex((prev) => 
            prev !== null ? (prev + 1) % mediaUrls.length : null
          )}
          onPrevious={() => setSelectedImageIndex((prev) => 
            prev !== null ? (prev - 1 + mediaUrls.length) % mediaUrls.length : null
          )}
          onNavigateTo={(index) => setSelectedImageIndex(index)}
          hasMultipleImages={hasMultipleImages}
        />
      )}
    </motion.div>
  )
}

interface ImagePopupProps {
  images: string[]
  currentIndex: number
  projectName: string
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  onNavigateTo: (index: number) => void
  hasMultipleImages: boolean
}

const ImagePopup = ({ 
  images, 
  currentIndex, 
  projectName, 
  onClose, 
  onNext, 
  onPrevious,
  onNavigateTo,
  hasMultipleImages 
}: ImagePopupProps) => {
  const [mounted, setMounted] = useState(false)

  // Garantir que o portal só renderize no cliente
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Fechar com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    // Prevenir scroll do body quando popup está aberto
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  // Navegação com setas
  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (hasMultipleImages) {
        if (e.key === 'ArrowRight') {
          onNext()
        } else if (e.key === 'ArrowLeft') {
          onPrevious()
        }
      }
    }
    document.addEventListener('keydown', handleArrowKeys)
    
    return () => {
      document.removeEventListener('keydown', handleArrowKeys)
    }
  }, [hasMultipleImages, onNext, onPrevious])

  if (!mounted) return null

  const popupContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Navegação esquerda - posicionada no popup principal */}
      {hasMultipleImages && (
        <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30">
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onPrevious()
            }}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white border-2 border-white/40 shadow-2xl"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Imagem anterior"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        </div>
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-[95vw] max-h-[95vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <motion.button
          onClick={onClose}
          className="absolute -top-12 sm:-top-14 right-0 sm:right-4 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white border-2 border-white/40 shadow-2xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Fechar"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Imagem */}
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${projectName} - ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Navegação direita - posicionada no popup principal */}
      {hasMultipleImages && (
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30">
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white border-2 border-white/40 shadow-2xl"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Próxima imagem"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      )}

      {/* Contador de imagens */}
      {hasMultipleImages && (
        <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-white text-sm font-medium border border-white/30 shadow-xl z-30">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Indicadores de imagem */}
      {hasMultipleImages && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation()
                onNavigateTo(idx)
              }}
              className={`h-2.5 rounded-full transition-all ${
                currentIndex === idx 
                  ? 'bg-white w-10 shadow-lg' 
                  : 'bg-white/40 w-2.5 hover:bg-white/60'
              }`}
              aria-label={`Ir para imagem ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )

  return createPortal(popupContent, document.body)
}

export default Projects

