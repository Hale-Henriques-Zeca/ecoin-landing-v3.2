"use client";

import { FaTelegramPlane, FaTwitter, FaDiscord, FaWhatsapp } from "react-icons/fa";

interface SocialFooterProps {
  onOpenInviteModal: () => void;
}

export default function SocialFooter({ onOpenInviteModal }: SocialFooterProps) {
  return (
    <div className="mt-12 pt-6 border-t border-white/5 flex flex-col items-center gap-4 text-white/40 text-xs">
      <p>Conecte-se à comunidade E-Coin</p>
      <div className="flex gap-6 text-lg text-[#D4AF37]">
        <a href="https://t.me/ecoin2026" target="_blank" rel="noreferrer"><FaTelegramPlane /></a>
        <a href="https://x.com/CoinE28810" target="_blank" rel="noreferrer"><FaTwitter /></a>
        <a href="https://discord.com" target="_blank" rel="noreferrer"><FaDiscord /></a>
        <a href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
      </div>
      <button 
        onClick={onOpenInviteModal} 
        className="mt-2 bg-gradient-to-r from-[#00FF9C] to-[#00C3FF] text-black text-xs font-bold py-2.5 px-6 rounded-full uppercase tracking-wider"
      >
        🎁 Convidar Amigos
      </button>
    </div>
  );
}