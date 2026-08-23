// Experience, Education, and Certification Data for ExperienceSection

export const EXPERIENCE_HEADING = "Experience & Education";
export const EXPERIENCE_SUBHEADING = "My professional journey, academic foundation, and technical milestones";

export const experiencesData = [
  {
    id: "natwest-current",
    company: "NatWest Group",
    role: "iOS Software Engineer",
    location: "Gurugram, India",
    period: "Nov, 2025 - Present",
    isCurrent: true,
    brandColor: "#7c3aed", // Violet / Royal Purple
    accentColor: "#a78bfa",
    logo: `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/NWG.svg`,
    previewImage: `${process.env.PUBLIC_URL || ''}/assets/project-images/natwest/image-1.webp`,
    description: "Architecting and engineering core native iOS banking experiences for millions of UK customers with strict security, high transaction throughput, and CI/CD pipelines.",
    skills: ["Swift", "UIKit", "Combine", "CI/CD", "Banking Security"],
  },
  {
    id: "blackngreen",
    company: "blackNgreen",
    role: "iOS Software Engineer",
    location: "Gurugram, India",
    period: "Nov, 2023 - Nov, 2025",
    isCurrent: false,
    brandColor: "#10b981", // Emerald Green
    accentColor: "#34d399",
    logo: `${process.env.PUBLIC_URL || ''}/assets/experience-logos/blackNgreen-logo.png`,
    previewImage: `${process.env.PUBLIC_URL || ''}/assets/project-images/magic-call/image-1.webp`,
    description: "Developed voice-changing and VoIP telecom applications (MagicCall) featuring real-time audio DSP, WebRTC, CallKit, and in-app purchase subscriptions serving millions of active users.",
    skills: ["Swift", "CallKit", "WebRTC", "Audio DSP", "StoreKit"],
  },
  {
    id: "tech-mahindra",
    company: "Tech Mahindra",
    role: "Software Engineer",
    location: "Noida, India",
    period: "Feb, 2021 - Nov, 2023",
    isCurrent: false,
    brandColor: "#e11d48", // Crimson / Tech Red
    accentColor: "#fb7185",
    logo: `${process.env.PUBLIC_URL || ''}/assets/experience-logos/tech-mahindra.png`,
    previewImage: `${process.env.PUBLIC_URL || ''}/assets/project-images/bell-canada/image-1.webp`,
    description: "Engineered scalable native iOS features for enterprise telecom clients (Bell Canada, Virgin Plus, PC Mobile) with GraphQL integration, accessibility compliance, and agile delivery.",
    skills: ["Swift", "UIKit", "GraphQL", "Accessibility", "SAFe Agile"],
  },
];

export const educationData = [
  {
    id: "amity",
    institution: "Amity University, Noida",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2016 - 2020",
    brandColor: "#f59e0b", // Warm Yellow / Gold
    accentColor: "#fbbf24",
    logo: `${process.env.PUBLIC_URL || ''}/assets/experience-logos/amity_university.png`,
    description: "Graduated with comprehensive foundations in Computer Science, Data Structures, Algorithms, Software Engineering, and Mobile Application Development.",
  },
  {
    id: "radiant-12",
    institution: "Radiant Stars English School, Aligarh",
    degree: "Senior Secondary (12th Grade) • CBSE Board",
    period: "2014 - 2016",
    brandColor: "#3b82f6", // Electric Blue
    accentColor: "#60a5fa",
    logo: `${process.env.PUBLIC_URL || ''}/assets/experience-logos/radiant-stars-english-school.png`,
    description: "Completed Senior Secondary education with Physics, Chemistry, Mathematics, and Computer Science.",
  },
  {
    id: "radiant-10",
    institution: "Radiant Stars English School, Aligarh",
    degree: "High School (10th Grade) • CBSE Board",
    period: "2012 - 2014",
    brandColor: "#3b82f6", // Electric Blue
    accentColor: "#60a5fa",
    logo: `${process.env.PUBLIC_URL || ''}/assets/experience-logos/radiant-stars-english-school.png`,
    description: "Completed High School education with distinction under the Central Board of Secondary Education (CBSE).",
  },
];

export const certificationsData = [
  {
    id: "safe6",
    title: "SAFe 6 Practitioner",
    issuer: "Scaled Agile, Inc.",
    badge: `${process.env.PUBLIC_URL || ''}/assets/skill-images/safe6_badge.png`,
    details: "Certified SAFe® 6 Practitioner for enterprise agile delivery at scale.",
  },
  {
    id: "bravo-2",
    title: "Bravo Award (2023)",
    issuer: "Tech Mahindra",
    badge: `${process.env.PUBLIC_URL || ''}/assets/skill-images/bravo_award.png`,
    details: "Awarded for outstanding technical contribution and delivering high-impact client milestones.",
  },
  {
    id: "bravo-1",
    title: "Bravo Award (2022)",
    issuer: "Tech Mahindra",
    badge: `${process.env.PUBLIC_URL || ''}/assets/skill-images/bravo_award.png`,
    details: "Recognized for excellence in native iOS development and bug-free release execution.",
  },
];
