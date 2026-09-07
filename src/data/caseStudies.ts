export type CaseStudy = {
  category: string;
  title: string;
  context: string;
  problem: string;
  requirements: string[];
  impact: string[];
  technical: string[];
};

// PLACEHOLDER CONTENT — replace with the official Aavishkara '26 case studies.
export const caseStudies: CaseStudy[] = [
  {
    category: "AI / ML",
    title: "Bridging the Last Mile",
    context:
      "Millions of citizens are eligible for welfare schemes they never claim. The information exists, but it is scattered across portals and written in dense bureaucratic language.",
    problem:
      "Build an AI solution that helps an underserved citizen discover, understand and act on the public services they are entitled to — in their own language, on a low-end device.",
    requirements: [
      "Works on low bandwidth and entry-level smartphones.",
      "Supports at least two Indian languages, including a voice or vernacular input mode.",
      "Explains eligibility in plain language, never a raw document dump.",
      "Handles personal data responsibly with no unnecessary storage.",
    ],
    impact: [
      "Does it genuinely help the person it claims to help?",
      "Can a first-time user finish the journey unaided?",
    ],
    technical: [
      "Quality of the model choice and the architecture behind it.",
      "A working prototype that shows the flow end to end.",
    ],
  },
  {
    category: "Healthcare",
    title: "Triage at the Edge",
    context:
      "Rural health workers are often the first and only point of contact for a patient. They carry paper registers and have no way to flag a case that needs urgent escalation.",
    problem:
      "Design a tool that helps a frontline health worker capture symptoms and receive a clear, explainable urgency signal — offline first, syncing when a network appears.",
    requirements: [
      "Full functionality without a live internet connection.",
      "Explainable output; never a bare score with no reasoning.",
      "Interface usable by a non-clinical worker after ten minutes of training.",
      "Clear escalation path when the case exceeds the tool's confidence.",
    ],
    impact: [
      "Would a real health worker trust and reuse this daily?",
      "Does it reduce time to escalation for serious cases?",
    ],
    technical: [
      "Robustness of the offline sync and conflict handling.",
      "Soundness of the reasoning or model behind the signal.",
    ],
  },
  {
    category: "Sustainability",
    title: "The Circular Campus",
    context:
      "Institutional campuses generate large, predictable waste streams, yet segregation and recovery are managed almost entirely by manual inspection and guesswork.",
    problem:
      "Build a system that tracks, classifies and reduces campus waste, giving administrators actionable levers instead of end-of-month totals.",
    requirements: [
      "Some form of automated classification, from images or sensors.",
      "A dashboard that surfaces one clear action, not just charts.",
      "Cost model that a college could realistically afford.",
      "Data collection that does not depend on volunteer discipline.",
    ],
    impact: [
      "Would a campus actually deploy this next semester?",
      "Is the measured reduction plausible and defensible?",
    ],
    technical: [
      "Accuracy and honesty of the classification pipeline.",
      "Quality of the data model and hardware integration.",
    ],
  },
  {
    category: "FinTech",
    title: "Credit for the Invisible",
    context:
      "Street vendors and gig workers earn steadily but leave almost no formal financial trail, so conventional scoring models treat them as unbankable.",
    problem:
      "Create a responsible alternative-data approach that lets a small lender assess such an earner fairly, with the borrower able to see and contest the reasoning.",
    requirements: [
      "Uses only data the borrower knowingly consents to share.",
      "Every decision must be explainable to the borrower.",
      "Explicit handling of bias and exclusion risk.",
      "Demonstrate the flow with synthetic or consented data only.",
    ],
    impact: [
      "Does it widen access without hiding new harms?",
      "Is the borrower genuinely in control of their data?",
    ],
    technical: [
      "Rigour of the scoring approach and its validation.",
      "Security posture around sensitive financial data.",
    ],
  },
  {
    category: "EdTech",
    title: "The Patient Tutor",
    context:
      "A single teacher managing sixty students cannot detect the moment a learner quietly falls behind, and generic practice apps assume a level the learner may not have.",
    problem:
      "Build a tutor that diagnoses where a student's understanding actually breaks and adapts the next step to that gap rather than to a fixed syllabus order.",
    requirements: [
      "Diagnoses misconceptions, not just wrong answers.",
      "Works for at least one full topic end to end.",
      "Gives the teacher a readable view of the class's gaps.",
      "Runs acceptably on a shared low-end device.",
    ],
    impact: [
      "Does a struggling learner measurably move forward?",
      "Does it save the teacher time rather than add work?",
    ],
    technical: [
      "Design of the knowledge or misconception model.",
      "Quality of the adaptive loop and its evaluation.",
    ],
  },
  {
    category: "Smart Cities",
    title: "Streets That Answer Back",
    context:
      "Civic complaints — broken lights, blocked drains, damaged footpaths — are reported through channels that rarely close the loop, so citizens stop reporting.",
    problem:
      "Design a civic reporting and routing system that turns a two-second citizen report into a tracked, verifiable municipal action.",
    requirements: [
      "Reporting must take under thirty seconds with no account setup.",
      "Automatic categorisation and routing to the right department.",
      "Visible status and proof of resolution for the reporter.",
      "Duplicate and false-report handling built in.",
    ],
    impact: [
      "Would a resident use it twice?",
      "Does it reduce resolution time in a believable way?",
    ],
    technical: [
      "Routing logic and geospatial handling.",
      "Resilience against spam and duplicate load.",
    ],
  },
  {
    category: "Agriculture",
    title: "The Season Ahead",
    context:
      "Smallholder farmers make irreversible decisions on sowing, input purchase and sale timing using fragmented advice that arrives too late to act on.",
    problem:
      "Build a decision companion that turns weather, soil and market signals into one timely, concrete recommendation a farmer can act on this week.",
    requirements: [
      "Vernacular voice output as a first-class interface.",
      "Recommendations must state their uncertainty plainly.",
      "Usable with intermittent connectivity.",
      "No recommendation that a farmer cannot afford to act on.",
    ],
    impact: [
      "Is the advice specific enough to change a real decision?",
      "Would a farmer with no smartphone habit still use it?",
    ],
    technical: [
      "Quality of data fusion across weather, soil and market sources.",
      "Honesty of the forecasting and uncertainty handling.",
    ],
  },
  {
    category: "Accessibility",
    title: "Interfaces Without Sight",
    context:
      "Most Indian public service interfaces are built screen-first, leaving blind and low-vision users dependent on a sighted intermediary for routine tasks.",
    problem:
      "Rebuild one meaningful public service journey so that a blind user can complete it independently, start to finish, without visual assistance.",
    requirements: [
      "Complete keyboard and screen-reader parity.",
      "Audio-first flow, not a retrofitted visual layout.",
      "Tested against a real assistive technology stack.",
      "Error recovery must be as accessible as the happy path.",
    ],
    impact: [
      "Can the journey truly be completed unaided?",
      "Does it preserve the user's privacy and dignity?",
    ],
    technical: [
      "Depth of the accessibility implementation, not just labels.",
      "Evidence of testing with real assistive tools.",
    ],
  },
  {
    category: "Cybersecurity",
    title: "The Human Firewall",
    context:
      "Most successful attacks on small organisations begin with a convincing message rather than a technical exploit, and staff have no safe way to check.",
    problem:
      "Build a defence layer that helps a non-technical employee judge a suspicious message in seconds and gives the organisation visibility into attempts.",
    requirements: [
      "Verdicts must arrive in under five seconds.",
      "Explain why something is suspicious in plain language.",
      "No message content leaves the organisation's control unnecessarily.",
      "Aggregate view for whoever handles security.",
    ],
    impact: [
      "Would a non-technical employee actually consult it?",
      "Does it reduce successful attempts without crying wolf?",
    ],
    technical: [
      "Detection approach and its false-positive discipline.",
      "Privacy architecture around scanned content.",
    ],
  },
  {
    category: "Open Innovation",
    title: "Memory of a City",
    context:
      "Local history, craft knowledge and oral tradition are held by ageing practitioners and disappear without ever entering any searchable record.",
    problem:
      "Create a way to capture, structure and surface local cultural knowledge so it stays discoverable and useful to the community that produced it.",
    requirements: [
      "Contribution must be possible by voice, in a local language.",
      "Contributors retain clear ownership and credit.",
      "Content becomes searchable in a meaningful, structured way.",
      "Works for a community with limited digital literacy.",
    ],
    impact: [
      "Would a community adopt and keep feeding it?",
      "Does it preserve nuance rather than flatten it?",
    ],
    technical: [
      "Quality of transcription, structuring and retrieval.",
      "Thoughtfulness of the data and rights model.",
    ],
  },
  {
    category: "Logistics",
    title: "The Cold Chain Gap",
    context:
      "Perishable goods and vaccines lose value in the final hops of the supply chain, where monitoring thins out and accountability becomes ambiguous.",
    problem:
      "Design a low-cost way to monitor and prove condition integrity across the final leg of a cold chain, with clear accountability at every handoff.",
    requirements: [
      "Hardware cost must be realistic at scale.",
      "Tamper-evident record of custody and condition.",
      "Alerting fast enough to save the consignment.",
      "Works where connectivity is intermittent.",
    ],
    impact: [
      "Does it prevent real loss, not just record it?",
      "Is it affordable for the operators who need it most?",
    ],
    technical: [
      "Sensor, power and connectivity design.",
      "Integrity of the custody record.",
    ],
  },
  {
    category: "Mental Health",
    title: "The Quiet Signal",
    context:
      "Student distress usually shows up in small behavioural changes long before anyone asks for help, and campus support systems are reactive by design.",
    problem:
      "Build a consent-first support tool that lowers the barrier to reaching help early, without surveillance and without pretending to be a clinician.",
    requirements: [
      "Participation must be opt-in and revocable at any time.",
      "No covert monitoring or scoring of students.",
      "Clear, immediate routing to human help in a crisis.",
      "Explicit statement of what the tool is not.",
    ],
    impact: [
      "Would a student in difficulty actually open it?",
      "Does it strengthen human support rather than replace it?",
    ],
    technical: [
      "Privacy and data-minimisation architecture.",
      "Safety handling of crisis and edge cases.",
    ],
  },
];
