import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Neriva Systems Architecture',
  fallbackSubtitle = 'Resilient Digital Infrastructure',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#14171F] via-[#1C2230] to-[#0B0D11] text-[#F6F6F2] p-8 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-lg border border-white/15 flex items-center justify-center mb-4 bg-white/5">
          <Layers className="w-6 h-6 text-[#3B82F6]" />
        </div>
        <p className="font-display text-base font-semibold tracking-tight text-white max-w-xs">
          {fallbackTitle}
        </p>
        <p className="text-xs text-neutral-400 mt-1 max-w-xs">{fallbackSubtitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
