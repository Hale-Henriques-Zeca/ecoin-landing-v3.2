"use client";

import { useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { erc20Abi } from "viem";

const CONTRACT = "0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964";
const BSC_ID = 56; // ID numérico para BNB Chain

export default function ImportECoinPage() {
  const { isConnected, address, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [loading, setLoading] = useState(false);


      // 2. Importar Token
    const importToken = async () => {
  if (!window.ethereum) return;

  setLoading(true);

  try {
    // 🔄 FORÇAR BNB CHAIN (FORMA SEGURA)
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x38",
              chainName: "BNB Smart Chain",
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              blockExplorerUrls: ["https://bscscan.com"],
            },
          ],
        });
      } else {
        throw switchError;
      }
    }

    // ➕ IMPORTAR TOKEN
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: CONTRACT,
          symbol: "E-Coin", 
          decimals: 18,
          image: "https://teu-dominio.com/logo.png",
        },
      },
    });

    if (wasAdded) {
      alert("E-COIN adicionada 🚀");
    } else {
      alert("Utilizador cancelou.");
    }

  } catch (err: any) {
    console.error("ERRO REAL:", err);

    alert(
      err?.message ||
      "Erro ao importar token. Verifique a wallet."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative font-sans">
      
      {/* IMAGEM DE FUNDO IA COM OVERLAY ESCURO */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[0.5]"
        style={{ backgroundImage: "url('/bg-ai.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617]"></div>

      {/* CARD PRINCIPAL (GLASSMORPHISM) */}
      <div className="relative z-10 w-full max-w-[420px] bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl">
        
        {/* LOGO ANIMADA */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <img src="/AI-E-Coin-Logo.PNG" alt="E-Coin" className="relative w-28 h-28 drop-shadow-[0_0_15px_rgba(243,186,47,0.4)]" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-widest bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            EDENKINGDOM COIN
          </h1>
           <h1 className="mt-6 text-2xl font-bold tracking-widest bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            (E-COIN)
          </h1>
          <span className="text-[10px] text-blue-400 font-mono tracking-[0.4em] uppercase mt-1 opacity-70">
            AI-Verified Asset
          </span>
        </div>

        {/* ÁREA DE BOTÕES */}
        <div className="flex flex-col gap-6 items-center">
          
          {/* BOTÃO RAINBOWKIT (Connect Wallet) */}
          <div className="scale-110">
            <ConnectButton label="🔗 1. Ativar Conexão IA" />
          </div>

          {/* BOTÃO IMPORTAR COM FADE-IN (Só aparece se conectado) */}
          {isConnected && (
            <button
              onClick={importToken}
              disabled={loading}
              className="w-full py-4 mt-4 rounded-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-[0_0_25px_rgba(243,186,47,0.3)] hover:shadow-[0_0_40px_rgba(243,186,47,0.6)] hover:scale-[1.02] active:scale-95 transition-all animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              {loading ? "Sincronizando..." : "➕ 2. Importar E-COIN"}
            </button>
          )}

          {isConnected && (
             <button onClick={() => disconnect()} className="text-[10px] text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest">
                [ Desconectar Terminal ]
             </button>
          )}
        </div>

        {/* FOOTER TÉCNICO */}
        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-[9px] text-gray-600 font-mono break-all opacity-50">
            ID: {CONTRACT}
          </p>
        </div>
      </div>
    </div>
  );
}
