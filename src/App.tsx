import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { LanguageProvider } from './context/LanguageContext'
import BackgroundEffects from './components/BackgroundEffects'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as 'dark' | 'light') || 'dark'
  })

  useEffect(() => {
    document.body.classList.remove('dark', 'light')
    document.body.classList.add(theme)
    localStorage.setItem('theme', theme)
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

