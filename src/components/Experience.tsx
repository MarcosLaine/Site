import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SectionHeading } from './ui/section-heading'
import { useLanguage } from '../context/LanguageContext'
import { experiencesAPI, type Experience as ApiExperience } from '../services/api'
import { fallbackExperiences, type ExperienceItem } from '../data/profile'

/** bullets vem do banco como JSON string (ou já array); normaliza para string[] */
function parseBullets(value: string | string[] | undefined): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const isCurrent = (period: string) => /atualmente|present/i.test(period)

const Experience = () => {
  const { t, language } = useLanguage()
  const [experiences, setExperiences] = useState<ExperienceItem[]>([])

  useEffect(() => {
    const mapExperience = (exp: ApiExperience): ExperienceItem => {
      const isEn = language === 'en'
      const translatePeriod = (period: string) =>
        isEn
          ? period.replace(/Atualmente/gi, 'Present')
          : period.replace(/Present/gi, 'Atualmente')
      return {
        role: (isEn && exp.role_en) ? exp.role_en : exp.role,
        period: translatePeriod(exp.period),
        bullets: parseBullets((isEn && exp.bullets_en) ? exp.bullets_en : exp.bullets),
      }
    }

    experiencesAPI
      .getAll()
      .then((data) => setExperiences(data.map(mapExperience)))
      .catch(() => setExperiences([]))
  }, [language])

  const displayExperiences = experiences.length > 0 ? experiences : fallbackExperiences[language]

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-16">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading eyebrow={t('experience.eyebrow')} title={t('experience.title')} />

        <motion.div
          className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center font-bold text-white text-sm tracking-tight shadow-lg">
            dti
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-neutral-100">
              {t('experience.company')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400">{t('experience.companyMeta')}</p>
          </div>
        </motion.div>

        <ol className="relative ml-[1.375rem] sm:ml-6 border-l border-slate-300 dark:border-white/10 space-y-6 sm:space-y-8">
          {displayExperiences.map((exp, index) => {
            const current = isCurrent(exp.period)
            return (
              <motion.li
                key={`${exp.role}-${index}`}
                className="relative pl-6 sm:pl-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <span
                  className={`absolute -left-[0.4375rem] top-6 h-3.5 w-3.5 rounded-full border-2 ${
                    current
                      ? 'border-amber-500 bg-amber-400 shadow-[0_0_0_4px_rgba(245,158,11,0.18)]'
                      : 'border-slate-400 dark:border-neutral-500 bg-white dark:bg-neutral-900'
                  }`}
                  aria-hidden
                />
                <div
                  className={`glass-light dark:glass p-5 sm:p-6 rounded-2xl shadow-xl ${
                    current ? 'ring-1 ring-amber-500/40 dark:ring-amber-300/25' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-3">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-neutral-100">
                      {exp.role}
                    </h4>
                    <div className="flex items-center gap-2 shrink-0">
                      {current && (
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                          {t('experience.current')}
                        </span>
                      )}
                      <span className="text-xs sm:text-sm tabular-nums text-slate-500 dark:text-neutral-400">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default Experience
