import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  const TimelineItem = ({ item, index, isLeft }) => (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-center mb-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="w-full md:w-5/12">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-glass-lg"
        >
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              item.type === 'work' ? 'bg-primary' : 'bg-secondary'
            }`}></div>
            <span className={`text-sm font-medium ${
              item.type === 'work' ? 'text-primary' : 'text-secondary'
            }`}>
              {item.type === 'work' ? 'Work Experience' : 'Education'}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
          <p className="text-gray-400 mb-1">{item.company}</p>
          <p className="text-sm text-gray-500 mb-3">{item.period}</p>
          <p className="text-gray-300 leading-relaxed">{item.description}</p>
        </motion.div>
      </div>
      
      <div className="hidden md:flex items-center justify-center w-2/12">
        <div className="relative">
          <div className="w-4 h-4 bg-white rounded-full border-4 border-primary"></div>
          {index < portfolioData.experience.length - 1 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-primary to-secondary"></div>
          )}
        </div>
      </div>
      
      <div className="w-full md:w-5/12 hidden md:block"></div>
    </motion.div>
  );

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Professional Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            My career path through software engineering, IoT development, and emerging technologies
          </p>
        </motion.div>

        <div className="relative">
          {/* Mobile Timeline */}
          <div className="md:hidden">
            {portfolioData.experience.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="mb-8"
              >
                <div className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      item.type === 'work' ? 'bg-primary' : 'bg-secondary'
                    }`}></div>
                    <span className={`text-sm font-medium ${
                      item.type === 'work' ? 'text-primary' : 'text-secondary'
                    }`}>
                      {item.type === 'work' ? 'Work Experience' : 'Education'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 mb-1">{item.company}</p>
                  <p className="text-sm text-gray-500 mb-3">{item.period}</p>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            {portfolioData.experience.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Skills Growth Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-3xl border border-white/20 shadow-glass">
            <h3 className="text-2xl font-semibold mb-6 text-white text-center">Continuous Growth</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: 'Years Experience', value: '5+', icon: '📅' },
                { label: 'Projects Completed', value: '50+', icon: '🚀' },
                { label: 'Technologies', value: '20+', icon: '💻' },
                { label: 'Happy Clients', value: '30+', icon: '😊' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Animated background elements */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-2xl"
        />
      </div>
    </section>
  );
};

export default Experience;
