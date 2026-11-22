'use client';

import { X, Info, CheckCircle2 } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  bullets?: string[];
  themeColor?: 'yellow' | 'emerald' | 'blue';
}

export default function InfoModal({
  isOpen,
  onClose,
  title,
  description,
  bullets = [],
  themeColor = 'yellow',
}: InfoModalProps) {
  if (!isOpen) return null;

  const colorStyles = {
    yellow: {
      border: 'border-yellow-500/30',
      title: 'text-yellow-400',
      badgeBg: 'bg-yellow-500/10',
      badgeText: 'text-yellow-400',
      btn: 'bg-yellow-500 hover:bg-yellow-400 text-black',
    },
    emerald: {
      border: 'border-emerald-500/30',
      title: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10',
      badgeText: 'text-emerald-400',
      btn: 'bg-emerald-500 hover:bg-emerald-400 text-black',
    },
    blue: {
      border: 'border-blue-500/30',
      title: 'text-blue-400',
      badgeBg: 'bg-blue-500/10',
      badgeText: 'text-blue-400',
      btn: 'bg-blue-500 hover:bg-blue-400 text-white',
    },
  }[themeColor];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`bg-[#12181F] border ${colorStyles.border} rounded-2xl p-5 max-w-sm w-full text-white shadow-2xl relative animate-in fade-in zoom-in duration-150`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3">
          <div className={`p-2 rounded-xl ${colorStyles.badgeBg} ${colorStyles.badgeText}`}>
            <Info className="w-5 h-5" />
          </div>
          <h3 className={`text-base font-extrabold ${colorStyles.title}`}>{title}</h3>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">{description}</p>

        {bullets.length > 0 && (
          <ul className="space-y-2 mb-5">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${colorStyles.badgeText}`} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          className={`w-full py-2.5 text-xs font-bold rounded-xl transition shadow-sm ${colorStyles.btn}`}
          type="button"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}