"use client";

import { useState, useEffect } from "react";
import Copy from "lucide-react/dist/esm/icons/copy";
import Check from "lucide-react/dist/esm/icons/check";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import Star from "lucide-react/dist/esm/icons/star";
import { useAccount } from "wagmi";
import { useReferralCodeRegistry } from "@/hooks/useReferralCodeRegistry";

export default function ReferralCodePanel() {
  const { address } = useAccount();
  const { registerCode, getMyCodes } = useReferralCodeRegistry();
  
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState<string[]>([]);
  const [activeCode, setActiveCode] = useState<string | null>(null);

  // Estados para controlar o feedback de cópia individual
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchCodes = async () => {
    if (!address) return;
    try {
      const data = await getMyCodes(address as `0x${string}`);
      setCodes(data || []);
      
      const savedActive = localStorage.getItem(`active_ref_${address.toLowerCase()}`);
      if (!savedActive && data && data.length > 0) {
        setActiveCode(data[0]);
      } else {
        setActiveCode(savedActive);
      }
    } catch (e) { console.error(e); }
  };

  const handleRegister = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      await registerCode(code);
      await fetchCodes(); 
      setCode("");
    } catch (error) { alert("Erro ao registrar."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCodes(); }, [address]);

  const handleSetActive = (c: string) => {
    setActiveCode(c);
    localStorage.setItem(`active_ref_${address!.toLowerCase()}`, c);
  };

  // Funções de Cópia Inteligente
  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-950/40 border border-zinc-800 rounded-2xl p-6 shadow-xl w-full max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
        <Sparkles size={20} /> Seu Painel de Referral
      </h3>

      {/* ================= CARD DO CÓDIGO DE CONVITE ATIVO ================= */}
      {activeCode && (
        <div className="space-y-3 mb-6">
          <div className="relative p-5 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-xl text-center flex flex-col items-center justify-center group">
            {/* Ícone Estrela Fixo Indicando Uso Real */}
            <div className="absolute top-3 right-3 text-[#D4AF37]">
              <Star size={16} className="fill-[#D4AF37]" />
            </div>
            
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Código de Convite Ativo</p>
            
            <div className="flex items-center gap-3 mt-2">
              <h2 className="text-3xl font-mono font-black text-white tracking-tight">{activeCode}</h2>
              <button 
                onClick={() => copyToClipboard(activeCode, setCopiedCode)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 text-zinc-400 hover:text-white transition-all"
                title="Copiar Código"
              >
                {copiedCode ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* ================= COMPONENTE DE LINK DE CONVITE COMPARTILHÁVEL ================= */}
          <div className="p-3 bg-black/40 border border-zinc-800 rounded-xl flex items-center justify-between gap-3">
            <div className="truncate flex-1 text-left">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Seu Link de Indicação</p>
              <p className="text-xs font-mono text-[#D4AF37] truncate mt-0.5">
                https://ecoin.edenkingdom.org/Mining
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(`https://ecoin.edenkingdom.org/Mining`, setCopiedLink)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold hover:bg-[#D4AF37] hover:text-black transition-all shadow-sm"
            >
              {copiedLink ? (
                <>
                  <Check size={14} />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ================= HISTÓRICO DE CÓDIGOS CRIADOS ================= */}
      <div className="space-y-2.5 mb-6">
        <p className="text-xs text-zinc-400 font-medium text-left">Histórico de códigos criados:</p>
        {codes.map((c, i) => (
          <div 
            key={i} 
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
              activeCode === c ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_15px_rgba(212,175,55,0.02)]' : 'border-zinc-800 bg-black/20'
            }`}
          >
            <span className="font-mono text-sm font-semibold text-white">{c}</span>
            <div className="flex gap-2">
              <button 
                onClick={() => handleSetActive(c)} 
                className="p-1 transition-transform active:scale-95" 
                title={activeCode === c ? "Código Ativo Atualmente" : "Definir como ativo"}
              >
                <Star size={18} className={activeCode === c ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-zinc-600 hover:text-zinc-400'} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= NOVO CADASTRO (BOTÃO ABAIXO DO INPUT) ================= */}
      <div className="border-t border-zinc-900 pt-4 space-y-3">
        <div className="flex flex-col gap-2.5">
          <input 
            value={code} 
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full bg-black/60 border border-zinc-800 focus:border-zinc-700 rounded-xl p-3 text-white placeholder-zinc-600 font-mono text-sm focus:outline-none transition-all" 
            placeholder="Ex: NOVO123"
          />
          <button 
            onClick={handleRegister} 
            disabled={loading || !code.trim()}
            className="w-full bg-[#D4AF37] disabled:opacity-40 text-black py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 active:scale-[0.99] hover:bg-[#bfa032]"
          >
            {loading ? "Processando..." : "Criar Novo Código"}
          </button>
        </div>
      </div>
    </div>
  );
}