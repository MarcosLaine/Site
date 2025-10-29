import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const About = () => {
  const { t } = useLanguage()

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
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-800 dark:text-slate-300">
                {t('about.text1')}
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-800 dark:text-slate-300">
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
                <img
                  src="/img/about_me/adi-logo.jpeg"
                  alt="ADI Global"
                  className="w-32 sm:w-40 h-auto rounded-lg"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

