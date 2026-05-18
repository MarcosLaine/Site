import { HoverButton } from '@/components/ui/hover-button'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'

export interface ProjectDetailData {
  id: number
  name: string
  description: string
  imageUrls: string[]
  mediaType: 'image' | 'video'
  technologies: string[]
  testLink?: string
  githubLink?: string
  isGithubPrivate?: boolean
  category?: string
}

interface ProjectDetailModalProps {
  project: ProjectDetailData | null
  onClose: () => void
}

const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    setImageIndex(0)
  }, [project?.id])

  useEffect(() => {
    if (!project) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [project, onClose])

  useEffect(() => {
    if (!project || project.imageUrls.length <= 1) return

    const handleArrows = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setImageIndex((i) => (i + 1) % project.imageUrls.length)
      } else if (e.key === 'ArrowLeft') {
        setImageIndex((i) => (i - 1 + project.imageUrls.length) % project.imageUrls.length)
      }
    }

    document.addEventListener('keydown', handleArrows)
    return () => document.removeEventListener('keydown', handleArrows)
  }, [project])

  if (!mounted) return null

  const hasMultipleImages = (project?.imageUrls.length ?? 0) > 1

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl glass-light dark:glass shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <HoverButton
              type="button"
              onClick={onClose}
              variant="compact"
              aria-label="Fechar"
              className="absolute top-3 right-3 z-20 !w-9 !h-9 !p-0 !min-w-0 !rounded-full !bg-slate-900/70 dark:!bg-black/70 !text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </HoverButton>

            <motion.div className="relative bg-slate-100 dark:bg-black/80 min-h-[12rem] sm:min-h-[16rem] max-h-[45vh] flex items-center justify-center shrink-0">
              {project.mediaType === 'video' ? (
                <video
                  src={project.imageUrls[0]}
                  className="max-h-[45vh] w-full object-contain"
                  controls
                  playsInline
                />
              ) : (
                <>
                  <img
                    src={project.imageUrls[imageIndex]}
                    alt={`${project.name} - ${imageIndex + 1}`}
                    className="max-h-[45vh] w-full object-contain p-2"
                  />
                  {hasMultipleImages && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setImageIndex((i) => (i - 1 + project.imageUrls.length) % project.imageUrls.length)
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80"
                        aria-label="Imagem anterior"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageIndex((i) => (i + 1) % project.imageUrls.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80"
                        aria-label="Próxima imagem"
                      >
                        ›
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {project.imageUrls.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setImageIndex(idx)}
                            className={`h-2 rounded-full transition-all ${
                              imageIndex === idx ? 'bg-primary-500 w-6' : 'bg-slate-400/80 w-2'
                            }`}
                            aria-label={`Imagem ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </motion.div>

            <div className="p-4 sm:p-6 overflow-y-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-neutral-50 pr-8">
                {project.name}
              </h3>

              {project.category && (
                <p className="mt-1 text-xs uppercase tracking-wide text-primary-600 dark:text-primary-400 font-medium">
                  {project.category}
                </p>
              )}

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {project.description}
              </p>

              {project.technologies.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-medium mb-2">
                    Tech
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-lg bg-primary-500/10 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 border border-primary-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(project.testLink || (project.githubLink && !project.isGithubPrivate)) && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.testLink && (
                    <HoverButton
                      href={project.testLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      className="!px-4 !py-2 !text-sm !rounded-2xl"
                    >
                      {t('projects.testButton')}
                    </HoverButton>
                  )}
                  {project.githubLink && !project.isGithubPrivate && (
                    <HoverButton
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      className="!px-4 !py-2 !text-sm !rounded-2xl"
                    >
                      GitHub
                    </HoverButton>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default ProjectDetailModal
