export interface AssignedCaseStudy {
  code: string;
  title: string;
  category: string;
  teams: string[];
}

export interface TeamAssignment {
  teamNumber: number;
  teamName: string;
  caseStudyCode: string;
  caseStudyTitle: string;
  group: 1 | 2;
  presentationHall: string;
  presentationTime: string;
}

export const CASE_STUDY_ASSIGNMENTS: AssignedCaseStudy[] = [
  {
    code: "JP-001",
    title: "Log Security Analyzer & Dynamic Risk Profiler",
    category: "Cyber Security / Log Analytics",
    teams: ["Team Ace"],
  },
  {
    code: "JP-003",
    title: "Intelligent Source Code & Quality Review Assistant",
    category: "DevOps / Code Quality & LLM",
    teams: ["Code Xeno", "Binary Bosses"],
  },
  {
    code: "JP-004",
    title: "API Gateway Traffic Monitor, Rate Limiter & Anomaly Detector",
    category: "API Management / Networking & Security",
    teams: ["Quantum Sparks"],
  },
  {
    code: "JP-005",
    title: "Customer Complaint NLP Classifier & SLA Ticket Router",
    category: "NLP / Customer Experience & Ops",
    teams: ["Team 404", "TechNova"],
  },
  {
    code: "JP-008",
    title: "Demand Forecasting & Inventory Replacement Assistant",
    category: "Supply Chain / Predictive Analytics",
    teams: ["Genxcoders"],
  },
  {
    code: "JP-009",
    title: "Automated REST API Testing and Anomaly Diagnosis Tool",
    category: "Software Quality / Automated Testing",
    teams: ["Techno Spark", "Lemuria"],
  },
  {
    code: "JP-011",
    title: "Employee Skill Gap Analyzer & Learning Path Recommender",
    category: "HR Tech / Career Path Optimization",
    teams: [
      "TechMinds",
      "Fire",
      "Asha",
      "Coders Afterclass",
      "LunarDevs",
    ],
  },
  {
    code: "JP-012",
    title: "Customer Arrival Queue Simulation & Resource Allocation Optimizer",
    category: "Operations Research / Queue Optimization",
    teams: ["Vortex", "Elite Squad"],
  },
  {
    code: "JP-014",
    title: "Service Dependency Graph & Failure Blast-Radius Analyzer",
    category: "Distributed Systems / Reliability Engineering",
    teams: ["Low Cortisol"],
  },
  {
    code: "JP-018",
    title: "Cryptography File Integrity Monitor & Change Investigator",
    category: "Information Security / System Auditing",
    teams: ["Pydrip"],
  },
  {
    code: "JP-019",
    title: "Last-Mile Delivery Route Optimization & Late Delivery Risk Predictor",
    category: "Logistics / Route Optimization & ML",
    teams: ["Team Helio", "Code with Errors"],
  },
  {
    code: "JP-020",
    title: "Enterprise Document Question-Answering with RAG",
    category: "Generative AI / Enterprise Knowledge Retrieval",
    teams: [
      "Predators",
      "404 Error Not Found",
      "Innovex",
      "Medora",
      "Nexora",
      "HackCrew",
    ],
  },
];

// Flat list of all 26 official teams with Group, Presentation Hall, and Time slot
export const ALL_TEAMS: TeamAssignment[] = [
  // GROUP 1 — SRI RATAN TATA HALL
  {
    teamNumber: 1,
    teamName: "Predators",
    caseStudyCode: "JP-020",
    caseStudyTitle: "Enterprise Document Question-Answering with RAG",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "9:00-9:10 AM",
  },
  {
    teamNumber: 2,
    teamName: "Team Helio",
    caseStudyCode: "JP-019",
    caseStudyTitle: "Last-Mile Delivery Route Optimization & Late Delivery Risk Predictor",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "9:11-9:21 AM",
  },
  {
    teamNumber: 3,
    teamName: "Low Cortisol",
    caseStudyCode: "JP-014",
    caseStudyTitle: "Service Dependency Graph & Failure Blast-Radius Analyzer",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "9:22-9:32 AM",
  },
  {
    teamNumber: 4,
    teamName: "404 Error Not Found",
    caseStudyCode: "JP-020",
    caseStudyTitle: "Enterprise Document Question-Answering with RAG",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "9:33-9:43 AM",
  },
  {
    teamNumber: 5,
    teamName: "Innovex",
    caseStudyCode: "JP-020",
    caseStudyTitle: "Enterprise Document Question-Answering with RAG",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "9:44-9:54 AM",
  },
  {
    teamNumber: 6,
    teamName: "Genxcoders",
    caseStudyCode: "JP-008",
    caseStudyTitle: "Demand Forecasting & Inventory Replacement Assistant",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "9:55-10:05 AM",
  },
  {
    teamNumber: 7,
    teamName: "TechMinds",
    caseStudyCode: "JP-011",
    caseStudyTitle: "Employee Skill Gap Analyzer & Learning Path Recommender",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "10:06-10:16 AM",
  },
  {
    teamNumber: 8,
    teamName: "Team 404",
    caseStudyCode: "JP-005",
    caseStudyTitle: "Customer Complaint NLP Classifier & SLA Ticket Router",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "10:17-10:27 AM",
  },
  {
    teamNumber: 9,
    teamName: "Medora",
    caseStudyCode: "JP-020",
    caseStudyTitle: "Enterprise Document Question-Answering with RAG",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "10:28-10:38 AM",
  },
  {
    teamNumber: 10,
    teamName: "Team Ace",
    caseStudyCode: "JP-001",
    caseStudyTitle: "Log Security Analyzer & Dynamic Risk Profiler",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "10:39-10:49 AM",
  },
  {
    teamNumber: 11,
    teamName: "Quantum Sparks",
    caseStudyCode: "JP-004",
    caseStudyTitle: "API Gateway Traffic Monitor, Rate Limiter & Anomaly Detector",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "10:50-11:00 AM",
  },
  {
    teamNumber: 12,
    teamName: "Nexora",
    caseStudyCode: "JP-020",
    caseStudyTitle: "Enterprise Document Question-Answering with RAG",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "11:01-11:11 AM",
  },
  {
    teamNumber: 13,
    teamName: "Fire",
    caseStudyCode: "JP-011",
    caseStudyTitle: "Employee Skill Gap Analyzer & Learning Path Recommender",
    group: 1,
    presentationHall: "Sri Ratan Tata Hall",
    presentationTime: "11:12-11:22 AM",
  },

  // GROUP 2 — MBA ROOM 107
  {
    teamNumber: 14,
    teamName: "Pydrip",
    caseStudyCode: "JP-018",
    caseStudyTitle: "Cryptography File Integrity Monitor & Change Investigator",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "9:00-9:10 AM",
  },
  {
    teamNumber: 15,
    teamName: "Vortex",
    caseStudyCode: "JP-012",
    caseStudyTitle: "Customer Arrival Queue Simulation & Resource Allocation Optimizer",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "9:11-9:21 AM",
  },
  {
    teamNumber: 16,
    teamName: "Code with Errors",
    caseStudyCode: "JP-019",
    caseStudyTitle: "Last-Mile Delivery Route Optimization & Late Delivery Risk Predictor",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "9:22-9:32 AM",
  },
  {
    teamNumber: 17,
    teamName: "Asha",
    caseStudyCode: "JP-011",
    caseStudyTitle: "Employee Skill Gap Analyzer & Learning Path Recommender",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "9:33-9:43 AM",
  },
  {
    teamNumber: 18,
    teamName: "Code Xeno",
    caseStudyCode: "JP-003",
    caseStudyTitle: "Intelligent Source Code & Quality Review Assistant",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "9:44-9:54 AM",
  },
  {
    teamNumber: 19,
    teamName: "Coders Afterclass",
    caseStudyCode: "JP-011",
    caseStudyTitle: "Employee Skill Gap Analyzer & Learning Path Recommender",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "9:55-10:05 AM",
  },
  {
    teamNumber: 20,
    teamName: "TechNova",
    caseStudyCode: "JP-005",
    caseStudyTitle: "Customer Complaint NLP Classifier & SLA Ticket Router",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "10:06-10:16 AM",
  },
  {
    teamNumber: 21,
    teamName: "HackCrew",
    caseStudyCode: "JP-020",
    caseStudyTitle: "Enterprise Document Question-Answering with RAG",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "10:17-10:27 AM",
  },
  {
    teamNumber: 22,
    teamName: "Techno Spark",
    caseStudyCode: "JP-009",
    caseStudyTitle: "Automated REST API Testing and Anomaly Diagnosis Tool",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "10:28-10:38 AM",
  },
  {
    teamNumber: 23,
    teamName: "LunarDevs",
    caseStudyCode: "JP-011",
    caseStudyTitle: "Employee Skill Gap Analyzer & Learning Path Recommender",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "10:39-10:49 AM",
  },
  {
    teamNumber: 24,
    teamName: "Elite Squad",
    caseStudyCode: "JP-012",
    caseStudyTitle: "Customer Arrival Queue Simulation & Resource Allocation Optimizer",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "10:50-11:00 AM",
  },
  {
    teamNumber: 25,
    teamName: "Binary Bosses",
    caseStudyCode: "JP-003",
    caseStudyTitle: "Intelligent Source Code & Quality Review Assistant",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "11:01-11:11 AM",
  },
  {
    teamNumber: 26,
    teamName: "Lemuria",
    caseStudyCode: "JP-009",
    caseStudyTitle: "Automated REST API Testing and Anomaly Diagnosis Tool",
    group: 2,
    presentationHall: "MBA Room 107",
    presentationTime: "11:12-11:22 AM",
  },
];

// Helper to look up team assignment by team name (case-insensitive & fuzzy)
export function getTeamAssignment(teamName: string): TeamAssignment | undefined {
  if (!teamName) return undefined;
  const raw = teamName.trim().toLowerCase();
  // Strip common prefixes like "team 01 - ", "team 10 - ", etc.
  const cleaned = raw.replace(/^team\s*\d+\s*[-–]\s*/i, "").trim();

  return ALL_TEAMS.find((t) => {
    const tName = t.teamName.toLowerCase();
    return (
      tName === raw ||
      tName === cleaned ||
      raw.includes(tName) ||
      tName.includes(raw)
    );
  });
}

// Helper to look up teams for a specific case study code
export function getTeamsForCaseStudy(code: string): string[] {
  const match = CASE_STUDY_ASSIGNMENTS.find(
    (cs) => cs.code.toLowerCase() === code.trim().toLowerCase()
  );
  return match ? match.teams : [];
}
