"use client";

import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Wallet,
  LogIn,
  LogOut,
  Zap,
  ChevronRight,
  Layers,
  Coins,
  CheckCircle2,
  ArrowLeftRight,
} from "lucide-react";
import Link from "next/link";

// Wagmi
import {
  useAccount,
  useDisconnect,
  useSwitchChain,
  useChainId,
} from "wagmi";

// Módulos Separados de Métricas (Crypto = eCoin | Stable = eDollar & USDT)
import Crypto from "@/components/mining/metrics/Crypto";
import Stable from "@/components/mining/metrics/Stable";

// Componentes Principais Separados (eDollar/USDT vs eCoin)
import MiningPageEDollar from "@/components/mining/eDollar/MiningMainPage/MiningPage";
import MiningPageECoin from "@/components/mining/eCoin/MiningMainPage/MiningPage";

type PoolType = "USDT" | "ECOIN" | "EDOLLAR" | null;

const POOL_STORAGE_KEY = "edenkingdom_selected_mining_pool";

export default function MiningPortal() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  const [mounted, setMounted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [earnings, setEarnings] = useState(0);

  // 🎛️ ESTADO DE SELEÇÃO DE POOL ("USDT" | "ECOIN" | "EDOLLAR" | null)
  const [selectedPool, setSelectedPool] = useState<PoolType>(null);

  // Seleciona o pool e persiste no navegador para manter o destino após login
  const handleSelectPool = (pool: PoolType) => {
    setSelectedPool(pool);
    if (typeof window !== "undefined") {
      if (pool) {
        window.localStorage.setItem(POOL_STORAGE_KEY, pool);
      } else {
        window.localStorage.removeItem(POOL_STORAGE_KEY);
      }
    }
  };

  // Garante rede BNB Smart Chain (chainId 56) ao conectar
  useEffect(() => {
    if (!isConnected) return;
    if (chainId !== 56) {
      switchChain({ chainId: 56 });
    }
  }, [isConnected, chainId, switchChain]);

  // Simulação visual de dividendos live
  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => prev + Math.random() * 0.002);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Hidratação e restauração do pool selecionado
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedPool = window.localStorage.getItem(
        POOL_STORAGE_KEY
      ) as PoolType;
      if (
        savedPool === "USDT" ||
        savedPool === "ECOIN" ||
        savedPool === "EDOLLAR"
      ) {
        setSelectedPool(savedPool);
      }
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      setPanelOpen(true);
    } else {
      setPanelOpen(false);
    }
  }, [isConnected]);

  // Handler para acionar a eCoin Cloud Wallet (Native Wallet)
  const handleCloudWalletLogin = (openConnectModal?: () => void) => {
    if (selectedPool && typeof window !== "undefined") {
      window.localStorage.setItem(POOL_STORAGE_KEY, selectedPool);
    }
    console.log(`Conectando à eCoin Cloud Wallet para o Pool: ${selectedPool}`);
    if (openConnectModal) {
      openConnectModal();
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* ================= ESTADO: NÃO CONECTADO ================= */}
      {!isConnected && (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 py-20 overflow-hidden">
          {/* FUNDO DINÂMICO DE SHAREHOLDERS & CS */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 grayscale"
            style={{ backgroundImage: "url('/backgrounds/mining-bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />

          <div className="relative z-10 max-w-4xl w-full space-y-8">
            {/* TÍTULO E BADGE */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black tracking-[0.3em] uppercase">
                <Zap size={14} className="animate-pulse" /> Distribuição de
                Dividendos & Capacidade CS em Milissegundos
              </div>
              <h1 className="text-3xl md:text-6xl font-black tracking-tighter leading-tight">
                Portal <span className="text-[#D4AF37]">Neural</span> <br />
                de Acionistas & Suportadores da Moeda & Activo Digital{" "}
                <span className="text-[#D4AF37]">eCoin</span> <br />
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Participe da distribuição global de taxas do ecossistema e
                lucros realizados pelo{" "}
                <span className="text-[#D4AF37]">ecnTrading DEX</span> <br /> -
                On-Chain AI trading robot no mercado descentralizado via WEB3.
                Escolha o pool de AI trading abaixo para visualizar as métricas
                e conectar-se.
              </p>
            </motion.div>

            {/* LIVE COUNTER DE DIVIDENDOS */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 inline-block">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">
                Simulação de Dividendos Live
              </p>

              <motion.div
                key={earnings}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-[#D4AF37]"
              >
                ${earnings.toFixed(4)}
              </motion.div>
            </div>

            {/* ================= SELETOR DE POOLS (SWITCH DE ENTIDADES) ================= */}
            <div className="w-full max-w-3xl mx-auto pt-4">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">
                Selecione o AI Trading Robot Pool
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* POOL USDT -> MÉTRICAS STABLE + MINING PAGE EDOLLAR/USDT */}
                <button
                  onClick={() => handleSelectPool("USDT")}
                  className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    selectedPool === "USDT"
                      ? "bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)] scale-[1.02]"
                      : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                      <Coins size={20} />
                    </div>
                    {selectedPool === "USDT" && (
                      <CheckCircle2 size={18} className="text-[#D4AF37]" />
                    )}
                  </div>
                  <div>
                    <span className="text-[9px] text-amber-400 font-bold tracking-widest uppercase block mb-1">
                      eCoin Cloud Wallet (ECCW)
                    </span>
                    <h4 className="text-lg font-black text-white">Pool USDT</h4>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Staking em eCoin & Renda Passiva em USDT
                    </p>
                  </div>
                </button>

                {/* POOL ECOIN -> MÉTRICAS CRYPTO + MINING PAGE ECOIN */}
                <button
                  onClick={() => handleSelectPool("ECOIN")}
                  className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    selectedPool === "ECOIN"
                      ? "bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)] scale-[1.02]"
                      : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                      <Layers size={20} />
                    </div>
                    {selectedPool === "ECOIN" && (
                      <CheckCircle2 size={18} className="text-[#D4AF37]" />
                    )}
                  </div>
                  <div>
                    <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase block mb-1">
                      eCoin Cloud Wallet (ECCW)
                    </span>
                    <h4 className="text-lg font-black text-white">Pool eCoin</h4>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Pool Nativo eCoin Protocol (Staking em eCoin & Renda
                      Passiva em eCoin)
                    </p>
                  </div>
                </button>

                {/* POOL EDOLLAR -> MÉTRICAS STABLE + MINING PAGE EDOLLAR/USDT */}
                <button
                  onClick={() => handleSelectPool("EDOLLAR")}
                  className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    selectedPool === "EDOLLAR"
                      ? "bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)] scale-[1.02]"
                      : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
                      <Wallet size={20} />
                    </div>
                    {selectedPool === "EDOLLAR" && (
                      <CheckCircle2 size={18} className="text-[#D4AF37]" />
                    )}
                  </div>
                  <div>
                    <span className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase block mb-1">
                      Multi-Wallet Connect
                    </span>
                    <h4 className="text-lg font-black text-white">Pool eDollar</h4>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Staking em eCoin & Renda Passiva em eDollar
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* ================= MÉTRICAS E BOTÃO DE LOGIN (APARECEM APENAS APÓS SELEÇÃO) ================= */}
            {selectedPool && (
              <motion.div
                key={selectedPool}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-10 pt-4"
              >
                {/* 📊 RENDERIZAÇÃO CONDICIONAL DAS MÉTRICAS: CRYPTO (eCoin) vs STABLE (eDollar & USDT) */}
                {selectedPool === "ECOIN" ? (
                  <Crypto />
                ) : (
                  <Stable selectedPool={selectedPool} />
                )}

                {/* 🚀 BOTÃO DE ACESSO AO GUIA COMPLETO */}
                <div className="w-full max-w-xl mx-auto">
                  <Link
                    href="/eCoinSmartAIRewardsPools"
                    className="group block"
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between bg-gradient-to-r from-black/40 to-black/20 border border-white/5 p-4 rounded-2xl hover:border-[#D4AF37]/30 transition-all cursor-pointer"
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">
                          Entenda a origem dos dividendos e do Selo de
                          Compromisso (CS)
                        </span>
                        <span className="text-xs text-[#F5F5F5] font-semibold">
                          Guia Completo de Shareholders & Dividendos
                        </span>
                      </div>

                      <div className="bg-[#D4AF37]/10 p-2 rounded-full text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </motion.div>
                  </Link>
                </div>

                {/* ÁREA DE CONEXÃO ESPECÍFICA DO POOL */}
                <div className="flex flex-col items-center gap-6">
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <>
                        {/* USDT ou ECOIN -> Botão eCoin Cloud Wallet (Native Wallet) */}
                        {(selectedPool === "USDT" ||
                          selectedPool === "ECOIN") && (
                          <button
                            onClick={() =>
                              handleCloudWalletLogin(openConnectModal)
                            }
                            className="group relative px-8 py-4 rounded-xl font-bold text-[#D4AF37] 
                                       bg-zinc-950 border border-[#D4AF37]/30 hover:border-[#D4AF37]
                                       transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]
                                       hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:scale-[1.02]
                                       flex items-center gap-3 overflow-hidden cursor-pointer"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                            <div className="bg-[#D4AF37]/10 p-1.5 rounded-lg border border-[#D4AF37]/20">
                              <Zap size={20} className="text-[#D4AF37]" />
                            </div>

                            <span className="tracking-[0.2em] uppercase text-sm">
                              Login via eCoin Cloud Wallet
                            </span>
                          </button>
                        )}

                        {/* EDOLLAR -> ConnectButton RainbowKit (Multi-Wallet) */}
                        {selectedPool === "EDOLLAR" && (
                          <button
                            onClick={openConnectModal}
                            className="group relative px-8 py-4 rounded-xl font-bold text-[#D4AF37] 
                                       bg-zinc-950 border border-[#D4AF37]/30 hover:border-[#D4AF37]
                                       transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]
                                       hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:scale-[1.02]
                                       flex items-center gap-3 overflow-hidden cursor-pointer"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                            <div className="bg-[#D4AF37]/10 p-1.5 rounded-lg border border-[#D4AF37]/20">
                              <LogIn size={20} className="text-[#D4AF37]" />
                            </div>

                            <span className="tracking-[0.2em] uppercase text-sm">
                              Login (Multi-Wallet)
                            </span>
                          </button>
                        )}
                      </>
                    )}
                  </ConnectButton.Custom>

                  {/* INFO BOX */}
                  <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md text-left">
                      <p className="text-[#D4AF37] font-bold text-xs mb-3 flex items-center gap-2 uppercase tracking-widest">
                        <ShieldCheck size={16} /> Protocolo Anti-Hack &
                        Custódia Direta
                      </p>
                      <ul className="text-[11px] text-gray-400 space-y-2.5">
                        <li className="flex items-center gap-2">
                          ✅ Custódia própria via Smart Contract
                        </li>
                        <li className="flex items-center gap-2">
                          ✅ Dividendos creditados diretamente na sua Wallet
                        </li>
                        <li className="flex items-center gap-2 font-bold text-white">
                          ✅ Ativos protegidos pela Binance Smart Chain Network
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CALL TO ACTION PARA NOVOS USUÁRIOS */}
                <div className="space-y-4 pt-8 border-t border-white/5">
                  <p className="text-xs text-gray-500 italic">
                    Sem carteira? Proteja sua posição de Shareholder. Prepare
                    seu cofre digital aqui:
                  </p>

                  <Link
                    href="/Import-E-Coin-Token"
                    className="
                      flex items-center justify-center gap-3
                      py-5 rounded-2xl font-black text-sm
                      bg-white/5 border border-white/10
                      text-white hover:bg-white/10 hover:border-[#D4AF37]
                      transition-all duration-300 uppercase tracking-[0.2em]
                      max-w-md mx-auto
                    "
                  >
                    <Wallet size={18} className="text-[#D4AF37]" />
                    OBTER CARTEIRA WEB3🔐
                  </Link>

                  <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">
                    2026: Independência financeira permanente (Rendimentos e CS
                    em tempo real) 🚀
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* ================= ESTADO: CONECTADO (TERMINAL DE SHAREHOLDERS) ================= */}
      {isConnected && panelOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-24 lg:pt-32 pb-20"
        >
          {/* HEADER DE STATUS DA CARTEIRA + SELETOR RÁPIDO DE POOL */}
          <div className="max-w-[1400px] mx-auto px-6 mb-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SHAREHOLDER ATIVO: {address?.slice(0, 10)}...{address?.slice(-8)}
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-mono font-bold uppercase">
              <span>
                POOL:{" "}
                {selectedPool === "ECOIN"
                  ? "Pool eCoin (Crypto)"
                  : selectedPool === "USDT"
                  ? "Pool USDT (Stable)"
                  : selectedPool === "EDOLLAR"
                  ? "Pool eDollar (Stable)"
                  : "Selecione um Pool"}
              </span>

              <button
                type="button"
                onClick={() =>
                  handleSelectPool(
                    selectedPool === "ECOIN" ? "EDOLLAR" : "ECOIN"
                  )
                }
                className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-black font-black text-[9px] hover:bg-amber-400 transition-colors cursor-pointer"
              >
                <ArrowLeftRight size={10} />
                {selectedPool === "ECOIN"
                  ? "Ir para eDollar / USDT"
                  : "Ir para Pool eCoin"}
              </button>
            </div>
          </div>

          {/* CASO A CARTEIRA JÁ ESTIVESSE CONECTADA SEM POOL SALVO */}
          {!selectedPool ? (
            <div className="max-w-2xl mx-auto px-6 py-12 text-center space-y-6">
              <h2 className="text-2xl font-black text-white">
                Escolha o Terminal de Mineração
              </h2>
              <p className="text-sm text-gray-400">
                Sua carteira já está conectada. Selecione qual Pool deseja
                acessar:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleSelectPool("ECOIN")}
                  className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 text-left transition-all cursor-pointer"
                >
                  <span className="text-xs font-mono text-emerald-400 uppercase block mb-1">
                    Pool Nativo (Crypto)
                  </span>
                  <h3 className="text-lg font-black text-white">Pool eCoin</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Staking em eCoin & Recompensas em eCoin
                  </p>
                </button>

                <button
                  onClick={() => handleSelectPool("EDOLLAR")}
                  className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400 text-left transition-all cursor-pointer"
                >
                  <span className="text-xs font-mono text-cyan-400 uppercase block mb-1">
                    Pool Stablecoins (Stable)
                  </span>
                  <h3 className="text-lg font-black text-white">
                    Pool eDollar / USDT
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Staking em eCoin & Recompensas em eDollar / USDT
                  </p>
                </button>
              </div>
            </div>
          ) : selectedPool === "ECOIN" ? (
            /* COMPONENTE DA PÁGINA PRINCIPAL EXCLUSIVA ECOIN */
            <MiningPageECoin />
          ) : (
            /* COMPONENTE DA PÁGINA PRINCIPAL EDOLLAR & USDT */
            <MiningPageEDollar />
          )}

          {/* BOTÃO DE DESCONEXÃO E SEGURANÇA [LOG OUT PREMIUM] */}
          <div className="mt-16 text-center flex flex-col items-center justify-center">
            <button
              onClick={() => {
                disconnect();
                setPanelOpen(false);
              }}
              className="group relative px-8 py-4 rounded-xl font-bold text-red-400 
                         bg-zinc-950 border border-red-500/20 hover:border-red-500
                         transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.05)]
                         hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:scale-[1.02]
                         flex items-center gap-3 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              <div className="bg-red-500/10 p-1.5 rounded-lg border border-red-500/20">
                <LogOut size={20} className="text-red-400" />
              </div>

              <span className="tracking-[0.2em] uppercase text-sm">Log Out</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}