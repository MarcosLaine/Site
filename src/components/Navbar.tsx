import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

interface NavbarProps {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt')
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        theme === 'dark' ? 'glass' : 'glass-light'
      } shadow-lg`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#top"
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
              Marcos
            </span>
            <span className="text-gradient">Laine</span>
          </motion.a>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden md:flex items-center gap-4">
              {['about', 'projects', 'skills', 'contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-white/10 text-slate-200'
                      : 'hover:bg-slate-200/50 text-slate-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(`nav.${item}`)}
                </motion.a>
              ))}
            </div>

            <motion.button
              onClick={toggleLanguage}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'border-white/20 hover:bg-white/10'
                  : 'border-slate-300 hover:bg-slate-200/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle language"
            >
              🌐 {language.toUpperCase()}
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'border-white/20 hover:bg-white/10'
                  : 'border-slate-300 hover:bg-slate-200/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </motion.button>

            <motion.a
              href="docs/Marcos_Laine_QA.pdf"
              download
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📄 {t('nav.downloadCV')}
            </motion.a>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navbar

