"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Sparkles, Star, Wallet, LogOut } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useReferralCodeRegistry } from "@/hooks/useReferralCodeRegistry";

export default function ReferralCodePanel() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal(); // Hook oficial do RainbowKit para abrir o modal de conexao
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
      const formattedCodes = data ? [...data] : [];
      setCodes(formattedCodes);

      const savedActive = localStorage.getItem(`active_ref_${address.toLowerCase()}`);
      if (!savedActive && formattedCodes.length > 0) {
        setActiveCode(formattedCodes[0]);
      } else {
        setActiveCode(savedActive);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegister = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      await registerCode(code);
      await fetchCodes();
      setCode("");
    } catch (error) {
      alert("Erro ao registrar.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchCodes();
    } else {
      setCodes([]);
      setActiveCode(null);
    }
  }, [address, isConnected]);

  const handleSetActive = (c: string) => {
    if (!address) return;
    setActiveCode(c);
    localStorage.setItem(`active_ref_${address.toLowerCase()}`, c);
  };

  // Funções de Cópia Inteligente
  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Auxiliar para formatar o endereço (ex: 0x1234...5678)
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Link dinâmico com o código ativo selecionado
  const shareableLink = activeCode
    ? `https://ecoin.edenkingdom.org`
    : `https://ecoin.edenkingdom.org`;

  return (
    <div className="bg-zinc-950/40 border border-zinc-800 rounded-2xl p-6 shadow-xl w-full max-w-xl mx-auto">
      {/* CABEÇALHO DO PAINEL */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
        <h3 className="text-xl font-bold text-[#D4AF37] flex items-center gap-2">
          <Sparkles size={20} /> Seu Painel de código de Referral
        </h3>

        {/* Botão de Sair (Desconectar) quando a carteira estiver conectada */}
        {isConnected && address && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
              {formatAddress(address)}
            </span>
            <button
              onClick={() => disconnect()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500 hover:text-white transition-all cursor-pointer"
              title="Desconectar Carteira"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>

      {/* ESTADO: CARTEIRA NÃO CONECTADA */}
      {!isConnected || !address ? (
        <div className="py-8 px-4 text-center flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
            <Wallet size={32} />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">Carteira Não Conectada</h4>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Conecte a sua carteira para o seu código de indicação aparecer.
            </p>
          </div>
          <button
            type="button"
            onClick={openConnectModal}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-black text-sm uppercase tracking-wider hover:bg-[#bfa032] transition-all shadow-lg active:scale-[0.98] cursor-pointer"
          >
            <Wallet size={18} />
            <span>Conectar Carteira</span>
          </button>
        </div>
      ) : (
        /* ESTADO: CARTEIRA CONECTADA */
        <>
          {/* ================= CARD DO CÓDIGO DE CONVITE ATIVO ================= */}
          {activeCode && (
            <div className="space-y-3 mb-6">
              <div className="relative p-5 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-xl text-center flex flex-col items-center justify-center group">
                <div className="absolute top-3 right-3 text-[#D4AF37]">
                  <Star size={16} className="fill-[#D4AF37]" />
                </div>

                <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Código de Convite Ativo</p>

                <div className="flex items-center gap-3 mt-2">
                  <h2 className="text-3xl font-mono font-black text-white tracking-tight">{activeCode}</h2>
                  <button
                    onClick={() => copyToClipboard(activeCode, setCopiedCode)}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 text-zinc-400 hover:text-white transition-all cursor-pointer"
                    title="Copiar Código"
                  >
                    {copiedCode ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* ================= COMPONENTE DE LINK DE CONVITE COMPARTILHÁVEL ================= */}
              <div className="p-3 bg-black/40 border border-zinc-800 rounded-xl flex items-center justify-between gap-3">
                <div className="truncate flex-1 text-left">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Link de Indicação</p>
                  <p className="text-xs font-mono text-[#D4AF37] truncate mt-0.5">
                    {shareableLink}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(shareableLink, setCopiedLink)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold hover:bg-[#D4AF37] hover:text-black transition-all shadow-sm cursor-pointer"
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
            {codes.length === 0 ? (
              <p className="text-xs text-zinc-600 italic text-left">Nenhum código registrado ainda.</p>
            ) : (
              codes.map((c, i) => (
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
                      className="p-1 transition-transform active:scale-95 cursor-pointer"
                      title={activeCode === c ? "Código Ativo Atualmente" : "Definir como ativo"}
                    >
                      <Star size={18} className={activeCode === c ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-zinc-600 hover:text-zinc-400'} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ================= NOVO CADASTRO ================= */}
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
                className="w-full bg-[#D4AF37] disabled:opacity-40 text-black py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 active:scale-[0.99] hover:bg-[#bfa032] cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? "Processando..." : "Criar Novo Código"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}