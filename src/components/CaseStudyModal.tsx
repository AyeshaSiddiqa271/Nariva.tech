import React, { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { CaseStudy } from '../data/nerivaData';
import { ResilientImage } from './ResilientImage';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onRequestSimilar: (study: CaseStudy) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
  onClose,
  onRequestSimilar,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (study) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B0D11]/70 backdrop-blur-xs transition-opacity duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-case-study-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#F6F6F2] text-[#0B0D11] border border-neutral-300 rounded-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
              <span>{study.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{study.clientDomain}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">{study.duration}</span>
            </div>
            <h3
              id="modal-case-study-title"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0D11] mt-2"
            >
              {study.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-300 text-neutral-600 hover:text-[#0B0D11] hover:bg-neutral-200/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] shrink-0"
            aria-label="Close case study"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Showcase */}
        <div className="my-6 rounded-lg overflow-hidden border border-neutral-200 aspect-16/9 bg-[#0B0D11]">
          <ResilientImage
            src={study.imageUrl}
            alt={study.imageAlt}
            fallbackTitle={study.title}
            fallbackSubtitle={study.clientDomain}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Quantified Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-neutral-200 font-mono-tabular">
          <div>
            <p className="text-sm font-semibold text-[#1D4ED8]">{study.primaryMetric}</p>
            <p className="text-xs text-neutral-500 mt-0.5">Primary Verified Impact</p>
          </div>
          <div className="sm:border-l sm:border-neutral-200 sm:pl-4">
            <p className="text-sm font-semibold text-[#0B0D11]">{study.secondaryMetric}</p>
            <p className="text-xs text-neutral-500 mt-0.5">Reliability & Financial</p>
          </div>
          <div className="sm:border-l sm:border-neutral-200 sm:pl-4">
            <p className="text-sm font-semibold text-[#0B0D11]">{study.tertiaryMetric}</p>
            <p className="text-xs text-neutral-500 mt-0.5">System Efficiency</p>
          </div>
        </div>

        {/* Before / Architecture / Outcome */}
        <div className="space-y-5 py-6 border-b border-neutral-200">
          <div>
            <h4 className="text-xs font-semibold text-neutral-500 mb-1">
              01. System Bottleneck & Problem Statement
            </h4>
            <p className="text-sm text-neutral-800 leading-relaxed">{study.challenge}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-500 mb-1">
              02. Architectural Execution
            </h4>
            <p className="text-sm text-neutral-800 leading-relaxed">
              {study.architectureSolution}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-500 mb-1">
              03. Verified Production Outcome
            </h4>
            <p className="text-sm text-neutral-800 leading-relaxed">
              {study.verifiedOutcome}
            </p>
          </div>
          <div className="pt-2">
            <p className="text-xs text-neutral-500">
              Production Stack:{' '}
              <span className="font-mono-tabular text-[#0B0D11]">{study.stackSummary}</span>
            </p>
          </div>
        </div>

        {/* Attributable Testimonial */}
        <blockquote className="py-5 border-b border-neutral-200">
          <p className="text-sm italic text-neutral-800 leading-relaxed">
            "{study.testimonial.quote}"
          </p>
          <footer className="mt-2 text-xs text-neutral-600">
            <strong className="font-semibold text-[#0B0D11]">
              {study.testimonial.author}
            </strong>{' '}
            · {study.testimonial.role} · {study.testimonial.organization}
          </footer>
        </blockquote>

        {/* Footer CTA */}
        <div className="pt-5 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-[#0B0D11] transition-colors whitespace-nowrap"
          >
            Back to Case Studies
          </button>
          <button
            type="button"
            onClick={() => onRequestSimilar(study)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <span>Discuss a Similar Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
