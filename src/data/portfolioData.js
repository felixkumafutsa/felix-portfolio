export const portfolioData = {
  name: "John Developer",
  title: "IoT Engineer | AI Developer | Full Stack Engineer",
  tagline: "Building the future with embedded systems, machine learning, and decentralized technology",
  
  about: {
    summary: "Passionate software engineer with expertise in IoT, Machine Learning, and Blockchain technologies. I specialize in creating innovative solutions that bridge the physical and digital worlds, from embedded systems to full-stack applications.",
    description: "With a strong foundation in computer science and extensive experience in cutting-edge technologies, I thrive on solving complex challenges. My work spans from low-level embedded programming to high-level AI applications and blockchain development."
  },

  skills: {
    programming: [
      { name: "JavaScript", icon: "devicon-javascript-plain", level: 90 },
      { name: "Python", icon: "devicon-python-plain", level: 85 },
      { name: "C++", icon: "devicon-cplusplus-plain", level: 75 },
      { name: "C#", icon: "devicon-csharp-plain", level: 70 }
    ],
    frontend: [
      { name: "React", icon: "devicon-react-original", level: 90 },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain", level: 85 },
      { name: "HTML5", icon: "devicon-html5-plain", level: 95 },
      { name: "CSS3", icon: "devicon-css3-plain", level: 90 }
    ],
    backend: [
      { name: "Node.js", icon: "devicon-nodejs-plain", level: 85 },
      { name: "Express", icon: "devicon-express-original", level: 80 },
      { name: "REST APIs", icon: "api", level: 90 }
    ],
    databases: [
      { name: "MariaDB", icon: "database", level: 75 },
      { name: "PostgreSQL", icon: "database", level: 80 },
      { name: "MongoDB", icon: "devicon-mongodb-plain", level: 70 }
    ],
    technologies: [
      { name: "IoT", icon: "iot", level: 85 },
      { name: "ESP32", icon: "chip", level: 80 },
      { name: "RFID Systems", icon: "rfid", level: 75 },
      { name: "Machine Learning", icon: "brain", level: 70 },
      { name: "Blockchain", icon: "link", level: 65 }
    ]
  },

  projects: [
    {
      id: 1,
      title: "IoT Device Monitoring Platform",
      description: "Real-time monitoring dashboard for IoT devices with data visualization, alerts, and remote management capabilities.",
      technologies: ["React", "Node.js", "ESP32", "MQTT", "WebSocket"],
      github: "https://github.com/username/iot-monitoring",
      demo: "https://demo.example.com",
      image: "/api/placeholder/600/400"
    },
    {
      id: 2,
      title: "MedCard Medical RFID System",
      description: "Secure medical identification system using RFID technology for patient tracking and medical record management.",
      technologies: ["ESP32", "RFID", "Node.js", "MariaDB", "REST API"],
      github: "https://github.com/username/medcard-system",
      demo: "https://demo.example.com",
      image: "/api/placeholder/600/400"
    },
    {
      id: 3,
      title: "Crypto Trading Web Platform",
      description: "Decentralized trading platform with smart contracts, real-time charts, and automated trading strategies.",
      technologies: ["Web3", "Smart Contracts", "React", "Ethereum", "Solidity"],
      github: "https://github.com/username/crypto-trading",
      demo: "https://demo.example.com",
      image: "/api/placeholder/600/400"
    },
    {
      id: 4,
      title: "Fingerprint Attendance System",
      description: "Biometric attendance system with fingerprint recognition, real-time tracking, and analytics dashboard.",
      technologies: ["ESP32", "R503 Sensor", "REST API", "MongoDB", "React"],
      github: "https://github.com/username/fingerprint-attendance",
      demo: "https://demo.example.com",
      image: "/api/placeholder/600/400"
    }
  ],

  experience: [
    {
      id: 1,
      title: "Senior IoT Engineer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description: "Leading development of IoT solutions for smart city projects, designing scalable architectures and implementing real-time data processing systems.",
      type: "work"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2020 - 2022",
      description: "Developed web applications using React and Node.js, implemented REST APIs, and worked on cloud deployment strategies.",
      type: "work"
    },
    {
      id: 3,
      title: "AI Research Project",
      company: "University Research Lab",
      period: "2019 - 2020",
      description: "Conducted research on machine learning applications for IoT devices, published papers on edge AI and sensor fusion.",
      type: "education"
    },
    {
      id: 4,
      title: "Blockchain Development",
      company: "DeFi Startup",
      period: "2018 - 2019",
      description: "Developed smart contracts and decentralized applications, implemented security protocols and consensus mechanisms.",
      type: "work"
    }
  ],

  contact: {
    email: "john.developer@example.com",
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://twitter.com/username"
  }
};
