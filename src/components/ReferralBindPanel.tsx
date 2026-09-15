"use client";

import { useEffect, useState, useCallback } from "react";
import { useReferral } from "@/hooks/useReferral";
import ReferralQRScanner from "@/components/ReferralQRScanner";
import { useSearchParams } from "next/navigation";
import { useReferralCodeRegistry } from "@/hooks/useReferralCodeRegistry";
import { Link, QrCode, Search, CheckCircle2, AlertTriangle } from "lucide-react";

export default function ReferralBindPanel() {
  const { bindInviter, getInviter } = useReferral();
  const { resolveCode } = useReferralCodeRegistry();

  const [upline, setUpline] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const searchParams = useSearchParams();

  const checkExistingUpline = useCallback(async () => {
    try {
      const inv = await getInviter();
      if (inv && inv !== "0x0000000000000000000000000000000000000000") {
        setUpline(inv);
        setDone(true);
      }
    } catch (err) {
      console.error("Erro ao verificar inviter atual:", err);
    }
  }, [getInviter]);

  useEffect(() => {
    const ref = searchParams.get("ref");
    const code = searchParams.get("code");

    if (ref) setUpline(ref);

    if (code) {
      const formattedCode = code.toUpperCase();
      setReferralCode(formattedCode);
      resolveCode(formattedCode).then((owner) => {
        if (owner && owner !== "0x0000000000000000000000000000000000000000") {
          setUpline(owner as string);
        }
      });
    }

    checkExistingUpline();
  }, [searchParams, resolveCode, checkExistingUpline]);

  const isValidAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);

  const handleResolveCode = async () => {
    if (!referralCode) return;
    const resolved = await resolveCode(referralCode);
    if (!resolved || resolved === "0x0000000000000000000000000000000000000000") {
      alert("Código de indicação não encontrado.");
      return;
    }
    setUpline(resolved as string);
  };

  const handleBind = async () => {
    if (!isValidAddress(upline) || done) return;
    try {
      setLoading(true);
      await bindInviter(upline);
      setDone(true);
    } catch (err) {
      console.error("Erro ao efetuar bindInviter:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/50 border border-[#D4AF37]/20 rounded-xl p-3.5 sm:p-4 space-y-3 backdrop-blur-md">
      <div>
        <h3 className="text-sm font-bold text-[#D4AF37] flex items-center gap-1.5">
          <Link size={15} /> Vincular Upline <span className="text-[10px] text-gray-500 font-normal">(Imutável)</span>
        </h3>
        <p className="text-[11px] text-gray-400 mt-1 leading-tight">
          Insira o código ou endereço de carteira do seu <strong>Upline</strong>.
          <br />
          <span className="text-amber-400/90 text-[10px] flex items-center gap-1 mt-0.5">
            <AlertTriangle size={11} /> Registo definitivo on-chain (L1/L2/L3).
          </span>
        </p>
      </div>

      {/* CÓDIGO DE REFERRAL */}
      <div className="space-y-1.5">
        <div className="flex gap-2">
          <input
            value={referralCode}
            disabled={done}
            onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
            placeholder="Código (Ex: KING123)"
            className="flex-1 p-2 bg-black/80 border border-[#3B82F6]/30 rounded-lg text-xs text-white uppercase focus:outline-none focus:border-[#3B82F6] disabled:opacity-50"
          />
          <button
            type="button"
            disabled={done || !referralCode}
            onClick={handleResolveCode}
            className="px-3 py-2 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#3B82F6] rounded-lg text-xs font-semibold transition shrink-0 flex items-center gap-1 disabled:opacity-50"
          >
            <Search size={13} /> Buscar
          </button>
        </div>
      </div>

      {/* ENDEREÇO DA WALLET */}
      <input
        value={upline}
        disabled={done}
        onChange={(e) => setUpline(e.target.value)}
        placeholder="Endereço 0x..."
        className="w-full p-2 bg-black/80 border border-[#D4AF37]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono disabled:opacity-50"
      />

      {/* BOTÃO SCAN */}
      {!done && (
        <button
          type="button"
          onClick={() => setShowScanner(true)}
          className="w-full py-1.5 rounded-lg border border-[#3B82F6]/30 text-xs text-blue-400 hover:bg-[#3B82F6]/10 transition flex items-center justify-center gap-1.5"
        >
          <QrCode size={14} /> Escanear QR Code
        </button>
      )}

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
        onClick={handleBind}
        className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
          done
            ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5"
            : "bg-gradient-to-r from-[#D4AF37] to-[#3B82F6] text-black hover:opacity-95 active:scale-[0.98]"
        }`}
      >
        {done ? (
          <>
            <CheckCircle2 size={15} className="text-emerald-400" /> Upline Vinculado
          </>
        ) : loading ? (
          "A Gravar na Blockchain..."
        ) : (
          "Confirmar e Salvar Upline"
        )}
      </button>

      {done && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg text-[11px] text-emerald-400 text-center">
          Esta carteira já possui um Upline gravado no contrato UnifiedReferralV2.
        </div>
      )}
    </div>
  );
}