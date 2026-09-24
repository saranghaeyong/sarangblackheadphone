export interface ProjectInvestigation {
  title: string;
  description: string;
}

export interface EducationAct {
  act: string;
  title: string;
  years: string;
  institution: string;
  location?: string;
  cgpa?: string;
  classification: string;
  focus?: string;
}

export interface Certification {
  title: string;
  year: string;
  institution: string;
  focus: string;
}

export const PORTFOLIO_DATA = {
  identity: {
    name: "SARANG R N",
    titles: "DIRECTOR / SOFTWARE DEVELOPER / MACHINE LEARNING",
    directedBy: "Sarang R N",
    location: "Kakkand, Ernakulam, Kerala",
    email: "rnsarang@gmail.com",
    phone: "7994963196",
  },

  openingCredits: {
    title: "SARANG R N",
    synopsis:
      "A computer applications graduate who approaches technology the way a filmmaker approaches cinema — through observation, experimentation, structure, and storytelling.",
    bio:
      "An MCA graduate from Cochin University of Science and Technology, with a foundation in software development, Python, machine learning, deep learning, cybersecurity, and web technologies.",
    education: "MCA — Cochin University of Science and Technology",
    cgpa: "7.66 / 10",
    classification: "First Class",
    primaryLanguage: "Python",
    secondaryLanguages: ["Java", "C", "SQL"],
    specialInterests: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "LLMs",
      "Cybersecurity",
      "Cinema",
    ],
  },

  featureProject: {
    title: "TOWARDS THE DETECTION OF PHISHING WEBSITES USING LLM & CNN",
    directedBy: "Sarang R N",
    production: "Cochin University of Science and Technology",
    release: "April 2026",
    credits: "16",
    grade: "S — Highest Grade",
    genre: "Cybersecurity / Machine Learning / Deep Learning / NLP / Computer Vision / Web Automation",
    story:
      "A digital investigation into the hidden signals behind phishing websites. The project explores a hybrid phishing-detection approach that combines webpage content analysis with CNN-based URL classification. The system examines websites through multiple perspectives.",
    investigation: [
      {
        title: "BRAND RECOGNITION",
        description: "Identifying the visual and textual identity presented by a website.",
      },
      {
        title: "BRAND–DOMAIN MATCHING",
        description: "Examining whether the domain corresponds with the brand being represented.",
      },
      {
        title: "LOGO ANALYSIS",
        description: "Using visual information to identify suspicious impersonation.",
      },
      {
        title: "CREDENTIAL-TAKING INTENTION DETECTION",
        description: "Assessing whether a webpage appears designed to collect sensitive user credentials.",
      },
      {
        title: "URL CLASSIFICATION",
        description: "Applying character-level CNN techniques to identify suspicious URL patterns.",
      },
      {
        title: "ATTENTION MECHANISMS",
        description: "Exploring which parts of a URL contribute to classification decisions.",
      },
    ],
    finalCut: {
      metrics: ["Accuracy", "Precision", "Recall", "F1-Score"],
      objective:
        "Build a more comprehensive approach to detecting phishing websites by combining multiple forms of webpage intelligence.",
    },
  },

  educationalFilmography: [
    {
      act: "ACT I",
      title: "MASTER OF COMPUTER APPLICATIONS",
      years: "2024 — 2026",
      institution: "Cochin University of Science and Technology",
      location: "Kalamassery",
      cgpa: "7.66 / 10",
      classification: "First Class",
      focus: "Computer Applications / Software Development / Machine Learning / Deep Learning / Cybersecurity",
    },
    {
      act: "ACT II",
      title: "BACHELOR OF COMPUTER APPLICATIONS",
      years: "2019 — 2022",
      institution: "Bharata Mata College of Science and Arts",
      cgpa: "CCPA: 6.24 / 10",
      classification: "B Class",
      focus: "Computer Applications / Software Fundamentals / Programming / Web Technologies",
    },
    {
      act: "ACT III",
      title: "PLUS TWO — SCIENCE / BIOLOGY",
      years: "2017 — 2019",
      institution: "Cardinal Higher Secondary School",
      location: "Thrikkakara",
      classification: "Higher Secondary Completion",
      focus: "Science / Biology / Mathematics / Analytical Foundations",
    },
    {
      act: "ACT IV",
      title: "TENTH — HIGH SCHOOL",
      years: "2012 — 2017",
      institution: "St Alberts H.S.",
      location: "Ernakulam",
      classification: "Secondary Education",
      focus: "General Sciences / Mathematics / Foundational Studies",
    },
  ],

  technicalDepartment: {
    programming: ["Python", "Java", "C", "Object-Oriented Programming"],
    dataAndDatabase: ["SQL", "MySQL"],
    webDepartment: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap"],
    machineLearningDepartment: {
      dataProcessing: {
        title: "Python-based Data Processing",
        skills: ["NumPy", "Pandas"],
      },
      deepLearning: {
        title: "Deep Learning",
        skills: ["PyTorch", "CNN"],
      },
      artificialIntelligence: {
        title: "Artificial Intelligence",
        skills: ["LLM", "NLP", "Computer Vision"],
      },
      webAutomation: {
        title: "Web Automation",
        skills: ["Selenium", "Playwright"],
      },
    },
    productionTools: [
      "VS Code",
      "Adobe Photoshop",
      "CorelDRAW",
      "Dreamweaver",
      "Selenium",
      "Playwright",
    ],
  },

  certificationFilmography: [
    {
      title: "DIPLOMA IN WEB DESIGNING",
      year: "2019",
      institution: "Softmedia Computer Training",
      focus: "Web Design / Web Development / Digital Interfaces",
    },
    {
      title: "DESKTOP PUBLISHING — DTP",
      year: "2018",
      institution: "Softmedia Computer Training",
      focus: "Digital Publishing / Graphic Design / Document Design",
    },
    {
      title: "DIPLOMA IN COMPUTER APPLICATIONS",
      year: "2017",
      institution: "Softmedia Computer Training",
      focus: "Computer Applications / Digital Tools / Computing Fundamentals",
    },
  ],

  directorsStatement: {
    quote: "Technology is another form of storytelling.",
    prelude: "From writing code to analysing a phishing website, the process begins with the same thing:",
    highlight: "LOOKING CLOSELY.",
    principles: [
      "Every application has a structure.",
      "Every interface has a visual language.",
      "Every dataset has a story.",
      "Every website leaves clues.",
    ],
    reflection:
      "My work sits somewhere between software development, artificial intelligence, cybersecurity, and visual storytelling. I am interested in building things, understanding how they work, and exploring the relationship between technology and human experience.",
  },

  currentGenre: [
    "SOFTWARE DEVELOPMENT",
    "MACHINE LEARNING",
    "ARTIFICIAL INTELLIGENCE",
    "CYBERSECURITY",
    "WEB TECHNOLOGY",
    "WORLD CINEMA",
  ],

  finalCredits: {
    directedBy: "Sarang R N",
    writtenBy: "Curiosity",
    producedBy: "Persistence",
    cinematography: "Observation",
    editing: "Experience",
    sound: "Code",
    visualEffects: "Imagination",
    specialEffects: "Artificial Intelligence",
    theStoryContinues: "THE STORY CONTINUES...",
    location: "Kakkand · Ernakulam · Kerala",
    email: "rnsarang@gmail.com",
    phone: "7994963196",
  },
};

export type ChapterId = 
  | 'overview'
  | 'openingCredits'
  | 'featureProject'
  | 'education'
  | 'technical'
  | 'certifications'
  | 'directorsStatement'
  | 'finalCredits';

export interface Chapter {
  id: ChapterId;
  label: string;
  componentPart: string;
  cameraFocus: [number, number, number];
}

export const CHAPTERS: Chapter[] = [
  { id: 'overview', label: 'THE OBJECT', componentPart: 'monolith', cameraFocus: [0, 0, 7.2] },
  { id: 'openingCredits', label: 'ACT I: IDENTITY', componentPart: 'leftCup', cameraFocus: [-3.0, 0, 6.2] },
  { id: 'featureProject', label: 'FEATURE PROJECT', componentPart: 'core', cameraFocus: [0, 0.4, 5.8] },
  { id: 'education', label: 'EDUCATION', componentPart: 'headband', cameraFocus: [0, 2.5, 6.5] },
  { id: 'technical', label: 'TECH & AI', componentPart: 'internals', cameraFocus: [2.0, -0.6, 6.0] },
  { id: 'certifications', label: 'CERTIFICATIONS', componentPart: 'lower', cameraFocus: [0, -2.4, 6.2] },
  { id: 'directorsStatement', label: "DIRECTOR'S CUT", componentPart: 'rightCup', cameraFocus: [3.0, 0, 6.2] },
  { id: 'finalCredits', label: 'END CREDITS', componentPart: 'credits', cameraFocus: [0, 0, 6.8] },
];
