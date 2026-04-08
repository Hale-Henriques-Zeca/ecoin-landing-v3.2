"use client";

import { useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from "wagmi";
import CompatibilityBadge from "@/components/CompatibilityBadge";
import { Wallet, ChevronRight, TrendingUp } from "lucide-react";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";


const CONTRACT_ECOIN = "0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964";
const CONTRACT_EUSD = "0xF7543E5B4735C58a176269202847360aaDfA83C1";
const USDT_BSC = "0x55d398326f99059fF775485246999027B3197955";
const BNB_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; // WBNB para garantir imagem no Metamask

export default function ImportECoinPage() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(false);
  const [showOverview, setShowOverview] = useState(false); // Controle da Seção 3

  const importToken = async () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!window.ethereum) {
      if (isMobile) {
        window.location.href = "https://link.trustwallet.com/open_url?url=" + encodeURIComponent(window.location.href);
        return;
      }
      alert("Instale MetaMask ou Trust Wallet");
      return;
    }

    setLoading(true);
    let results: string[] = [];

    try {
      // Forçar Rede BSC
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });

      const addToken = async (token: any) => {
        try {
          await window.ethereum.request({
            method: "wallet_watchAsset",
            params: { type: "ERC20", options: token },
          });
          results.push(`✅ ${token.symbol}`);
        } catch {
          results.push(`⚠️ ${token.symbol} pulado`);
        }
      };

      // 1. E-COIN
      await addToken({
        address: CONTRACT_ECOIN,
        symbol: "E-Coin",
        decimals: 18,
        image: "https://ecoin.edenkingdom.org/ecoinAilogo.png",
      });

      // 2. E-USD
      await addToken({
        address: CONTRACT_EUSD,
        symbol: "E-USD",
        decimals: 18,
        image: "https://edenkingdom.org", 
      });

      // 3. USDT
      await addToken({
        address: USDT_BSC,
        symbol: "USDT",
        decimals: 18,
        image: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      });

      // 4. BNB
      await addToken({
        address: BNB_ADDRESS,
        symbol: "BNB",
        decimals: 18,
        image: "https://cryptologos.cc",
      });

      setShowOverview(true); // Ativa a seção 3 após importar
      alert("Sincronização Neural Concluída!\n" + results.join("\n"));

    } catch (err: any) {
      alert(err?.message || "Erro na conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-24 pb-20 px-6 relative overflow-x-hidden">
      
      <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale-[0.5]" style={{ backgroundImage: "url('/bg-ai.jpg')" }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/90 to-black"></div>

      <div className="relative z-10 w-full max-w-[450px] flex flex-col gap-6">
        
        {/* CARD DE IMPORTAÇÃO */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <img src="/ecoinAilogo.png" alt="E-Coin" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(243,186,47,0.3)]" />
            <h1 className="mt-4 text-1xl font-black tracking-widest text-[#D4AF37]">EDENKINGDOM COIN NEURAL AI</h1>
            <h1 className="mt-4 text-xl font-black tracking-widest text-[#D4AF37]">E-COIN</h1>
            <span className="text-[9px] text-blue-400 font-mono tracking-[0.3em] uppercase opacity-60">Neural Asset Importer</span>
          </div>

          <CompatibilityBadge /> 

          <div className="flex flex-col gap-4 mt-8">
            <div className="scale-105 flex justify-center">
              <ConnectButton label="🔗 1. Ativar Conexão IA" />
            </div>

            {isConnected && (
              <button
                onClick={importToken}
                disabled={loading}
                className="w-full py-4 rounded-2xl font-black bg-gradient-to-r from-[#D4AF37] to-yellow-600 text-black shadow-xl hover:scale-[1.02] transition-all uppercase text-xs tracking-widest"
              >
                {loading ? "Sincronizando..." : "➕ 2. Importar Full Portfolio"}
              </button>
            )}
          </div>
        </div>

        {/* 3. WALLET OVERVIEW (Aparece após importação) */}
        {showOverview && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-1000 bg-[#0A0A0A] border border-[#D4AF37]/30 p-6 rounded-[32px] shadow-[0_0_40px_rgba(212,175,55,0.1)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">3. Wallet Overview</h2>
              <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                <TrendingUp size={12} /> SYNCED
              </div>
            </div>

            <EcoinWalletDashboard />

            <button onClick={() => window.location.href='/Savings'} className="w-full mt-6 py-3 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2">
              Aceder ao Terminal de Mineração <ChevronRight size={14} />
            </button>
          </div>
        )}

        {isConnected && (
          <button onClick={() => disconnect()} className="mt-4 text-[9px] text-gray-600 hover:text-red-500 transition-colors uppercase tracking-[0.3em] text-center">
            [ Encerrar Terminal de Importação ]
          </button>
        )}
      </div>
    </div>
  );
}
