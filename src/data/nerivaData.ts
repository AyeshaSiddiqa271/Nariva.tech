export interface ArchitectureLayer {
  layerName: string;
  specification: string;
  technologies: string;
}

export interface CapabilityItem {
  id: string;
  number: string;
  category: 'saas' | 'ai' | 'design';
  categoryLabel: string;
  title: string;
  summary: string;
  extendedDescription: string;
  keyMetricValue: string;
  keyMetricContext: string;
  colSpan: 'wide' | 'narrow' | 'full';
  deliverables: string[];
  architectureLayers: ArchitectureLayer[];
  slaTarget: string;
}

export interface PhilosophyItem {
  number: string;
  title: string;
  description: string;
  architecturalProof: string;
  conventionalApproach: string;
  nerivaStandard: string;
  impactMetric: string;
}

export interface CaseStudy {
  id: string;
  category: 'saas' | 'ai' | 'resilience';
  categoryLabel: string;
  clientDomain: string;
  duration: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  primaryMetric: string;
  secondaryMetric: string;
  tertiaryMetric: string;
  challenge: string;
  architectureSolution: string;
  verifiedOutcome: string;
  stackSummary: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    organization: string;
  };
}

export const HERO_IMAGE_PATH = '/src/assets/images/hero_neriva_architecture_1791196446425.jpg';

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'enterprise-saas',
    number: '01.',
    category: 'saas',
    categoryLabel: 'Cloud Infrastructure & Multi-Tenancy',
    title: 'Enterprise SaaS Architecture',
    summary:
      'Designing and deploying secure, multi-tenant cloud software built for high availability and seamless scalability.',
    extendedDescription:
      'We architect distributed SaaS platforms with strict tenant isolation, deterministic data partitioning, and zero-downtime deployment pipelines so B2B software companies can onboard enterprise accounts without re-platforming.',
    keyMetricValue: '99.995%',
    keyMetricContext: 'Measured multi-region SLA across production tenant clusters over 12 months',
    colSpan: 'wide',
    slaTarget: 'Sub-45ms p99 API Gateway Latency',
    deliverables: [
      'Multi-tenant control plane & isolated data-plane topology',
      'Event-driven billing, metering, and RBAC policy engine',
      'Automated Kubernetes infrastructure-as-code (Terraform & Helm)',
      'Zero-downtime schema migration & canary deployment pipeline',
    ],
    architectureLayers: [
      {
        layerName: 'Edge & API Gateway',
        specification: 'Federated GraphQL & gRPC ingress with per-tenant rate limiting and mTLS termination',
        technologies: 'Envoy · Apollo Federation · Cloudflare Enterprise',
      },
      {
        layerName: 'Core Domain Services',
        specification: 'Stateless Go & TypeScript microservices communicating via durable event streams',
        technologies: 'Go · Node.js · Apache Kafka · Temporal',
      },
      {
        layerName: 'Data & Tenant Isolation',
        specification: 'Row-level security with dedicated schema sharding for regulated enterprise tiers',
        technologies: 'PostgreSQL · Citus · Redis Cluster · ClickHouse',
      },
    ],
  },
  {
    id: 'ai-integration',
    number: '02.',
    category: 'ai',
    categoryLabel: 'Applied Machine Learning & Workflows',
    title: 'AI-Driven Integration',
    summary:
      'Embedding intelligent automation and machine learning models directly into your business workflows.',
    extendedDescription:
      'Rather than bolting on superficial chat widgets, we engineer deterministic retrieval-augmented pipelines, document intelligence engines, and automated decision routing directly inside your core operational software.',
    keyMetricValue: '-68%',
    keyMetricContext: 'Reduction in manual exception handling time across enterprise operations',
    colSpan: 'narrow',
    slaTarget: '99.2% Structured Output Schema Compliance',
    deliverables: [
      'Hybrid vector + relational retrieval pipelines with strict ACL filtering',
      'Deterministic workflow orchestration with human-in-the-loop verification',
      'Automated evaluation harnesses for latency, drift, and hallucination regression',
      'PII redaction proxy and sovereign model hosting infrastructure',
    ],
    architectureLayers: [
      {
        layerName: 'Ingestion & Semantic Indexing',
        specification: 'Incremental document chunking and permission-aware embedding synchronization',
        technologies: 'pgvector · Qdrant · Apache Airflow · Python',
      },
      {
        layerName: 'Inference & Orchestration',
        specification: 'Multi-model routing with structured JSON grammar enforcement and fallback queues',
        technologies: 'vLLM · Ray Serve · Temporal · TypeScript',
      },
      {
        layerName: 'Evaluation & Governance',
        specification: 'Continuous telemetry logging, token cost attribution, and compliance auditing',
        technologies: 'OpenTelemetry · Prometheus · Custom Eval Suites',
      },
    ],
  },
  {
    id: 'ui-ux-moving-design',
    number: '03.',
    category: 'design',
    categoryLabel: 'Interactive Product Design & Motion Systems',
    title: 'UI & UX Moving Product Design',
    summary:
      'Crafting high-conversion, kinetic software interfaces with 60fps micro-interactions and tokenized design systems.',
    extendedDescription:
      'We design and engineer fluid digital products where every state transition, onboarding step, and data visualization moves with purposeful precision—turning complex enterprise workflows into intuitive, tactile user experiences.',
    keyMetricValue: '+62%',
    keyMetricContext: 'Increase in trial-to-paid workspace activation after kinetic UX & onboarding redesign',
    colSpan: 'narrow',
    slaTarget: '60fps Compositor Motion · WCAG AA Verified',
    deliverables: [
      'Interactive Figma & coded React/Tailwind tokenized design systems',
      '60fps spring-physics micro-interactions, state transitions, and onboarding flows',
      'User journey mapping, conversion funnel optimization, and usability testing',
      'Responsive multi-tenant dashboard layouts with executive & operator density modes',
    ],
    architectureLayers: [
      {
        layerName: 'Interaction & Motion Layer',
        specification: 'Hardware-accelerated transform and opacity animations with reduced-motion accessibility fallbacks',
        technologies: 'Motion · CSS Compositor Layers · React 19 · SVG Path Physics',
      },
      {
        layerName: 'Tokenized Design System',
        specification: 'Strict typographic hierarchy, mathematical border radii, and multi-tenant theme variables',
        technologies: 'Tailwind CSS · Radix Primitives · Storybook · Design Tokens',
      },
      {
        layerName: 'UX Telemetry & Conversion',
        specification: 'Optimistic UI updates, skeleton state choreography, and funnel drop-off instrumentation',
        technologies: 'TanStack Query · Web Vitals · PostHog · Custom Event Funnels',
      },
    ],
  },
  {
    id: 'saas-business-growth',
    number: '04.',
    category: 'saas',
    categoryLabel: 'Revenue Systems & Scalable SaaS Products',
    title: 'SaaS for Business Growth',
    summary:
      'Building commercial SaaS applications engineered to accelerate customer acquisition, retention, and recurring revenue expansion.',
    extendedDescription:
      'We architect and ship growth-focused SaaS platforms that turn complex operational workflows into intuitive, self-serve and enterprise software products—complete with automated workspace provisioning, usage-based monetization, and real-time commercial analytics.',
    keyMetricValue: '+145%',
    keyMetricContext: 'Average net revenue retention & expansion throughput across launched SaaS platforms',
    colSpan: 'wide',
    slaTarget: 'Sub-Second Workspace Provisioning & Onboarding',
    deliverables: [
      'Self-serve onboarding flows, workspace management, and role-based permissions',
      'Usage-based metering, tiered subscription billing, and entitlement engines',
      'Real-time customer health, funnel telemetry, and revenue expansion analytics',
      'High-throughput API & webhook ecosystems for seamless CRM and ERP sync',
    ],
    architectureLayers: [
      {
        layerName: 'Product & Conversion Experience',
        specification: 'Low-latency, responsive SaaS interfaces designed for rapid user activation and daily retention',
        technologies: 'React · TypeScript · Tailwind CSS · TanStack Query',
      },
      {
        layerName: 'Monetization & Growth Engine',
        specification: 'Idempotent subscription lifecycle, metered billing webhooks, and automated feature entitlements',
        technologies: 'Node.js · Go · Stripe Billing API · Redis',
      },
      {
        layerName: 'Commercial Telemetry & Analytics',
        specification: 'Real-time event ingestion for product-led growth metrics, cohort retention, and account usage',
        technologies: 'ClickHouse · PostgreSQL · Apache Kafka · OpenTelemetry',
      },
    ],
  },
];

export const PHILOSOPHY_ITEMS: PhilosophyItem[] = [
  {
    number: '01.',
    title: 'Structural Precision',
    description:
      'Every line of code serves a strategic purpose, ensuring zero technical bloat.',
    architecturalProof:
      'We enforce strict domain boundaries, explicit API contracts, and dependency budgets so your engineering team spends time shipping capabilities rather than untangling accidental complexity.',
    conventionalApproach:
      'Rapidly scaffolded boilerplate heavy on third-party wrappers, resulting in brittle upgrades and sluggish build pipelines within 6 months.',
    nerivaStandard:
      'Lean, strongly-typed domain modules with zero redundant abstraction layers, comprehensive contract tests, and sub-second local feedback loops.',
    impactMetric: '-54% Codebase Maintenance Overhead over 24 Months',
  },
  {
    number: '02.',
    title: 'Built for Scale',
    description:
      'Architectures designed to handle exponential growth effortlessly from day one.',
    architecturalProof:
      'We design stateless compute tiers, horizontally partitioned data stores, and asynchronous backpressure queues so 10× traffic spikes degrade nothing and require zero emergency rewrites.',
    conventionalApproach:
      'Vertical database scaling and synchronous request chains that lock up under sudden enterprise onboarding or seasonal transaction surges.',
    nerivaStandard:
      'Event-driven decoupling, read/write replica routing, and automated horizontal pod autoscaling validated under synthetic load before launch.',
    impactMetric: '10× Peak Load Elasticity with Linear Infrastructure Cost',
  },
  {
    number: '03.',
    title: 'Uncompromising Security',
    description:
      'Enterprise-grade protection safeguarding your core data and operations.',
    architecturalProof:
      'Security is embedded into the network topology and data layer—featuring zero-trust service authentication, envelope encryption at rest, and automated compliance evidence collection.',
    conventionalApproach:
      'Perimeter-only security with shared database credentials and manual pre-audit scrambles when enterprise procurement requests SOC2 documentation.',
    nerivaStandard:
      'Cryptographic tenant isolation, short-lived IAM credentials, immutable audit logs, and continuous SAST/DAST verification on every commit.',
    impactMetric: '100% First-Pass Enterprise Security Audit Clearance',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech-clearing-engine',
    category: 'saas',
    categoryLabel: 'Enterprise SaaS Architecture',
    clientDomain: 'Cross-Border Treasury & Settlement',
    duration: '14 Weeks Engagement',
    title: 'Multi-Region Settlement Core for Institutional Treasury Platform',
    summary:
      'Architected a fault-tolerant, multi-tenant ledger and settlement engine processing $4.2B in annualized B2B payment volume across 18 currencies.',
    imageUrl: '/src/assets/images/case_fintech_ledger_1791196467677.jpg',
    imageAlt: 'Isometric architectural rendering of a modular distributed cloud settlement system',
    primaryMetric: '+310% Transaction Throughput in 4 Months',
    secondaryMetric: '99.998% Verified Multi-Region Uptime',
    tertiaryMetric: '-38% AWS Compute & Database Spend',
    challenge:
      'A Series B treasury platform faced database deadlocks and 4-second settlement latencies during market close windows, blocking three tier-one enterprise bank partnerships.',
    architectureSolution:
      'Replaced the single-region monolithic ledger with an event-sourced double-entry engine in Go and PostgreSQL Citus, paired with idempotent Kafka settlement workers and strict per-tenant cryptographic isolation.',
    verifiedOutcome:
      'Reduced p99 settlement latency from 4,100ms to 28ms, passed three institutional bank security audits on the first review, and onboarded 45 new enterprise customers without infrastructure friction.',
    stackSummary: 'Go · PostgreSQL Citus · Apache Kafka · Temporal · Terraform · AWS EKS',
    testimonial: {
      quote:
        'Before Neriva, database lock contention during peak settlement windows threatened our largest bank rollouts. Their team re-architected our core ledger with zero cutover downtime, cutting p99 latency to 28ms and clearing our institutional audits ahead of schedule.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer',
      organization: 'Aurelia Treasury Systems',
    },
  },
  {
    id: 'autonomous-logistics-ai',
    category: 'ai',
    categoryLabel: 'AI-Driven Integration',
    clientDomain: 'Global Freight & Customs Orchestration',
    duration: '11 Weeks Engagement',
    title: 'Deterministic Document Intelligence & Customs Routing Engine',
    summary:
      'Embedded domain-tuned multimodal extraction and automated compliance verification directly into an enterprise freight ERP handling 180,000 daily manifests.',
    imageUrl: '/src/assets/images/case_ai_logistics_1791196483858.jpg',
    imageAlt: 'Editorial photograph of an automated logistics and supply chain command facility',
    primaryMetric: '-74% Customs Exception Processing Time',
    secondaryMetric: '$2.1M Annualized Operational Savings',
    tertiaryMetric: '99.4% Field Extraction Accuracy',
    challenge:
      'Operations teams manually cross-referenced multi-language bills of lading, commercial invoices, and tariff schedules across 40+ jurisdictions, causing costly port demurrage delays.',
    architectureSolution:
      'Engineered an asynchronous document ingestion pipeline combining layout-aware OCR, fine-tuned domain extraction models, and a deterministic tariff rule verifier that flags only true regulatory anomalies for human review.',
    verifiedOutcome:
      'Automated 86% of end-to-end customs clearance workflows within 90 days of deployment, eliminating $2.1M in annual demurrage penalties and manual processing overhead.',
    stackSummary: 'Python · Ray Serve · Qdrant · PostgreSQL · TypeScript · OpenTelemetry',
    testimonial: {
      quote:
        'Our operations specialists were buried under 180,000 daily shipping manifests. Neriva built an integrated AI verification pipeline directly inside our existing ERP that cut exception resolution time by 74% and saved $2.1M in its first year.',
      author: 'Elena Rostova',
      role: 'VP of Global Operations Engineering',
      organization: 'Vanguard Meridian Logistics',
    },
  },
];

export interface EstimatorOption {
  id: string;
  label: string;
  subtitle: string;
  baseWeeks: number;
  squadSize: string;
  architectureFocus: string;
  deliverables: string[];
}

export const ESTIMATOR_TRACKS: EstimatorOption[] = [
  {
    id: 'enterprise-saas',
    label: 'Enterprise SaaS Architecture',
    subtitle: 'Multi-tenant cloud platform, control plane & billing engine',
    baseWeeks: 10,
    squadSize: '1 Principal Architect · 3 Senior Distributed Systems Engineers · 1 DevSecOps Lead',
    architectureFocus: 'Tenant-isolated data plane, federated API gateway, and automated IaC provisioning',
    deliverables: [
      'Multi-tenant PostgreSQL/Citus data partitioning & RBAC engine',
      'High-availability Kubernetes cluster topology with Terraform',
      'Idempotent API gateway, webhook delivery & observability suite',
    ],
  },
  {
    id: 'ai-integration',
    label: 'AI-Driven Workflow Integration',
    subtitle: 'Production RAG, document intelligence & deterministic automation',
    baseWeeks: 8,
    squadSize: '1 AI Systems Architect · 2 Senior ML/Backend Engineers · 1 Data Pipeline Engineer',
    architectureFocus: 'Permission-aware semantic retrieval, structured model routing, and automated eval harnesses',
    deliverables: [
      'ACL-enforced vector indexing & hybrid retrieval pipeline',
      'Deterministic workflow orchestration with human-in-the-loop fallback',
      'Automated regression benchmark suite for accuracy & latency SLAs',
    ],
  },
  {
    id: 'saas-business-growth',
    label: 'SaaS for Business Growth',
    subtitle: 'Product-led onboarding, usage-based billing & revenue expansion analytics',
    baseWeeks: 9,
    squadSize: '1 Principal Product Architect · 3 Senior Full-Stack SaaS Engineers · 1 Growth Data Engineer',
    architectureFocus: 'Self-serve workspace provisioning, metered billing pipelines, and real-time customer telemetry',
    deliverables: [
      'Self-serve multi-workspace onboarding & role-based entitlement system',
      'Automated subscription & usage-based billing integration (Stripe/Metered)',
      'Real-time cohort retention, funnel conversion & expansion analytics engine',
    ],
  },
  {
    id: 'ui-ux-moving-design',
    label: 'UI & UX Moving Product Design',
    subtitle: 'Interactive SaaS design systems, 60fps motion & conversion UX architecture',
    baseWeeks: 6,
    squadSize: '1 Principal Design Systems Architect · 2 Senior UI/UX Product Engineers · 1 Motion Specialist',
    architectureFocus: 'Tokenized component architecture, compositor-grade spring physics, and frictionless user activation flows',
    deliverables: [
      'Complete multi-tenant React & Tailwind tokenized component library',
      'Interactive 60fps onboarding, data visualization & workflow micro-interactions',
      'WCAG AA accessibility audit, keyboard navigation & Core Web Vitals optimization',
    ],
  },
];

export const SCALE_TIERS = [
  {
    id: 'growth',
    label: 'Seed to Series B Scale',
    metrics: 'Up to 100k MAU · Single Primary Region + Hot Standby',
    weekModifier: 0,
    slaTarget: '99.95% Target Availability',
  },
  {
    id: 'enterprise',
    label: 'High-Throughput Enterprise',
    metrics: '100k – 2M MAU · Multi-AZ Active-Active Topology',
    weekModifier: 2,
    slaTarget: '99.99% Target Availability',
  },
  {
    id: 'global',
    label: 'Mission-Critical Global',
    metrics: '2M+ MAU · Multi-Region Geo-Partitioned Clusters',
    weekModifier: 4,
    slaTarget: '99.995% Target Availability',
  },
];

export const SECURITY_POSTURES = [
  {
    id: 'soc2',
    label: 'SOC2 Type II Ready',
    detail: 'Automated audit logging, least-privilege IAM, encrypted state at rest/transit',
    weekModifier: 0,
  },
  {
    id: 'regulated',
    label: 'HIPAA / GDPR Strict Residency',
    detail: 'Regional data sovereignty, PII tokenization proxy, dedicated tenant schemas',
    weekModifier: 2,
  },
  {
    id: 'zerotrust',
    label: 'Financial-Grade Zero Trust',
    detail: 'mTLS service mesh, hardware KMS envelope encryption, immutable ledger trails',
    weekModifier: 3,
  },
];
