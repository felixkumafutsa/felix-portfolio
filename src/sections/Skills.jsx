import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Skills = () => {
  const getSkillIcon = (iconName) => {
    const iconMap = {
      'devicon-javascript-plain': '🟨',
      'devicon-python-plain': '🐍',
      'devicon-cplusplus-plain': '⚙️',
      'devicon-csharp-plain': '🔷',
      'devicon-react-original': '⚛️',
      'devicon-tailwindcss-plain': '🎨',
      'devicon-html5-plain': '📄',
      'devicon-css3-plain': '🎭',
      'devicon-nodejs-plain': '🟢',
      'devicon-express-original': '🚂',
      'devicon-mongodb-plain': '🍃',
      'api': '🔌',
      'database': '🗄️',
      'iot': '🌐',
      'chip': '💾',
      'rfid': '📡',
      'brain': '🧠',
      'link': '⛓️',
      'devicon-angularjs-plain': '🅰️',
      'nextjs': '⏭️',
      'nestjs': '🌀',
      'dotnet': '.NET',
      'node-red': '🔀',
      'mqtt': '📡'
    };
    return iconMap[iconName] || '💻';
  };

  const SkillCard = ({ category, skills, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-glass-lg"
    >
      <h3 className="text-xl font-semibold mb-4 text-white">
        {category === 'iot' ? 'Internet of Things' : category === 'design3D' ? '3D Design & Modeling' : category.charAt(0).toUpperCase() + category.slice(1)}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, skillIndex) => (
          <motion.span
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: skillIndex * 0.05 }}
            className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Core Technologies & Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Comprehensive skill set spanning embedded systems, web development, and emerging technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(portfolioData.skills).map(([category, skills], index) => (
            <SkillCard
              key={category}
              category={category}
              skills={skills}
              index={index}
            />
          ))}
        </div>

        {/* Animated background elements */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default Skills;
