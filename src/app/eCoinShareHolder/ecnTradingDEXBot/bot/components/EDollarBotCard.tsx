'use client';

import Link from 'next/link';

interface BotCardProps {
  id: string;
  pair: string;
  description: string;
  icon: string;
  isHot?: boolean;
}

export default function EDollarBotCard({ id, pair, description, icon, isHot }: BotCardProps) {
  return (
    <div className="bg-[#12181F] border border-gray-800 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-500/40 transition">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{icon}</span>
          {isHot && (
            <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">
              E-USD
            </span>
          )}
        </div>
        <h4 className="text-sm font-bold text-white">{pair}</h4>
        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{description}</p>
      </div>

      <Link
        href={`/eCoinShareHolder/ecnTradingDEXBot/bot/${id}`}
        className="mt-4 block text-center py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-bold transition"
      >
        Configurar & Activar &gt;
      </Link>
    </div>
  );
}