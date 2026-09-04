"use client";

import { useEffect, useState } from "react";
import { useReferral } from "@/hooks/useReferral";
import ReferralQRScanner from "@/components/ReferralQRScanner";
import { useSearchParams } from "next/navigation";
import { useReferralCodeRegistry } from "@/hooks/useReferralCodeRegistry";

export default function ReferralBindPanel() {
  const { bindInviter, getInviter } = useReferral();
  const { resolveCode } = useReferralCodeRegistry();

  const [upline, setUpline] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    const code = searchParams.get("code");

    if (ref) setUpline(ref);

    if (code) {
      setReferralCode(code.toUpperCase());
      resolveCode(code.toUpperCase()).then((owner) => {
        if (owner && owner !== "0x0000000000000000000000000000000000000000") {
          setUpline(owner as string);
        }
      });
    }
  }, []);

  const isValidAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);

  useEffect(() => {
    getInviter().then((inv) => {
      if (inv && inv !== "0x0000000000000000000000000000000000000000") {
        setDone(true);
      }
    });
  }, []);

  return (
    <div className="bg-black/50 border border-[#D4AF37]/20 rounded-xl p-3.5 sm:p-4 space-y-3">
      <div>
        <h3 className="text-sm font-bold text-[#D4AF37] flex items-center gap-1.5">
          🔗 Vincular Upline <span className="text-[10px] text-gray-500 font-normal">(Imutável)</span>
        </h3>
        <p className="text-[11px] text-gray-400 mt-1 leading-tight">
          Insira o código/carteira do seu <strong>Upline</strong>.
          <br />
          <span className="text-amber-400/90 text-[10px]">
            ⚠️ Operação única e irreversível.
          </span>
        </p>
      </div>

      {/* CÓDIGO DE REFERRAL */}
      <div className="space-y-1.5">
        <div className="flex gap-2">
          <input
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
            placeholder="Código (Ex: KING123)"
            className="flex-1 p-2 bg-black/80 border border-[#3B82F6]/30 rounded-lg text-xs text-white uppercase focus:outline-none focus:border-[#3B82F6]"
          />
          <button
            type="button"
            onClick={async () => {
              if (!referralCode) return;
              const inviter = await resolveCode(referralCode);
              if (!inviter || inviter === "0x0000000000000000000000000000000000000000") {
                alert("Código de indicação não encontrado");
                return;
              }
              setUpline(inviter as string);
            }}
            className="px-3 py-2 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#3B82F6] rounded-lg text-xs font-semibold transition shrink-0"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* ENDEREÇO DA WALLET */}
      <input
        value={upline}
        onChange={(e) => setUpline(e.target.value)}
        placeholder="Endereço 0x..."
        className="w-full p-2 bg-black/80 border border-[#D4AF37]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37]"
      />

      {/* BOTÃO SCAN */}
      <button
        type="button"
        onClick={() => setShowScanner(true)}
        className="w-full py-1.5 rounded-lg border border-[#3B82F6]/30 text-xs text-blue-400 hover:bg-[#3B82F6]/10 transition flex items-center justify-center gap-1.5"
      >
        📷 Esconear QR Code
      </button>

      {showScanner && (
        <ReferralQRScanner
          onScan={(addr) => {
            setUpline(addr);
            setShowScanner(false);
          }}
        />
      )}

      {/* BOTÃO BIND */}
      <button
        disabled={!isValidAddress(upline) || loading || done}
        onClick={async () => {
          try {
            setLoading(true);
            await bindInviter(upline);
            setDone(true);
          } finally {
            setLoading(false);
          }
        }}
        className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
          done
            ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5"
            : "bg-gradient-to-r from-[#D4AF37] to-[#3B82F6] text-black hover:opacity-95 active:scale-98"
        }`}
      >
        {done ? "Upline Vinculado ✓" : loading ? "A Salvar..." : "Salvar Upline"}
      </button>

      {done && (
        <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg text-[11px] text-red-400 text-center">
          Upline já se encontra vinculado nesta carteira.
        </div>
      )}
    </div>
  );
}