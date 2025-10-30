import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import About from './components/About'
import BackgroundEffects from './components/BackgroundEffects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as 'dark' | 'light') || 'dark'  // Padrão: dark
  })

  useEffect(() => {
    document.body.classList.remove('dark', 'light')
    document.body.classList.add(theme)
    localStorage.setItem('theme', theme)
    
    // Garantir que inicie sempre no dark se não houver preferência salva
    if (!localStorage.getItem('theme')) {
      document.body.classList.add('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen relative overflow-hidden">
        <BackgroundEffects />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </motion.main>
        </AnimatePresence>
        
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App

