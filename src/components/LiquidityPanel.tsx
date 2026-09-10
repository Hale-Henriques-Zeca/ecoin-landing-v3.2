"use client";

import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts";
import { erc20Abi } from "@/lib/abis/erc20Abi";
import LiquidityAdminPanel from "@/components/LiquidityAdminPanel";
import { useAccount, useReadContract, useBalance } from "wagmi";
import { ExternalLink, Users, Coins, Wallet, ShieldCheck, TrendingUp } from "lucide-react";

// Endereços dos Contratos definidos
const EDOLLAR_ADDRESS = "0xF7543E5B4735C58a176269202847360aaDfA83C1";
const ECOIN_ADDRESS = "0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964";

export default function LiquidityPanel() {
  const { address } = useAccount();

  /* ==========================================================================
     1. LEITURA DE OWNER DO COFRE DE LIQUIDEZ
     ========================================================================== */
  const { data: vaultOwner } = useReadContract({
    address: CONTRACTS.LIQUIDITY_VAULT,
    abi: [
      {
        name: "owner",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "address" }],
      },
    ],
    functionName: "owner",
  });

  const isOwner =
    vaultOwner &&
    address &&
    vaultOwner.toLowerCase() === address.toLowerCase();

  const [holders, setHolders] = useState<string>("--");

  /* ==========================================================================
     2. LEITURA DE SALDOS ON-CHAIN DA LIQUIDITY VAULT
     ========================================================================== */
  // 1. USDT Liquidity
  const { data: liquidityUSDT } = useReadContract({
    address: CONTRACTS.LIQUIDITY_VAULT,
    abi: [
      {
        name: "liquidityUSDT",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint256" }],
      },
    ],
    functionName: "liquidityUSDT",
    query: { refetchInterval: 5000 },
  });

  // 2. eDollar (E-USD) Balance
  const { data: eDollarBalance } = useReadContract({
    address: EDOLLAR_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [CONTRACTS.LIQUIDITY_VAULT],
    query: { refetchInterval: 5000 },
  });

  // 3. eCoin (E-Coin) Balance
  const { data: eCoinBalance } = useReadContract({
    address: ECOIN_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [CONTRACTS.LIQUIDITY_VAULT],
    query: { refetchInterval: 5000 },
  });

  // 4. Native BNB Balance
  const { data: bnbBalance } = useBalance({
    address: CONTRACTS.LIQUIDITY_VAULT,
    query: { refetchInterval: 5000 },
  });

  /* ==========================================================================
     3. FORMATAÇÃO DOS VALORES
     ========================================================================== */
  const formattedUSDT =
    liquidityUSDT !== undefined
      ? Number(formatUnits(liquidityUSDT as bigint, 18)).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "--";

  const formattedEUSD =
    eDollarBalance !== undefined
      ? Number(formatUnits(eDollarBalance as bigint, 18)).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "--";

  const formattedECoin =
    eCoinBalance !== undefined
      ? Number(formatUnits(eCoinBalance as bigint, 18)).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 7,
        })
      : "--";

  const formattedBNB =
    bnbBalance !== undefined
      ? Number(bnbBalance.formatted).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 7,
        })
      : "--";

  /* ==========================================================================
     4. FETCH DE HOLDERS
     ========================================================================== */
  useEffect(() => {
    async function loadHolders() {
      try {
        const res = await fetch("/api/holders");
        const data = await res.json();

        if (data.holders) {
          setHolders(data.holders);
        }

        if (data.status === "1" && data.result) {
          setHolders(Number(data.result).toLocaleString());
        }
      } catch (e) {
        console.error("Erro ao carregar holders:", e);
      }
    }

    loadHolders();
  }, []);

  /* ==========================================================================
     5. RENDERIZAÇÃO DA INTERFACE (UI)
     ========================================================================== */
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10 sm:py-16 text-left">
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck size={14} />
          Reservas On-Chain Verificadas
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D4AF37] tracking-tight mb-4">
          E-Coin Reserve & Liquidity Hub
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Acompanhamento em tempo real das reservas de liquidez multi-ativos do protocolo e métricas da comunidade global de titulares.
        </p>
      </div>

      {/* GRID DE ATIVOS / RESERVAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        {/* CARD 1: USDT (VERDE) */}
        <div className="bg-zinc-950/60 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-400" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400/80">
              Reserva USDT
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Wallet size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight break-all mb-1">
            {formattedUSDT}
          </div>
          <p className="text-[11px] text-zinc-500 font-medium">Tether USD (BEP20)</p>
        </div>

        {/* CARD 2: eDollar (AZUL) */}
        <div className="bg-zinc-950/60 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5 hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-sky-400" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400/80">
              Reserva eDollar
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Coins size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 tracking-tight break-all mb-1">
            {formattedEUSD}
          </div>
          <p className="text-[11px] text-zinc-500 font-medium">E-USD Stablecoin</p>
        </div>

        {/* CARD 3: eCoin (GOLD) */}
        <div className="bg-zinc-950/60 backdrop-blur-md border border-[#D4AF37]/20 rounded-2xl p-5 hover:border-[#D4AF37]/40 transition-all duration-300 relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-amber-500" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]/80">
              Reserva eCoin
            </span>
            <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37] tracking-tight break-all mb-1">
            {formattedECoin}
          </div>
          <p className="text-[11px] text-zinc-500 font-medium">E-Coin Native Token</p>
        </div>

        {/* CARD 4: BNB (AMARELO) */}
        <div className="bg-zinc-950/60 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-5 hover:border-yellow-500/40 transition-all duration-300 relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-amber-400" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-400/80">
              Reserva BNB
            </span>
            <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400">
              <Wallet size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-yellow-400 tracking-tight break-all mb-1">
            {formattedBNB}
          </div>
          <p className="text-[11px] text-zinc-500 font-medium">BNB Native Coin</p>
        </div>

      </div>

      {/* HIGHLIGHT BANNER: HOLDERS & BLOCKCHAIN LINKS */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="p-4 rounded-2xl bg-[#4ade80]/10 border border-[#4ade80]/20 text-[#4ade80] shrink-0">
            <Users size={32} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Total de Titulares On-Chain
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#4ade80] tracking-tight">
              {holders}
            </div>
            <p className="text-xs text-zinc-400 mt-1">Endereços ativos mantendo eCoin na rede BEP20.</p>
          </div>
        </div>

        {/* BOTOES DE AÇÃO / EXPLORADOR */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <a
            href={`https://bscscan.com/address/${CONTRACTS.LIQUIDITY_VAULT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-lg shadow-amber-500/10"
          >
            <span>Ver Cofre no BscScan</span>
            <ExternalLink size={15} />
          </a>

          <a
            href={`https://bscscan.com/token/${ECOIN_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95"
          >
            <span>Holders no BscScan</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>

      {/* PAINEL DE ADMINSTRAÇÃO CONDICIONAL */}
      {isOwner && (
        <div className="mt-12 pt-8 border-t border-zinc-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold mb-6">
            Área Reservada ao Administrador do Cofre
          </div>
          <LiquidityAdminPanel />
        </div>
      )}
    </section>
  );
}