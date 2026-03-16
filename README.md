# IoT Engineer Portfolio Website

A modern, production-ready personal portfolio website built with React, Vite, and TailwindCSS. This portfolio showcases expertise in IoT, Machine Learning, Blockchain, and Full Stack Development.

## 🚀 Tech Stack

- **Frontend Framework**: React 19 with Vite
- **Styling**: TailwindCSS with custom animations
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment Ready**: Optimized for Vercel and Netlify

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.jsx   # Sticky navigation bar
│   └── Footer.jsx       # Footer component
├── sections/            # Page sections
│   ├── Hero.jsx         # Landing section
│   ├── About.jsx        # About me section
│   ├── Skills.jsx       # Skills showcase
│   ├── Projects.jsx     # Projects grid
│   ├── Experience.jsx   # Timeline experience
│   └── Contact.jsx      # Contact form
├── data/               # Portfolio data
│   └── portfolioData.js # Centralized data
├── assets/             # Static assets
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── App.jsx             # Main app component
└── index.css           # Global styles
```

## 🎨 Features

### ✨ Core Features
- **Hero Section**: Full-screen landing with animated background and call-to-action buttons
- **About Section**: Professional summary and skills overview
- **Skills Section**: Animated skill cards with progress bars grouped by category
- **Projects Section**: Dynamic project grid with hover animations and links
- **Experience Timeline**: Visual journey through career path
- **Contact Form**: Functional contact form with validation
- **Responsive Design**: Mobile-first approach with smooth transitions

### 🎯 Design Elements
- **Dark Theme**: Modern developer aesthetic with glassmorphism cards
- **Smooth Animations**: Framer Motion powered interactions
- **Gradient Effects**: Dynamic color gradients throughout
- **Floating Elements**: Animated background particles
- **Micro-interactions**: Hover states and transitions

### 🛠 Technical Features
- **Smooth Scrolling**: Navigation with scroll spy
- **Component Architecture**: Modular, reusable components
- **Performance Optimized**: Lazy loading and efficient animations
- **SEO Ready**: Semantic HTML5 structure
- **Accessibility**: ARIA labels and keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/username/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Sections Overview

### 1. Hero Section
- Developer name and title
- Animated background with floating particles
- Call-to-action buttons (View Projects, Contact Me)
- Social media links

### 2. About Me
- Professional summary
- Core technologies showcase
- What I do section

### 3. Skills Section
Skills grouped by categories:
- **Programming**: JavaScript, Python, C++, C#
- **Frontend**: React, Tailwind CSS, HTML5, CSS3
- **Backend**: Node.js, Express, REST APIs
- **Databases**: MariaDB, PostgreSQL, MongoDB
- **Technologies**: IoT, ESP32, RFID, Machine Learning, Blockchain

### 4. Projects Section
Featured projects:
- IoT Device Monitoring Platform
- MedCard Medical RFID System
- Crypto Trading Web Platform
- Fingerprint Attendance System

Each project includes:
- Title and description
- Technology stack
- GitHub and demo links
- Hover animations

### 5. Experience Timeline
- Professional journey visualization
- Work experience and education
- Skills growth statistics

### 6. Contact Section
- Contact form with validation
- Contact information
- Social media links

## 🎨 Customization

### Updating Portfolio Data
Edit `src/data/portfolioData.js` to personalize:
- Name and title
- About section content
- Skills and proficiency levels
- Projects and links
- Experience timeline
- Contact information

### Customizing Colors
Update `tailwind.config.js` to modify:
- Primary and secondary colors
- Animation keyframes
- Custom utilities

### Adding New Sections
1. Create component in `src/sections/`
2. Import in `App.jsx`
3. Add navigation link in `Navigation.jsx`

## 🚀 Deployment

### Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Deploy automatically

### Manual Build
```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 🌟 Performance Features

- **Optimized Bundle**: Tree-shaking and code splitting
- **Image Optimization**: Lazy loading and WebP support
- **Animation Performance**: GPU-accelerated animations
- **SEO Optimization**: Meta tags and structured data
- **PWA Ready**: Service worker support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing fast build tool
- TailwindCSS for the utility-first CSS framework
- Framer Motion for smooth animations
- React Icons for the icon library

---

**Built with ❤️ using React & TailwindCSS**
