import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl p-8 shadow-glass">
              <h3 className="text-2xl font-semibold mb-4 text-white">Professional Summary</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Passionate software engineer with expertise in IoT, Machine Learning, and Blockchain technologies. 
                I specialize in creating innovative solutions that bridge the physical and digital worlds, 
                from embedded systems to full-stack applications.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With a strong foundation in computer science and extensive experience in cutting-edge technologies, 
                I thrive on solving complex challenges. My work spans from low-level embedded programming to 
                high-level AI applications and blockchain development.
              </p>
            </div>

            <div className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl p-8 shadow-glass">
              <h3 className="text-2xl font-semibold mb-4 text-white">What I Do</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'IoT Solutions',
                  'Machine Learning',
                  'Web Development',
                  'Blockchain Apps',
                  'Embedded Systems',
                  'Cloud Architecture'
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-3 text-center"
                  >
                    <span className="text-white font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-3xl border border-white/20 shadow-glass">
              <h3 className="text-2xl font-semibold mb-6 text-white">Core Technologies</h3>
              <div className="space-y-4">
                {[
                  { name: 'Programming', skills: ['JavaScript', 'Python', 'C++', 'C#'] },
                  { name: 'Frontend', skills: ['React', 'Tailwind CSS', 'HTML5', 'CSS3'] },
                  { name: 'Backend', skills: ['Node.js', 'Express', 'REST APIs'] },
                  { name: 'Databases', skills: ['MariaDB', 'PostgreSQL', 'MongoDB'] },
                  { name: 'Specialized', skills: ['IoT', 'ESP32', 'RFID', 'ML', 'Blockchain'] }
                ].map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="text-white font-medium mb-2">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating decoration */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
