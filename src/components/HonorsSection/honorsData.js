// Honors, Certifications, and Testimonials Data

export const HONORS_HEADING = "Honors, Certifications & Testimonials";
export const HONORS_SUBHEADING = "Industry credentials, performance awards, and client/colleague recognitions";

export const certificationsList = [
  {
    id: "safe-6",
    title: "SAFe® 6 Practitioner",
    issuer: "Scaled Agile, Inc.",
    badge: `${process.env.PUBLIC_URL || ''}/assets/skill-images/safe6_badge.png`,
    period: "Issued Nov 2022 • Active",
    verificationUrl: "https://www.scaledagile.com",
    category: "Agile & Enterprise Delivery",
    brandColor: "#0284c7",
    description: "Certified SAFe® 6 Practitioner specializing in Lean-Agile scaling, Program Increment (PI) execution, cross-functional dependency management, and enterprise delivery.",
    highlights: ["Lean-Agile Architecture", "PI Planning", "Enterprise CI/CD", "Cross-Team Alignment"],
  },
];

export const awardsList = [
  {
    id: "bravo-2023",
    title: "Bravo Award (Excellence in Engineering)",
    issuer: "Tech Mahindra",
    badge: `${process.env.PUBLIC_URL || ''}/assets/skill-images/bravo_award.png`,
    period: "September 2023",
    category: "Performance Recognition",
    brandColor: "#f59e0b",
    description: "Awarded for outstanding technical contribution, zero-defect release cycles, and optimizing complex native iOS features for Bell Canada mobile applications.",
    highlights: ["Sprint Hero", "Zero-Defect Delivery", "Performance Optimization"],
  },
  {
    id: "bravo-2022",
    title: "Bravo Award (High Impact Delivery)",
    issuer: "Tech Mahindra",
    badge: `${process.env.PUBLIC_URL || ''}/assets/skill-images/bravo_award.png`,
    period: "March 2022",
    category: "Performance Recognition",
    brandColor: "#f59e0b",
    description: "Recognized for proactive initiative, leading client demos, and seamless GraphQL API integrations under tight enterprise release schedules.",
    highlights: ["Client Commendation", "GraphQL Integration", "Quality Champion"],
  },
];

export const testimonialsList = [
  {
    id: "testimonial-1",
    author: "Engineering Lead",
    role: "Lead iOS Architect",
    company: "Enterprise Telecom Project",
    date: "October 2024",
    avatarFallback: "EL",
    text: "Shivansh has been an invaluable iOS engineer on our enterprise applications. His deep grasp of Swift, Combine, and clean UI architecture helped us consistently deliver robust, high-performance features on schedule.",
    fullReview:
      "Shivansh has been an invaluable iOS engineer across our enterprise client projects. His deep grasp of modern Swift, reactive programming with Combine, and clean modular UI architecture allowed our team to consistently hit tight delivery milestones with zero defect leakage. Beyond technical prowess, his proactive communication, clear pull requests, and dedication to accessibility standards make him a standout developer in any native iOS squad.",
    badgeText: "Verified Colleague",
    relationship: "Worked directly with Shivansh on Enterprise Telecom Apps",
  },
  {
    id: "testimonial-2",
    author: "Senior Product Manager",
    role: "Product Owner",
    company: "Consumer Mobile Telecom",
    date: "July 2024",
    avatarFallback: "PM",
    text: "An exceptional developer who bridges product vision and technical feasibility effortlessly. Shivansh's attention to detail, accessibility compliance, and proactive problem solving set a high bar for the team.",
    fullReview:
      "Shivansh is one of the rare mobile engineers who truly understands the user experience and business impact of every feature he builds. Whenever we scoped complex requirements or tricky third-party integrations, Shivansh would come back with elegant architectural solutions, interactive prototypes, and precise effort estimations. Working with him was a genuine pleasure and gave our product team immense confidence during major public releases.",
    badgeText: "Client Endorsement",
    relationship: "Managed product roadmap alongside Shivansh",
  },
  {
    id: "testimonial-3",
    author: "Scrum Master & Agile Coach",
    role: "SAFe Agile Lead",
    company: "Tech Mahindra",
    date: "December 2023",
    avatarFallback: "SM",
    text: "Shivansh's SAFe 6 mindset and proactive ownership in PI planning ensure seamless sprint execution and zero-defect deliveries across distributed teams.",
    fullReview:
      "Throughout multiple Program Increments (PIs), Shivansh demonstrated exemplary Agile discipline. He actively resolved cross-team blockers, accurately pointed sprint stories, and championed sprint retrospectives. His ability to deliver mission-critical features without compromising code quality earned him two prestigious Bravo Awards within our business unit.",
    badgeText: "Agile Champion",
    relationship: "Coached Agile sprint ceremonies with Shivansh",
  },
  {
    id: "testimonial-4",
    author: "Senior QA Automation Lead",
    role: "QA Lead",
    company: "Mobile Banking Squad",
    date: "May 2023",
    avatarFallback: "QA",
    text: "Working with Shivansh is a breeze. His unit test coverage with XCTest and clean code architecture make release cycles smooth and reliable.",
    fullReview:
      "From a Quality Assurance perspective, code coming from Shivansh was always a gold standard. He wrote comprehensive unit tests with XCTest, handled edge-case error boundaries rigorously, and actively collaborated during regression test runs. He is a phenomenal team player who cares deeply about app stability.",
    badgeText: "Team Commendation",
    relationship: "Validated native iOS releases engineered by Shivansh",
  },
];
