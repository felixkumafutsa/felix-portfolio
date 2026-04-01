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

        <div className="grid grid-cols-1 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 w-full max-w-4xl mx-auto">
            <div className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl p-8 shadow-glass">
              <h3 className="text-2xl font-semibold mb-4 text-white">Professional Summary</h3>
              <p className="text-gray-300 leading-relaxed text-justify mb-4">
                Passionate software engineer with expertise in IoT, Machine Learning, and Blockchain technologies. 
                I specialize in creating innovative solutions that bridge the physical and digital worlds, 
                from embedded systems to full-stack applications.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify mb-6">
                With a strong foundation in computer science and extensive experience in cutting-edge technologies, 
                I thrive on solving complex challenges. My work spans from low-level embedded programming to 
                high-level AI applications and blockchain development.
              </p>

              <h4 className="text-xl font-semibold mb-4 text-white">What I Do</h4>
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

        </div>
      </div>
    </section>
  );
};

export default About;
