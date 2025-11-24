import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

interface Skill {
  name: string
  icon: string
}

const Skills = () => {
  const { t } = useLanguage()

  const skills: Skill[] = [
    { name: 'Java', icon: '/img/skills/Java.png' },
    { name: 'JavaScript', icon: '/img/skills/JavaScript.png' },
    { name: 'Python', icon: '/img/skills/Python.png' },
    { name: 'React', icon: '/img/skills/React.png' },
    { name: 'Flutter', icon: '/img/skills/Flutter.png' },
    { name: '.NET', icon: '/img/skills/Dotnet.png' },
    { name: 'Firebase', icon: '/img/skills/Firebase.png' },
    { name: 'SQL', icon: '/img/skills/SQL.png' },
    { name: 'Linux', icon: '/img/skills/Linux.png' },
    { name: 'Git', icon: '/img/skills/Git.png' },
    { name: 'GitHub', icon: '/img/skills/GitHub.png' },
    { name: 'Postman', icon: '/img/skills/Postman.png' },
    { name: 'Jira', icon: '/img/skills/Jira.png' },
    { name: 'Azure DevOps', icon: '/img/skills/Azure-Devops.png' },
    { name: 'ReadyAPI', icon: '/img/skills/readyapi.png' },
    { name: 'Maestro', icon: '/img/skills/maestro.png' },
    { name: 'C++', icon: '/img/skills/CPP.png' },
    { name: 'C#', icon: '/img/skills/CSharp.png' },
    { name: 'Dart', icon: '/img/skills/Dart.png' }
  ]

  const knowledge = [
    { name: 'QA', icon: '/img/knowledge/QA.png', label: 'QA' },
    { name: t('knowledge.api'), icon: '/img/knowledge/Api.png', label: 'api' },
    { name: t('knowledge.manual'), icon: '/img/knowledge/ManualTesting.png', label: 'manual' },
    { name: t('knowledge.automation'), icon: '/img/knowledge/Automation.png', label: 'automation' },
    { name: 'Pipelines', icon: '/img/knowledge/Azure-Pipelines.png', label: 'pipelines' },
    { name: 'Front/Back', icon: '/img/knowledge/Coding.png', label: 'coding' },
    { name: t('knowledge.database'), icon: '/img/knowledge/DataBase.png', label: 'database' },
    { name: t('knowledge.frontend'), icon: '/img/knowledge/Internet.png', label: 'frontend' },
    { name: t('knowledge.agile'), icon: '/img/knowledge/Scrum.png', label: 'agile' },
    { name: t('knowledge.engineering'), icon: '/img/knowledge/SoftwareEngineer.png', label: 'engineering' },
    { name: t('knowledge.cyber'), icon: '/img/knowledge/CyberSecurity.png', label: 'cyber' },
    { name: 'Mobile', icon: '/img/knowledge/mobileDevelopment.png', label: 'mobile' },
    { name: t('knowledge.mobileTest'), icon: '/img/knowledge/mobileTest.png', label: 'mobileTest' },
    { name: t('knowledge.systems'), icon: '/img/knowledge/Hacker.png', label: 'systems' }
  ]

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
            <span className="text-gradient">{t('skills.title')}</span>
          </h2>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-16">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full bg-white dark:bg-white shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <img src={skill.icon} alt={skill.name} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" loading="lazy" decoding="async" />
                <span className="text-xs sm:text-sm font-medium text-slate-900">{skill.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Knowledge */}
          <motion.h3
            className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center text-slate-800 dark:text-slate-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('skills.knowledge')}
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {knowledge.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full bg-white dark:bg-white shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <img src={item.icon} alt={item.name} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" loading="lazy" decoding="async" />
                <span className="text-xs sm:text-sm font-medium text-slate-900">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

