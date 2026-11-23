'use client';

import Link from 'next/link';

interface BotCardProps {
  id: string;
  pair: string;
  description: string;
  icon: string;
  isHot?: boolean;
}

export default function EcoinBotCard({ id, pair, description, icon, isHot }: BotCardProps) {
  return (
    <div className="bg-[#12181F] border border-[#D4AF37]/20 rounded-2xl p-4 flex flex-col justify-between hover:border-[#D4AF37]/50 transition">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{icon}</span>
          {isHot && (
            <span className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full font-bold">
              ECOIN
            </span>
          )}
        </div>
        <h4 className="text-sm font-bold text-[#D4AF37]">{pair}</h4>
        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{description}</p>
      </div>

      <Link
        href={`/eCoinShareHolder/ecnTradingDEXBot/bot/${id}`}
        className="mt-4 block text-center py-2 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/40 rounded-xl text-xs font-bold transition"
      >
        Configurar & Activar &gt;
      </Link>
    </div>
  );
}