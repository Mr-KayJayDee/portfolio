export default {
  // Navigation
  nav: {
    home: 'Home',
    projects: 'Portfolio Projects',
    about: 'About',
    contact: 'Contact',
    fiverr: 'Fiverr Services'
  },

  // Home page
  home: {
    title: 'Hi, I\'m Killian - Full Stack Developer',
    subtitle: 'Expert Full Stack Developer specializing in Vue.js, React, and Node.js. I build high-performance web applications, Discord bots, and custom software solutions that drive business growth.',
    cta: {
      viewProjects: 'View Portfolio Projects',
      contactMe: 'Get Free Consultation'
    },
    featuredProjects: {
      title: 'Featured Web Development Projects',
      subtitle: 'Explore my portfolio of modern web applications built with Vue.js, React, Node.js, and cutting-edge JavaScript technologies. Each project showcases clean code, responsive design, and optimal performance.',
      viewAll: 'View All Projects'
    },
    services: {
      title: 'Professional Web Development Services',
      subtitle: 'Comprehensive full stack development services from concept to deployment. Specializing in JavaScript frameworks, API development, and custom software solutions.',
      webDev: {
        title: 'Full Stack Web Development',
        description: 'Modern web applications using Vue.js, React, Node.js, and TypeScript. Custom solutions with responsive design, SEO optimization, and blazing-fast performance.'
      },
      mobileApps: {
        title: 'Cross-Platform Mobile Development',
        description: 'High-performance mobile applications with React Native and progressive web apps (PWA). Native-like experience across iOS and Android platforms.'
      },
      optimization: {
        title: 'Performance & SEO Optimization',
        description: 'Website speed optimization, Core Web Vitals improvement, and technical SEO implementation. Boost your search rankings and user experience.'
      },
      maintenance: {
        title: 'Maintenance & Technical Support',
        description: 'Reliable ongoing maintenance, security updates, and 24/7 technical support for your web applications. Keep your projects running smoothly.'
      }
    },
    cta2: {
      title: 'Ready to Build Your Next Web Project?',
      subtitle: 'Let\'s transform your ideas into powerful web applications. Free consultation for your Vue.js, React, or Node.js project.',
      startProject: 'Start Your Project',
      learnMore: 'Learn More'
    }
  },

  // Projects page
  projects: {
    title: 'Web Development Portfolio',
    subtitle: 'Browse my full stack development projects featuring Vue.js applications, React websites, Node.js APIs, Discord bots, and enterprise software solutions. Real-world examples of clean code and modern architecture.',
    categories: {
      all: 'All Projects',
      'webdevelopment': 'Web Development',
      'botdevelopment': 'Bot Development',
      'opensource': 'Open Source',
      'enterprisesoftware': 'Enterprise Software',
      'socialmediabot': 'Social Media Bots',
      'automation': 'Automation Tools'
    },
    buttons: {
      website: 'Live Website',
      repository: 'Source Code',
      npmpackage: 'NPM Package',
      viewProject: 'View Details'
    },
    noResults: {
      title: 'No projects found',
      description: 'Try modifying your search or filter criteria.'
    }
  },

  // About page
  about: {
    title: 'About Killian - Full Stack Developer',
    subtitle: 'Experienced web developer passionate about Vue.js, React, Node.js, and modern JavaScript technologies.',
    intro: {
      title: 'Professional Full Stack Developer',
      content: 'I\'m Killian, an experienced full stack developer specializing in JavaScript technologies. With expertise in Vue.js, React, Node.js, and TypeScript, I create scalable web applications, RESTful APIs, and real-time systems that exceed client expectations.'
    },
    skills: {
      title: 'Technical Skills & Expertise',
      programming: 'Programming Languages',
      frontend: 'Frontend Technologies',
      backend: 'Backend Technologies',
      tools: 'DevOps & Tools',
      systems: 'Operating Systems'
    },
    experience: {
      title: 'Professional Experience',
      content: 'Years of professional web development experience building enterprise applications, e-commerce platforms, SaaS products, and custom software solutions. Proven track record of delivering high-quality code on time and within budget.'
    },
    approach: {
      title: 'Development Philosophy',
      subtitle: 'My approach to full stack development focuses on clean code, scalable architecture, and exceptional user experience.',
      performance: {
        title: 'Performance-First Development',
        description: 'Optimized code, lazy loading, code splitting, and caching strategies. Achieving perfect Lighthouse scores and Core Web Vitals metrics.'
      },
      architecture: {
        title: 'Scalable Architecture',
        description: 'Microservices, serverless functions, and modular design patterns. Building applications that scale effortlessly with your business growth.'
      },
      quality: {
        title: 'Code Quality & Testing',
        description: 'Test-driven development (TDD), automated testing, continuous integration (CI/CD), and comprehensive code reviews ensuring bug-free deployments.'
      },
      collaboration: {
        title: 'Agile Collaboration',
        description: 'Excellent communication, agile methodologies, and transparent project management. Regular updates and collaborative problem-solving.'
      }
    },
    cta: {
      title: 'Looking for a Full Stack Developer?',
      description: 'Let\'s discuss your project requirements and build something amazing together.',
      button: 'Start a Conversation'
    }
  },

  // Fiverr page
  fiverr: {
    title: 'Professional Freelance Services on Fiverr',
    subtitle: 'Hire an expert developer for Discord bot development, Minecraft plugin creation, Telegram bot programming, and custom web development. Top-rated seller with 100% satisfaction guarantee.',
    profileCta: 'View My Fiverr Profile',
    stats: {
      rating: '5-Star Rating'
    },
    pricing: {
      startingAt: 'Starting at'
    },
    services: {
      title: 'Available Development Services',
      subtitle: 'Professional programming services with fast delivery and unlimited revisions. Custom solutions tailored to your specific needs.',
      features: 'Key Features',
      orderNow: 'Order on Fiverr',
      learnMore: 'View Details',
      moreFeatures: 'additional features',
      comingSoon: 'Coming Soon',
      available: 'Available Now'
    },
    serviceData: {
      'discord-bot': {
        title: 'Custom Discord Bot Development',
        description: 'Professional Discord bot development with advanced features, custom commands, and seamless integration. Transform your Discord server with powerful automation.',
        features: [
          'Advanced moderation system with auto-mod and logging',
          'Custom leveling system, economy, and role rewards',
          'Music player, games, and entertainment features',
          'API integrations (Twitter, YouTube, Twitch, OpenAI)',
          'Dashboard panel for easy configuration',
          'Database integration and data persistence',
          '24/7 hosting setup assistance included'
        ]
      },
      'minecraft-plugin': {
        title: 'Minecraft Plugin Development (Spigot/Paper)',
        description: 'Custom Minecraft plugin development for Spigot, Paper, and Bukkit servers. Professional Java programming for unique gameplay features.',
        features: [
          'Custom gameplay mechanics and minigames',
          'Economy systems and shop integrations',
          'Advanced permissions and rank systems',
          'Custom GUIs and inventory menus',
          'Database integration (MySQL/SQLite)',
          'Performance optimized for large servers',
          'Compatible with latest Minecraft versions'
        ]
      },
      'telegram-bot': {
        title: 'Telegram Bot Development Services',
        description: 'Professional Telegram bot creation with inline keyboards, automated responses, and API integrations. Perfect for businesses and communities.',
        features: [
          'Custom commands and inline keyboards',
          'Automated messaging and broadcasting',
          'User management and analytics',
          'Payment integration (Stripe, PayPal)',
          'Multi-language support',
          'Webhook and long polling support',
          'Admin panel for bot management'
        ]
      },
      'website-development': {
        title: 'Modern Website Development',
        description: 'Professional web development using Vue.js, React, and Node.js. Responsive design, SEO optimization, and lightning-fast performance.',
        features: [
          'Responsive design for all devices',
          'SEO optimization and Core Web Vitals',
          'Modern UI/UX with smooth animations',
          'API integration and backend development',
          'E-commerce and payment processing',
          'Content Management System (CMS)',
          'Free hosting setup and deployment'
        ]
      }
    },
    testimonials: {
      title: 'Client Reviews & Testimonials',
      subtitle: 'Join hundreds of satisfied clients who trust my development services. 100% satisfaction rate with 5-star reviews.'
    },
    cta: {
      title: 'Ready to Start Your Project?',
      subtitle: 'Professional development services with fast delivery, unlimited revisions, and ongoing support. Let\'s bring your ideas to life.',
      button: 'Browse All Services on Fiverr'
    }
  },

  // Contact page
  contact: {
    title: 'Contact Full Stack Developer',
    subtitle: 'Get in touch for web development projects, freelance work, or technical consultation. Free project estimation and consultation available.',
    stats: {
      responseTime: 'Quick Response',
      satisfaction: 'Client Satisfaction',
      collaboration: 'Global Reach'
    },
    quickContact: 'Quick Contact',
    findMeOn: 'Connect on Social Media',
    methods: {
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'Location',
      responseTime: 'Response within 24 hours',
      availability: 'Available for remote & freelance'
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Common questions about my web development services and working process.',
      responseTime: {
        title: 'What\'s your typical response time?',
        description: 'I respond to all inquiries within 24 hours. For urgent projects, I\'m available for immediate consultation.'
      },
      projectTypes: {
        title: 'What types of projects do you handle?',
        description: 'Full stack web applications, REST APIs, Discord bots, e-commerce sites, SaaS platforms, and custom software solutions using modern technologies.'
      },
      collaboration: {
        title: 'Do you work remotely?',
        description: 'Yes, I work with clients worldwide. Remote collaboration via Slack, Discord, Zoom, and project management tools. Flexible timezone availability.'
      }
    },
    form: {
      name: 'Your Name',
      email: 'Email Address',
      subject: 'Project Subject',
      message: 'Project Details',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully! I\'ll respond within 24 hours.',
      error: 'Error sending message. Please try again or email directly.',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address'
    },
    info: {
      title: 'Let\'s Build Something Great',
      description: 'Whether you need a Vue.js application, React website, Node.js API, or custom software solution, I\'m here to help bring your vision to life.',
      email: 'Email',
      social: 'Social Profiles'
    }
  },

  // Project data
  projectData: {
    'virtual-tour': {
      title: 'Virtual Tour Platform - 3D Interactive Experience',
      description: 'Interactive virtual tour platform built with Vue.js and Three.js. Immersive 3D experiences for real estate, museums, and businesses.',
      longDescription: 'Advanced virtual tour platform featuring 360-degree panoramas, interactive hotspots, and smooth navigation. Built with Vue.js for the frontend, Three.js for 3D rendering, and Node.js backend. Optimized for performance with lazy loading and WebGL acceleration. Perfect for real estate showcases, virtual museums, and business tours.'
    },
    'xinko': {
      title: 'Xinko - Multi-Platform Bot Framework',
      description: 'Versatile bot framework supporting Discord, Telegram, and Slack. Built with Node.js and TypeScript for scalable bot development.',
      longDescription: 'Xinko is a powerful multi-platform bot framework designed for developers. Features include unified API across platforms, plugin system, database abstraction, and comprehensive documentation. Built with Node.js, TypeScript, and modern JavaScript practices. Supports Discord.js, Telegram Bot API, and Slack SDK with a single codebase.'
    },
    'image-manipulation': {
      title: 'Image Manipulation API - NPM Package',
      description: 'Popular NPM package for programmatic image manipulation. Canvas-based image generation with 100k+ downloads and active community.',
      longDescription: 'Comprehensive image manipulation library for Node.js applications. Features include meme generation, filters, effects, text overlay, and format conversion. Originally developed as a REST API, now available as an open-source NPM package. Used by Discord bots, web applications, and automation tools. Supports JPG, PNG, GIF, and WebP formats with streaming capabilities.'
    },
    'primate-web-admin': {
      title: 'Primate Web Admin - Enterprise Deployment Tool',
      description: 'Modern web interface for Primate deployment system. Enterprise-grade software deployment and management for Windows infrastructure.',
      longDescription: 'Professional web administration panel for Primate, a Munki-like deployment tool for Windows environments. Built with Vue.js frontend and RESTful API backend. Features include package management, deployment scheduling, client monitoring, and detailed reporting. Designed for IT administrators managing large Windows deployments with role-based access control and audit logging.'
    },
    'instagram-bot': {
      title: 'Instagram Bot - Automated Content Generation',
      description: 'Feature-rich Instagram bot with image generation commands. Built with Insta.js for stories, posts, and DM automation.',
      longDescription: 'Advanced Instagram automation bot developed with Insta.js framework. Features custom image generation commands (!stonk, !invert, !meme), story interactions, automated posting, and DM management. Includes rate limiting, proxy support, and account safety features. Perfect for content creators and social media managers looking to automate their Instagram presence.'
    },
    'crowdin-status-bot': {
      title: 'Crowdin Status Bot - Translation Progress Tracker',
      description: 'Discord bot for real-time Crowdin translation monitoring. Automated status updates and progress tracking for localization teams.',
      longDescription: 'Specialized Discord bot that integrates with Crowdin API to provide real-time translation progress updates. Features include automated status messages, progress bars, contributor leaderboards, and milestone notifications. Essential tool for open-source projects and localization teams managing translations across multiple languages. Supports webhooks and custom notification rules.'
    }
  },

  // Footer
  footer: {
    navigation: 'Quick Links',
    services: 'Services',
    copyright: 'All rights reserved.',
    legalNotices: 'Legal Notices',
    privacyPolicy: 'Privacy Policy',
    servicesList: {
      webDev: 'Web Development',
      mobileApps: 'Mobile Apps',
      apiBackend: 'API Development',
      consulting: 'Tech Consulting'
    }
  },

  // Common
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    reset: 'Reset'
  },

  // SEO
  seo: {
    home: {
      title: 'Killian - Full Stack Developer | Vue.js, React, Node.js Expert',
      description: 'Professional Full Stack Developer specializing in Vue.js, React, Node.js. Expert in web applications, Discord bots, and custom software. Hire me for your next project.'
    },
    projects: {
      title: 'Web Development Portfolio - Killian | Full Stack Projects',
      description: 'Browse my portfolio of Vue.js applications, React websites, Node.js APIs, and Discord bots. Real examples of modern web development and clean code architecture.'
    },
    about: {
      title: 'About Killian - Experienced Full Stack Developer',
      description: 'Learn about my expertise in Vue.js, React, Node.js, and modern web development. Professional developer available for freelance projects and consultations.'
    },
    contact: {
      title: 'Contact Full Stack Developer - Killian | Hire Web Developer',
      description: 'Contact me for web development projects, Vue.js applications, React websites, or Node.js APIs. Free consultation and project estimation available.'
    },
    fiverr: {
      title: 'Fiverr Services - Discord Bot & Web Development | Killian',
      description: 'Professional freelance services on Fiverr. Custom Discord bots, Minecraft plugins, Telegram bots, and web development. Top-rated seller with 100% satisfaction.'
    }
  }
}
