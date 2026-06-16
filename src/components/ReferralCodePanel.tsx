"use client";

import { useState, useEffect } from "react";
import Copy from "lucide-react/dist/esm/icons/copy";
import Check from "lucide-react/dist/esm/icons/check";
import Tag from "lucide-react/dist/esm/icons/tag";
import LinkIcon from "lucide-react/dist/esm/icons/link";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import { useAccount } from "wagmi";
import { useReferralCodeRegistry } from "@/hooks/useReferralCodeRegistry";

export default function ReferralCodePanel() {
  const { address } = useAccount();
  const { registerCode, getMyCodes } = useReferralCodeRegistry();
  
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState<string[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const fetchCodes = async () => {
    if (!address) return;
    try {
      const data = await getMyCodes(address as `0x${string}`);
      setCodes(data || []);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchCodes(); }, [address]);

  const handleRegister = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      await registerCode(code);
      await fetchCodes(); // Atualiza a lista após registrar
      setCode("");
    } catch (error) { alert("Erro: Código já registrado ou inválido."); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-zinc-950/40 border border-zinc-800 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
        <Sparkles size={20} /> Seu Painel de Referral
      </h3>

      {/* Lista de Códigos */}
      <div className="space-y-4 mb-6">
        {codes.map((c, i) => (
          <div key={i} className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-zinc-800">
            <span className="font-mono text-[#D4AF37]">{c}</span>
            <button onClick={() => {
                navigator.clipboard.writeText(`https://ecoin.edenkingdom.org/Savings?ref=${c}`);
                setCopiedField(c);
            }}>
              {copiedField === c ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
          </div>
        ))}
      </div>

      {/* Novo Cadastro */}
      <div className="border-t border-zinc-800 pt-4">
        <p className="text-sm text-zinc-400 mb-2">Criar novo código:</p>
        <div className="flex gap-2">
          <input 
            value={code} 
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="flex-1 bg-black/40 border border-zinc-700 rounded-xl p-2 text-white" 
            placeholder="Ex: NOVO123"
          />
          <button onClick={handleRegister} className="bg-[#D4AF37] px-4 rounded-xl font-bold">
            {loading ? "..." : "Criar"}
          </button>
        </div>
      </div>
    </div>
  );
}