"use client";

import { FaTelegramPlane, FaTwitter, FaDiscord, FaWhatsapp } from "react-icons/fa";

export default function SocialFooter() {
  return (
    <div className="mt-12 pt-6 border-t border-white/5 flex flex-col items-center gap-4 text-white/40 text-xs">
      <p>Conecte-se à comunidade E-Coin</p>
      
      <div className="flex gap-6 text-lg text-[#D4AF37]">
        <a href="https://t.me/ecoin2026" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
          <FaTelegramPlane />
        </a>
        <a href="https://x.com/CoinE28810" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
          <FaTwitter />
        </a>
        <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
          <FaDiscord />
        </a>
        <a href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
}