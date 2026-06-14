"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Tag, Link as LinkIcon, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { useAccount } from "wagmi";
import { useReferralCodeRegistry } from "@/hooks/useReferralCodeRegistry";

export default function ReferralCodePanel() {
  const { address } = useAccount();
  const { registerCode, hasCode } = useReferralCodeRegistry();
  
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [registeredCode, setRegisteredCode] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  // Carregar estado ao conectar/carregar
  useEffect(() => {
    const checkUserStatus = async () => {
      if (!address) {
        setChecking(false);
        return;
      }
      
      // 1. Verifica no LocalStorage
      const localCode = localStorage.getItem(`ref_code_${address.toLowerCase()}`);
      
      // 2. Verifica na Blockchain
      const isRegistered = await hasCode(address);
      
      if (isRegistered && localCode) {
        setRegisteredCode(localCode);
      } else {
        setRegisteredCode(null);
      }
      setChecking(false);
    };

    checkUserStatus();
  }, [address]);

  const handleRegister = async () => {
    if (!code.trim() || !address) return;
    setLoading(true);
    try {
      await registerCode(code);
      // Salvar localmente após sucesso
      localStorage.setItem(`ref_code_${address.toLowerCase()}`, code.toUpperCase());
      setRegisteredCode(code.toUpperCase());
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao criar código. Verifique se o código já não está tomado.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fullReferralLink = registeredCode ? `https://ecoin.edenkingdom.org/Savings?ref=${registeredCode}` : "";

  if (checking) return <div className="p-6 text-center text-zinc-500">Verificando rede...</div>;

  return (
    <div className="bg-zinc-950/40 border border-zinc-800 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-[#D4AF37] mb-2 flex items-center gap-2">
        <Sparkles size={20} /> Painel de Referral
      </h3>

      {!registeredCode ? (
        <div className="space-y-4">
          <p className="text-sm text-zinc-400">Defina seu código de líder:</p>
          <div className="relative">
            <Tag className="absolute left-3 top-3 text-zinc-500" size={18} />
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Ex: KING123"
              className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 pl-10 text-white focus:border-[#D4AF37] outline-none"
            />
          </div>
          <button
            onClick={handleRegister}
            disabled={loading || !code || !address}
            className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-xl hover:bg-amber-500 transition"
          >
            {loading ? "Registrando..." : "Criar Código"}
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-green-400 text-sm font-semibold mb-2">Código Ativo na Blockchain</p>
            <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-zinc-800 mb-2">
              <span className="font-mono text-[#D4AF37] text-lg font-bold">{registeredCode}</span>
              <button onClick={() => copyToClipboard(registeredCode, 'code')} className="text-zinc-400">
                {copiedField === 'code' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
            <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-zinc-800">
              <span className="text-xs text-zinc-500 truncate mr-2">{fullReferralLink}</span>
              <button onClick={() => copyToClipboard(fullReferralLink, 'link')} className="text-zinc-400">
                {copiedField === 'link' ? <Check size={18} className="text-green-500" /> : <LinkIcon size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}