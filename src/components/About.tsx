import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const About = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">
            <span className="text-gradient">{t('about.title')}</span>
          </h2>

          <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-center">
            <motion.div
              className="glass dark:glass p-8 rounded-2xl shadow-2xl space-y-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                {t('about.text1')}
              </p>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
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
                className="glass dark:glass p-6 rounded-2xl shadow-xl"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <img
                  src="img/about_me/adi-logo.jpeg"
                  alt="ADI Global"
                  className="w-40 h-auto rounded-lg"
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

