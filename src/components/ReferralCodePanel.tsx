"use client";

import { useState, useEffect } from "react";
import Copy from "lucide-react/dist/esm/icons/copy";
import Check from "lucide-react/dist/esm/icons/check";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import Star from "lucide-react/dist/esm/icons/star"; // Ícone para "Ativar"
import { useAccount } from "wagmi";
import { useReferralCodeRegistry } from "@/hooks/useReferralCodeRegistry";



export default function ReferralCodePanel() {
  const { address } = useAccount();
  const { registerCode, getMyCodes } = useReferralCodeRegistry();
  
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState<string[]>([]);
  // LocalStorage para salvar qual o código que o usuário escolheu como "Principal"
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const fetchCodes = async () => {
    if (!address) return;
    try {
      const data = await getMyCodes(address as `0x${string}`);
      setCodes(data || []);
      
      // Se não tiver um código ativo definido, define o primeiro da lista
      const savedActive = localStorage.getItem(`active_ref_${address.toLowerCase()}`);
      if (!savedActive && data && data.length > 0) {
        setActiveCode(data[0]);
      } else {
        setActiveCode(savedActive);
      }
    } catch (e) { console.error(e); }
  };

  // ADICIONADA: Função que faltava
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

  return (
    <div className="bg-zinc-950/40 border border-zinc-800 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
        <Sparkles size={20} /> Seu Painel de Referral
      </h3>

      {/* Exibição do Código Principal (Destaque) */}
      {activeCode && (
        <div className="mb-6 p-4 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-xl text-center">
            <p className="text-xs text-zinc-400 uppercase">Código de Convite Ativo</p>
            <h2 className="text-3xl font-mono font-bold text-white mt-1">{activeCode}</h2>
        </div>
      )}

      {/* Histórico de Códigos */}
      <div className="space-y-3 mb-6">
        <p className="text-sm text-zinc-400">Histórico de códigos criados:</p>
        {codes.map((c, i) => (
          <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${activeCode === c ? 'border-[#D4AF37]' : 'border-zinc-800'} bg-black/40`}>
            <span className="font-mono text-white">{c}</span>
            <div className="flex gap-2">
                <button onClick={() => handleSetActive(c)} title="Definir como ativo">
                    <Star size={18} className={activeCode === c ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-zinc-600'} />
                </button>
            </div>
          </div>
        ))}
      </div>

      {/* Novo Cadastro */}
      <div className="border-t border-zinc-800 pt-4">
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