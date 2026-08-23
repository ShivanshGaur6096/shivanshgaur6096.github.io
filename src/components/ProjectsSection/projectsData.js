// Data definitions for ProjectsSection

export const PROJECTS_HEADING = "What I've Built";
export const PROJECTS_SUBHEADING = 'Selected iOS products, flagship apps & developer experiments';

export const projectCards = [
  {
    id: 'natwest',
    title: 'Natwest',
    role: 'iOS Developer',
    description:
      'Building and maintaining the flagship banking app for millions of UK customers with high-frequency secure transactions.',
    brandColor: '#3c1053',
    techStack: ['Swift', 'UIKit', 'Combine', 'CI/CD'],
    logo: `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/NWG.svg`,
    previewImage: `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-1.webp`,
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-1.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-2.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-3.webp`,
    ],
    appStoreLink: 'https://apps.apple.com/gb/app/natwest/id334855498',
    detailType: 'multi',
  },
  {
    id: 'magiccall',
    title: 'MagicCall',
    role: 'iOS Developer',
    description:
      'Voice-changing calling app with real-time audio processing, background VoIP routing, and millions of active downloads.',
    brandColor: '#D71C2B',
    techStack: ['Swift', 'CallKit', 'WebRTC', 'StoreKit'],
    logo: `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/blackngreen-logo.jpg`,
    previewImage: `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot1.png`,
    mobilePreviewImage: `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/magiccall-banner.png`,
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot1.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot2.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot3.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot4.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot5.png`,
    ],
    appStoreLink: 'https://apps.apple.com/in/app/magiccall-funny-calling-app/id1324524338',
    detailType: 'multi',
  },
  {
    id: 'bell',
    title: 'Bell Mobile Suite',
    role: 'iOS Developer',
    description:
      'Flagship telecom application suite serving millions of Canadian subscribers across Bell, Virgin Plus, PC Mobile, and Lucky Mobile.',
    brandColor: '#0066A4',
    techStack: ['Swift', 'GraphQL', 'Accessibility', 'SAFe'],
    logo: `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/bell-logo.png`,
    previewImage: `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-1.webp`,
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-1.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-2.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-3.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-4.webp`,
    ],
    appStoreLink: 'https://apps.apple.com/ca/app/mybell/id850549838',
    detailType: 'multi',
  },
  {
    id: 'ai-voice-assistant',
    title: 'AI Voice Assistant',
    role: 'Personal Project',
    description:
      'An intelligent on-device voice assistant leveraging modern speech recognition, natural language processing, and local CoreML models.',
    brandColor: '#8b5cf6',
    techStack: ['Swift', 'Speech', 'CoreML', 'NLP'],
    logo: null,
    previewImage: `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot3.png`,
    screenshots: [],
    appStoreLink: null,
    detailType: 'single',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    role: 'Creator & Architect',
    description:
      'A dark-mode-first personal website engineered with React 19, Framer Motion, and design tokens — technical precision meets personality.',
    brandColor: '#3b82f6',
    techStack: ['React', 'Framer Motion', 'CSS Custom Properties', 'Responsive'],
    logo: null,
    previewImage: `${process.env.PUBLIC_URL || ''}/assets/project-images/portfolio-image/hero-mobile.PNG`,
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/portfolio-image/hero-mobile.PNG`,
    ],
    appStoreLink: null,
    detailType: 'single',
    customLink: {
      label: 'View Source',
      url: 'https://github.com/ShivanshGaur6096/shivanshgaur6096.github.io',
    },
  },
];

export const githubCard = {
  id: 'github-projects',
  title: 'Open Source & Experiments',
  role: 'GitHub Repositories',
  description: 'Interactive demos, SwiftUI experiments, and sensor sandbox utilities.',
  repos: [
    {
      id: 'iphone-sensors',
      name: 'iPhone Sensors Demo',
      description: 'CoreMotion, Proximity & Gyroscope testing suite in Swift',
      url: 'https://github.com/ShivanshGaur6096/iPhone-Sensors-Demo',
    },
    {
      id: 'ios-portfolio-src',
      name: 'Portfolio Source Code',
      description: 'React 19 portfolio architecture & custom animation hooks',
      url: 'https://github.com/ShivanshGaur6096/shivanshgaur6096.github.io',
    },
  ],
  profileUrl: 'https://github.com/ShivanshGaur6096',
};

export const projectDetails = {
  natwest: {
    heading: 'Natwest Flagship Mobile',
    body: 'Developing high-impact native iOS features for one of the UK’s premier banking applications, serving millions of daily active users with robust security, accessibility, and modern reactive patterns.\n\nArchitected modular SwiftUI and UIKit components integrated into a multi-repository enterprise architecture. Led initiatives to enhance biometric authentication flows (Face ID / Touch ID), real-time international payment processing, and Bankline transaction tracking.\n\nCollaborated with cross-functional design, security, and backend teams across the UK and India to maintain 99.99% crash-free sessions while delivering high-accessibility WCAG AAA compliance and enterprise-grade encryption for sensitive financial records.',
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-1.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-2.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-3.webp`,
    ],
    appStoreLink: 'https://apps.apple.com/gb/app/natwest/id334855498',
    subProjects: [],
  },
  magiccall: {
    heading: 'MagicCall - Real-time Voice Changer',
    body: 'Over 10M+ downloads. Real-time pitch modulation, background sound effect playback during live phone calls, custom StoreKit in-app subscription funnels, and low-latency WebRTC streams.',
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot1.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot2.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot3.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot4.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot5.png`,
    ],
    appStoreLink: 'https://apps.apple.com/in/app/magiccall-funny-calling-app/id1324524338',
    subProjects: [],
  },
  bell: {
    heading: 'Bell Canada Application Suite',
    body: 'Collaborated on flagship telecommunication apps serving millions across Canada. Engineered scalable modular architectures, dynamic shop tabs, GraphQL queries, and bilingual WCAG-compliant accessible flows.',
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-1.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-2.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-3.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-4.webp`,
    ],
    appStoreLink: 'https://apps.apple.com/ca/app/mybell/id850549838',
    subProjects: [
      {
        name: 'Virgin Plus',
        description: 'Dynamic shop tabs & high-conversion plan management',
        logo: `${process.env.PUBLIC_URL || ''}/assets/project-images/virgin-plus/virgin-plus-logo.png`,
        appStoreLink: 'https://apps.apple.com/ca/app/virgin-plus-my-account/id853116586',
      },
      {
        name: 'PC Mobile',
        description: 'Prepaid balance tracking & account reloads',
        logo: `${process.env.PUBLIC_URL || ''}/assets/project-images/pc-mobile/pc-mobile-logo.png`,
        appStoreLink: 'https://apps.apple.com/ca/app/my-pc-mobile-prepaid/id1439611408',
      },
      {
        name: 'Lucky Mobile',
        description: 'Self-serve data add-ons & subscription wallet',
        logo: `${process.env.PUBLIC_URL || ''}/assets/project-images/lucky-mobile/lucky-mobile-logo.png`,
        appStoreLink: 'https://apps.apple.com/ca/app/lucky-mobile-my-account/id1459173378',
      },
    ],
  },
  'ai-voice-assistant': {
    heading: 'AI Voice Assistant',
    body: 'An on-device intelligent conversational agent integrating Apple Speech framework, CoreML transformers, and natural audio synthesis for swift hands-free commands.',
    screenshots: [],
    appStoreLink: null,
    subProjects: [],
  },
  portfolio: {
    heading: 'Personal Portfolio Architecture',
    body: 'Hand-crafted from scratch with React 19, vanilla CSS tokens, and Framer Motion orchestration. Built to demonstrate senior iOS engineering aesthetic, interaction polish, and accessibility.',
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/portfolio-image/hero-mobile.PNG`,
    ],
    appStoreLink: null,
    subProjects: [],
  },
};

export const VISITED_LINKS_STORAGE_KEY = 'portfolio-github-visited';
