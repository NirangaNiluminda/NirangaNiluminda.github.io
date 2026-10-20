export type Category = 'Backend' | 'Data' | 'DevOps' | 'Security' | 'AI / ML' | 'Hardware';

export interface Figure { src: string; alt: string; caption: string; }
export interface Metric { value: string; label: string; }

export interface Project {
  slug: string;
  title: string;
  short: string;            // one-line card description
  tagline: string;          // case-study subtitle
  year: string;
  context: string;
  role: string;
  team: string;
  accent: [string, string]; // gradient for covers and highlights
  categories: Category[];
  featured: boolean;
  github?: string;
  live?: string;
  cover?: Figure;           // image shown on cards
  metrics: Metric[];
  overview: string;
  problem: string;
  diagram?: string;         // mermaid
  steps: { title: string; body: string }[];
  features: string[];
  decisions: { title: string; body: string }[];
  stack: Record<string, string[]>;
  challenges: { title: string; body: string }[];
  outcome: string[];
  gallery?: Figure[];
}

const gh = (repo: string) => `https://github.com/NirangaNiluminda/${repo}`;

export const projects: Project[] = [
  {
    slug: 'sentinel',
    title: 'SENTINEL',
    short: 'Final-year research: detecting trajectory-poisoning attacks in software-defined vehicular networks.',
    tagline: 'Detecting insiders who poison a vehicular network\'s view of where every car is.',
    year: '2026',
    context: 'Final-year research project',
    role: 'Lead developer & system architect',
    team: 'Team of 4',
    accent: ['#7c5cff', '#22d3ee'],
    categories: ['Security', 'AI / ML'],
    featured: true,
    github: gh('MPTD-PQS-SDVN'),
    metrics: [
      { value: '7', label: 'attack variants detected' },
      { value: '4', label: 'attacker classes, data + control plane' },
      { value: '3', label: 'real road networks simulated' },
      { value: '11', label: 'ablation studies' },
    ],
    overview:
      'SENTINEL (MPTD-PQS) is a dual-mode detection and mitigation framework for software-defined vehicular networks, built and evaluated inside a full NS-3 + SUMO simulation with a live Hyperledger Fabric network and a browser dashboard that replays every run.',
    problem:
      'An SDVN controller routes traffic using the positions, speeds and headings vehicles report. A malicious insider can send beacons that are individually plausible but collectively falsified over time, slowly poisoning the controller\'s mobility model until it misroutes traffic or suppresses collision warnings. Signatures prove who sent a beacon, not that it is true; per-vehicle checks miss coordinated Sybil identities; and every reviewed defence trusts the controller, which a single compromise subverts.',
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
    steps: [
      { title: 'Verify at the roadside', body: 'Each RSU checks a per-session HMAC on every beacon, then scores it against nine formally derived attack signatures within the 100 ms beacon interval.' },
      { title: 'Look at the neighbourhood', body: 'A multi-task Graph Attention Network reads the live vehicle–RSU graph, so a cluster of mutually consistent ghost identities stands out even when each one looks normal on its own.' },
      { title: 'Look back in time', body: 'An LSTM autoencoder trained on clean trajectories flags slow drift that never trips a per-beacon threshold.' },
      { title: 'Fuse and decide', body: 'Rule, spatial and temporal scores are fused with attack-conditioned weights into a single decision.' },
      { title: 'Protect the aggregate', body: 'RSUs encrypt their aggregates with fully homomorphic encryption before sharing, then endorse them with a post-quantum t-of-n threshold ring signature.' },
      { title: 'Revoke without the controller', body: 'Hyperledger Fabric smart contracts track trust and revoke vehicles, RSUs or controllers by RSU consensus, so a compromised controller cannot block it.' },
    ],
    features: [
      'Lightweight mode that runs on legacy roadside units',
      'Full mode with GAT + LSTM-AE inference running in C++ via ONNX',
      'Post-quantum crypto: ML-DSA-87 threshold signatures, OpenFHE',
      'Byzantine-fault-tolerant trust and revocation on Hyperledger Fabric',
      'Urban, rural and highway scenarios from OpenStreetMap',
      'SENTINEL dashboard: replay any run on a live map with GAT attention and autoencoder residuals',
    ],
    decisions: [
      { title: 'Two modes, not one', body: 'Legacy roadside units cannot run neural networks, so a rule-based mode runs everywhere and the AI layer adds coverage where compute exists.' },
      { title: 'Train in Python, run in C++', body: 'Models are exported to ONNX and executed inside the NS-3 simulation, keeping detection in the same loop as the network it protects.' },
      { title: 'Encrypt before you coordinate', body: 'FHE is applied before ring signing so a compromised ring member never sees a neighbour\'s plaintext data.' },
      { title: 'Generated, checked documentation', body: 'The 80+ simulator flags are documented by a generator, and a pre-commit hook blocks commits when the docs drift from the code.' },
    ],
    stack: {
      Simulation: ['NS-3 (C++)', 'SUMO', 'OpenStreetMap'],
      'Machine learning': ['PyTorch', 'PyTorch Geometric', 'ONNX Runtime'],
      Cryptography: ['ML-DSA-87 (Open Quantum Safe)', 'OpenFHE', 'HMAC', 'LKH'],
      Blockchain: ['Hyperledger Fabric (Go)', 'IPFS'],
      Dashboard: ['FastAPI', 'React', 'TypeScript', 'deck.gl'],
    },
    challenges: [
      { title: 'Ghosts that look real', body: 'Sybil identities placed within physical limits pass every per-vehicle check. Only a relational model over the graph separates them, which is why the GAT exists.' },
      { title: 'Speed shrinks the evidence', body: 'At highway speed a vehicle is near each RSU for too few beacons to judge. The design aggregates evidence across RSUs instead of resetting at handover.' },
      { title: 'Not trusting the controller', body: 'Revocation had to work even when the controller lies, so the controller is treated as one untrusted voter and RSUs decide by quorum.' },
    ],
    outcome: [
      'Evaluated against three published baselines and eleven ablation studies, each removing one component.',
      'Detailed results will be published with the accompanying paper.',
    ],
  },
  {
    slug: 'exam-platform',
    title: 'Exam & Certification Platform',
    short: '8 event-driven microservices kept consistent with a SAGA, the Transactional Outbox and CDC over Kafka.',
    tagline: 'Event-driven microservices that stay consistent without distributed transactions.',
    year: '2026',
    context: 'Cloud Computing module',
    role: 'Sole developer',
    team: 'Individual',
    accent: ['#f97316', '#ec4899'],
    categories: ['Backend', 'DevOps'],
    featured: true,
    github: gh('exam-certification-platform'),
    metrics: [
      { value: '8', label: 'microservices' },
      { value: '6', label: 'databases, one per service' },
      { value: '3', label: 'Kafka brokers' },
      { value: '26', label: 'containers in the stack' },
    ],
    overview:
      'A cloud-native platform where students enrol in certification exams, pay, sit a timed exam, get graded automatically and download a verifiable PDF certificate. It is built to show how distributed workflows stay correct when parts of them fail.',
    problem:
      'Enrol → pay → schedule → sit → grade → certify touches six services and six databases. Without distributed transactions, a crash between "save to database" and "publish to Kafka" can silently lose an event, and a failed payment has to undo work other services already did.',
    diagram: `stateDiagram-v2
    [*] --> PENDING: student enrols
    PENDING --> PAYMENT_COMPLETED: payment ok
    PENDING --> CANCELLED: payment failed (compensate)
    PAYMENT_COMPLETED --> EXAM_SCHEDULED: slot created
    EXAM_SCHEDULED --> EXAM_SUBMITTED
    EXAM_SUBMITTED --> GRADED
    GRADED --> CERTIFIED: pass
    GRADED --> FAILED: fail`,
    steps: [
      { title: 'Enter through the gateway', body: 'An API gateway validates RS256-signed JWTs and enforces role-based access before any request reaches a service.' },
      { title: 'Start the SAGA', body: 'The enrolment service records a PENDING enrolment and orchestrates the rest of the workflow.' },
      { title: 'Publish safely', body: 'Each service writes its event to an outbox table in the same transaction as its state change; Debezium streams it from the PostgreSQL write-ahead log into Kafka.' },
      { title: 'React or compensate', body: 'Payment, exam, grading and certificate services consume events and reply. A failed payment triggers a compensating CANCELLED step.' },
      { title: 'Certify', body: 'A passing grade produces a PDF certificate in MinIO, served through a pre-signed URL with a verification code.' },
    ],
    features: [
      'Orchestrated SAGA with compensating actions',
      'Transactional Outbox + Debezium change data capture',
      'Database per service (6 PostgreSQL instances)',
      'RS256 JWT gateway with role-based access',
      'PDF certificates in MinIO with pre-signed URLs',
      'React frontend behind Nginx',
    ],
    decisions: [
      { title: 'Outbox over dual writes', body: 'Writing to the database and publishing to Kafka separately can lose events on a crash. The outbox makes the event part of the same transaction.' },
      { title: 'Orchestration over choreography', body: 'One service owns the workflow state, so failure handling lives in one place instead of six.' },
      { title: 'Two CI/CD tools on purpose', body: 'GitHub Actions builds, scans with SonarQube and publishes images; Jenkins runs staged deployment with smoke tests and a manual approval gate.' },
    ],
    stack: {
      Architecture: ['Microservices', 'SAGA', 'Transactional Outbox', 'API gateway'],
      Messaging: ['Apache Kafka (3 brokers)', 'Debezium CDC'],
      Data: ['PostgreSQL ×6', 'MinIO'],
      Frontend: ['React', 'Vite', 'Nginx'],
      'CI/CD': ['GitHub Actions', 'SonarQube', 'GHCR', 'Jenkins', 'Docker Compose'],
    },
    challenges: [
      { title: 'Lost events', body: 'Solved with the outbox: the event and the state change commit together, and CDC guarantees it reaches Kafka.' },
      { title: 'Partial failure', body: 'Compensating actions return the workflow to a consistent state instead of leaving a paid-but-cancelled enrolment.' },
      { title: 'Self-hosted quality gate', body: 'SonarQube runs locally, so the CI job that scans code runs on a self-hosted runner that can reach it.' },
    ],
    outcome: [
      'A 26-container Docker Compose stack with health checks and restart policies.',
      'CI: dependency-cached builds, SonarQube quality gate, images tagged by git SHA in GHCR.',
      'CD: staging → smoke tests → manual approval → production tag → post-deploy health check.',
    ],
  },
  {
    slug: 'smart-grid',
    title: 'Smart Grid Lambda Platform',
    short: 'Real-time grid monitoring and exact daily billing from one stream of meter data, on a Lambda architecture.',
    tagline: 'Seconds-fresh grid metrics and exact daily bills from the same stream of meter data.',
    year: '2026',
    context: 'Applied Big Data Engineering module',
    role: 'Developer',
    team: 'Coursework',
    accent: ['#10b981', '#22d3ee'],
    categories: ['Data', 'DevOps'],
    featured: true,
    github: gh('smart-grid-lambda-platform'),
    cover: { src: '/img/sg_billing.webp', alt: 'Generated billing and solar reconciliation report', caption: 'Daily billing report' },
    metrics: [
      { value: '7', label: 'containerised services' },
      { value: '127', label: 'automated tests' },
      { value: '2', label: 'processing layers: speed + batch' },
      { value: '3', label: 'pluggable tariff strategies' },
    ],
    overview:
      'An end-to-end data platform that ingests smart-meter readings in real time, serves live grid load and renewable mix by zone, and reconciles each day against tariff and weather feeds to produce per-household bills.',
    problem:
      'Operators need seconds-fresh, approximate answers about grid load; billing needs exact, recomputable ones once the daily tariff arrives. A single pipeline either answers fast or answers exactly, not both.',
    diagram: `flowchart LR
    M[Meter simulator] --> K[(Kafka)]
    K --> S[Spark Streaming<br/>watermarks + windows]
    S --> RT[(Postgres<br/>live metrics)]
    K --> L[(Parquet lake)]
    T[Tariff + weather CSV] --> AF[Airflow DAG]
    L --> AF --> B[Spark batch<br/>billing]
    B --> BILL[(Postgres<br/>bills)]
    RT --> API[FastAPI]
    BILL --> API
    API --> G[Grafana / clients]`,
    steps: [
      { title: 'Ingest', body: 'A meter simulator streams readings into Kafka; an ingestion service lands every raw record in an immutable Parquet lake, with a dead letter queue for bad data.' },
      { title: 'Speed layer', body: 'Spark Structured Streaming validates and enriches readings, handles late data with watermarks, and computes tumbling and sliding window aggregates per zone.' },
      { title: 'Batch layer', body: 'When a day closes, an Airflow DAG senses the inputs and runs a Spark batch job that recomputes authoritative bills and solar credits.' },
      { title: 'Serve', body: 'FastAPI exposes both views from PostgreSQL through one API.' },
      { title: 'Watch', body: 'Prometheus, Grafana and an alert engine flag data gaps, low renewable generation and high reject rates.' },
    ],
    features: [
      'Lambda architecture with an immutable master dataset',
      'Watermarking for late-arriving data',
      'Idempotent, recomputable batch layer',
      'Flat, tiered and subsidised tariff strategies',
      'Data contracts between every producer and consumer',
      'Simulated clock to replay a full day in minutes',
    ],
    decisions: [
      { title: 'Lambda, not Kappa', body: 'Bills must be exactly recomputable from source, so a batch layer over an immutable lake makes reruns safe. The trade-off is recorded as an architecture decision record.' },
      { title: 'Idempotent upserts', body: 'Rerunning a day produces the same bill, so a late file or a failed job never means double charging.' },
      { title: 'Hexagonal shared kernel', body: 'Domain models and port interfaces live in one library shared by all services; adapters are swappable.' },
    ],
    stack: {
      Streaming: ['Apache Kafka (KRaft)', 'Spark Structured Streaming'],
      Batch: ['Spark', 'Apache Airflow', 'Parquet'],
      Serving: ['FastAPI', 'PostgreSQL 16'],
      Observability: ['Prometheus', 'Grafana', 'Alert engine'],
      Platform: ['Docker Compose (base + overlay)', 'Make'],
    },
    challenges: [
      { title: 'Late data', body: 'Readings can arrive after their window. Watermarks bound how long the speed layer waits; the batch layer corrects anything later.' },
      { title: 'Knowing a day is complete', body: 'The DAG only runs when the lake partition is closed and the daily feeds have landed.' },
    ],
    outcome: ['7 services in a layered Compose setup with per-service Dockerfiles.', '127 automated tests.'],
    gallery: [
      { src: '/img/sg_billing.webp', alt: 'Billing report with consumption, solar generation and amounts per household', caption: 'Generated daily billing and solar reconciliation report' },
      { src: '/img/sg_airflow.webp', alt: 'Airflow DAG with validate, wait, run batch, data quality, publish and record tasks', caption: 'daily_energy_reconciliation DAG in Airflow, all tasks succeeded' },
      { src: '/img/sg_grafana.webp', alt: 'Grafana panels: renewable contribution by zone, open alerts, latest bills', caption: 'Grafana: renewable share by zone, open alerts and latest bills' },
    ],
  },
  {
    slug: 'secure-ota',
    title: 'SecureOTA',
    short: 'Blockchain-anchored firmware updates that refuse tampered, rolled-back or revoked images.',
    tagline: 'Firmware updates an IoT device can verify for itself, even from an untrusted server.',
    year: '2026',
    context: 'Blockchain & Cyber Security module',
    role: 'Technical lead & primary developer',
    team: 'Team of 4',
    accent: ['#eab308', '#f97316'],
    categories: ['Security'],
    featured: true,
    github: gh('secure-ota'),
    metrics: [
      { value: '142', label: 'automated tests' },
      { value: '4', label: 'attack scenarios, end to end' },
      { value: '4', label: 'packages in one monorepo' },
    ],
    overview:
      'SecureOTA publishes each firmware release\'s SHA-256 fingerprint to a smart contract — never the binary. Devices download from anywhere, verify locally, and refuse anything that does not match. The same idea as Certificate Transparency, applied to embedded firmware.',
    problem:
      'IoT devices trust whatever their vendor\'s update server hands them. If the server, its CDN or the network is compromised, devices install attacker firmware. Code signing proves who built an image, not that it is the current release or that everyone received the same one.',
    diagram: `sequenceDiagram
    participant V as Vendor dashboard
    participant L as FirmwareRegistry.sol
    participant S as Untrusted server
    participant D as Device
    V->>L: publish(model, version, sha256)
    V->>S: upload binary
    D->>L: latest release?
    L-->>D: version, hash, revoked?
    D->>S: download
    D->>D: hash matches? newer? not revoked?`,
    steps: [
      { title: 'Publish', body: 'The manufacturer hashes the firmware in the browser and records version and fingerprint on-chain.' },
      { title: 'Download from anywhere', body: 'Devices fetch the binary from an untrusted server or CDN.' },
      { title: 'Verify locally', body: 'The device agent recomputes the hash and checks version and revocation against the ledger before flashing.' },
    ],
    features: [
      'Detects tampered firmware (HASH_MISMATCH)',
      'Blocks downgrades (ROLLBACK_BLOCKED)',
      'Honours vendor revocation (REVOKED)',
      'Manufacturer console to hash, publish and revoke',
      'Attack harness with a deliberately untrusted firmware server',
    ],
    decisions: [
      { title: 'Freeze the seam first', body: 'The contract ABI and golden fixtures were frozen and versioned before four people built against them in parallel.' },
      { title: 'Architecture enforced in CI', body: 'Tests parse every Python and TypeScript import and fail the build on a layering violation.' },
    ],
    stack: {
      'Smart contract': ['Solidity', 'Hardhat'],
      'Device agent': ['Python', 'Clean architecture'],
      Dashboard: ['React', 'TypeScript'],
      Testing: ['pytest', 'Hardhat tests', 'E2E attack harness'],
    },
    challenges: [
      { title: 'Four people, one interface', body: 'A versioned ABI and shared fixtures meant every package could be built and tested against fakes before integration.' },
    ],
    outcome: ['All four attack scenarios pass end to end.', '142 automated tests (108 device agent + 34 contract).'],
  },
  {
    slug: 'kafka-orders',
    title: 'Kafka Order Processing',
    short: 'A Kafka pipeline designed around failure: retry topic with backoff, dead letter queue, at-least-once delivery.',
    tagline: 'A Kafka pipeline built around what happens when processing fails.',
    year: '2026',
    context: 'Coursework',
    role: 'Sole developer',
    team: 'Individual',
    accent: ['#6366f1', '#a855f7'],
    categories: ['Backend', 'Data'],
    featured: true,
    github: gh('kafka-order-processing'),
    metrics: [
      { value: '29', label: 'automated tests' },
      { value: '3', label: 'topics: orders, retry, DLQ' },
    ],
    overview: 'A Python producer and consumer for Avro-encoded orders, with real-time aggregation and a full failure path: retries with exponential backoff and a dead letter queue.',
    problem: 'Happy-path Kafka is easy. Real pipelines need a plan for transient failures, poison messages and duplicate delivery.',
    diagram: `flowchart LR
    P[Producer] -->|Avro, key=orderId| O[(orders)]
    O --> C{{Consumer}}
    R[(orders-retry)] --> C
    C -->|ok| AGG[Running average]
    C -->|transient| R
    C -->|permanent| DLQ[(orders-dlq)]`,
    steps: [
      { title: 'Produce', body: 'Orders are Avro-encoded against a shared schema and keyed by order ID for partition affinity.' },
      { title: 'Consume', body: 'Successful orders update a real-time running average of prices.' },
      { title: 'Retry or park', body: 'Transient failures go to a retry topic with exponential backoff; permanent ones go to a dead letter queue with failure metadata.' },
    ],
    features: ['Avro serialisation', 'Retry topic + exponential backoff', 'Dead letter queue', 'At-least-once delivery', 'Repeatable live demo with Kafka UI'],
    decisions: [
      { title: 'Retry topic, not in-process retry', body: 'Failures leave the main partition so healthy traffic keeps flowing. At scale this becomes tiered delay topics.' },
      { title: 'Flush before commit', body: 'Retry and DLQ writes are flushed before the source offset is committed, so no message is lost in a crash.' },
    ],
    stack: { Language: ['Python'], Messaging: ['Apache Kafka', 'confluent-kafka', 'Avro (fastavro)'], Platform: ['Docker Compose', 'pytest'] },
    challenges: [{ title: 'Duplicates', body: 'At-least-once means a crash can replay a message, so downstream consumers are designed to be idempotent.' }],
    outcome: ['29 tests and a repeatable demo script.'],
  },
  {
    slug: 'prepdeck',
    title: 'PrepDeck',
    short: 'Live interview-prep app with spaced repetition, timed mock exams and community moderation.',
    tagline: 'Turning a pile of interview notes into something you can practise and be tested on.',
    year: '2026',
    context: 'Personal project',
    role: 'Sole developer',
    team: 'Individual',
    accent: ['#ec4899', '#8b5cf6'],
    categories: ['Backend'],
    featured: true,
    github: gh('PrepDeck'),
    live: 'https://prep-deck-seven.vercel.app',
    metrics: [
      { value: '~200', label: 'curated questions' },
      { value: '10', label: 'topics' },
      { value: '225', label: 'Vitest tests' },
    ],
    overview: 'A searchable, practisable question bank for technical interviews, live on Vercel.',
    problem: 'Revising from long, unsearchable chat transcripts does not work. I wanted something I could filter, practise with spaced repetition and be tested on.',
    steps: [
      { title: 'Browse', body: 'Filters live in the URL so any view is shareable; keyboard-first navigation.' },
      { title: 'Practise', body: 'Daily review queue and custom study packs, rated 1–4 with spaced repetition.' },
      { title: 'Test', body: 'Timed mock exams by topic, difficulty and type, with self-grading for open answers.' },
      { title: 'Contribute', body: 'Submit questions with duplicate detection; vote, report and moderate.' },
    ],
    features: ['Spaced repetition', 'Timed mock exams', 'Progress and weakest-topic tracking', 'Community moderation queue', 'Questions as markdown, imported idempotently'],
    decisions: [{ title: 'Swappable database', body: 'Business logic depends on repository interfaces, never on the MongoDB driver, so PostgreSQL is a new adapter, not a rewrite.' }],
    stack: { App: ['Next.js 16 (App Router)', 'TypeScript (strict)', 'Tailwind'], Data: ['MongoDB', 'Zod'], Quality: ['Vitest'], Hosting: ['Vercel'] },
    challenges: [{ title: 'Keeping the domain clean', body: 'Repository interfaces and an in-memory test double keep business rules testable without a database.' }],
    outcome: ['Live at prep-deck-seven.vercel.app.', '225 Vitest tests.'],
  },
  {
    slug: 'classroom-assessment',
    title: 'Classroom Assessment System',
    short: 'Team-built assessment platform with live exam-integrity monitoring and analytics.',
    tagline: 'Online quizzes with live integrity monitoring for teachers.',
    year: '2025',
    context: 'Software group project',
    role: 'Backend and dashboards',
    team: 'Team project',
    accent: ['#14b8a6', '#84cc16'],
    categories: ['Backend', 'DevOps'],
    featured: false,
    github: gh('CAS-backend'),
    cover: { src: '/img/cas_dashboard.webp', alt: 'Teacher dashboard listing assignments', caption: 'Teacher dashboard' },
    metrics: [
      { value: '3', label: 'roles: teacher, student, admin' },
      { value: '179', label: 'of my commits across 3 repos' },
      { value: '4', label: 'violation types tracked live' },
    ],
    overview: 'An assessment platform for MCQ, short-answer and essay quizzes, with a tamper-resistant exam mode and a teacher dashboard that monitors integrity in real time.',
    problem: 'Online quizzes are easy to cheat on: students switch tabs, leave full-screen or paste answers. Teachers need to see this as it happens, not after.',
    steps: [
      { title: 'Create', body: 'Teachers create and share quizzes from a dashboard.' },
      { title: 'Sit', body: 'Students take the quiz in a locked-down mode that blocks the clipboard and warns on suspicious activity.' },
      { title: 'Monitor', body: 'Tab switches, window switches, full-screen exits and mouse exits are timestamped and streamed to the teacher.' },
      { title: 'Analyse', body: 'Results show score distribution, completion time and an integrity risk level, exportable for grading.' },
    ],
    features: ['Role-based access (teacher / student / admin)', 'JWT with refresh-token rotation', 'Tamper-resistant exam mode', 'Live student monitoring', 'Integrity analysis and result export', 'Auto-grading of short answers by keyword'],
    decisions: [{ title: 'Separate apps per role', body: 'The backend, lecturer dashboard and student dashboard are separate codebases, so each can ship independently.' }],
    stack: { Frontend: ['Next.js', 'React'], Backend: ['Node.js', 'Express', 'MongoDB'], Delivery: ['AWS', 'GitHub Actions'] },
    challenges: [{ title: 'Detecting cheating in a browser', body: 'Browser events (visibility, focus, full-screen, pointer) are captured client-side and timestamped so teachers see a reliable timeline.' }],
    outcome: ['Delivered as a team project with a working end-to-end demo.'],
    gallery: [
      { src: '/img/cas_live_monitoring.webp', alt: 'Live student monitoring with violation counts and timeline', caption: 'Live integrity monitoring' },
      { src: '/img/cas_dashboard.webp', alt: 'Teacher dashboard with recent assignments', caption: 'Teacher dashboard' },
      { src: '/img/cas_analytics.webp', alt: 'Score distribution, completion time and integrity analysis', caption: 'Result analytics' },
      { src: '/img/cas_architecture.webp', alt: 'Layered system architecture diagram', caption: 'Designed system architecture' },
    ],
  },
  {
    slug: 'tradebot',
    title: 'TradeBot',
    short: 'Crypto trading bot with honest backtesting, an LLM news-risk gate and 24/7 deployment.',
    tagline: 'A trading bot built to be proven on paper before it touches real money.',
    year: '2026',
    context: 'Personal project',
    role: 'Sole developer',
    team: 'Individual',
    accent: ['#22c55e', '#06b6d4'],
    categories: ['Backend', 'AI / ML', 'DevOps'],
    featured: false,
    github: gh('TradeBot'),
    metrics: [
      { value: '5', label: 'strategies compared' },
      { value: '84', label: 'automated tests' },
      { value: '3', label: 'modes: paper, testnet, live' },
    ],
    overview: 'A Binance spot trading bot built step by step: backtest, add a news and LLM risk filter, prove it on testnet, and only then go live with a small budget.',
    problem: 'Most automated strategies lose money after fees, and backtests are easy to fool. The bot had to measure honestly and fail safely.',
    steps: [
      { title: 'Backtest honestly', body: 'A walk-forward optimiser tunes on old data and scores on unseen data and coins never used for tuning.' },
      { title: 'Check the news', body: 'An LLM risk gate (Gemini, falling back to Groq) reads headlines before a trade.' },
      { title: 'Trade safely', body: 'Testnet orders with OCO stop-loss and take-profit; state in SQLite so the bot resumes after a restart.' },
      { title: 'Stay in control', body: 'A web dashboard and Telegram bot offer start, pause, manual approval and a kill switch.' },
    ],
    features: ['5 strategies + ATR stops', 'Walk-forward optimisation', 'LLM news-risk gate', 'Restart-safe OCO orders', 'Refuses to run live if the API key can withdraw funds'],
    decisions: [{ title: 'Paper first', body: 'Real prices with simulated orders judge the strategy; testnet proves the order mechanics; live comes last.' }],
    stack: { Core: ['Python 3.11', 'uv', 'SQLite'], AI: ['Gemini', 'Groq'], Operations: ['systemd', 'Linux server', 'Telegram'] },
    challenges: [{ title: 'Not fooling yourself', body: 'Tuning and scoring on separate periods and coins keeps the backtest honest.' }],
    outcome: ['Running 24/7 in paper mode on a cloud server.', '84 automated tests.'],
  },
  {
    slug: 'secure-comms',
    title: 'Secure Comms & Traffic Observability',
    short: 'End-to-end encrypted chat with full mutual authentication and real-time traffic monitoring.',
    tagline: 'Encrypted messaging that assumes the network is hostile, and watches it.',
    year: '2026',
    context: 'Coursework',
    role: 'Developer',
    team: 'Team of 2',
    accent: ['#ef4444', '#a855f7'],
    categories: ['Security', 'DevOps'],
    featured: false,
    github: gh('secure-comm-observability'),
    metrics: [
      { value: '3', label: 'authentication gaps closed' },
      { value: '2', label: 'layers of forward secrecy' },
      { value: '3', label: 'integrity checks per message' },
    ],
    overview: 'A secure client-server chat with full mutual authentication, plus a packet-level traffic analyser feeding Grafana for availability and DoS monitoring.',
    problem: 'Password logins, unauthenticated key exchange and a trusted server leave room for impersonation and man-in-the-middle attacks.',
    steps: [
      { title: 'Authenticate the server', body: 'TLS 1.3 through Nginx with a CA-signed certificate.' },
      { title: 'Authenticate the user', body: 'Challenge-response login: a stolen password is useless without the user\'s ECDSA private key.' },
      { title: 'Authenticate each other', body: 'Server-signed key certificates and safety numbers let peers detect a man in the middle.' },
      { title: 'Encrypt end to end', body: 'Ephemeral ECDH + HKDF derives AES-256-GCM keys that never leave the browser.' },
      { title: 'Watch the wire', body: 'A Scapy sniffer pushes traffic features to InfluxDB; Grafana shows DoS patterns.' },
    ],
    features: ['TLS 1.3 + HSTS', 'Challenge-response login', 'Server-signed key certificates', 'Safety numbers', 'Hash-chained, signed audit log', 'STRIDE threat model'],
    decisions: [{ title: 'Two layers of forward secrecy', body: 'TLS ECDHE protects transport; ephemeral ECDH protects messages even if the server is compromised.' }],
    stack: { Backend: ['Flask', 'Socket.IO', 'cryptography'], Frontend: ['React', 'Web Crypto API'], Monitoring: ['Scapy', 'InfluxDB', 'Grafana'], Platform: ['Docker Compose', 'Nginx'] },
    challenges: [{ title: 'Closing the trust gaps', body: 'Each of the three authentication gaps needed its own protocol step, designed so a single stolen secret is not enough.' }],
    outcome: ['Live attack simulations demonstrated against the system, documented with a STRIDE analysis.'],
  },
  {
    slug: 'activity-recognition',
    title: 'Video Human Activity Recognition',
    short: 'OpenCV preprocessing with ConvLSTM vs CNN+LSTM; 87.7% test accuracy on a UCF50 subset.',
    tagline: 'Recognising what people are doing in video from appearance and motion.',
    year: '2026',
    context: 'Image Processing & Computer Vision module',
    role: 'Developer',
    team: 'Team of 4',
    accent: ['#f59e0b', '#ef4444'],
    categories: ['AI / ML'],
    featured: false,
    github: gh('Human-Action-Recognition'),
    cover: { src: '/img/har_preprocessing_pipeline.webp', alt: 'A frame through each preprocessing stage', caption: 'Preprocessing pipeline' },
    metrics: [
      { value: '87.7%', label: 'test accuracy (ConvLSTM)' },
      { value: '4', label: 'activity classes' },
      { value: '20', label: 'frames per clip' },
    ],
    overview: 'Classifies human activities in video by combining a classical OpenCV pipeline with deep spatio-temporal models, and compares ConvLSTM with CNN + LSTM.',
    problem: 'A single frame often can\'t tell activities apart — they differ in motion, not appearance — and real videos vary in angle, background and lighting.',
    steps: [
      { title: 'Sample', body: 'Each video becomes 20 evenly spaced frames.' },
      { title: 'Preprocess', body: 'INTER_AREA resize, CLAHE on luminance, automatic gamma and a Sobel edge channel give a 64×64×4 tensor.' },
      { title: 'Learn', body: 'ConvLSTM learns shape and motion together; CNN + LSTM learns per-frame features, then the sequence.' },
      { title: 'Compare', body: 'Both models are evaluated on the same test set, with an ablation of each preprocessing step.' },
    ],
    features: ['Shared preprocessing for training and inference', 'Leak-free augmentation (split before flipping)', 'Ablation study of each preprocessing step'],
    decisions: [{ title: 'Edge channel as input', body: 'An explicit Sobel channel gives the model a shape signal instead of forcing it to learn edges from a small dataset.' }],
    stack: { Vision: ['OpenCV'], Models: ['TensorFlow / Keras', 'ConvLSTM', 'LRCN'], Tools: ['scikit-learn', 'Google Colab'] },
    challenges: [{ title: 'Small dataset', body: 'Lightweight models, flip augmentation and early stopping kept overfitting in check.' }],
    outcome: ['ConvLSTM 87.7% and CNN + LSTM 86.1% test accuracy.'],
    gallery: [{ src: '/img/har_preprocessing_pipeline.webp', alt: 'A frame through resize, CLAHE, gamma and Sobel', caption: 'Preprocessing pipeline' }],
  },
];

export const featured = projects.filter((p) => p.featured);

export interface Mini { title: string; blurb: string; stack: string[]; categories: Category[]; github?: string; }

export const minis: Mini[] = [
  { title: 'MediAssist', blurb: 'Group AI project: medical NER, BART summarisation and BioBERT triage classification.', stack: ['Python', 'spaCy', 'Transformers'], categories: ['AI / ML'], github: gh('MediAssist') },
  { title: 'T20 Cricket on an FPGA', blurb: 'Two-team cricket match in synthesisable Verilog with LFSR deliveries and a seven-segment scoreboard.', stack: ['Verilog', 'Vivado', 'Zynq-7000'], categories: ['Hardware'], github: gh('T20_CRICKET_SIMULATION_USING_VERILOG') },
];
