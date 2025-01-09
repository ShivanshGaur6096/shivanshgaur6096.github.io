// Static data for Skills, Projects, Experiences, and Achievements

// Skills categorized by type
export const skillsData = {
    "Languages": ["Swift", "SwiftUI", "Obj-C", "ReactJS", "HTML","CSS","JavaScript"],
    Libraries: [
      "Core Data",
      "XCTest",
      "StoreKit",
      "CallKit",
      "WebRtc",
      "CoreML",
      "Text-To-Speech and Speech-to-Text"
    ],
    "Dependency Managers": ["CocoaPods", "Carthage", "Swift Package Manager (SPM)"],
    Tools: ["Xcode", "Instruments", "Figma", "Adobe XD", "Visual Studio Code"],
    "Architecture Pattern": ["MVC", "MVVM", "VIPER", "Clean Architecture"],
    "Version Control": ["Git", "CI/CD", "GitHub", "Bitbucket", "GitLab", "SourceTree"],
    Skills: [
      "App Publishing",
      "Firebase",
      "Auto Layout",
      "Memory Management",
      "System Design",
      "Caching",
      "Networking",
      "Accessibility",
      "Payment Gateways Integration",
      "Dependency Management",
    ],
    "Backend & APIs": [
      "Restful APIs",
      "Kafka",
      "WebSockets",
      "Firebase Auth",
      "Firebase Database",
      "Firebase Analytics",
    ],
    "Cross-Platform Development": ["React Native"],
    Notifications: ["Push Notifications"],
    "Analytics & Monitoring": ["Firebase Analytics", "Kafka Elastic", "Dynatrace", "Omniture",],
    "Spoken Languages": ["Hindi", "English", "German"],
  };
  
  // Projects data
  export const projects = [
    {
      name: "MagicCall",
      logo: `${process.env.PUBLIC_URL}/assets/project-images/magiccall/magiccall-banner.png`,
      description: `
        The era of boring conversations is over, so add some spice to your calls.
        Now decide how you want to be heard. Change your voice on call in real-time
        and create hilarious conversations with your friends and family.
        <br><br>
        Site URL: <a href="https://magiccall.co/" target="_blank">MagicCall Website</a>
      `,
      iosLink: "https://apps.apple.com/in/app/magiccall-funny-calling-app/id1324524338",
      screenshots: [
        "assets/project-images/magiccall/screenshot1.png",
        "assets/project-images/magiccall/screenshot2.png",
        "assets/project-images/magiccall/screenshot3.png",
        "assets/project-images/magiccall/screenshot4.png",
        "assets/project-images/magiccall/screenshot5.png",
      ],
    },
    {
      name: "Bell",
      logo: `${process.env.PUBLIC_URL}/assets/project-images/bell/bell-logo.png`,
      description: `
        Collaborated on enhancement efforts for Bell Canada's flagship applications.
        Improved user engagement through advanced technologies and inclusive design.
        <br><br>
        Site URL: <a href="https://www.bell.ca/Mobility" target="_blank">Bell Mobility</a>
      `,
      iosLink: "https://apps.apple.com/ca/app/mybell/id850549838",
      screenshots: [],
    },
    {
      name: "Virgin Plus",
      logo: `${process.env.PUBLIC_URL}/assets/project-images/virgin-plus/virgin-plus-logo.png`,
      description: `
        Revolutionized user engagement for Virgin Plus apps by implementing dynamic Shop Tabs
        and cutting-edge GraphQL-based APIs for seamless data manipulation.
        <br><br>
        Site URL: <a href="https://www.virginplus.ca/en/home/index.html" target="_blank">Virgin Plus</a>
      `,
      iosLink: "https://apps.apple.com/ca/app/virgin-plus-my-account/id853116586",
      screenshots: [],
    },
    {
      name: "Lucky Mobile",
      logo: `${process.env.PUBLIC_URL}/assets/project-images/lucky-mobile/lucky-mobile-logo.png`,
      description: `
        Site URL: <a href="https://www.luckymobile.ca/" target="_blank">Lucky Mobile Website</a>
      `,
      iosLink: "https://apps.apple.com/ca/app/lucky-mobile-my-account/id1459173378",
      screenshots: [],
    },
    {
      name: "PC Mobile",
      logo: `${process.env.PUBLIC_URL}/assets/project-images/pc-mobile/pc-mobile-logo.png`,
      description: `
        Site URL: <a href="https://www.pcmobile.ca/en/" target="_blank">PC Mobile Website</a>
      `,
      iosLink: "https://apps.apple.com/ca/app/my-pc-mobile-prepaid/id1439611408",
      screenshots: [],
    },
  ];
  
  // Experience data
  export const experiences = [
    {
      logo: `${process.env.PUBLIC_URL}/assets/experience-logos/blackNgreen-logo.png`,
      title: "Tech Mahindra",
      position: "Software Engineer",
      period: "Nov, 2023 - Present",
    },
    {
      logo: `${process.env.PUBLIC_URL}/assets/experience-logos/tech-mahindra.png`,
      title: "Tech Mahindra",
      position: "Software Engineer",
      period: "Feb, 2021 - Nov, 2023",
    },
    {
      logo: `${process.env.PUBLIC_URL}/assets/experience-logos/tech-mahindra.png`,
      title: "Tech Mahindra",
      position: "Software Engineer, Trainee",
      period: "Nov, 2020 - Feb, 2021",
    },
  ];
  
  // Education data
  export const educations = [
    {
      logo: `${process.env.PUBLIC_URL}/assets/experience-logos/amity_university.png`,
      title: "Amity University, Noida",
      degree: "B.Tech",
      period: "2016-2020",
    },
    {
      logo: `${process.env.PUBLIC_URL}/assets/experience-logos/radiant-stars-english-school.png`,
      title: "Radiant Stars English School, Aligarh",
      degree: "12th",
      period: "2014-2016",
    },
    {
      logo: `${process.env.PUBLIC_URL}/assets/experience-logos/radiant-stars-english-school.png`,
      title: "Radiant Stars English School, Aligarh",
      degree: "10th",
      period: "2012-2014",
    },
  ];
  
  // Achievements data
  export const achievements = [
    {
      badge: `${process.env.PUBLIC_URL}/assets/skill-images/safe6_badge.png`,
      title: "SAFe 6 Practitioner",
      details: "Certificate ID: xxxxxxxxxxx",
    },
    {
      badge: `${process.env.PUBLIC_URL}/assets/skill-images/bravo_award.png`,
      title: "Bravo Award",
      details: "Date: 03/2022",
    },
    {
      badge: `${process.env.PUBLIC_URL}/assets/skill-images/bravo_award.png`,
      title: "Bravo Award",
      details: "Date: 09/2023",
    },
  ];
  