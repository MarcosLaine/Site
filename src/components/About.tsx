import { motion } from 'framer-motion'
import { SectionHeading } from './ui/section-heading'
import { useLanguage } from '../context/LanguageContext'
import { aboutFacts } from '../data/profile'

const About = () => {
  const { t, language } = useLanguage()
  const facts = aboutFacts[language]

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} />

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 sm:gap-8 items-stretch">
          <motion.div
            className="glass-light dark:glass p-5 sm:p-6 md:p-8 rounded-2xl shadow-2xl space-y-4 sm:space-y-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-800 dark:text-neutral-300">
              {t('about.text1')}
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-800 dark:text-neutral-300">
              {t('about.text2')}
            </p>
            <blockquote className="border-l-2 border-amber-600 dark:border-amber-300/60 pl-4 sm:pl-5 py-1 text-lg sm:text-xl md:text-2xl font-semibold leading-snug text-slate-900 dark:text-neutral-50">
              {t('about.quote')}
            </blockquote>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-800 dark:text-neutral-300">
              {t('about.text3')}
            </p>
          </motion.div>

          <motion.dl
            className="glass-light dark:glass p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl flex flex-col justify-center divide-y divide-slate-200 dark:divide-white/10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            {facts.map((fact) => (
              <div key={fact.label} className="py-3 sm:py-4 first:pt-0 last:pb-0">
                <dt className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-200/70">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm sm:text-base text-slate-900 dark:text-neutral-100">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}

export default About
