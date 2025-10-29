import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const Hero = () => {
  const { t } = useLanguage()

  return (
    <section id="top" className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 order-2 md:order-1"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t('hero.greeting')}
              <br />
              <span className="text-gradient">{t('hero.name')}</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.p
              className="text-sm sm:text-base text-slate-700 dark:text-slate-400 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              className="flex flex-col xs:flex-row gap-3 sm:gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="px-6 sm:px-8 py-3 text-center rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.viewProjects')}
              </motion.a>

              <motion.a
                href="mailto:marcospslaine@gmail.com"
                className="px-6 sm:px-8 py-3 text-center rounded-xl border-2 border-primary-500/50 backdrop-blur-sm hover:bg-primary-500/10 font-semibold transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.contact')}
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center order-1 md:order-2"
          >
            <motion.div
              className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-80 sm:h-80 md:w-72 md:h-72 lg:w-96 lg:h-96"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl blur-2xl opacity-50" />
              <img
                src="/img/about_me/Profile-photo.jpeg"
                alt="Marcos Laine"
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/10"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

