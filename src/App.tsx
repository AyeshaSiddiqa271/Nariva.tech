import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Globe,
  Sliders,
  Menu,
  X,
  FileText,
  AlertCircle,
} from 'lucide-react';
import {
  HERO_IMAGE_PATH,
  CAPABILITIES,
  PHILOSOPHY_ITEMS,
  CASE_STUDIES,
  ESTIMATOR_TRACKS,
  SCALE_TIERS,
  SECURITY_POSTURES,
  CapabilityItem,
  CaseStudy,
} from './data/nerivaData';
import { ResilientImage } from './components/ResilientImage';
import { ArchitectureModal } from './components/ArchitectureModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { InteractiveUxShowcase } from './components/InteractiveUxShowcase';

const MARQUEE_DISCIPLINES = [
  'Enterprise SaaS Architecture',
  'UI & UX Moving Product Design',
  'AI-Driven Workflow Integration',
  'SaaS for Business Growth',
  'Multi-Tenant Cloud Isolation',
  '60fps Interactive Design Systems',
  'Usage-Based Billing & Metering',
  'Sub-45ms Edge API Gateways',
];

export default function App() {
  // Interactive Filter States
  const [capabilityFilter, setCapabilityFilter] = useState<'all' | 'saas' | 'ai' | 'design'>('all');
  const [caseFilter, setCaseFilter] = useState<'all' | 'saas' | 'ai'>('all');
  const [philosophyView, setPhilosophyView] = useState<'standard' | 'comparison'>('standard');

  // Modal States
  const [activeCapability, setActiveCapability] = useState<CapabilityItem | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Scope Estimator States
  const [selectedTrackId, setSelectedTrackId] = useState<string>(ESTIMATOR_TRACKS[0].id);
  const [selectedScaleId, setSelectedScaleId] = useState<string>(SCALE_TIERS[1].id);
  const [selectedSecurityId, setSelectedSecurityId] = useState<string>(SECURITY_POSTURES[0].id);
  const [scopeAttached, setScopeAttached] = useState(false);

  // Contact / Consultation Form States
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [inquiryTrack, setInquiryTrack] = useState('Enterprise SaaS Architecture');
  const [projectObjectives, setProjectObjectives] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBrief, setSubmittedBrief] = useState<{
    referenceId: string;
    name: string;
    email: string;
    organization: string;
    track: string;
    objectives: string;
    estimatedWeeks: number;
    timestamp: string;
    deliveryStatus: 'delivered' | 'fallback';
    deliveryMessage?: string;
  } | null>(null);

  // Copy states
  const [emailCopied, setEmailCopied] = useState(false);
  const [briefCopied, setBriefCopied] = useState(false);

  const contactInputRef = useRef<HTMLInputElement>(null);

  // Computed Estimator Outputs
  const currentTrack =
    ESTIMATOR_TRACKS.find((t) => t.id === selectedTrackId) || ESTIMATOR_TRACKS[0];
  const currentScale =
    SCALE_TIERS.find((s) => s.id === selectedScaleId) || SCALE_TIERS[1];
  const currentSecurity =
    SECURITY_POSTURES.find((sec) => sec.id === selectedSecurityId) || SECURITY_POSTURES[0];

  const totalEstimatedWeeks =
    currentTrack.baseWeeks + currentScale.weekModifier + currentSecurity.weekModifier;

  const filteredCapabilities =
    capabilityFilter === 'all'
      ? CAPABILITIES
      : CAPABILITIES.filter((item) => item.category === capabilityFilter);

  const filteredCaseStudies =
    caseFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((study) => study.category === caseFilter);

  const scrollToSection = (sectionId: string, focusContact = false) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (focusContact) {
        setTimeout(() => {
          contactInputRef.current?.focus();
        }, 450);
      }
    }
  };

  const handleSelectCapabilityForInquiry = (capability: CapabilityItem) => {
    setActiveCapability(null);
    setInquiryTrack(capability.title);
    setProjectObjectives(
      `Requesting architectural review for ${capability.title} (${capability.slaTarget}).`
    );
    scrollToSection('contact', true);
  };

  const handleSelectTopicForInquiry = (topicTitle: string, topicDetail: string) => {
    setInquiryTrack(topicTitle);
    setProjectObjectives(topicDetail);
    scrollToSection('contact', true);
  };

  const handleRequestSimilarCaseStudy = (study: CaseStudy) => {
    setActiveCaseStudy(null);
    setInquiryTrack(study.categoryLabel);
    setProjectObjectives(
      `Interested in an architecture similar to "${study.title}" (${study.clientDomain}).`
    );
    scrollToSection('contact', true);
  };

  const handleAttachScopeToInquiry = () => {
    setScopeAttached(true);
    setInquiryTrack(currentTrack.label);
    const scopeSummary = `Scoped via Neriva Estimator: ${currentTrack.label} | Scale: ${currentScale.label} (${currentScale.slaTarget}) | Security: ${currentSecurity.label} | Est. Delivery: ${totalEstimatedWeeks} Weeks.`;
    setProjectObjectives((prev) =>
      prev.trim() ? `${prev.trim()}\n\n${scopeSummary}` : scopeSummary
    );
    scrollToSection('contact', true);
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('nerivatech@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = fullName.trim();
    const trimmedEmail = workEmail.trim();
    const trimmedOrg = organization.trim();
    const trimmedObj = projectObjectives.trim();

    if (!trimmedName) {
      setFormError('Please provide your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormError('Please enter a valid work email address (e.g., alex@company.com).');
      return;
    }

    if (!trimmedOrg) {
      setFormError('Please specify your organization or project name.');
      return;
    }

    if (trimmedObj.length < 12) {
      setFormError('Please include a brief summary of your architectural objectives or timeline.');
      return;
    }

    const refNumber = `NRV-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/nerivatech@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Neriva Architecture Brief [${refNumber}] — ${trimmedOrg}`,
          _template: 'table',
          _replyto: trimmedEmail,
          _captcha: 'false',
          Reference_ID: refNumber,
          Client_Name: trimmedName,
          Work_Email: trimmedEmail,
          Organization: trimmedOrg,
          Engineering_Focus: inquiryTrack,
          Estimated_Delivery_Cycle: `${totalEstimatedWeeks} Weeks`,
          Architectural_Objectives: trimmedObj,
        }),
      });

      const data = await response.json().catch(() => null);

      setSubmittedBrief({
        referenceId: refNumber,
        name: trimmedName,
        email: trimmedEmail,
        organization: trimmedOrg,
        track: inquiryTrack,
        objectives: trimmedObj,
        estimatedWeeks: totalEstimatedWeeks,
        timestamp,
        deliveryStatus: response.ok ? 'delivered' : 'fallback',
        deliveryMessage:
          data?.message ||
          'Your architecture brief has been dispatched directly to nerivatech@gmail.com.',
      });
    } catch {
      setSubmittedBrief({
        referenceId: refNumber,
        name: trimmedName,
        email: trimmedEmail,
        organization: trimmedOrg,
        track: inquiryTrack,
        objectives: trimmedObj,
        estimatedWeeks: totalEstimatedWeeks,
        timestamp,
        deliveryStatus: 'fallback',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySubmittedBrief = () => {
    if (!submittedBrief || !navigator.clipboard) return;
    const text = `NERIVA TECHNICAL CONSULTATION BRIEF (${submittedBrief.referenceId})\nClient: ${submittedBrief.name} (${submittedBrief.email})\nOrganization: ${submittedBrief.organization}\nTrack: ${submittedBrief.track}\nEstimated Cycle: ${submittedBrief.estimatedWeeks} Weeks\nObjectives: ${submittedBrief.objectives}`;
    navigator.clipboard.writeText(text);
    setBriefCopied(true);
    setTimeout(() => setBriefCopied(false), 2000);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F6F6F2] text-[#0B0D11]">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 h-16 bg-[#F6F6F2]/95 backdrop-blur-xs border-b border-neutral-200 px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-[#0B0D11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
        >
          Neriva
        </a>

        {/* Zone 2: 5 single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600"
        >
          <a
            href="#about"
            className="hover:text-[#0B0D11] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Who We Are
          </a>
          <a
            href="#solutions"
            className="hover:text-[#0B0D11] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Solutions
          </a>
          <a
            href="#philosophy"
            className="hover:text-[#0B0D11] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Philosophy
          </a>
          <a
            href="#case-studies"
            className="hover:text-[#0B0D11] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Case Studies
          </a>
          <a
            href="#estimator"
            className="hover:text-[#0B0D11] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Scope Planner
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('contact', true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0B0D11] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            Schedule Technical Review
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-300 text-[#0B0D11] hover:bg-neutral-200/60 transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F6F6F2] border-b border-neutral-200 px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-800 hover:text-[#1D4ED8]"
          >
            Who We Are
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('solutions')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-800 hover:text-[#1D4ED8]"
          >
            Solutions
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('philosophy')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-800 hover:text-[#1D4ED8]"
          >
            Philosophy
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('case-studies')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-800 hover:text-[#1D4ED8]"
          >
            Case Studies
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('estimator')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-800 hover:text-[#1D4ED8]"
          >
            Scope Planner
          </button>
        </div>
      )}

      <main className="flex-1">
        {/* 1. HERO SECTION — PROPOSITION */}
        <section className="px-4 sm:px-8 lg:px-12 pt-10 pb-14 lg:pt-16 lg:pb-20 max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              {/* Unboxed regional & B2B trust signal in Hero */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600 mb-5">
                <span className="font-semibold text-[#0B0D11]">Neriva Software Engineering</span>
                <span aria-hidden="true">·</span>
                <span>Enterprise SaaS, UI/UX Motion & Applied AI</span>
                <span aria-hidden="true">·</span>
                <span>Global Distributed Delivery</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight text-[#0B0D11] leading-[1.06]">
                Intelligent Software. Real Solutions.
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-2xl font-normal">
                Engineering resilient digital infrastructure, kinetic UI/UX experiences, and
                AI-powered software for tomorrow&apos;s market leaders.
              </p>
            </motion.div>

            {/* Single Primary Decision Block */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-end gap-4"
            >
              <button
                type="button"
                onClick={() => scrollToSection('solutions')}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact', true)}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B0D11] hover:text-[#1D4ED8] transition-colors whitespace-nowrap py-1"
              >
                <span>Get in Touch with Principal Architects</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
          </div>

          {/* Dominant 16:9 Focal Visual Carrier with Measured Contrast Scrim */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 lg:mt-12 relative rounded-xl overflow-hidden border border-neutral-300 aspect-16/9 bg-[#0B0D11]"
          >
            <ResilientImage
              src={HERO_IMAGE_PATH}
              alt="Neriva architectural software engineering studio with warm natural illumination"
              fallbackTitle="Neriva Engineering Studio"
              fallbackSubtitle="Intelligent Software. Real Solutions."
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/20 text-white">
                <div>
                  <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-white">
                    99.995%
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-200 mt-1">
                    Measured uptime across multi-tenant production cloud topologies
                  </p>
                </div>
                <div className="md:border-l md:border-white/20 md:pl-6">
                  <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-white">
                    3.8× Faster
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-200 mt-1">
                    Release cycle velocity within 90 days of CI/CD and UX system deployment
                  </p>
                </div>
                <div className="md:border-l md:border-white/20 md:pl-6">
                  <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-white">
                    $6.4B+ Volume
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-200 mt-1">
                    Annualized enterprise data & transaction load processed by Neriva cores
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONTINUOUS KINETIC ENGINEERING & UI/UX DISCIPLINE MARQUEE */}
        <div
          aria-label="Neriva Core Engineering and UI/UX Disciplines"
          className="border-t border-neutral-200 bg-[#0B0D11] text-neutral-300 py-3.5 overflow-hidden select-none"
        >
          <div className="animate-neriva-marquee flex items-center gap-8 text-xs font-mono-tabular">
            {[...MARQUEE_DISCIPLINES, ...MARQUEE_DISCIPLINES].map((item, idx) => (
              <div key={`${item}-${idx}`} className="flex items-center gap-8 shrink-0">
                <span className="text-white font-medium">{item}</span>
                <span className="text-[#3B82F6]" aria-hidden="true">
                  ·
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. WHO WE ARE — ARCHITECTURAL STATEMENT */}
        <section
          id="about"
          className="border-t border-neutral-200 bg-[#EFEFE9] px-4 sm:px-8 lg:px-12 py-16 lg:py-24"
        >
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold text-neutral-500">01. Who We Are</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0D11] mt-2">
                Systemic reliability engineered from first principles.
              </h2>
              <p className="text-xs text-neutral-500 mt-4">
                San Francisco · London · Singapore · Remote-First Pods
              </p>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <p className="text-lg sm:text-xl text-[#0B0D11] leading-relaxed font-medium">
                At <strong className="font-semibold">Neriva</strong>, we don&apos;t just write
                code—we engineer systemic reliability. In a world driven by complexity, we bridge
                the gap between ambitious business vision and flawless technical execution.
              </p>
              <p className="text-base text-neutral-700 leading-relaxed max-w-[70ch]">
                Our focus is building high-performance, scalable software products that enable
                enterprises and fast-growing startups to scale without friction. Every system we
                deliver is architected for multi-region fault tolerance, deterministic performance
                under load, and long-term maintainability by your internal engineering teams.
              </p>

              {/* Unboxed architectural pillars row */}
              <div className="pt-6 border-t border-neutral-300 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="font-mono-tabular text-sm font-semibold text-[#0B0D11]">
                    01. Principal-Led Pods
                  </p>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Direct collaboration with Staff and Principal Systems Architects—zero junior
                    handoff layers.
                  </p>
                </div>
                <div>
                  <p className="font-mono-tabular text-sm font-semibold text-[#0B0D11]">
                    02. Full IP Ownership
                  </p>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Clean, documented repositories, Terraform modules, and runbooks transferred
                    directly to your team.
                  </p>
                </div>
                <div>
                  <p className="font-mono-tabular text-sm font-semibold text-[#0B0D11]">
                    03. Production SLA Backed
                  </p>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Every release is load-tested, chaos-verified, and benchmarked against explicit
                    p99 latency targets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHAT WE DO — ASYMMETRIC BENTO GRID (#solutions) */}
        <section
          id="solutions"
          className="border-t border-neutral-200 px-4 sm:px-8 lg:px-12 py-16 lg:py-24 max-w-[1360px] mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
            <div>
              <p className="text-xs font-semibold text-neutral-500">02. What We Do</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0D11] mt-2">
                Core Engineering Capabilities
              </h2>
              <p className="text-base text-neutral-600 mt-2 max-w-2xl">
                Select any engineering capability below to inspect its reference stack topology,
                latency SLA, and production deliverables.
              </p>
            </div>

            {/* Interactive Segmented Control (Functional Filter Buttons with Spring Pill) */}
            <div
              role="group"
              aria-label="Filter capabilities by domain"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFEFE9] border border-neutral-300 rounded-lg self-start md:self-auto"
            >
              {(
                [
                  { id: 'all', label: 'All Domains' },
                  { id: 'saas', label: 'SaaS & Growth' },
                  { id: 'ai', label: 'AI Integration' },
                  { id: 'design', label: 'UI & UX Design' },
                ] as const
              ).map((tab) => {
                const isActive = capabilityFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCapabilityFilter(tab.id)}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-neutral-600 hover:text-[#0B0D11]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="capabilityFilterPill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 bg-[#0B0D11] rounded-md"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Asymmetric Bento Grid (Single-Elevation Depth, Hairline Borders, Compositor Motion) */}
          <motion.div layout className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {filteredCapabilities.map((item) => {
              const spanClass =
                capabilityFilter !== 'all'
                  ? 'lg:col-span-6'
                  : item.colSpan === 'full'
                  ? 'lg:col-span-12'
                  : item.colSpan === 'wide'
                  ? 'lg:col-span-7'
                  : 'lg:col-span-5';

              return (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  key={item.id}
                  className={`${spanClass} group bg-white border border-neutral-200 hover:border-neutral-400 hover:-translate-y-0.5 rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-150`}
                >
                  <div>
                    {/* Quiet 1-line unboxed metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tabular font-semibold text-[#0B0D11]">
                          {item.number}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.categoryLabel}</span>
                      </div>
                      <span className="font-mono-tabular text-neutral-600">
                        {item.slaTarget}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold tracking-tight text-[#0B0D11] mt-4">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-neutral-700 mt-3 leading-relaxed">
                      {item.summary}
                    </p>

                    <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                      {item.extendedDescription}
                    </p>

                    {/* Unboxed Deliverable List */}
                    <ul className="mt-6 pt-5 border-t border-neutral-200 space-y-2">
                      {item.deliverables.slice(0, 3).map((deliverable) => (
                        <li
                          key={deliverable}
                          className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700"
                        >
                          <span
                            className="font-mono-tabular text-[#1D4ED8] font-semibold select-none"
                            aria-hidden="true"
                          >
                            +
                          </span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer: Quantified Proof + Interactive Blueprint Trigger */}
                  <div className="mt-8 pt-5 border-t border-neutral-200 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="font-mono-tabular text-2xl font-bold text-[#0B0D11]">
                        {item.keyMetricValue}
                      </span>
                      <p className="text-xs text-neutral-500 mt-0.5 max-w-xs">
                        {item.keyMetricContext}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveCapability(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B0D11] bg-[#F6F6F2] hover:bg-[#1D4ED8] hover:text-white border border-neutral-300 hover:border-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                    >
                      <span>Inspect Reference Blueprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        {/* 3B. INTERACTIVE UI & UX MOVING DESIGN SHOWCASE (#ui-ux) */}
        <InteractiveUxShowcase onSelectForInquiry={handleSelectTopicForInquiry} />

        {/* 4. THE NERIVA ENGINEERING PHILOSOPHY (#philosophy) */}
        <section
          id="philosophy"
          className="bg-[#0B0D11] text-[#F6F6F2] px-4 sm:px-8 lg:px-12 py-16 lg:py-24"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/15">
              <div>
                <p className="text-xs font-medium text-neutral-400">
                  03. The Neriva Engineering Philosophy
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
                  Architectural Discipline at Every Layer
                </h2>
                <p className="text-base text-neutral-300 mt-2 max-w-2xl leading-relaxed">
                  Software reliability is never an accident. It is the direct outcome of structural
                  precision, horizontal scalability, and zero-trust security engineered from day
                  one.
                </p>
              </div>

              {/* Interactive Lens Toggle */}
              <div
                role="group"
                aria-label="Switch philosophy view mode"
                className="inline-flex items-center gap-1 p-1 bg-white/10 border border-white/15 rounded-lg self-start md:self-auto"
              >
                <button
                  type="button"
                  onClick={() => setPhilosophyView('standard')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    philosophyView === 'standard'
                      ? 'bg-white text-[#0B0D11]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  Core Principles
                </button>
                <button
                  type="button"
                  onClick={() => setPhilosophyView('comparison')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    philosophyView === 'comparison'
                      ? 'bg-white text-[#0B0D11]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  Compare vs. Conventional Delivery
                </button>
              </div>
            </div>

            {/* Numbered Editorial Principles List */}
            <div className="divide-y divide-white/15">
              {PHILOSOPHY_ITEMS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
                >
                  <div className="lg:col-span-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono-tabular text-sm font-semibold text-[#60A5FA]">
                        {pillar.number}
                      </span>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs font-mono-tabular text-neutral-400 mt-3">
                      {pillar.impactMetric}
                    </p>
                  </div>

                  {philosophyView === 'standard' ? (
                    <div className="lg:col-span-8 space-y-3">
                      <p className="text-lg font-medium text-white leading-relaxed">
                        {pillar.description}
                      </p>
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-[68ch]">
                        {pillar.architecturalProof}
                      </p>
                    </div>
                  ) : (
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-5 rounded-lg border border-white/10 bg-white/[0.03]">
                        <p className="text-xs font-semibold text-neutral-400 mb-2">
                          Conventional Agency Delivery
                        </p>
                        <p className="text-sm text-neutral-300 leading-relaxed">
                          {pillar.conventionalApproach}
                        </p>
                      </div>
                      <div className="p-5 rounded-lg border border-[#3B82F6]/50 bg-[#1D4ED8]/15">
                        <p className="text-xs font-semibold text-[#93C5FD] mb-2">
                          The Neriva Engineering Standard
                        </p>
                        <p className="text-sm text-white leading-relaxed">
                          {pillar.nerivaStandard}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PROOF OF IMPACT / CASE STUDIES (#case-studies) — ADJACENT TO CLAIMS */}
        <section
          id="case-studies"
          className="px-4 sm:px-8 lg:px-12 py-16 lg:py-24 max-w-[1360px] mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
            <div>
              <p className="text-xs font-semibold text-neutral-500">
                04. Verified Production Impact
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0D11] mt-2">
                Selected Engineering Case Studies
              </h2>
              <p className="text-base text-neutral-600 mt-2 max-w-2xl">
                Concrete production outcomes across high-throughput SaaS platforms, applied AI
                workflows, and zero-downtime legacy modernizations.
              </p>
            </div>

            {/* Interactive Case Study Filter */}
            <div
              role="group"
              aria-label="Filter case studies"
              className="inline-flex items-center gap-1 p-1 bg-[#EFEFE9] border border-neutral-300 rounded-lg self-start md:self-auto"
            >
              <button
                type="button"
                onClick={() => setCaseFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  caseFilter === 'all'
                    ? 'bg-[#0B0D11] text-white'
                    : 'text-neutral-600 hover:text-[#0B0D11]'
                }`}
              >
                All Work ({CASE_STUDIES.length})
              </button>
              <button
                type="button"
                onClick={() => setCaseFilter('saas')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  caseFilter === 'saas'
                    ? 'bg-[#0B0D11] text-white'
                    : 'text-neutral-600 hover:text-[#0B0D11]'
                }`}
              >
                Enterprise SaaS
              </button>
              <button
                type="button"
                onClick={() => setCaseFilter('ai')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  caseFilter === 'ai'
                    ? 'bg-[#0B0D11] text-white'
                    : 'text-neutral-600 hover:text-[#0B0D11]'
                }`}
              >
                Applied AI
              </button>
            </div>
          </div>

          {/* Case Study List */}
          <div className="mt-10 space-y-12">
            {filteredCaseStudies.map((study, index) => (
              <article
                key={study.id}
                className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* 4:3 Visual Asset Column */}
                <div
                  className={`lg:col-span-5 ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  } rounded-lg overflow-hidden border border-neutral-200 aspect-4/3 bg-[#0B0D11]`}
                >
                  <ResilientImage
                    src={study.imageUrl}
                    alt={study.imageAlt}
                    fallbackTitle={study.title}
                    fallbackSubtitle={study.clientDomain}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content & Attributable Proof Column */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* Unboxed Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                    <span className="font-semibold text-[#0B0D11]">{study.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.clientDomain}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">{study.duration}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0D11] mt-3">
                    {study.title}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-700 mt-3 leading-relaxed">
                    {study.summary}
                  </p>

                  {/* Quantified Precision Metrics */}
                  <div className="mt-6 py-4 border-y border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-tabular">
                    <div>
                      <p className="text-sm font-bold text-[#1D4ED8]">{study.primaryMetric}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">Primary Outcome</p>
                    </div>
                    <div className="sm:border-l sm:border-neutral-200 sm:pl-4">
                      <p className="text-sm font-bold text-[#0B0D11]">{study.secondaryMetric}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">Operational SLA</p>
                    </div>
                    <div className="sm:border-l sm:border-neutral-200 sm:pl-4">
                      <p className="text-sm font-bold text-[#0B0D11]">{study.tertiaryMetric}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">Efficiency Gain</p>
                    </div>
                  </div>

                  {/* Attributable Testimonial */}
                  <blockquote className="mt-5">
                    <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
                      &ldquo;{study.testimonial.quote}&rdquo;
                    </p>
                    <footer className="mt-2 text-xs text-neutral-500">
                      <strong className="font-semibold text-[#0B0D11]">
                        {study.testimonial.author}
                      </strong>{' '}
                      · {study.testimonial.role} · {study.testimonial.organization}
                    </footer>
                  </blockquote>

                  {/* Stack & Interactive Post-Mortem Button */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-mono-tabular text-neutral-500">
                      {study.stackSummary}
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveCaseStudy(study)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B0D11] bg-[#F6F6F2] hover:bg-[#0B0D11] hover:text-white border border-neutral-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Read Technical Post-Mortem</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 6. INTERACTIVE ARCHITECTURE & SCOPE ESTIMATOR (#estimator) */}
        <section
          id="estimator"
          className="border-t border-neutral-200 bg-[#EFEFE9] px-4 sm:px-8 lg:px-12 py-16 lg:py-24"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-neutral-500">
                05. Interactive Delivery Scope Planner
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0D11] mt-2">
                Estimate Your Architecture & Pod Topology
              </h2>
              <p className="text-base text-neutral-700 mt-2 leading-relaxed">
                Configure your primary technical track, target concurrency tier, and compliance
                posture to generate a baseline engineering roadmap and squad composition.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Configuration Controls Column */}
              <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 space-y-8">
                {/* Step 1: Track */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 mb-3">
                    01. Select Primary Engineering Initiative
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {ESTIMATOR_TRACKS.map((track) => {
                      const isSelected = track.id === selectedTrackId;
                      return (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => setSelectedTrackId(track.id)}
                          className={`w-full text-left p-4 rounded-lg border transition-colors flex items-start justify-between gap-4 ${
                            isSelected
                              ? 'border-[#1D4ED8] bg-[#1D4ED8]/[0.04]'
                              : 'border-neutral-200 hover:border-neutral-400 bg-white'
                          }`}
                        >
                          <div>
                            <p className="text-sm font-semibold text-[#0B0D11]">{track.label}</p>
                            <p className="text-xs text-neutral-600 mt-0.5">{track.subtitle}</p>
                          </div>
                          <span className="font-mono-tabular text-xs font-medium text-neutral-500 whitespace-nowrap shrink-0">
                            Base: {track.baseWeeks} wks
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Scale Tier */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 mb-3">
                    02. Target Throughput & Availability Tier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SCALE_TIERS.map((tier) => {
                      const isSelected = tier.id === selectedScaleId;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setSelectedScaleId(tier.id)}
                          className={`text-left p-3.5 rounded-lg border transition-colors flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#1D4ED8] bg-[#1D4ED8]/[0.04]'
                              : 'border-neutral-200 hover:border-neutral-400 bg-white'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-semibold text-[#0B0D11]">{tier.label}</p>
                            <p className="text-xs text-neutral-500 mt-1 leading-snug">
                              {tier.metrics}
                            </p>
                          </div>
                          <p className="font-mono-tabular text-xs text-[#1D4ED8] font-medium mt-3">
                            {tier.slaTarget}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Compliance & Security */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 mb-3">
                    03. Security & Regulatory Posture
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SECURITY_POSTURES.map((posture) => {
                      const isSelected = posture.id === selectedSecurityId;
                      return (
                        <button
                          key={posture.id}
                          type="button"
                          onClick={() => setSelectedSecurityId(posture.id)}
                          className={`text-left p-3.5 rounded-lg border transition-colors flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#1D4ED8] bg-[#1D4ED8]/[0.04]'
                              : 'border-neutral-200 hover:border-neutral-400 bg-white'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-semibold text-[#0B0D11]">{posture.label}</p>
                            <p className="text-xs text-neutral-500 mt-1 leading-snug">
                              {posture.detail}
                            </p>
                          </div>
                          <p className="font-mono-tabular text-xs text-neutral-600 mt-3">
                            +{posture.weekModifier} wks hardening
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Output Specification Sheet Column */}
              <div className="lg:col-span-5 bg-[#0B0D11] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-white/15">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <Sliders className="w-3.5 h-3.5 text-[#60A5FA]" />
                      <span>Estimated Architecture Blueprint</span>
                    </div>
                    <span className="font-mono-tabular text-xs text-[#93C5FD]">
                      {currentScale.slaTarget}
                    </span>
                  </div>

                  <div className="py-6 border-b border-white/15 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-400">Production Release Cycle</p>
                      <p className="font-mono-tabular text-3xl sm:text-4xl font-bold text-white mt-1">
                        {totalEstimatedWeeks} Weeks
                      </p>
                    </div>
                    <div className="border-l border-white/15 pl-4">
                      <p className="text-xs text-neutral-400">Architecture Milestone</p>
                      <p className="font-mono-tabular text-xl sm:text-2xl font-bold text-[#60A5FA] mt-2">
                        Week 2 Sign-Off
                      </p>
                    </div>
                  </div>

                  <div className="py-5 border-b border-white/15 space-y-3">
                    <div>
                      <p className="text-xs text-neutral-400">Recommended Pod Topology</p>
                      <p className="text-xs sm:text-sm font-mono-tabular text-white mt-1 leading-relaxed">
                        {currentTrack.squadSize}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Primary Architectural Focus</p>
                      <p className="text-xs sm:text-sm text-neutral-200 mt-1 leading-relaxed">
                        {currentTrack.architectureFocus}
                      </p>
                    </div>
                  </div>

                  <div className="py-5">
                    <p className="text-xs text-neutral-400 mb-3">Included Blueprint Deliverables</p>
                    <ul className="space-y-2">
                      {currentTrack.deliverables.map((del) => (
                        <li key={del} className="flex items-start gap-2 text-xs text-neutral-200">
                          <Check className="w-3.5 h-3.5 text-[#60A5FA] shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15">
                  <button
                    type="button"
                    onClick={handleAttachScopeToInquiry}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Attach Scope to Technical Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. READY TO UPGRADE YOUR SYSTEMS? (#contact) */}
        <section
          id="contact"
          className="border-t border-neutral-200 px-4 sm:px-8 lg:px-12 py-16 lg:py-24 max-w-[1360px] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Contact & Value Statement */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-semibold text-neutral-500">06. Initiate Engagement</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0D11]">
                Ready to Upgrade Your Systems?
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                Whether you are launching a new SaaS product or scaling an existing enterprise
                ecosystem, Neriva has the technical foundation to get you there.
              </p>

              {/* Direct Contact Channels from User Brief */}
              <div className="pt-6 border-t border-neutral-200 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-neutral-500">Direct Engineering Desk</p>
                      <a
                        href="mailto:nerivatech@gmail.com"
                        className="font-mono-tabular text-sm font-semibold text-[#0B0D11] hover:text-[#1D4ED8] transition-colors"
                      >
                        nerivatech@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-[#EFEFE9] hover:bg-neutral-200 border border-neutral-300 rounded-md transition-colors whitespace-nowrap"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-neutral-500">Location & Delivery Footprint</p>
                    <p className="text-sm font-semibold text-[#0B0D11]">Global / Remote</p>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Distributed Senior Engineering Pods · Americas, EMEA & APAC Timezones
                    </p>
                  </div>
                </div>
              </div>

              {/* What Happens Next List */}
              <div className="pt-6 border-t border-neutral-200">
                <p className="text-xs font-semibold text-[#0B0D11] mb-3">
                  Our Technical Discovery Protocol
                </p>
                <ol className="space-y-2.5 text-xs text-neutral-600">
                  <li className="flex items-start gap-2">
                    <span className="font-mono-tabular font-semibold text-[#0B0D11]">01.</span>
                    <span>
                      Principal Architect review of your current system bottlenecks within 24
                      business hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono-tabular font-semibold text-[#0B0D11]">02.</span>
                    <span>
                      45-minute technical architecture session (mutual NDA provided upon request).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono-tabular font-semibold text-[#0B0D11]">03.</span>
                    <span>
                      Delivery of a written architectural proposal, milestone schedule, and pod
                      allocation.
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Right Column: Validated Lead Capture / Consultation Form */}
            <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 lg:p-10">
              {submittedBrief ? (
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-200">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                        <Check className="w-4 h-4" />
                        <span>
                          {submittedBrief.deliveryStatus === 'delivered'
                            ? 'Emailed Directly to nerivatech@gmail.com'
                            : 'Architecture Consultation Brief Generated'}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[#0B0D11] mt-1">
                        Thank you, {submittedBrief.name}.
                      </h3>
                      <p className="text-sm text-neutral-600 mt-1">
                        Your consultation request for{' '}
                        <strong className="font-semibold text-[#0B0D11]">
                          {submittedBrief.organization}
                        </strong>{' '}
                        has been forwarded to <span className="font-mono-tabular">nerivatech@gmail.com</span>.
                      </p>
                    </div>
                    <span className="font-mono-tabular text-xs text-neutral-500 shrink-0">
                      Ref: {submittedBrief.referenceId}
                    </span>
                  </div>

                  <div className="bg-[#F6F6F2] border border-neutral-200 rounded-lg p-5 space-y-3 text-xs">
                    <div className="flex flex-wrap justify-between gap-2 pb-2 border-b border-neutral-200">
                      <span className="text-neutral-500">Primary Engineering Track</span>
                      <span className="font-semibold text-[#0B0D11]">{submittedBrief.track}</span>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2 pb-2 border-b border-neutral-200">
                      <span className="text-neutral-500">Contact Email</span>
                      <span className="font-mono-tabular text-[#0B0D11]">
                        {submittedBrief.email}
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2 pb-2 border-b border-neutral-200">
                      <span className="text-neutral-500">Target Baseline Cycle</span>
                      <span className="font-mono-tabular text-[#1D4ED8] font-semibold">
                        ~{submittedBrief.estimatedWeeks} Weeks
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">System Objectives Summary</span>
                      <p className="text-neutral-800 whitespace-pre-line leading-relaxed">
                        {submittedBrief.objectives}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCopySubmittedBrief}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B0D11] bg-[#EFEFE9] hover:bg-neutral-200 border border-neutral-300 rounded-lg transition-colors whitespace-nowrap"
                      >
                        {briefCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Brief Copied to Clipboard</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Brief Summary</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`mailto:nerivatech@gmail.com?subject=${encodeURIComponent(
                          `Neriva Architecture Brief [${submittedBrief.referenceId}] — ${submittedBrief.organization}`
                        )}&body=${encodeURIComponent(
                          `Name: ${submittedBrief.name}\nEmail: ${submittedBrief.email}\nOrganization: ${submittedBrief.organization}\nTrack: ${submittedBrief.track}\nEstimated Cycle: ${submittedBrief.estimatedWeeks} Weeks\n\nObjectives:\n${submittedBrief.objectives}`
                        )}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors whitespace-nowrap"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email App</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedBrief(null);
                        setProjectObjectives('');
                      }}
                      className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-[#0B0D11] transition-colors whitespace-nowrap"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-neutral-200">
                    <h3 className="font-display text-xl font-bold text-[#0B0D11]">
                      Request an Architecture Consultation
                    </h3>
                    {scopeAttached && (
                      <span className="text-xs text-[#1D4ED8] font-medium">
                        Estimator Scope Attached ({totalEstimatedWeeks} wks)
                      </span>
                    )}
                  </div>

                  {formError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="full-name"
                        className="block text-xs font-semibold text-[#0B0D11] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        ref={contactInputRef}
                        id="full-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F6F6F2] border border-neutral-300 rounded-lg text-[#0B0D11] placeholder:text-neutral-400 focus:outline-none focus:border-[#1D4ED8] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="work-email"
                        className="block text-xs font-semibold text-[#0B0D11] mb-1.5"
                      >
                        Work Email *
                      </label>
                      <input
                        id="work-email"
                        type="email"
                        required
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="alex@enterprise.io"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F6F6F2] border border-neutral-300 rounded-lg text-[#0B0D11] placeholder:text-neutral-400 focus:outline-none focus:border-[#1D4ED8] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-xs font-semibold text-[#0B0D11] mb-1.5"
                      >
                        Organization / Company *
                      </label>
                      <input
                        id="organization"
                        type="text"
                        required
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Acme Cloud Systems"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F6F6F2] border border-neutral-300 rounded-lg text-[#0B0D11] placeholder:text-neutral-400 focus:outline-none focus:border-[#1D4ED8] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-track"
                        className="block text-xs font-semibold text-[#0B0D11] mb-1.5"
                      >
                        Primary Engineering Focus
                      </label>
                      <select
                        id="inquiry-track"
                        value={inquiryTrack}
                        onChange={(e) => setInquiryTrack(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F6F6F2] border border-neutral-300 rounded-lg text-[#0B0D11] focus:outline-none focus:border-[#1D4ED8] transition-colors"
                      >
                        <option value="Enterprise SaaS Architecture">
                          Enterprise SaaS Architecture
                        </option>
                        <option value="AI-Driven Integration">AI-Driven Integration</option>
                        <option value="UI & UX Moving Product Design">
                          UI & UX Moving Product Design
                        </option>
                        <option value="SaaS for Business Growth">
                          SaaS for Business Growth
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="project-objectives"
                      className="block text-xs font-semibold text-[#0B0D11] mb-1.5"
                    >
                      System Context & Architectural Objectives *
                    </label>
                    <textarea
                      id="project-objectives"
                      rows={4}
                      required
                      value={projectObjectives}
                      onChange={(e) => setProjectObjectives(e.target.value)}
                      placeholder="Describe your target architecture, current scale bottlenecks, or target release window..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F6F6F2] border border-neutral-300 rounded-lg text-[#0B0D11] placeholder:text-neutral-400 focus:outline-none focus:border-[#1D4ED8] transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-neutral-500">
                      Protected by strict confidentiality · Response within 1 business day
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                    >
                      <span>
                        {isSubmitting ? 'Dispatching to Neriva...' : 'Submit Architecture Brief'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 8. QUIET FOOTER */}
      <footer className="border-t border-neutral-200 bg-[#EFEFE9] px-4 sm:px-8 lg:px-12 py-12">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <a
              href="#top"
              className="font-display text-lg font-bold tracking-tight text-[#0B0D11]"
            >
              Neriva
            </a>
            <p className="text-xs text-neutral-600 mt-1">
              © 2026 Neriva. All rights reserved. Intelligent Software. Real Solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-neutral-600">
            <a href="#about" className="hover:text-[#0B0D11] transition-colors">
              Who We Are
            </a>
            <a href="#solutions" className="hover:text-[#0B0D11] transition-colors">
              Solutions
            </a>
            <a href="#philosophy" className="hover:text-[#0B0D11] transition-colors">
              Philosophy
            </a>
            <a href="#case-studies" className="hover:text-[#0B0D11] transition-colors">
              Case Studies
            </a>
            <a href="#estimator" className="hover:text-[#0B0D11] transition-colors">
              Scope Planner
            </a>
            <a href="mailto:nerivatech@gmail.com" className="hover:text-[#1D4ED8] transition-colors">
              nerivatech@gmail.com
            </a>
          </div>
        </div>
      </footer>

      {/* Modals for Deep Architectural Inspection */}
      <ArchitectureModal
        capability={activeCapability}
        onClose={() => setActiveCapability(null)}
        onSelectForInquiry={handleSelectCapabilityForInquiry}
      />

      <CaseStudyModal
        study={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onRequestSimilar={handleRequestSimilarCaseStudy}
      />
    </div>
  );
}
