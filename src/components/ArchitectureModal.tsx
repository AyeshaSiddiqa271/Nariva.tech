import React, { useEffect } from 'react';
import { X, ArrowUpRight, Check } from 'lucide-react';
import { CapabilityItem } from '../data/nerivaData';

interface ArchitectureModalProps {
  capability: CapabilityItem | null;
  onClose: () => void;
  onSelectForInquiry: (capability: CapabilityItem) => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  capability,
  onClose,
  onSelectForInquiry,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (capability) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [capability, onClose]);

  if (!capability) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B0D11]/70 backdrop-blur-xs transition-opacity duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-capability-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#F6F6F2] text-[#0B0D11] border border-neutral-300 rounded-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Metadata & Close Button */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
              <span className="font-mono-tabular font-medium text-[#0B0D11]">
                {capability.number}
              </span>
              <span aria-hidden="true">·</span>
              <span>{capability.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">{capability.slaTarget}</span>
            </div>
            <h3
              id="modal-capability-title"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0D11] mt-2"
            >
              {capability.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-300 text-neutral-600 hover:text-[#0B0D11] hover:bg-neutral-200/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] shrink-0"
            aria-label="Close reference blueprint"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Summary & Verified Metric */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b border-neutral-200">
          <div className="md:col-span-8">
            <p className="text-base text-neutral-700 leading-relaxed">
              {capability.extendedDescription}
            </p>
          </div>
          <div className="md:col-span-4 md:border-l md:border-neutral-200 md:pl-6 flex flex-col justify-center">
            <span className="font-mono-tabular text-3xl font-bold text-[#1D4ED8]">
              {capability.keyMetricValue}
            </span>
            <p className="text-xs text-neutral-600 mt-1 leading-snug">
              {capability.keyMetricContext}
            </p>
          </div>
        </div>

        {/* Reference Architecture Layers */}
        <div className="py-6 border-b border-neutral-200">
          <h4 className="text-sm font-semibold text-[#0B0D11] mb-4">
            Reference Stack & Layer Topology
          </h4>
          <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
            {capability.architectureLayers.map((layer, index) => (
              <div
                key={layer.layerName}
                className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
              >
                <div className="sm:col-span-4">
                  <span className="font-mono-tabular text-xs text-neutral-500 mr-2">
                    0{index + 1}.
                  </span>
                  <span className="text-sm font-semibold text-[#0B0D11]">
                    {layer.layerName}
                  </span>
                </div>
                <div className="sm:col-span-8 space-y-1">
                  <p className="text-sm text-neutral-700">{layer.specification}</p>
                  <p className="text-xs text-neutral-500 font-mono-tabular">
                    {layer.technologies}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Production Deliverables */}
        <div className="py-6">
          <h4 className="text-sm font-semibold text-[#0B0D11] mb-3">
            Standard Production Deliverables
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {capability.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-neutral-700"
              >
                <Check className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            Delivered via dedicated senior engineering pods · Full IP ownership transfer
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-[#0B0D11] transition-colors whitespace-nowrap"
            >
              Close Window
            </button>
            <button
              type="button"
              onClick={() => onSelectForInquiry(capability)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              <span>Scope This Architecture</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
