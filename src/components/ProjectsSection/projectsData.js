// Data definitions for ProjectsSection

export const PROJECTS_HEADING = "What I've Built";
export const PROJECTS_SUBHEADING = 'Selected iOS products, flagship apps & developer experiments';
export const PROJECTS_LIVE_BADGE = 'Live App Store telemetry & metrics synced via Apple Store API';

export const projectCards = [
  {
    id: 'natwest',
    title: 'NatWest Bankline Mobile',
    role: 'iOS Developer (Current)',
    ecosystemCount: 2,
    description:
      'Building and maintaining the commercial & business banking application for UK corporate clients with biometric auth, payment authorisations, and enterprise security.',
    brandColor: '#3c1053',
    techStack: ['Swift', 'UIKit', 'Combine', 'CI/CD'],
    logo: `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/NWG.svg`,
    previewImage: `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-1.webp`,
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-1.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-2.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-3.webp`,
    ],
    appStoreId: '1441798359',
    storeCountry: 'gb',
    developerId: '990584386',
    appStoreLink: 'https://apps.apple.com/gb/app/natwest-bankline-mobile/id1441798359',
    detailType: 'multi',
  },
  {
    id: 'bell',
    title: 'Bell Mobile Suite',
    role: 'iOS Developer',
    ecosystemCount: 3,
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
    appStoreId: '850549838',
    storeCountry: 'ca',
    appStoreLink: 'https://apps.apple.com/ca/app/mybell/id850549838',
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
    appStoreId: '1324524338',
    storeCountry: 'us',
    appStoreLink: 'https://apps.apple.com/us/app/magiccall-funny-calling-app/id1324524338',
    detailType: 'multi',
  },
  {
    id: 'ai-voice-assistant',
    title: 'AI Voice Assistant',
    role: 'Confidential • In Development',
    description:
      'Confidential on-device voice assistant for a high-value client. Initiated architecture, CoreML integration, and real-time speech synthesis.',
    brandColor: '#8b5cf6',
    techStack: ['Swift', 'Speech', 'CoreML', 'NLP'],
    logo: null,
    previewImage: `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot3.png`,
    screenshots: [],
    appStoreId: null,
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
    appStoreId: null,
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
    heading: 'NatWest Bankline Mobile',
    body: 'Developing high-impact native iOS features for NatWest’s premier commercial and business banking application, serving UK enterprise clients with robust biometric security, multi-authorisation payment workflows, and real-time transaction tracking.\n\nArchitected modular SwiftUI and UIKit components integrated into a multi-repository enterprise architecture. Led initiatives to enhance biometric authentication flows (Face ID / Touch ID), real-time international payment processing, and Bankline transaction tracking.\n\nCollaborated with cross-functional design, security, and backend teams across the UK and India to maintain 99.99% crash-free sessions while delivering high-accessibility WCAG AAA compliance and enterprise-grade encryption for sensitive financial records.',
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-1.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-2.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-3.webp`,
    ],
    appStoreId: '1441798359',
    storeCountry: 'gb',
    appStoreLink: 'https://apps.apple.com/gb/app/natwest-bankline-mobile/id1441798359',
    subProjects: [
      {
        name: 'NatWest Mobile Banking',
        appStoreId: '334855322',
        storeCountry: 'gb',
        description: 'Retail & personal banking flagship app for millions of UK customers',
        appStoreLink: 'https://apps.apple.com/gb/app/natwest-mobile-banking/id334855322',
      },
      {
        name: 'Royal Bank Bankline Mobile',
        appStoreId: '1623181355',
        storeCountry: 'gb',
        description: 'Commercial & corporate banking companion app for RBS customers',
        appStoreLink: 'https://apps.apple.com/gb/app/royal-bank-bankline-mobile/id1623181355',
      },
    ],
  },
  bell: {
    heading: 'Bell Canada Application Suite',
    body: 'Collaborated on flagship telecommunication apps serving millions across Canada. Engineered scalable modular architectures, dynamic shop tabs, GraphQL queries, and bilingual WCAG-compliant accessible flows.\n\nDelivered cross-brand multi-tenant component libraries unified across Bell, Virgin Plus, PC Mobile, and Lucky Mobile to drastically reduce code duplication.',
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-1.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-2.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-3.webp`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/bell/image-4.webp`,
    ],
    appStoreId: '850549838',
    storeCountry: 'ca',
    appStoreLink: 'https://apps.apple.com/ca/app/mybell/id850549838',
    subProjects: [
      {
        name: 'Virgin Plus',
        appStoreId: '853116586',
        storeCountry: 'ca',
        description: 'Dynamic shop tabs & high-conversion plan management',
        logo: `${process.env.PUBLIC_URL || ''}/assets/project-images/virgin-plus/virgin-plus-logo.png`,
        appStoreLink: 'https://apps.apple.com/ca/app/virgin-plus-my-account/id853116586',
      },
      {
        name: 'PC Mobile',
        appStoreId: '1439611408',
        storeCountry: 'ca',
        description: 'Prepaid balance tracking & account reloads',
        logo: `${process.env.PUBLIC_URL || ''}/assets/project-images/pc-mobile/pc-mobile-logo.png`,
        appStoreLink: 'https://apps.apple.com/ca/app/my-pc-mobile-prepaid/id1439611408',
      },
      {
        name: 'Lucky Mobile',
        appStoreId: '1459173378',
        storeCountry: 'ca',
        description: 'Self-serve data add-ons & subscription wallet',
        logo: `${process.env.PUBLIC_URL || ''}/assets/project-images/lucky-mobile/lucky-mobile-logo.png`,
        appStoreLink: 'https://apps.apple.com/ca/app/lucky-mobile-my-account/id1459173378',
      },
    ],
  },
  magiccall: {
    heading: 'MagicCall - Real-time Voice Changer',
    body: 'Over 10M+ downloads worldwide. Real-time pitch modulation, background sound effect playback during live phone calls, custom StoreKit in-app subscription funnels, and low-latency WebRTC streams.\n\nEngineered resilient background audio session management with CoreAudio and CallKit, handling rapid network transitions without call drops.',
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot1.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot2.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot3.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot4.png`,
      `${process.env.PUBLIC_URL || ''}/assets/project-images/magiccall/screenshot5.png`,
    ],
    appStoreId: '1324524338',
    storeCountry: 'us',
    appStoreLink: 'https://apps.apple.com/us/app/magiccall-funny-calling-app/id1324524338',
    subProjects: [],
  },
  'ai-voice-assistant': {
    heading: 'AI Voice Assistant',
    body: 'A confidential on-device conversational agent currently in active development for a high-value enterprise client.\n\nInitiated and architected the early foundation integrating Apple Speech framework, CoreML on-device inference, and low-latency audio processing.',
    screenshots: [],
    appStoreId: null,
    appStoreLink: null,
    subProjects: [],
  },
  portfolio: {
    heading: 'Personal Portfolio Architecture',
    body: 'Hand-crafted from scratch with React 19, vanilla CSS tokens, and Framer Motion orchestration. Built to demonstrate senior iOS engineering aesthetic, interaction polish, and accessibility.',
    screenshots: [
      `${process.env.PUBLIC_URL || ''}/assets/project-images/portfolio-image/hero-mobile.PNG`,
    ],
    appStoreId: null,
    appStoreLink: null,
    subProjects: [],
  },
};

export const VISITED_LINKS_STORAGE_KEY = 'portfolio-github-visited';
