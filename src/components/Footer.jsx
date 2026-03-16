import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaEnvelope, FaHeart } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: FaGithub, href: portfolioData.contact.github, label: 'GitHub' },
    { icon: FaLinkedin, href: portfolioData.contact.linkedin, label: 'LinkedIn' },
    { icon: FaTwitter, href: portfolioData.contact.twitter, label: 'Twitter' },
    { icon: FaFacebook, href: portfolioData.contact.facebook, label: 'Facebook' },
    { icon: FaEnvelope, href: `mailto:${portfolioData.contact.email}`, label: 'Email' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-glass-gradient backdrop-blur-3xl border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Felix Kumafutsa
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Full-Stack Software Developer with expertise in building scalable web applications, 
              IoT solutions, and AI-driven systems. Passionate about creating innovative digital solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label === 'Email' ? '_self' : '_blank'}
                  rel={social.label === 'Email' ? '' : 'noopener noreferrer'}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Get In Touch</h3>
            <div className="space-y-2">
              <p className="text-gray-400">
                Email: <a href={`mailto:${portfolioData.contact.email}`} className="text-primary hover:text-secondary transition-colors duration-200">
                  {portfolioData.contact.email}
                </a>
              </p>
              <p className="text-gray-400">
                Location: San Francisco, CA
              </p>
              <p className="text-gray-400">
                Available for freelance and full-time opportunities
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-white/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Felix Kumafutsa. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <FaHeart className="w-4 h-4 text-red-500 mx-1" /> using React & Tailwind CSS
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
