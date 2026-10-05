import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Play,
  RotateCcw,
  Check,
  Sliders,
  Layers,
  Activity,
} from 'lucide-react';

interface InteractiveUxShowcaseProps {
  onSelectForInquiry: (topicTitle: string, topicDetail: string) => void;
}

type ShowcaseMode = 'growth-ux' | 'ai-pipeline' | 'design-system';

const GROWTH_HORIZONS = {
  '30d': {
    label: '30-Day Sprint',
    conversionRate: '4.8%',
    conversionDelta: '+1.4% vs baseline',
    onboardingTime: '42 sec',
    netRetention: '118%',
    bars: [0.38, 0.46, 0.52, 0.61, 0.58, 0.72, 0.81, 0.92],
  },
  '90d': {
    label: '90-Day Rollout',
    conversionRate: '6.4%',
    conversionDelta: '+3.0% vs baseline',
    onboardingTime: '28 sec',
    netRetention: '132%',
    bars: [0.42, 0.51, 0.63, 0.7, 0.76, 0.85, 0.91, 0.98],
  },
  '12m': {
    label: '12-Month Scale',
    conversionRate: '8.1%',
    conversionDelta: '+4.7% vs baseline',
    onboardingTime: '19 sec',
    netRetention: '145%',
    bars: [0.48, 0.58, 0.69, 0.78, 0.84, 0.9, 0.95, 1.0],
  },
};

const AI_NODES = [
  {
    id: 'ingest',
    step: '01.',
    title: 'Multi-Source Event Ingestion',
    latency: '14ms p99',
    accuracy: '100% Schema Validated',
    description:
      'Streams live workspace actions, documents, and webhook payloads with zero UI blocking and instant optimistic state feedback.',
  },
  {
    id: 'context',
    step: '02.',
    title: 'ACL-Filtered Semantic Routing',
    latency: '31ms p99',
    accuracy: 'Zero Cross-Tenant Leakage',
    description:
      'Retrieves tenant-scoped domain context and routes requests to specialized models while maintaining a 60fps interface response.',
  },
  {
    id: 'action',
    step: '03.',
    title: 'Structured UI Action Synthesis',
    latency: '48ms p99',
    accuracy: '99.4% Deterministic Output',
    description:
      'Renders verified actions, inline diff previews, and one-click approval controls directly inside the user workflow.',
  },
];

export const InteractiveUxShowcase: React.FC<InteractiveUxShowcaseProps> = ({
  onSelectForInquiry,
}) => {
  const [activeMode, setActiveMode] = useState<ShowcaseMode>('growth-ux');
  const [horizon, setHorizon] = useState<'30d' | '90d' | '12m'>('90d');
  const [onboardingStep, setOnboardingStep] = useState<number>(2);
  const [autoCycle, setAutoCycle] = useState<boolean>(true);
  const [selectedAiNode, setSelectedAiNode] = useState<string>('context');
  const [densityMode, setDensityMode] = useState<'executive' | 'analytical'>('analytical');

  // Subtle auto-progression for the moving workflow indicator when autoCycle is enabled
  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setOnboardingStep((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(interval);
  }, [autoCycle]);

  const currentGrowth = GROWTH_HORIZONS[horizon];
  const currentAiNode = AI_NODES.find((n) => n.id === selectedAiNode) || AI_NODES[1];

  return (
    <section
      id="ui-ux"
      className="border-t border-neutral-200 bg-[#0B0D11] text-[#F6F6F2] px-4 sm:px-8 lg:px-12 py-16 lg:py-24 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/15">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <span className="font-mono-tabular font-semibold text-[#60A5FA]">03.</span>
              <span aria-hidden="true">·</span>
              <span>UI/UX Architecture & Interactive Motion Systems</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">60fps Compositor Physics</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Interfaces Engineered to Move and Convert
            </h2>
            <p className="text-base text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              Great backend architecture deserves an equally refined human interface. We design and
              engineer kinetic SaaS experiences with sub-150ms feedback loops, purposeful spatial
              hierarchy, and zero visual friction.
            </p>
          </div>

          {/* Interactive Mode Switcher with Animated Spring Indicator */}
          <div
            role="tablist"
            aria-label="Interactive UI and UX showcase modes"
            className="inline-flex items-center gap-1 p-1 bg-white/[0.06] border border-white/15 rounded-lg self-start lg:self-auto"
          >
            {[
              { id: 'growth-ux', label: '01. SaaS Growth UX' },
              { id: 'ai-pipeline', label: '02. AI Workflow Motion' },
              { id: 'design-system', label: '03. Design System Physics' },
            ].map((tab) => {
              const isActive = activeMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveMode(tab.id as ShowcaseMode)}
                  className={`relative px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    isActive ? 'text-[#0B0D11]' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="uxShowcaseActiveTab"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 bg-white rounded-md"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Moving Canvas Area */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Architectural UX Principles & Controls (4 Cols) */}
          <div className="lg:col-span-4 bg-white/[0.03] border border-white/15 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-4 border-b border-white/10">
                <span>Interactive UX Specification</span>
                <span className="font-mono-tabular text-[#60A5FA]">
                  cubic-bezier(0.16, 1, 0.3, 1)
                </span>
              </div>

              <AnimatePresence mode="wait">
                {activeMode === 'growth-ux' && (
                  <motion.div
                    key="desc-growth"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="py-6 space-y-4"
                  >
                    <h3 className="font-display text-2xl font-bold text-white">
                      Product-Led Growth & Activation UX
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      We eliminate multi-step onboarding drop-off with progressive disclosure,
                      instant workspace provisioning, and real-time commercial telemetry that turns
                      trial users into recurring enterprise accounts.
                    </p>
                    <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-neutral-300">
                      <p className="font-mono-tabular text-[#93C5FD]">
                        · Optimistic UI state transitions (&lt;100ms perceived latency)
                      </p>
                      <p className="font-mono-tabular text-[#93C5FD]">
                        · Self-serve role & entitlement flows with live preview
                      </p>
                      <p className="font-mono-tabular text-[#93C5FD]">
                        · Accessible WCAG AA contrast & keyboard-first navigation
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeMode === 'ai-pipeline' && (
                  <motion.div
                    key="desc-ai"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="py-6 space-y-4"
                  >
                    <h3 className="font-display text-2xl font-bold text-white">
                      Transparent AI State & Confidence UX
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      Enterprise users distrust opaque &ldquo;black-box&rdquo; automation. We design
                      deterministic AI interfaces that visualize pipeline progress, source
                      citations, and one-click human verification in real time.
                    </p>
                    <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-neutral-300">
                      <p className="font-mono-tabular text-[#93C5FD]">
                        · Live streaming token & step progression indicators
                      </p>
                      <p className="font-mono-tabular text-[#93C5FD]">
                        · Inline citation pinning & side-by-side diff inspection
                      </p>
                      <p className="font-mono-tabular text-[#93C5FD]">
                        · Zero-jank background worker synchronization
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeMode === 'design-system' && (
                  <motion.div
                    key="desc-system"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="py-6 space-y-4"
                  >
                    <h3 className="font-display text-2xl font-bold text-white">
                      Tokenized Multi-Tenant Design Systems
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      Every SaaS platform we ship includes a documented component library built with
                      strict spatial math, tabular numeral alignment, and adaptive density modes for
                      executive and power-user workflows.
                    </p>
                    <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-neutral-300">
                      <p className="font-mono-tabular text-[#93C5FD]">
                        · Compositor-only transform & opacity motion budget
                      </p>
                      <p className="font-mono-tabular text-[#93C5FD]">
                        · Mathematical nested border radii & spacing tokens
                      </p>
                      <p className="font-mono-tabular text-[#93C5FD]">
                        · Full prefers-reduced-motion accessibility compliance
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-5 border-t border-white/15 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  onSelectForInquiry(
                    'SaaS for Business Growth',
                    `Requesting UI/UX Architecture & Interactive Product Engineering (${activeMode}).`
                  )
                }
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Request UI/UX & SaaS Architecture Review</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Kinetic Interactive Stage (8 Cols) */}
          <div className="lg:col-span-8 bg-[#121620] border border-white/15 rounded-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              {/* STAGE 1: SAAS GROWTH & CONVERSION UX */}
              {activeMode === 'growth-ux' && (
                <motion.div
                  key="stage-growth"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between h-full space-y-6"
                >
                  {/* Top Control Bar inside Stage */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
                    <div>
                      <p className="text-xs text-neutral-400">
                        Live Interactive Preview · SaaS Growth & Revenue Telemetry
                      </p>
                      <h4 className="font-display text-lg font-bold text-white mt-0.5">
                        Workspace Activation & Recurring Expansion Engine
                      </h4>
                    </div>

                    <div className="inline-flex items-center gap-1 p-1 bg-white/[0.06] border border-white/10 rounded-lg">
                      {(['30d', '90d', '12m'] as const).map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setHorizon(key)}
                          className={`px-2.5 py-1 text-xs font-mono-tabular rounded transition-colors whitespace-nowrap ${
                            horizon === key
                              ? 'bg-[#1D4ED8] text-white font-semibold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          {GROWTH_HORIZONS[key].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Animated Metrics & Moving Bar Visualization */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5 space-y-4">
                      <div className="p-4 rounded-lg bg-white/[0.04] border border-white/10">
                        <p className="text-xs text-neutral-400">Self-Serve Activation Rate</p>
                        <div className="flex items-baseline justify-between mt-1">
                          <motion.span
                            key={currentGrowth.conversionRate}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-mono-tabular text-2xl font-bold text-white"
                          >
                            {currentGrowth.conversionRate}
                          </motion.span>
                          <span className="font-mono-tabular text-xs text-emerald-400">
                            {currentGrowth.conversionDelta}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-lg bg-white/[0.04] border border-white/10">
                          <p className="text-xs text-neutral-400">Time to Value</p>
                          <motion.p
                            key={currentGrowth.onboardingTime}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-mono-tabular text-lg font-bold text-[#60A5FA] mt-1"
                          >
                            {currentGrowth.onboardingTime}
                          </motion.p>
                        </div>
                        <div className="p-3.5 rounded-lg bg-white/[0.04] border border-white/10">
                          <p className="text-xs text-neutral-400">Net Retention</p>
                          <motion.p
                            key={currentGrowth.netRetention}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-mono-tabular text-lg font-bold text-white mt-1"
                          >
                            {currentGrowth.netRetention}
                          </motion.p>
                        </div>
                      </div>
                    </div>

                    {/* Moving Cohort Expansion Bars (Compositor scaleY) */}
                    <div className="md:col-span-7 p-5 rounded-lg bg-white/[0.03] border border-white/10">
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                        <span>Net MRR Cohort Expansion Trajectory</span>
                        <span className="font-mono-tabular text-white">
                          {currentGrowth.label}
                        </span>
                      </div>
                      <div className="h-36 flex items-end gap-2.5 pt-4">
                        {currentGrowth.bars.map((val, idx) => (
                          <div
                            key={idx}
                            className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                          >
                            <div className="w-full h-full bg-white/[0.05] rounded-t-sm overflow-hidden flex items-end">
                              <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: val }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 260,
                                  damping: 26,
                                  delay: idx * 0.03,
                                }}
                                style={{ transformOrigin: 'bottom' }}
                                className="w-full h-full bg-gradient-to-t from-[#1D4ED8] to-[#60A5FA] rounded-t-sm"
                              />
                            </div>
                            <span className="font-mono-tabular text-[11px] text-neutral-400">
                              W{idx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Moving Onboarding Flow Strip */}
                  <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {[
                        '01. SSO & Workspace Provisioned',
                        '02. Data Source Synced',
                        '03. Team & Billing Active',
                      ].map((stepLabel, idx) => {
                        const isCurrent = onboardingStep === idx;
                        return (
                          <button
                            key={stepLabel}
                            type="button"
                            onClick={() => {
                              setAutoCycle(false);
                              setOnboardingStep(idx);
                            }}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all whitespace-nowrap ${
                              isCurrent
                                ? 'bg-[#1D4ED8]/30 border border-[#60A5FA] text-white'
                                : 'bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            <Check
                              className={`w-3.5 h-3.5 ${
                                isCurrent ? 'text-[#60A5FA]' : 'text-neutral-500'
                              }`}
                            />
                            <span>{stepLabel}</span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setAutoCycle((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono-tabular text-neutral-400 hover:text-white transition-colors whitespace-nowrap self-start sm:self-auto"
                    >
                      {autoCycle ? (
                        <>
                          <RotateCcw className="w-3.5 h-3.5 text-[#60A5FA]" />
                          <span>Auto-Simulating Flow</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-[#60A5FA]" />
                          <span>Resume Auto-Flow</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: AI WORKFLOW MOTION PIPELINE */}
              {activeMode === 'ai-pipeline' && (
                <motion.div
                  key="stage-ai"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between h-full space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
                    <div>
                      <p className="text-xs text-neutral-400">
                        Interactive Pipeline Inspector · Click Any Node to Inspect UX State
                      </p>
                      <h4 className="font-display text-lg font-bold text-white mt-0.5">
                        Deterministic AI Orchestration & Human-in-the-Loop UI
                      </h4>
                    </div>
                    <span className="font-mono-tabular text-xs text-emerald-400">
                      End-to-End Pipeline: 93ms p99
                    </span>
                  </div>

                  {/* Interactive 3-Node Moving Flow */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                    {AI_NODES.map((node) => {
                      const isSelected = node.id === selectedAiNode;
                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => setSelectedAiNode(node.id)}
                          className={`text-left p-4 rounded-lg border transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#1D4ED8]/20 border-[#60A5FA] -translate-y-0.5'
                              : 'bg-white/[0.03] border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs font-mono-tabular">
                              <span className="text-[#60A5FA] font-semibold">{node.step}</span>
                              <span className="text-neutral-400">{node.latency}</span>
                            </div>
                            <p className="font-display text-base font-bold text-white mt-2">
                              {node.title}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                            <span className="text-neutral-300">{node.accuracy}</span>
                            <Activity
                              className={`w-3.5 h-3.5 ${
                                isSelected ? 'text-[#60A5FA] animate-flow-pulse' : 'text-neutral-500'
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Node Live UX Detail */}
                  <motion.div
                    key={currentAiNode.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.16 }}
                    className="p-5 rounded-lg bg-white/[0.04] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-[#93C5FD] font-mono-tabular">
                        <span>Active Node: {currentAiNode.step}</span>
                        <span aria-hidden="true">·</span>
                        <span>{currentAiNode.latency}</span>
                        <span aria-hidden="true">·</span>
                        <span>{currentAiNode.accuracy}</span>
                      </div>
                      <p className="text-sm text-neutral-200 leading-relaxed">
                        {currentAiNode.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* STAGE 3: DESIGN SYSTEM PHYSICS & DENSITY */}
              {activeMode === 'design-system' && (
                <motion.div
                  key="stage-system"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between h-full space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
                    <div>
                      <p className="text-xs text-neutral-400">
                        Adaptive Component Architecture · Live Viewport Density Toggle
                      </p>
                      <h4 className="font-display text-lg font-bold text-white mt-0.5">
                        Multi-Tenant Token System & Spatial Rhythm
                      </h4>
                    </div>

                    <div className="inline-flex items-center gap-1 p-1 bg-white/[0.06] border border-white/10 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setDensityMode('executive')}
                        className={`px-3 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                          densityMode === 'executive'
                            ? 'bg-[#1D4ED8] text-white font-semibold'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        Executive Summary View
                      </button>
                      <button
                        type="button"
                        onClick={() => setDensityMode('analytical')}
                        className={`px-3 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                          densityMode === 'analytical'
                            ? 'bg-[#1D4ED8] text-white font-semibold'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        High-Density Operator View
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Density Preview Table */}
                  <div className="rounded-lg border border-white/15 bg-white/[0.02] overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs text-neutral-400">
                      <span className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-[#60A5FA]" />
                        <span>Tenant Cluster Telemetry (Tabular Numerals Enforced)</span>
                      </span>
                      <span className="font-mono-tabular">
                        Mode: {densityMode === 'executive' ? 'Spacious (24px)' : 'Compact (12px)'}
                      </span>
                    </div>

                    <div className="divide-y divide-white/10">
                      {[
                        {
                          tenant: 'Aurelia Global Treasury',
                          region: 'us-east-1 · eu-central-1',
                          rps: '14,820 RPS',
                          p99: '24ms',
                          uptime: '99.998%',
                        },
                        {
                          tenant: 'Vanguard Meridian ERP',
                          region: 'eu-west-1 · ap-southeast-1',
                          rps: '9,410 RPS',
                          p99: '31ms',
                          uptime: '99.995%',
                        },
                        {
                          tenant: 'Northstar Revenue Cloud',
                          region: 'us-west-2 · us-east-1',
                          rps: '19,250 RPS',
                          p99: '19ms',
                          uptime: '99.999%',
                        },
                      ].map((row) => (
                        <motion.div
                          key={row.tenant}
                          layout
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          className={`px-4 ${
                            densityMode === 'executive' ? 'py-4' : 'py-2.5'
                          } grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs`}
                        >
                          <div className="sm:col-span-5">
                            <p className="font-semibold text-white">{row.tenant}</p>
                            {densityMode === 'analytical' && (
                              <p className="font-mono-tabular text-[11px] text-neutral-400">
                                {row.region}
                              </p>
                            )}
                          </div>
                          <div className="sm:col-span-3 font-mono-tabular text-neutral-300">
                            {row.rps}
                          </div>
                          <div className="sm:col-span-2 font-mono-tabular text-[#60A5FA]">
                            p99: {row.p99}
                          </div>
                          <div className="sm:col-span-2 font-mono-tabular text-right text-emerald-400">
                            {row.uptime}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-[#60A5FA]" />
                      <span>Zero layout shift · Tabular numeral vertical alignment</span>
                    </span>
                    <span className="font-mono-tabular text-neutral-300">
                      WCAG AA 4.5:1 Verified
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
