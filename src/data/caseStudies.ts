export interface CaseStudy {
  id: string;
  code: string;
  language: string;
  category: string;
  title: string;
  brief: string;
  problem: string;
  outcome: string[];
  tools: string[];
  constraints: string[];
  keyFeatures: string[];
  dataInput?: string;
  scope?: string;

  // Aliases for compatibility
  context: string;
  requirements: string[];
  impact: string[];
  technical: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "case-01",
    code: "J-001",
    language: "Java/Python",
    category: "Cyber Security / Log Analytics",
    title: "Log Security Analyzer & Dynamic Risk Profiler",
    brief: "Organizations generate large volumes of security and application logs. Security teams need to quickly identify abnormal login behavior, repeated failures, privilege misuse, unusual access patterns, and indicators of compromise. This solution should combine rule-based detection with AI/ML techniques where appropriate to convert raw logs into actionable security incidents.",
    problem: "Design and develop a Java/Python application to analyze authentication, application, and system logs, identify suspicious activities and attack patterns, assign a dynamic risk score, and provide recommended security actions.",
    outcome: [
      "Identify suspicious events from log files.",
      "Group related events into security incidents.",
      "Assign dynamic risk levels such as Critical, High, Medium, Low.",
      "Identify the rules/patterns contributing to the alert.",
      "Provide recommended remediation actions.",
      "Generate a human-readable security incident report."
],
    tools: [
      "Python 3.x or Java 17+",
      "Pandas/NumPy or Java data-processing libraries",
      "Scikit-learn/Isolation Forest or equivalent",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL"
],
    constraints: [
      "Participants may create their own synthetic logs or use legally accessible public log datasets.",
      "No specialized security hardware is required.",
      "The system must provide evidence for each alert.",
      "No real attacks against live systems are permitted.",
      "The solution should process reasonably large log files efficiently."
],
    keyFeatures: [
      "Log ingestion and normalization",
      "Anomaly detection",
      "User/entity risk scoring",
      "Incident correlation",
      "AI-assisted recommendations",
      "Security dashboard",
      "Audit and report generation"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Organizations generate large volumes of security and application logs. Security teams need to quickly identify abnormal login behavior, repeated failures, privilege misuse, unusual access patterns, and indicators of compromise. This solution should combine rule-based detection with AI/ML techniques where appropriate to convert raw logs into actionable security incidents.",
    requirements: [
      "Participants may create their own synthetic logs or use legally accessible public log datasets.",
      "No specialized security hardware is required.",
      "The system must provide evidence for each alert.",
      "No real attacks against live systems are permitted.",
      "The solution should process reasonably large log files efficiently."
],
    impact: [
      "Identify suspicious events from log files.",
      "Group related events into security incidents.",
      "Assign dynamic risk levels such as Critical, High, Medium, Low.",
      "Identify the rules/patterns contributing to the alert.",
      "Provide recommended remediation actions.",
      "Generate a human-readable security incident report."
],
    technical: [
      "Python 3.x or Java 17+",
      "Pandas/NumPy or Java data-processing libraries",
      "Scikit-learn/Isolation Forest or equivalent",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL"
],
  },
  {
    id: "case-02",
    code: "JP-002",
    language: "Java/Python",
    category: "Document Management / Text Similarity",
    title: "Content-Based Duplicate Document Detector & Categorizer",
    brief: "The aim is to build an intelligent document-management solution that reduces redundant files and improves enterprise document organization. The application should use content hashing, text similarity, embeddings, or AI-based semantic comparison to identify documents that are identical or substantially similar.",
    problem: "Design and develop a Java/Python application to identify duplicate and near-duplicate documents based on content rather than filename, file type, or timestamp, and automatically organize documents into predefined categories.",
    outcome: [
      "Identify exact duplicate documents.",
      "Identify near-duplicate documents with changed filenames or minor content changes.",
      "Categorize documents according to configurable rules.",
      "Display similarity scores and reasons.",
      "Allow users to review duplicates before removal.",
      "Generate an organized document inventory."
],
    tools: [
      "Java 17+ or Python 3.x",
      "Apache Tika/PDF libraries or Python document libraries",
      "SHA-256/MD5 hashing",
      "TF-IDF/embeddings or optional AI model",
      "SQLite/PostgreSQL"
],
    constraints: [
      "Participants may create their own sample documents; no external dataset is mandatory.",
      "Duplicate identification must be based primarily on content.",
      "Users must be able to review duplicates before deletion.",
      "The solution should support multiple common document formats.",
      "The application should handle different file sizes efficiently."
],
    keyFeatures: [
      "Content-based duplicate detection",
      "Semantic similarity",
      "Rule-based categorization",
      "Duplicate review",
      "Document inventory",
      "Configuration management",
      "Logging and reporting"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "The aim is to build an intelligent document-management solution that reduces redundant files and improves enterprise document organization. The application should use content hashing, text similarity, embeddings, or AI-based semantic comparison to identify documents that are identical or substantially similar.",
    requirements: [
      "Participants may create their own sample documents; no external dataset is mandatory.",
      "Duplicate identification must be based primarily on content.",
      "Users must be able to review duplicates before deletion.",
      "The solution should support multiple common document formats.",
      "The application should handle different file sizes efficiently."
],
    impact: [
      "Identify exact duplicate documents.",
      "Identify near-duplicate documents with changed filenames or minor content changes.",
      "Categorize documents according to configurable rules.",
      "Display similarity scores and reasons.",
      "Allow users to review duplicates before removal.",
      "Generate an organized document inventory."
],
    technical: [
      "Java 17+ or Python 3.x",
      "Apache Tika/PDF libraries or Python document libraries",
      "SHA-256/MD5 hashing",
      "TF-IDF/embeddings or optional AI model",
      "SQLite/PostgreSQL"
],
  },
  {
    id: "case-03",
    code: "JP-003",
    language: "Java/Python with AI/ML",
    category: "Application Security / Code Quality",
    title: "Intelligent Source Code Security & Quality Review Assistant",
    brief: "Modern organizations increasingly use open-source and AI-assisted software development. Detecting security and quality problems before code reaches production is important. This solution should act as an intelligent code-review assistant for Java/Python source code and explain why a detected issue is important.",
    problem: "Design and develop a Java/Python application to analyze source code and identify potential security vulnerabilities, coding issues, inefficient code patterns, and maintainability problems, and provide actionable recommendations for fixing the detected issues.",
    outcome: [
      "Identify common security vulnerabilities in source code.",
      "Detect coding and maintainability issues.",
      "Assign severity levels such as Critical, High, Medium, Low.",
      "Explain the reason and location of each finding.",
      "Recommend remediation or corrected code.",
      "Generate a developer-friendly analysis report."
],
    tools: [
      "Java or Python",
      "AST/source-code parsing libraries",
      "Static-analysis libraries",
      "Optional LLM/GenAI API",
      "FastAPI/Flask or Spring Boot"
],
    constraints: [
      "No external dataset is required; participants can create their own vulnerable and safe source-code samples.",
      "The system must analyze source code rather than filenames or metadata.",
      "AI-generated recommendations must be reviewable.",
      "The solution should support multiple vulnerability categories.",
      "The demonstration should include before/after examples."
],
    keyFeatures: [
      "Source-code parser",
      "Security vulnerability detection",
      "Code-quality analysis",
      "Severity/risk scoring",
      "AI-assisted explanation",
      "Fix recommendation",
      "Before/after report"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Modern organizations increasingly use open-source and AI-assisted software development. Detecting security and quality problems before code reaches production is important. This solution should act as an intelligent code-review assistant for Java/Python source code and explain why a detected issue is important.",
    requirements: [
      "No external dataset is required; participants can create their own vulnerable and safe source-code samples.",
      "The system must analyze source code rather than filenames or metadata.",
      "AI-generated recommendations must be reviewable.",
      "The solution should support multiple vulnerability categories.",
      "The demonstration should include before/after examples."
],
    impact: [
      "Identify common security vulnerabilities in source code.",
      "Detect coding and maintainability issues.",
      "Assign severity levels such as Critical, High, Medium, Low.",
      "Explain the reason and location of each finding.",
      "Recommend remediation or corrected code.",
      "Generate a developer-friendly analysis report."
],
    technical: [
      "Java or Python",
      "AST/source-code parsing libraries",
      "Static-analysis libraries",
      "Optional LLM/GenAI API",
      "FastAPI/Flask or Spring Boot"
],
  },
  {
    id: "case-04",
    code: "JP-004",
    language: "Java/Python",
    category: "API Gateway / Traffic Management",
    title: "API Gateway Traffic Monitor, Rate Limiter & Anomaly Detector",
    brief: "Enterprise APIs must remain available while preventing excessive or abnormal usage. The solution should simulate an API protection layer capable of identifying traffic spikes, repeated failures, and suspicious consumer behavior while maintaining fair access for legitimate clients.",
    problem: "Design and develop a Java/Python API gateway or middleware layer that monitors API requests, applies configurable rate limits, detects abnormal client behavior, and provides API health analytics.",
    outcome: [
      "Track requests by client, endpoint, status, and time.",
      "Apply configurable rate limits.",
      "Detect abnormal request patterns.",
      "Throttle or reject requests according to policy.",
      "Display latency, error, and traffic trends.",
      "Maintain an audit log of decisions."
],
    tools: [
      "Java/Spring Boot or Python/FastAPI/Flask",
      "Redis optional",
      "SQLite/PostgreSQL",
      "Pandas/Scikit-learn optional",
      "Docker optional"
],
    constraints: [
      "No real attack traffic is required.",
      "Participants can create their own APIs and synthetic traffic.",
      "Rate limits must be configurable without source-code changes.",
      "Concurrent request simulation should be demonstrated.",
      "Testing must only target systems owned or authorized by the team."
],
    keyFeatures: [
      "Rate limiting",
      "Traffic anomaly detection",
      "Client profiling",
      "Endpoint monitoring",
      "Policy configuration",
      "Audit logging",
      "API health dashboard"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Enterprise APIs must remain available while preventing excessive or abnormal usage. The solution should simulate an API protection layer capable of identifying traffic spikes, repeated failures, and suspicious consumer behavior while maintaining fair access for legitimate clients.",
    requirements: [
      "No real attack traffic is required.",
      "Participants can create their own APIs and synthetic traffic.",
      "Rate limits must be configurable without source-code changes.",
      "Concurrent request simulation should be demonstrated.",
      "Testing must only target systems owned or authorized by the team."
],
    impact: [
      "Track requests by client, endpoint, status, and time.",
      "Apply configurable rate limits.",
      "Detect abnormal request patterns.",
      "Throttle or reject requests according to policy.",
      "Display latency, error, and traffic trends.",
      "Maintain an audit log of decisions."
],
    technical: [
      "Java/Spring Boot or Python/FastAPI/Flask",
      "Redis optional",
      "SQLite/PostgreSQL",
      "Pandas/Scikit-learn optional",
      "Docker optional"
],
  },
  {
    id: "case-05",
    code: "P-005",
    language: "Python with AI/ML",
    category: "Customer Support / NLP Ticketing",
    title: "Customer Complaint NLP Classifier & SLA Ticket Router",
    brief: "Customer-support teams need to route complaints quickly and prevent important cases from remaining unresolved. The solution should provide an intelligent ticketing workflow that combines natural-language understanding with configurable business rules and workload information.",
    problem: "Design and develop a Python application to accept customer complaints, understand their content using NLP/AI, automatically create tickets, assign severity and category, recommend the responsible team, and predict possible SLA breaches.",
    outcome: [
      "Create tickets from natural-language complaints.",
      "Automatically categorize complaints.",
      "Assign severity: Critical, High, Medium, Low.",
      "Recommend a team or agent based on category and workload.",
      "Predict SLA-breach risk.",
      "Provide ticket tracking and escalation."
],
    tools: [
      "Python",
      "Pandas/Scikit-learn",
      "NLP/Transformers or optional LLM API",
      "FastAPI/Flask",
      "SQLite/PostgreSQL"
],
    constraints: [
      "Participants may create synthetic complaints or use legally accessible public data.",
      "AI decisions must be reviewable and overridable.",
      "PII must not be exposed in the demonstration.",
      "SLA rules must be configurable.",
      "The system should explain priority and escalation decisions."
],
    keyFeatures: [
      "NLP classification",
      "AI ticket generation",
      "Severity scoring",
      "Team assignment",
      "SLA prediction",
      "Escalation workflow",
      "Admin analytics dashboard"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Customer-support teams need to route complaints quickly and prevent important cases from remaining unresolved. The solution should provide an intelligent ticketing workflow that combines natural-language understanding with configurable business rules and workload information.",
    requirements: [
      "Participants may create synthetic complaints or use legally accessible public data.",
      "AI decisions must be reviewable and overridable.",
      "PII must not be exposed in the demonstration.",
      "SLA rules must be configurable.",
      "The system should explain priority and escalation decisions."
],
    impact: [
      "Create tickets from natural-language complaints.",
      "Automatically categorize complaints.",
      "Assign severity: Critical, High, Medium, Low.",
      "Recommend a team or agent based on category and workload.",
      "Predict SLA-breach risk.",
      "Provide ticket tracking and escalation."
],
    technical: [
      "Python",
      "Pandas/Scikit-learn",
      "NLP/Transformers or optional LLM API",
      "FastAPI/Flask",
      "SQLite/PostgreSQL"
],
  },
  {
    id: "case-06",
    code: "P-006",
    language: "Java/Python",
    category: "Data Privacy / Information Security",
    title: "Sensitive Information Discovery, Classification & Masking",
    brief: "Organizations need to identify where sensitive information exists before applying security and privacy controls. The solution should combine configurable detection rules with contextual analysis or AI where appropriate.",
    problem: "Design and develop a Java/Python application to scan documents, CSV files, JSON files, logs, or database extracts and identify sensitive information, classify the data type, assign a risk level, and recommend masking or protection actions.",
    outcome: [
      "Detect configured PII/sensitive data types such as email, phone, identity-like values, financial identifiers, and addresses.",
      "Classify detected data.",
      "Assign risk levels.",
      "Mask sensitive values in displayed output.",
      "Generate a scan report.",
      "Allow administrators to configure detection rules."
],
    tools: [
      "Python or Java",
      "Regex/NLP libraries",
      "Pandas/OpenCSV",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL"
],
    constraints: [
      "Use only public, synthetic, or self-created data.",
      "Complete sensitive values must not be exposed in the UI/report.",
      "Detection rules must be configurable.",
      "False positives should be reviewable.",
      "No confidential enterprise database access is required."
],
    keyFeatures: [
      "PII discovery",
      "Context-aware classification",
      "Risk scoring",
      "Data masking",
      "Rule management",
      "Scan history",
      "Compliance-style report"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Organizations need to identify where sensitive information exists before applying security and privacy controls. The solution should combine configurable detection rules with contextual analysis or AI where appropriate.",
    requirements: [
      "Use only public, synthetic, or self-created data.",
      "Complete sensitive values must not be exposed in the UI/report.",
      "Detection rules must be configurable.",
      "False positives should be reviewable.",
      "No confidential enterprise database access is required."
],
    impact: [
      "Detect configured PII/sensitive data types such as email, phone, identity-like values, financial identifiers, and addresses.",
      "Classify detected data.",
      "Assign risk levels.",
      "Mask sensitive values in displayed output.",
      "Generate a scan report.",
      "Allow administrators to configure detection rules."
],
    technical: [
      "Python or Java",
      "Regex/NLP libraries",
      "Pandas/OpenCSV",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL"
],
  },
  {
    id: "case-07",
    code: "P-007",
    language: "Python with AI/ML",
    category: "Email Security / Phishing Detection",
    title: "Email Phishing Detection & Explainable Risk Scoring",
    brief: "Phishing remains a major enterprise security challenge. The solution should help security teams prioritize potentially malicious messages by combining rule-based indicators, natural-language analysis, URL characteristics, and AI/ML classification.",
    problem: "Design and develop a Python application that analyzes email text, headers, URLs, sender characteristics, and attachment metadata to identify suspicious messages and generate an explainable phishing risk score.",
    outcome: [
      "Classify emails as Safe, Suspicious, or High Risk.",
      "Calculate a risk score.",
      "Identify suspicious URLs and sender characteristics.",
      "Highlight important message indicators.",
      "Provide an analyst review screen.",
      "Generate an investigation summary."
],
    tools: [
      "Python",
      "Pandas/Scikit-learn",
      "NLP libraries",
      "URL parsing libraries",
      "FastAPI/Flask/Streamlit"
],
    constraints: [
      "Use only synthetic or legally accessible email samples.",
      "Do not open or execute suspicious attachments.",
      "Do not interact with malicious live websites.",
      "The model must provide explainable indicators.",
      "Evaluate performance using suitable metrics."
],
    keyFeatures: [
      "Email parsing",
      "NLP classification",
      "URL analysis",
      "Risk scoring",
      "Explainable AI",
      "Analyst review",
      "Security report"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Phishing remains a major enterprise security challenge. The solution should help security teams prioritize potentially malicious messages by combining rule-based indicators, natural-language analysis, URL characteristics, and AI/ML classification.",
    requirements: [
      "Use only synthetic or legally accessible email samples.",
      "Do not open or execute suspicious attachments.",
      "Do not interact with malicious live websites.",
      "The model must provide explainable indicators.",
      "Evaluate performance using suitable metrics."
],
    impact: [
      "Classify emails as Safe, Suspicious, or High Risk.",
      "Calculate a risk score.",
      "Identify suspicious URLs and sender characteristics.",
      "Highlight important message indicators.",
      "Provide an analyst review screen.",
      "Generate an investigation summary."
],
    technical: [
      "Python",
      "Pandas/Scikit-learn",
      "NLP libraries",
      "URL parsing libraries",
      "FastAPI/Flask/Streamlit"
],
  },
  {
    id: "case-08",
    code: "JP-008",
    language: "Java/Python with AI/ML",
    category: "Retail & Supply Chain / Inventory Analytics",
    title: "Demand Forecasting & Inventory Replenishment Assistant",
    brief: "Retail, distribution, and manufacturing organizations must maintain product availability while controlling inventory costs. The solution should provide a practical demand and replenishment assistant using forecasting, business rules, or AI/ML.",
    problem: "Design and develop a Java/Python application that analyzes historical sales, inventory levels, supplier lead times, and demand patterns to forecast near-term demand and recommend replenishment actions.",
    outcome: [
      "Forecast short-term product demand.",
      "Identify stockout and overstock risks.",
      "Calculate reorder points.",
      "Recommend reorder quantities.",
      "Consider supplier lead time where available.",
      "Provide SKU-level explanations and analytics."
],
    tools: [
      "Python or Java",
      "Pandas/NumPy",
      "Scikit-learn/XGBoost or time-series libraries",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL"
],
    constraints: [
      "Participants may create synthetic sales records or use a simple public dataset.",
      "Forecasting scope should be limited to a manageable time horizon.",
      "Missing or irregular records must be handled.",
      "Recommendations must be explainable.",
      "No live ERP integration is required."
],
    keyFeatures: [
      "Demand forecasting",
      "Safety-stock calculation",
      "Reorder recommendations",
      "Stockout alerts",
      "Lead-time analysis",
      "SKU dashboard",
      "Inventory report"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Retail, distribution, and manufacturing organizations must maintain product availability while controlling inventory costs. The solution should provide a practical demand and replenishment assistant using forecasting, business rules, or AI/ML.",
    requirements: [
      "Participants may create synthetic sales records or use a simple public dataset.",
      "Forecasting scope should be limited to a manageable time horizon.",
      "Missing or irregular records must be handled.",
      "Recommendations must be explainable.",
      "No live ERP integration is required."
],
    impact: [
      "Forecast short-term product demand.",
      "Identify stockout and overstock risks.",
      "Calculate reorder points.",
      "Recommend reorder quantities.",
      "Consider supplier lead time where available.",
      "Provide SKU-level explanations and analytics."
],
    technical: [
      "Python or Java",
      "Pandas/NumPy",
      "Scikit-learn/XGBoost or time-series libraries",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL"
],
  },
  {
    id: "case-09",
    code: "JP-009",
    language: "Java/Python",
    category: "Software Testing / API Automation",
    title: "Automated REST API Testing & Anomaly Diagnosis Tool",
    brief: "APIs are critical components of modern enterprise applications. Manual API testing becomes difficult as the number of endpoints increases. The solution should automate common functional checks and convert test results into actionable developer feedback.",
    problem: "Design and develop a Java/Python application that automatically tests REST APIs, identifies incorrect responses, missing validations, inconsistent behavior, and basic performance issues, and provides AI-assisted recommendations.",
    outcome: [
      "Execute configurable API test cases.",
      "Validate HTTP status codes and response structures.",
      "Detect abnormal or inconsistent responses.",
      "Measure response time and basic performance indicators.",
      "Identify recurring failure patterns.",
      "Generate recommendations for developers."
],
    tools: [
      "Java/Spring Boot or Python/FastAPI/Flask",
      "REST/HTTP libraries",
      "JSON/XML parsers",
      "Optional OpenAPI/Postman collection support",
      "Optional AI/LLM API",
      "SQLite/PostgreSQL"
],
    constraints: [
      "No external dataset is required; teams can create their own sample REST API.",
      "Testing must only target APIs owned or authorized by the team.",
      "AI recommendations must be based on actual test results.",
      "Test cases should be configurable.",
      "The demonstration should include both passing and failing APIs."
],
    keyFeatures: [
      "API endpoint management",
      "Automated test execution",
      "Response validation",
      "Failure classification",
      "Performance measurement",
      "AI-assisted diagnosis",
      "Test-result dashboard"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "APIs are critical components of modern enterprise applications. Manual API testing becomes difficult as the number of endpoints increases. The solution should automate common functional checks and convert test results into actionable developer feedback.",
    requirements: [
      "No external dataset is required; teams can create their own sample REST API.",
      "Testing must only target APIs owned or authorized by the team.",
      "AI recommendations must be based on actual test results.",
      "Test cases should be configurable.",
      "The demonstration should include both passing and failing APIs."
],
    impact: [
      "Execute configurable API test cases.",
      "Validate HTTP status codes and response structures.",
      "Detect abnormal or inconsistent responses.",
      "Measure response time and basic performance indicators.",
      "Identify recurring failure patterns.",
      "Generate recommendations for developers."
],
    technical: [
      "Java/Spring Boot or Python/FastAPI/Flask",
      "REST/HTTP libraries",
      "JSON/XML parsers",
      "Optional OpenAPI/Postman collection support",
      "Optional AI/LLM API",
      "SQLite/PostgreSQL"
],
  },
  {
    id: "case-10",
    code: "JP-010",
    language: "Java/Python with AI/ML",
    category: "Cloud FinOps / Cost Optimization",
    title: "Cloud Usage & Billing Cost Anomaly Detector & Optimization Advisor",
    brief: "Cloud environments can contain idle resources, over-provisioned compute, excessive storage, or unexpected usage spikes. Organizations need a practical way to detect cost anomalies and prioritize optimization opportunities.",
    problem: "Design and develop a Java/Python application to analyze cloud billing and usage information, identify unusual cost increases, determine major cost drivers, and recommend practical optimization actions.",
    outcome: [
      "Detect unusual cost patterns.",
      "Identify services/resources driving cost increases.",
      "Forecast near-term spending.",
      "Compare spending with configurable budgets.",
      "Recommend actions such as rightsizing or idle-resource review.",
      "Generate a cost-optimization report."
],
    tools: [
      "Python or Java",
      "Pandas/NumPy",
      "Scikit-learn optional",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL"
],
    constraints: [
      "No real cloud account is required.",
      "Participants may generate their own CSV/JSON usage and billing data.",
      "Recommendations must be supported by measurable evidence.",
      "Do not automatically delete or terminate real resources.",
      "Support configurable budgets and thresholds."
],
    keyFeatures: [
      "Cost anomaly detection",
      "Budget monitoring",
      "Cost-driver analysis",
      "Forecasting",
      "Optimization recommendations",
      "Service dashboard",
      "Savings opportunity report"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Cloud environments can contain idle resources, over-provisioned compute, excessive storage, or unexpected usage spikes. Organizations need a practical way to detect cost anomalies and prioritize optimization opportunities.",
    requirements: [
      "No real cloud account is required.",
      "Participants may generate their own CSV/JSON usage and billing data.",
      "Recommendations must be supported by measurable evidence.",
      "Do not automatically delete or terminate real resources.",
      "Support configurable budgets and thresholds."
],
    impact: [
      "Detect unusual cost patterns.",
      "Identify services/resources driving cost increases.",
      "Forecast near-term spending.",
      "Compare spending with configurable budgets.",
      "Recommend actions such as rightsizing or idle-resource review.",
      "Generate a cost-optimization report."
],
    technical: [
      "Python or Java",
      "Pandas/NumPy",
      "Scikit-learn optional",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL"
],
  },
  {
    id: "case-11",
    code: "JP-011",
    language: "Java/Python with AI/ML",
    category: "HR Tech / Workforce Development",
    title: "Employee Skill Gap Analyzer & Learning Path Recommender",
    brief: "Organizations need to continuously reskill employees as technologies and business requirements change. The proposed solution should help HR/L&D teams identify skill gaps and recommend relevant training without requiring proprietary enterprise data.",
    problem: "Design and develop a Java/Python application that analyzes employee skills, job-role requirements, project requirements, and learning resources to identify skill gaps and recommend personalized learning paths.",
    outcome: [
      "Create employee skill profiles.",
      "Map skills against selected job roles.",
      "Identify missing or weak skills.",
      "Recommend learning resources or learning paths.",
      "Provide role-readiness scores.",
      "Generate individual and organizational skill-gap reports."
],
    tools: [
      "Python or Java",
      "Pandas/Scikit-learn optional",
      "NLP/embeddings optional",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL"
],
    constraints: [
      "Participants can create synthetic employee/skill data; no sensitive employee data should be used.",
      "Skill and role taxonomies must be configurable.",
      "Recommendations must show the reason for the recommendation.",
      "No external HR system integration is required.",
      "The solution should work with a manageable number of roles and skills."
],
    keyFeatures: [
      "Skill extraction",
      "Skill-gap analysis",
      "Role matching",
      "Recommendation engine",
      "Readiness scoring",
      "Learning-path generation",
      "HR dashboard"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Organizations need to continuously reskill employees as technologies and business requirements change. The proposed solution should help HR/L&D teams identify skill gaps and recommend relevant training without requiring proprietary enterprise data.",
    requirements: [
      "Participants can create synthetic employee/skill data; no sensitive employee data should be used.",
      "Skill and role taxonomies must be configurable.",
      "Recommendations must show the reason for the recommendation.",
      "No external HR system integration is required.",
      "The solution should work with a manageable number of roles and skills."
],
    impact: [
      "Create employee skill profiles.",
      "Map skills against selected job roles.",
      "Identify missing or weak skills.",
      "Recommend learning resources or learning paths.",
      "Provide role-readiness scores.",
      "Generate individual and organizational skill-gap reports."
],
    technical: [
      "Python or Java",
      "Pandas/Scikit-learn optional",
      "NLP/embeddings optional",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL"
],
  },
  {
    id: "case-12",
    code: "JP-012",
    language: "Java/Python",
    category: "Operations Research / Queue Management",
    title: "Customer Arrival Queue Simulation & Resource Allocation Optimizer",
    brief: "The system can support banks, government service centers, university offices, hospitals, or enterprise support centers. The solution should simulate multiple queues and recommend operational decisions during normal and peak periods.",
    problem: "Design and develop a Java/Python application that analyzes customer arrival patterns, appointment schedules, service times, and available resources to reduce waiting time and recommend optimal staff/resource allocation.",
    outcome: [
      "Manage multiple service queues.",
      "Estimate waiting time.",
      "Predict demand by time slot.",
      "Recommend staff/resource allocation.",
      "Identify overloaded periods.",
      "Compare the proposed approach with a basic allocation strategy."
],
    tools: [
      "Java/Spring Boot or Python/FastAPI",
      "Pandas/NumPy",
      "Optional ML libraries",
      "SQLite/PostgreSQL",
      "Optional simulation libraries"
],
    constraints: [
      "No physical queue hardware is required.",
      "Participants may generate their own arrival and service-time data.",
      "Resource limits must be respected.",
      "The solution should demonstrate peak-load scenarios.",
      "Recommendation logic must be explainable."
],
    keyFeatures: [
      "Queue management",
      "Demand prediction",
      "Wait-time estimation",
      "Resource optimization",
      "Peak-load alerts",
      "Simulation",
      "Operations dashboard"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "The system can support banks, government service centers, university offices, hospitals, or enterprise support centers. The solution should simulate multiple queues and recommend operational decisions during normal and peak periods.",
    requirements: [
      "No physical queue hardware is required.",
      "Participants may generate their own arrival and service-time data.",
      "Resource limits must be respected.",
      "The solution should demonstrate peak-load scenarios.",
      "Recommendation logic must be explainable."
],
    impact: [
      "Manage multiple service queues.",
      "Estimate waiting time.",
      "Predict demand by time slot.",
      "Recommend staff/resource allocation.",
      "Identify overloaded periods.",
      "Compare the proposed approach with a basic allocation strategy."
],
    technical: [
      "Java/Spring Boot or Python/FastAPI",
      "Pandas/NumPy",
      "Optional ML libraries",
      "SQLite/PostgreSQL",
      "Optional simulation libraries"
],
  },
  {
    id: "case-13",
    code: "JP-013",
    language: "Python with AI/ML",
    category: "Procurement / Vendor Risk Analytics",
    title: "Supplier Performance Analytics & Late-Delivery Risk Predictor",
    brief: "Procurement teams need early visibility into suppliers or orders that may cause delays. The solution should combine historical supplier performance with AI/ML or rule-based analysis to support proactive procurement decisions.",
    problem: "Design and develop a Python application that analyzes supplier history, order quantities, delivery times, quality records, and lead times to predict late-delivery risk and generate supplier risk scores.",
    outcome: [
      "Generate supplier risk scores.",
      "Predict late-delivery probability.",
      "Rank suppliers/orders requiring attention.",
      "Identify important risk factors.",
      "Provide supplier performance trends.",
      "Generate procurement recommendations."
],
    tools: [
      "Python",
      "Pandas/Scikit-learn",
      "XGBoost optional",
      "FastAPI/Flask",
      "SQLite/PostgreSQL"
],
    constraints: [
      "Participants may generate synthetic procurement data or use a simple public dataset.",
      "Predictions must be explainable.",
      "The system must not automatically blacklist suppliers.",
      "Missing supplier history must be handled.",
      "Use suitable evaluation metrics where labeled outcomes exist."
],
    keyFeatures: [
      "Supplier scorecard",
      "Delay prediction",
      "Risk scoring",
      "Factor explanation",
      "Order-level alerts",
      "Trend analytics",
      "Procurement report"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Procurement teams need early visibility into suppliers or orders that may cause delays. The solution should combine historical supplier performance with AI/ML or rule-based analysis to support proactive procurement decisions.",
    requirements: [
      "Participants may generate synthetic procurement data or use a simple public dataset.",
      "Predictions must be explainable.",
      "The system must not automatically blacklist suppliers.",
      "Missing supplier history must be handled.",
      "Use suitable evaluation metrics where labeled outcomes exist."
],
    impact: [
      "Generate supplier risk scores.",
      "Predict late-delivery probability.",
      "Rank suppliers/orders requiring attention.",
      "Identify important risk factors.",
      "Provide supplier performance trends.",
      "Generate procurement recommendations."
],
    technical: [
      "Python",
      "Pandas/Scikit-learn",
      "XGBoost optional",
      "FastAPI/Flask",
      "SQLite/PostgreSQL"
],
  },
  {
    id: "case-14",
    code: "JP-014",
    language: "Java/Python",
    category: "Systems Architecture / Incident Response",
    title: "Service Dependency Graph & Failure Blast-Radius Analyzer",
    brief: "Enterprise applications often depend on multiple APIs, databases, services, and external components. During an incident, teams need to quickly understand the blast radius and prioritize critical services.",
    problem: "Design and develop a Java/Python application that creates a dependency graph from service/application configuration information and determines the potential impact when a service or component becomes unavailable.",
    outcome: [
      "Build a dependency graph.",
      "Display upstream and downstream dependencies.",
      "Simulate component failures.",
      "Calculate potential blast radius.",
      "Identify critical/high-impact components.",
      "Generate an impact report."
],
    tools: [
      "Java or Python",
      "NetworkX or equivalent graph library",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL",
      "Optional graph visualization"
],
    constraints: [
      "No real enterprise infrastructure access is required.",
      "Participants can create their own service-dependency data.",
      "Circular dependencies must be handled safely.",
      "Impact scoring should be deterministic and explainable.",
      "Configuration must be editable."
],
    keyFeatures: [
      "Dependency graph",
      "Blast-radius analysis",
      "Criticality scoring",
      "Failure simulation",
      "Impact ranking",
      "Search/filter",
      "Incident impact report"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Enterprise applications often depend on multiple APIs, databases, services, and external components. During an incident, teams need to quickly understand the blast radius and prioritize critical services.",
    requirements: [
      "No real enterprise infrastructure access is required.",
      "Participants can create their own service-dependency data.",
      "Circular dependencies must be handled safely.",
      "Impact scoring should be deterministic and explainable.",
      "Configuration must be editable."
],
    impact: [
      "Build a dependency graph.",
      "Display upstream and downstream dependencies.",
      "Simulate component failures.",
      "Calculate potential blast radius.",
      "Identify critical/high-impact components.",
      "Generate an impact report."
],
    technical: [
      "Java or Python",
      "NetworkX or equivalent graph library",
      "FastAPI/Flask or Spring Boot",
      "SQLite/PostgreSQL",
      "Optional graph visualization"
],
  },
  {
    id: "case-15",
    code: "JP-015",
    language: "Python with AI/ML",
    category: "Smart Energy / Anomaly Detection",
    title: "Energy Consumption Anomaly Detector & Efficiency Advisor",
    brief: "Organizations need to identify unusual consumption caused by operating schedules, equipment behavior, or unexpected load. The solution should provide a data-driven energy monitoring assistant without requiring smart meters or physical IoT devices.",
    problem: "Design and develop a Python application to analyze electricity or equipment energy-consumption information, detect abnormal usage, identify likely causes, and recommend energy-efficiency actions.",
    outcome: [
      "Create an expected consumption baseline.",
      "Detect abnormal consumption periods.",
      "Identify affected time periods or equipment where data permits.",
      "Estimate avoidable consumption.",
      "Recommend corrective actions.",
      "Generate an energy-efficiency dashboard."
],
    tools: [
      "Python",
      "Pandas/NumPy",
      "Scikit-learn/time-series libraries",
      "FastAPI/Flask/Streamlit",
      "Plotly/Matplotlib"
],
    constraints: [
      "No smart meter, sensor, or IoT hardware is required.",
      "Participants may generate synthetic time-series data or use a manageable public dataset.",
      "Missing readings must be handled.",
      "Recommendations must explain the evidence.",
      "The solution should support time-based analysis."
],
    keyFeatures: [
      "Baseline modeling",
      "Anomaly detection",
      "Consumption analysis",
      "Cause identification",
      "Savings estimation",
      "Alerts",
      "Energy report"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Organizations need to identify unusual consumption caused by operating schedules, equipment behavior, or unexpected load. The solution should provide a data-driven energy monitoring assistant without requiring smart meters or physical IoT devices.",
    requirements: [
      "No smart meter, sensor, or IoT hardware is required.",
      "Participants may generate synthetic time-series data or use a manageable public dataset.",
      "Missing readings must be handled.",
      "Recommendations must explain the evidence.",
      "The solution should support time-based analysis."
],
    impact: [
      "Create an expected consumption baseline.",
      "Detect abnormal consumption periods.",
      "Identify affected time periods or equipment where data permits.",
      "Estimate avoidable consumption.",
      "Recommend corrective actions.",
      "Generate an energy-efficiency dashboard."
],
    technical: [
      "Python",
      "Pandas/NumPy",
      "Scikit-learn/time-series libraries",
      "FastAPI/Flask/Streamlit",
      "Plotly/Matplotlib"
],
  },
  {
    id: "case-16",
    code: "JP-016",
    language: "Java/Python",
    category: "Software Governance / License Compliance",
    title: "Software Dependency, License Conflict & Governance Tracker",
    brief: "Organizations use large numbers of open-source and third-party components. Tracking licenses, dependencies, versions, and duplication helps reduce compliance and software-governance risks.",
    problem: "Design and develop a Java/Python application that analyzes application dependencies, package metadata, and license information to identify unknown licenses, possible conflicts, outdated components, and software optimization opportunities.",
    outcome: [
      "Build a dependency inventory.",
      "Identify package and license information.",
      "Flag unknown or potentially conflicting licenses.",
      "Identify outdated or duplicated components where data permits.",
      "Assign a configurable risk score.",
      "Generate a compliance report."
],
    tools: [
      "Java 17+ or Python 3.x",
      "Maven/Gradle/package metadata parsers",
      "Hashing/file-processing libraries",
      "SQLite/PostgreSQL",
      "FastAPI/Flask or Spring Boot"
],
    constraints: [
      "Participants can create or use publicly accessible open-source projects.",
      "License findings are review flags, not legal conclusions.",
      "Rules must be configurable.",
      "Maintain an audit trail.",
      "No private enterprise repository access is required."
],
    keyFeatures: [
      "Dependency inventory",
      "License detection",
      "Risk classification",
      "Duplicate detection",
      "Version analysis",
      "Configurable policies",
      "Compliance report"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Organizations use large numbers of open-source and third-party components. Tracking licenses, dependencies, versions, and duplication helps reduce compliance and software-governance risks.",
    requirements: [
      "Participants can create or use publicly accessible open-source projects.",
      "License findings are review flags, not legal conclusions.",
      "Rules must be configurable.",
      "Maintain an audit trail.",
      "No private enterprise repository access is required."
],
    impact: [
      "Build a dependency inventory.",
      "Identify package and license information.",
      "Flag unknown or potentially conflicting licenses.",
      "Identify outdated or duplicated components where data permits.",
      "Assign a configurable risk score.",
      "Generate a compliance report."
],
    technical: [
      "Java 17+ or Python 3.x",
      "Maven/Gradle/package metadata parsers",
      "Hashing/file-processing libraries",
      "SQLite/PostgreSQL",
      "FastAPI/Flask or Spring Boot"
],
  },
  {
    id: "case-17",
    code: "JP-017",
    language: "Python with AI/ML",
    category: "Sales Operations / Lead Scoring",
    title: "CRM Lead Scoring & Next-Best-Action Recommendation Engine",
    brief: "Sales teams cannot manually evaluate every lead with equal depth. An intelligent prioritization system should help sales representatives focus on opportunities with stronger signals while explaining the basis of each recommendation.",
    problem: "Design and develop a Python application that analyzes CRM lead information, customer interactions, engagement history, and opportunity attributes to rank leads and recommend the next best sales action.",
    outcome: [
      "Calculate lead-quality scores.",
      "Rank leads for follow-up.",
      "Recommend actions such as call, email, demo, or nurture.",
      "Explain the factors behind each recommendation.",
      "Provide pipeline analytics.",
      "Allow sales users to override recommendations."
],
    tools: [
      "Python",
      "Pandas/Scikit-learn",
      "FastAPI/Flask",
      "SQLite/PostgreSQL",
      "Optional LLM for natural-language recommendations"
],
    constraints: [
      "Participants may generate synthetic CRM records or use a simple public dataset.",
      "Do not use sensitive/protected attributes for decision-making.",
      "Recommendations must be explainable.",
      "Human override must be supported.",
      "Evaluate predictions where labeled outcomes are available."
],
    keyFeatures: [
      "Lead scoring",
      "Engagement analysis",
      "Next-best-action recommendation",
      "Pipeline ranking",
      "Explainable AI",
      "Sales dashboard",
      "Feedback capture"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Sales teams cannot manually evaluate every lead with equal depth. An intelligent prioritization system should help sales representatives focus on opportunities with stronger signals while explaining the basis of each recommendation.",
    requirements: [
      "Participants may generate synthetic CRM records or use a simple public dataset.",
      "Do not use sensitive/protected attributes for decision-making.",
      "Recommendations must be explainable.",
      "Human override must be supported.",
      "Evaluate predictions where labeled outcomes are available."
],
    impact: [
      "Calculate lead-quality scores.",
      "Rank leads for follow-up.",
      "Recommend actions such as call, email, demo, or nurture.",
      "Explain the factors behind each recommendation.",
      "Provide pipeline analytics.",
      "Allow sales users to override recommendations."
],
    technical: [
      "Python",
      "Pandas/Scikit-learn",
      "FastAPI/Flask",
      "SQLite/PostgreSQL",
      "Optional LLM for natural-language recommendations"
],
  },
  {
    id: "case-18",
    code: "JP-018",
    language: "Java/Python",
    category: "System Integrity / Security Auditing",
    title: "Cryptographic File Integrity Monitor & Change Investigator",
    brief: "Organizations depend on configuration files, scripts, reports, and other digital assets. Unauthorized or accidental modifications can cause operational and security problems. The solution should provide lightweight file-integrity monitoring.",
    problem: "Design and develop a Java/Python application that maintains cryptographic integrity records for critical files, detects unauthorized or unexpected changes, and produces an investigation report.",
    outcome: [
      "Create an integrity baseline.",
      "Detect file additions, deletions, and modifications.",
      "Identify affected files.",
      "Assign severity based on configurable file criticality.",
      "Maintain an audit history.",
      "Generate an investigation report."
],
    tools: [
      "Java 17+ or Python 3.x",
      "SHA-256/hash libraries",
      "SQLite/PostgreSQL",
      "Spring Boot/FastAPI",
      "Optional filesystem monitoring libraries"
],
    constraints: [
      "No specialized hardware is required.",
      "Participants can create their own sample file repository.",
      "Do not store sensitive file contents unnecessarily.",
      "Monitoring locations must be configurable.",
      "Hash verification must be central to integrity checking."
],
    keyFeatures: [
      "Integrity baseline",
      "Hash verification",
      "Change detection",
      "Criticality scoring",
      "Audit logging",
      "Alerts",
      "Investigation report"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "Organizations depend on configuration files, scripts, reports, and other digital assets. Unauthorized or accidental modifications can cause operational and security problems. The solution should provide lightweight file-integrity monitoring.",
    requirements: [
      "No specialized hardware is required.",
      "Participants can create their own sample file repository.",
      "Do not store sensitive file contents unnecessarily.",
      "Monitoring locations must be configurable.",
      "Hash verification must be central to integrity checking."
],
    impact: [
      "Create an integrity baseline.",
      "Detect file additions, deletions, and modifications.",
      "Identify affected files.",
      "Assign severity based on configurable file criticality.",
      "Maintain an audit history.",
      "Generate an investigation report."
],
    technical: [
      "Java 17+ or Python 3.x",
      "SHA-256/hash libraries",
      "SQLite/PostgreSQL",
      "Spring Boot/FastAPI",
      "Optional filesystem monitoring libraries"
],
  },
  {
    id: "case-19",
    code: "JP-019",
    language: "Python with AI/ML",
    category: "Logistics / Last-Mile Route Optimization",
    title: "Last-Mile Delivery Route Optimizer & Late-Delivery Risk Predictor",
    brief: "The solution should model a practical last-mile logistics problem without requiring GPS devices or live-map hardware. The focus is on route planning, operational constraints, and intelligent exception handling.",
    problem: "Design and develop a Python application that analyzes delivery orders, vehicle capacity, time windows, distance/travel-time information, and historical delivery performance to recommend feasible assignments and identify likely late deliveries.",
    outcome: [
      "Assign orders to available vehicles.",
      "Generate feasible delivery sequences.",
      "Respect capacity and time-window constraints.",
      "Identify likely late deliveries.",
      "Prioritize critical deliveries.",
      "Compare results with a simple baseline."
],
    tools: [
      "Python",
      "Pandas/NumPy",
      "OR-Tools/NetworkX or equivalent",
      "Scikit-learn optional",
      "FastAPI/Flask/Streamlit"
],
    constraints: [
      "No GPS hardware or live-map subscription is required.",
      "Participants may generate a manageable delivery scenario or use public data.",
      "Hard constraints must not be overridden by AI recommendations.",
      "Provide a fallback when a fully feasible solution is unavailable.",
      "Demonstrate measurable improvement over a baseline."
],
    keyFeatures: [
      "Route optimization",
      "Capacity constraints",
      "Time-window handling",
      "Late-delivery prediction",
      "Exception management",
      "Visualization",
      "Performance comparison"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",

    context: "The solution should model a practical last-mile logistics problem without requiring GPS devices or live-map hardware. The focus is on route planning, operational constraints, and intelligent exception handling.",
    requirements: [
      "No GPS hardware or live-map subscription is required.",
      "Participants may generate a manageable delivery scenario or use public data.",
      "Hard constraints must not be overridden by AI recommendations.",
      "Provide a fallback when a fully feasible solution is unavailable.",
      "Demonstrate measurable improvement over a baseline."
],
    impact: [
      "Assign orders to available vehicles.",
      "Generate feasible delivery sequences.",
      "Respect capacity and time-window constraints.",
      "Identify likely late deliveries.",
      "Prioritize critical deliveries.",
      "Compare results with a simple baseline."
],
    technical: [
      "Python",
      "Pandas/NumPy",
      "OR-Tools/NetworkX or equivalent",
      "Scikit-learn optional",
      "FastAPI/Flask/Streamlit"
],
  },
  {
    id: "case-20",
    code: "JP-020",
    language: "Java/Python with AI/ML",
    category: "Generative AI / Enterprise RAG",
    title: "Enterprise Document Question-Answering Assistant with RAG",
    brief: "Employees spend significant time searching policies, SOPs, manuals, product documentation, and process guides. A retrieval-augmented AI assistant should provide fast answers while reducing unsupported responses by grounding answers in approved documents.",
    problem: "Design and develop a Java/Python application that allows users to ask natural-language questions about a controlled collection of enterprise documents and returns concise, document-grounded answers with references to the relevant source sections.",
    outcome: [
      "Ingest and index documents.",
      "Accept natural-language questions.",
      "Retrieve relevant document sections.",
      "Generate concise AI-assisted answers.",
      "Display supporting source references.",
      "Handle questions that cannot be answered from the knowledge base."
],
    tools: [
      "Python/FastAPI or Java/Spring Boot",
      "Vector database/library such as FAISS/Chroma or equivalent",
      "Embedding model",
      "Optional LLM API/local LLM",
      "SQLite/PostgreSQL"
],
    constraints: [
      "Participants can create their own small document collection or use legally accessible public documents.",
      "Answers must be grounded in indexed documents.",
      "Source references must be displayed.",
      "The system must not knowingly fabricate unsupported answers.",
      "Document updates/re-indexing should be supported."
],
    keyFeatures: [
      "Document ingestion",
      "Semantic search",
      "RAG",
      "Source-grounded answers",
      "Unsupported-answer handling",
      "Admin document management",
      "Evaluation dashboard"
],
    dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
    scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
    context: "Employees spend significant time searching policies, SOPs, manuals, product documentation, and process guides. A retrieval-augmented AI assistant should provide fast answers while reducing unsupported responses by grounding answers in approved documents.",
    requirements: [
      "Participants can create their own small document collection or use legally accessible public documents.",
      "Answers must be grounded in indexed documents.",
      "Source references must be displayed.",
      "The system must not knowingly fabricate unsupported answers.",
      "Document updates/re-indexing should be supported."
],
    impact: [
      "Ingest and index documents.",
      "Accept natural-language questions.",
      "Retrieve relevant document sections.",
      "Generate concise AI-assisted answers.",
      "Display supporting source references.",
      "Handle questions that cannot be answered from the knowledge base."
],
    technical: [
      "Python/FastAPI or Java/Spring Boot",
      "Vector database/library such as FAISS/Chroma or equivalent",
      "Embedding model",
      "Optional LLM API/local LLM",
      "SQLite/PostgreSQL"
],
  },
];
