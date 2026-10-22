export const person = {
  name: 'Niranga Niluminda',
  fullName: 'G.W. Niranga Niluminda',
  email: 'niranganiluminda@gmail.com',
  location: 'Ratnapura, Sri Lanka',
  github: 'https://github.com/NirangaNiluminda',
  linkedin: 'https://linkedin.com/in/niranganiluminda',
  medium: 'https://medium.com/@niranganiluminda',
  cvSE: '/cv/Niranga_Niluminda_CV_Software_Engineer.pdf',
  cvDevOps: '/cv/Niranga_Niluminda_CV_DevOps.pdf',
};

export const roles = ['backend systems', 'event-driven microservices', 'data platforms', 'CI/CD pipelines', 'security research'];

// Verified: 127 smart grid + 142 SecureOTA + 225 PrepDeck + 84 TradeBot + 29 Kafka
export const stats = [
  { value: 607, suffix: '', label: 'automated tests across my repos' },
  { value: 10, suffix: '', label: 'case studies with code' },
  { value: 10, suffix: '', label: 'certificates' },
  { value: 3.8, suffix: '', label: 'GPA out of 4.00', decimals: 2 },
];

export const marquee = [
  'Python', 'TypeScript', 'SQL', 'C++', 'Go', 'Solidity',
  'Apache Kafka', 'Debezium', 'Spark', 'Airflow', 'FastAPI', 'Node.js', 'Next.js', 'React',
  'PostgreSQL', 'MongoDB', 'Docker', 'GitHub Actions', 'Jenkins', 'Terraform', 'Ansible', 'AWS',
  'Prometheus', 'Grafana', 'PyTorch', 'Hyperledger Fabric', 'OpenCV',
];

export const focus = [
  { title: 'Distributed backends', body: 'Microservices that stay consistent under failure: SAGA, Transactional Outbox, change data capture, idempotent consumers.', tags: ['Kafka', 'Microservices', 'PostgreSQL'], span: 'wide' },
  { title: 'Data platforms', body: 'Streaming and batch pipelines that give fast answers and exact ones.', tags: ['Spark', 'Airflow', 'FastAPI'] },
  { title: 'Delivery & operations', body: 'CI/CD with quality gates and approval steps, containers, infrastructure as code, monitoring.', tags: ['GitHub Actions', 'Jenkins', 'Docker', 'Terraform'] },
  { title: 'Security research', body: 'Graph neural networks, post-quantum cryptography and blockchain trust for vehicular networks.', tags: ['PyTorch', 'ML-DSA', 'Fabric'], span: 'full' },
];

export const timeline = [
  { when: '2022 – 2026', title: 'BSc (Hons) Computer Engineering', org: 'University of Ruhuna', body: 'GPA 3.80 / 4.00. All final examinations completed September 2026; results pending.', kind: 'edu' },
  { when: '2026', title: 'Top 10 national finalist', org: 'Agentrix 2026', body: 'Advanced through the preliminary and technical rounds to the national final.', kind: 'award' },
  { when: 'May – Nov 2025', title: 'Software Engineer | Client-side Product Owner (Intern)', org: 'MO Marketplace', body: 'SQL and Apache Superset dashboards on the production PostgreSQL schema; UAT and regression testing on every fortnightly release; PRDs and Jira backlog.', kind: 'work' },
  { when: 'Competition', title: 'CodeSprint 8 participant', org: 'IEEE Student Branch, IIT', body: 'Team CodeXCrew pitched TwoTapGo, an emergency-response app, in the inter-university startup battle.', kind: 'award' },
  { when: 'University', title: 'Top 5 finalist', org: 'Eminence, University of Ruhuna', body: 'Also competed in CTF, CodeFest AI Hackathon and Haxtream.', kind: 'award' },
  { when: 'Volunteer', title: 'District Coordinator', org: 'Mehewara Seminar Series', body: 'Organised educational seminars across the district.', kind: 'volunteer' },
];

// Module names only: per-module grades stay off the public site (official transcript on request).
export const coursework = [
  { group: 'Software engineering', items: ['Software Engineering Principles', 'Object-Oriented Design & Programming', 'Web Application Development', 'Mobile Application Development', 'Software Project (2 semesters)', 'Problem Solving'] },
  { group: 'Systems & cloud', items: ['Operating Systems', 'Computer Networks', 'Advanced Data Communication', 'Cloud Computing', 'DevOps', 'Computer Architecture'] },
  { group: 'Data & AI', items: ['Database Systems', 'Machine Learning', 'Artificial Intelligence', 'Computer Vision & Image Processing'] },
  { group: 'Hardware & foundations', items: ['Embedded Systems', 'Digital Logic Design', 'Hardware Description Languages', 'Discrete Mathematics', 'Probability & Statistics', 'Numerical Methods', 'Research Methodology'] },
];
