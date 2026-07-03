import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ImageWithSkeleton } from './ui/ImageWithSkeleton'
import { useLanguage } from '../context/LanguageContext'
import { experiencesAPI, type Experience } from '../services/api'

interface ExperienceItem {
  role: string
  period: string
  bullets: string[]
}

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

const About = () => {
  const { t, language } = useLanguage()
  const [experiences, setExperiences] = useState<ExperienceItem[]>([])

  // Fallback estático (caso a API esteja indisponível) — mantém a seção sempre populada
  const fallbackExperiences: ExperienceItem[] = [
    { role: t('exp.isn.role'), period: t('exp.isn.period'), bullets: [t('exp.isn.b1'), t('exp.isn.b2')] },
    { role: t('exp.adi.role'), period: t('exp.adi.period'), bullets: [t('exp.adi.b1'), t('exp.adi.b2'), t('exp.adi.b3'), t('exp.adi.b4')] },
    { role: t('exp.qae.role'), period: t('exp.qae.period'), bullets: [t('exp.qae.b1'), t('exp.qae.b2'), t('exp.qae.b3'), t('exp.qae.b4'), t('exp.qae.b5')] },
    { role: t('exp.be.role'), period: t('exp.be.period'), bullets: [t('exp.be.b1'), t('exp.be.b2'), t('exp.be.b3')] },
  ]

  useEffect(() => {
    const mapExperience = (exp: Experience): ExperienceItem => {
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

  const displayExperiences = experiences.length > 0 ? experiences : fallbackExperiences

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
            <span className="text-gradient">{t('about.title')}</span>
          </h2>

          <div className="grid md:grid-cols-[2fr_1fr] gap-6 sm:gap-8 items-center">
            <motion.div
              className="glass-light dark:glass p-5 sm:p-6 md:p-8 rounded-2xl shadow-2xl space-y-3 sm:space-y-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-800 dark:text-neutral-300">
                {t('about.text1')}
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-800 dark:text-neutral-300">
                {t('about.text2')}
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="glass-light dark:glass p-4 sm:p-6 rounded-2xl shadow-xl"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <ImageWithSkeleton
                  src="/img/about_me/isn-logo.png"
                  alt="ISN"
                  wrapperClassName="w-32 sm:w-40"
                  className="w-32 sm:w-40 h-auto rounded-lg"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Professional Experience */}
          <motion.h3
            className="text-2xl sm:text-3xl font-semibold mt-12 sm:mt-16 mb-6 sm:mb-8 text-center text-slate-800 dark:text-neutral-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('about.experience')}
          </motion.h3>

          <div className="space-y-4 sm:space-y-6">
            {displayExperiences.map((exp, index) => (
              <motion.div
                key={index}
                className="glass-light dark:glass p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-neutral-100">
                    {exp.role}
                  </h4>
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 shrink-0">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
