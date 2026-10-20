export interface Figure {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  context: string;
  role: string;
  stack: string[];
  github?: string;
  live?: string;
  problem: string;
  approach: string[];
  decisions: { title: string; body: string }[];
  outcome: string[];
  diagram?: string;
  figures?: Figure[];
}

const gh = (repo: string) => `https://github.com/NirangaNiluminda/${repo}`;

export const featured: Project[] = [
  {
    slug: 'sentinel',
    title: 'SENTINEL',
    tagline: 'Detecting trajectory-poisoning attacks in software-defined vehicular networks.',
    year: '2026',
    context: 'Final-year research project · University of Ruhuna',
    role: 'Lead developer & system architect · team of 4',
    stack: ['C++ (NS-3)', 'SUMO', 'PyTorch', 'Graph Attention Networks', 'LSTM autoencoder', 'ML-DSA-87', 'OpenFHE', 'Hyperledger Fabric', 'React'],
    github: gh('MPTD-PQS-SDVN'),
    problem:
      'Software-defined vehicular network controllers learn from the positions and speeds vehicles report. An insider can send beacons that look physically plausible but are falsified over time, slowly poisoning the controller into misrouting traffic or suppressing collision warnings. Signatures prove who sent a beacon, not that it is true, and every reviewed defence trusts the controller itself.',
    approach: [
      'Lightweight mode at the roadside unit: HMAC beacon integrity plus nine formally derived attack signatures.',
      'Full mode: a multi-task Graph Attention Network over the live vehicle–RSU graph catches coordinated Sybil identities; an LSTM autoencoder catches slow, stealthy trajectory drift.',
      'RSU aggregates are encrypted with fully homomorphic encryption before any sharing, then endorsed with a post-quantum threshold ring signature (t-of-n RSUs).',
      'Hyperledger Fabric smart contracts manage trust and revocation by RSU consensus, so a compromised controller cannot block revocations.',
    ],
    decisions: [
      { title: 'Two modes, not one', body: 'Legacy roadside units cannot run neural networks, so a rule-based mode runs everywhere and the AI layer adds coverage where compute exists.' },
      { title: 'Models trained in Python, run in C++', body: 'GAT and LSTM-AE are exported to ONNX and executed inside the NS-3 simulation, keeping detection in the same loop as the network it protects.' },
      { title: 'Encrypt before you coordinate', body: 'FHE is applied before ring signing so a compromised ring member never sees a neighbour\'s plaintext data.' },
    ],
    outcome: [
      'Evaluated end to end on three real road networks (Tokyo, rural Germany, the A9 autobahn) against seven attack variants and four attacker classes.',
      'Compared against three published baselines and validated with eleven ablation studies, each removing one component.',
      'A FastAPI + React/deck.gl dashboard replays real simulation runs: live map, GAT attention, autoencoder residuals and the blockchain ledger.',
      'Detailed results will be published with the accompanying paper.',
    ],
    diagram: `flowchart LR
    V[Vehicles] -- beacons + HMAC --> R[RSU<br/>rule signatures]
    R -- beacon windows --> I[(IPFS)]
    I --> G[GAT<br/>spatial]
    I --> A[LSTM-AE<br/>temporal]
    G --> F{Fusion}
    A --> F
    R --> F
    R -- FHE aggregate --> T[Threshold ring<br/>signature] --> C[Cloud]
    R -- signed evidence --> B[(Fabric<br/>SC-Trust / SC-Revoke)]
    B -- revocations --> R`,
  },
  {
    slug: 'exam-platform',
    title: 'Exam & Certification Platform',
    tagline: 'Event-driven microservices that stay consistent without distributed transactions.',
    year: '2026',
    context: 'Cloud Computing module · University of Ruhuna',
    role: 'Sole developer',
    stack: ['Microservices', 'Apache Kafka', 'Debezium CDC', 'PostgreSQL', 'MinIO', 'React', 'Docker', 'GitHub Actions', 'Jenkins', 'SonarQube'],
    github: gh('exam-certification-platform'),
    problem:
      'Enrol, pay, sit a timed exam, get graded and receive a certificate: a simple flow that touches six services and six databases. The hard part is not the features but keeping the workflow consistent when any step can fail.',
    approach: [
      '8 microservices with a database per service, behind an API gateway that validates RS256 JWTs and enforces role-based access.',
      'An orchestrated SAGA in the enrolment service drives the workflow over a 3-broker Kafka cluster and issues compensating actions on failure.',
      'Each service writes events to an outbox table in the same transaction as its state change; Debezium streams them from the PostgreSQL write-ahead log into Kafka.',
      'Certificates are rendered to PDF, stored in MinIO and served through pre-signed URLs with a verification code.',
    ],
    decisions: [
      { title: 'Transactional Outbox over dual writes', body: 'Writing to the database and publishing to Kafka separately can lose events on a crash. The outbox makes the event part of the same transaction.' },
      { title: 'Orchestration over choreography', body: 'One service owns the workflow state, so failure handling and compensation live in one place instead of being spread across six.' },
      { title: 'Two CI/CD tools on purpose', body: 'GitHub Actions builds, scans with SonarQube and publishes images to GHCR; Jenkins handles staged deployment with smoke tests and a manual approval gate.' },
    ],
    outcome: [
      'A 26-container Docker Compose stack with health checks and restart policies.',
      'CI: dependency-cached builds, a SonarQube quality gate on a self-hosted runner, images tagged by git SHA.',
      'CD: deploy to staging → smoke tests → manual approval → production tag → post-deploy health check.',
    ],
    diagram: `stateDiagram-v2
    [*] --> PENDING: student enrols
    PENDING --> PAYMENT_COMPLETED: payment ok
    PENDING --> CANCELLED: payment failed (compensate)
    PAYMENT_COMPLETED --> EXAM_SCHEDULED: slot created
    EXAM_SCHEDULED --> EXAM_SUBMITTED
    EXAM_SUBMITTED --> GRADED
    GRADED --> CERTIFIED: pass
    GRADED --> FAILED: fail`,
  },
  {
    slug: 'smart-grid',
    title: 'Smart Grid Lambda Platform',
    tagline: 'Live grid monitoring and exact daily billing from the same stream of meter data.',
    year: '2026',
    context: 'Applied Big Data Engineering module · University of Ruhuna',
    role: 'Developer',
    stack: ['Apache Kafka', 'Spark Structured Streaming', 'Spark batch', 'Apache Airflow', 'FastAPI', 'PostgreSQL', 'Prometheus', 'Grafana', 'Docker'],
    github: gh('smart-grid-lambda-platform'),
    problem:
      'Operators need seconds-fresh grid load and renewable mix by zone; billing needs exact, recomputable numbers once the daily tariff arrives. One system has to serve both.',
    approach: [
      'Smart-meter readings flow through Kafka into Spark Structured Streaming with watermarks and tumbling and sliding windows for live zone metrics.',
      'The raw stream also lands in an immutable Parquet lake; an Airflow DAG waits for each day to close, then runs a Spark batch job that computes authoritative bills.',
      'FastAPI serves both views from PostgreSQL; Prometheus, Grafana and a rule-based alert engine watch for data gaps and SLA breaches.',
    ],
    decisions: [
      { title: 'Lambda, not Kappa', body: 'Billing must be exactly recomputable from source; a separate batch layer over an immutable lake makes reruns safe. The trade-off is recorded as an ADR in the repo.' },
      { title: 'Idempotent batch layer', body: 'Rerunning a day produces the same bill, so late data or a failed job never means double charging.' },
      { title: 'Pluggable tariffs', body: 'Flat, tiered and subsidised billing are strategies behind one interface.' },
    ],
    outcome: ['7 containerised services with a layered Compose setup (base + processing overlay).', '127 automated tests.'],
    figures: [
      { src: '/img/sg_03-grafana-live-timeseries.webp', alt: 'Grafana dashboard with live grid load by zone', caption: 'Live zone metrics in Grafana' },
      { src: '/img/sg_04-airflow-dag-graph.webp', alt: 'Airflow DAG graph for daily reconciliation', caption: 'Daily reconciliation DAG in Airflow' },
      { src: '/img/sg_06-billing-report-html.webp', alt: 'Generated household billing report', caption: 'Generated billing report' },
    ],
  },
  {
    slug: 'secure-ota',
    title: 'SecureOTA',
    tagline: 'Blockchain-anchored firmware updates that refuse tampered, rolled-back or revoked images.',
    year: '2026',
    context: 'Blockchain & Cyber Security module · University of Ruhuna',
    role: 'Technical lead & primary developer · team of 4',
    stack: ['Solidity', 'Hardhat', 'Python', 'React', 'TypeScript', 'Clean architecture'],
    github: gh('secure-ota'),
    problem:
      'IoT devices trust whatever their vendor\'s update server sends. Code signing proves who built an image, not that it is the current release or that everyone received the same one.',
    approach: [
      'The vendor publishes each release\'s SHA-256 fingerprint to a smart contract, never the binary.',
      'The device downloads from anywhere, recomputes the hash locally and refuses anything that does not match, is older than what it runs, or has been revoked.',
      'An attack harness runs a deliberately untrusted firmware server through four scenarios end to end.',
    ],
    decisions: [
      { title: 'Freeze the seam first', body: 'The contract ABI and golden fixtures were frozen and versioned before four people built against them in parallel.' },
      { title: 'Architecture enforced in CI', body: 'Tests parse every import in the Python and TypeScript code and fail the build on a layering violation.' },
    ],
    outcome: ['Blocks tampered (HASH_MISMATCH), rolled-back (ROLLBACK_BLOCKED) and revoked (REVOKED) firmware.', '142 automated tests plus an end-to-end harness.'],
  },
  {
    slug: 'kafka-orders',
    title: 'Kafka Order Processing',
    tagline: 'A Kafka pipeline built around what happens when processing fails.',
    year: '2026',
    context: 'Coursework',
    role: 'Sole developer',
    stack: ['Python', 'Apache Kafka', 'Avro', 'Docker'],
    github: gh('kafka-order-processing'),
    problem: 'Happy-path Kafka is easy. Real pipelines need a plan for transient failures, poison messages and duplicate delivery.',
    approach: [
      'Avro-encoded orders keyed by order ID for partition affinity.',
      'Transient failures go to a retry topic with exponential backoff; permanent failures go to a dead letter queue with failure metadata.',
      'Retry and DLQ writes are flushed before the source offset is committed: at-least-once delivery.',
    ],
    decisions: [
      { title: 'Retry topic, not in-process retry', body: 'Failures leave the main partition so healthy traffic keeps flowing. At scale this becomes tiered delay topics.' },
    ],
    outcome: ['29 tests and a repeatable live demo with Kafka UI.'],
  },
  {
    slug: 'prepdeck',
    title: 'PrepDeck',
    tagline: 'Interview prep with spaced repetition and timed mock exams.',
    year: '2026',
    context: 'Personal project',
    role: 'Sole developer',
    stack: ['Next.js 16', 'TypeScript', 'MongoDB', 'Zod', 'Vitest', 'Vercel'],
    github: gh('PrepDeck'),
    live: 'https://prep-deck-seven.vercel.app',
    problem: 'Revising for interviews from long, unsearchable chat transcripts does not work. I wanted something I could filter, practise and be tested on.',
    approach: [
      'About 200 curated questions across 10 topics, stored as markdown and imported idempotently.',
      'Spaced-repetition review, custom study packs, timed mock exams, progress by topic.',
      'Community submissions with duplicate detection, voting, reporting and a moderation queue.',
    ],
    decisions: [
      { title: 'Swappable database', body: 'Business logic depends on repository interfaces, never on the MongoDB driver, so PostgreSQL is a new adapter, not a rewrite.' },
    ],
    outcome: ['Live on Vercel.', '225 Vitest tests.'],
  },
];

export interface MoreProject {
  title: string;
  blurb: string;
  stack: string[];
  github?: string;
  image?: Figure;
}

export const more: MoreProject[] = [
  {
    title: 'Classroom Assessment System',
    blurb: 'Team project: MCQ, short-answer and essay assessments with role-based access, refresh-token rotation and a tamper-resistant exam mode. My work spans the backend and both dashboards.',
    stack: ['Next.js', 'Express', 'MongoDB', 'AWS', 'GitHub Actions'],
    github: gh('CAS-backend'),
    image: { src: '/img/cas_architecture.webp', alt: 'Layered system architecture of the Classroom Assessment System', caption: 'System architecture' },
  },
  {
    title: 'TradeBot',
    blurb: 'Crypto trading bot with backtesting and walk-forward optimisation, an LLM news-risk gate, testnet trading and systemd deployment.',
    stack: ['Python', 'SQLite', 'LLM APIs', 'systemd'],
    github: gh('TradeBot'),
  },
  {
    title: 'Secure Comms & Traffic Observability',
    blurb: 'End-to-end encrypted chat with mutual authentication and six live attack simulations, plus real-time traffic monitoring.',
    stack: ['ECDH', 'AES-256-GCM', 'Flask', 'React', 'InfluxDB', 'Grafana'],
    github: gh('secure-comm-observability'),
  },
  {
    title: 'Video Human Activity Recognition',
    blurb: 'OpenCV preprocessing (CLAHE, auto-gamma, Sobel edge channel) feeding ConvLSTM and CNN+LSTM models; 87.7% test accuracy on a UCF50 subset.',
    stack: ['Python', 'OpenCV', 'TensorFlow'],
    github: gh('Human-Action-Recognition'),
    image: { src: '/img/har_preprocessing_pipeline.webp', alt: 'Frame passing through resize, CLAHE, gamma and Sobel stages', caption: 'Preprocessing pipeline' },
  },
  {
    title: 'MediAssist',
    blurb: 'Group AI project: medical entity extraction and abstractive summarisation of clinical documents.',
    stack: ['Python', 'spaCy', 'Transformers'],
    github: gh('MediAssist'),
  },
  {
    title: 'T20 Cricket on an FPGA',
    blurb: 'A two-team cricket match in synthesisable Verilog: LFSR-driven deliveries and a live seven-segment scoreboard on a Zynq-7000.',
    stack: ['Verilog', 'Vivado', 'FPGA'],
    github: gh('T20_CRICKET_SIMULATION_USING_VERILOG'),
  },
];
