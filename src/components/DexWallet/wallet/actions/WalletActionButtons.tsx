
"use client";

import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  ShieldCheck
} from "lucide-react";

import ReceiveModal from "./ReceiveModal";
import SendModal from "./SendModal";
import ConvertModal from "./ConvertModal";

export default function WalletActionButtons() {

  const [activeModal, setActiveModal] = useState<
    "receive" | "send" | "convert" | null
  >(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mt-8 pt-4 border-t border-gray-800/80">

        <button
          onClick={() => setActiveModal("receive")}
          className="flex items-center justify-center gap-2 py-3 bg-[#D4AF37] hover:bg-[#b8952d] text-black font-extrabold text-xs rounded-xl transition active:scale-95 shadow-lg shadow-[#D4AF37]/20"
        >
          <ArrowDownLeft className="w-4 h-4" />
          Receber
        </button>

        <button
          onClick={() => setActiveModal("send")}
          className="flex items-center justify-center gap-2 py-3 bg-[#1E2632] hover:bg-[#283242] text-white font-bold text-xs rounded-xl border border-gray-700 transition active:scale-95"
        >
          <ArrowUpRight className="w-4 h-4 text-gray-400" />
          Enviar
        </button>

        <button
          onClick={() => setActiveModal("convert")}
          className="flex items-center justify-center gap-2 py-3 bg-[#1E2632] hover:bg-[#283242] text-white font-bold text-xs rounded-xl border border-gray-700 transition active:scale-95"
        >
          <Repeat className="w-4 h-4 text-[#00FF9C]" />
          Convert
        </button>

      </div>

      <div className="mt-6 text-center text-[10px] text-gray-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#00FF9C]" />
        <span>
          Apenas ativos integrados e autorizados na BNB Smart Chain.
        </span>
      </div>

      {activeModal === "receive" && (
        <ReceiveModal
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "send" && (
        <SendModal
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "convert" && (
        <ConvertModal
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
