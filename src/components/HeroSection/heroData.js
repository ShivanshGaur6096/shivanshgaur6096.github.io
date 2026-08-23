export const heroContent = {
  name: 'Shivansh Gaur',
  initialSubtitle: 'iOS Developer',
  paragraph:
    'I craft native iOS experiences for apps used by millions. Currently building at Natwest, previously shaped products at BlackNGreen and Tech Mahindra.',
  hintText: 'tap to discover more about me',
  resumeUrl: `${process.env.PUBLIC_URL || ''}/assets/resume/Shivansh_Gaur_Resume.pdf`,
};

export const descriptorItems = [
  'iOS Developer',
  'Software Engineer',
  'Swift Enthusiast',
  'Good Cook',
  'Excellent Baker',
  'Technical TT Player',
  'Nature Lover',
  'Homo Sapien',
  'Vegetarian',
  'Blind in Love',
];

export const endMessages = [
  'Alright, you know enough. Scroll down to see the real stuff.',
  "Careful — learning too much won't make us friends.",
  "That's the full list. Now go explore the rest.",
  "Still here? There's way more to see below.",
];

export const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/ShivanshGaur6096',
    brandColor: '#8b5cf6', // purple
    ariaLabel: 'GitHub',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shivanshgaur',
    brandColor: '#0077b5', // linkedin blue
    ariaLabel: 'LinkedIn',
  },
  {
    name: 'Email',
    href: 'mailto:shivanshgaur96@gmail.com',
    brandColor: '#ea4335', // email red
    ariaLabel: 'Email',
  },
];

export const animationTimeline = {
  typewriter: {
    startDelay: 0,
    duration: 2500, // ms - smooth, readable typing
  },
  icons: {
    stagger: 400, // ms between each icon entrance
    pulseDuration: 350, // ms per icon pulse
    grayTransition: 150, // ms to fade to gray
  },
  button: {
    typePhase1: 500, // "OR JUST" typing duration
    pauseDuration: 400, // pause before delete
    deletePhase: 350, // deletion duration
    typePhase2: 450, // "Resume" typing duration
  },
  hint: {
    appearDelay: 500, // ms after complete phase
    fadeDuration: 400, // opacity transition
  },
  shuffle: {
    duration: 400, // ms
  },
};
