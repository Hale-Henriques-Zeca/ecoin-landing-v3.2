"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, usePublicClient } from "wagmi";
import { formatUnits, parseUnits } from "viem";

import { CONTRACTS } from "@/lib/contracts";
import { BuyeCoinCorporateSwapAbi } from "@/lib/abis/BuyeCoinCorporateSwapAbi";
import { erc20Abi } from "@/lib/abis/erc20Abi";
import { bsc } from "wagmi/chains";

/* ================= LIQUIDITY RESERVE VAULT ABI ================= */
const liquidityReserveVaultAbi = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: []
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "to", type: "address" }
    ],
    outputs: []
  },
  {
    name: "tokenBalance",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "token", type: "address" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "supportedTokens",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    name: "authorizedDepositors",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    name: "setSupportedToken",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "supported", type: "bool" }
    ],
    outputs: []
  },
  {
    name: "setDepositor",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "depositor", type: "address" },
      { name: "allowed", type: "bool" }
    ],
    outputs: []
  },
  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }]
  }
] as const;

export default function AdminPanel() {
  const publicClient = usePublicClient();

  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  

  const [newPrice, setNewPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [withdrawTo, setWithdrawTo] = useState("");
  type AdminToken = "ECOIN" | "EUSD" | "USDT";
  const [token, setToken] = useState<AdminToken>("ECOIN");
  
  const tokenAddress =
    token === "ECOIN"
      ? CONTRACTS.ECOIN
      : token === "EUSD"
      ? CONTRACTS.EUSD
      : CONTRACTS.USDT;
  

  function getTokenDecimals(token: AdminToken) {
    return 18;
  }


  /* ================= SWAP ================= */

  const { data: swapPaused } = useReadContract({
    address: CONTRACTS.CORPORATE_SWAP,
    abi: BuyeCoinCorporateSwapAbi,
    functionName: "paused",
  });

  /* ================= TREASURY / VAULT BALANCES ================= */

  const { data: ecoBalance } = useReadContract({
    address: CONTRACTS.LIQUIDITY_RESERVE_VAULT,
    abi: liquidityReserveVaultAbi,
    functionName: "tokenBalance",
    args: [CONTRACTS.ECOIN],
    query: { refetchInterval: 4000 }
  });

  const { data: eusdBalance } = useReadContract({
    address: CONTRACTS.LIQUIDITY_RESERVE_VAULT,
    abi: liquidityReserveVaultAbi,
    functionName: "tokenBalance",
    args: [CONTRACTS.EUSD],
    query: { refetchInterval: 4000 }
  });

  const { data: usdtBalance } = useReadContract({
    address: CONTRACTS.LIQUIDITY_RESERVE_VAULT,
    abi: liquidityReserveVaultAbi,
    functionName: "tokenBalance",
    args: [CONTRACTS.USDT],
    query: { refetchInterval: 4000 }
  });

  const treasuryEcoinFormatted = ecoBalance
    ? formatUnits(ecoBalance, 18)
    : "—";

  const treasuryEusdFormatted = eusdBalance
    ? Number(formatUnits(eusdBalance, 18)).toFixed(4)
    : "—";

  const treasuryUsdtFormatted = usdtBalance
    ? formatUnits(usdtBalance, 18)
    : "—";

  const { data: treasuryOwner } = useReadContract({
    address: CONTRACTS.LIQUIDITY_RESERVE_VAULT,
    abi: liquidityReserveVaultAbi,
    functionName: "owner",
  });

  if (!isConnected) {
    return (
      <div className="border border-[#D4AF37]/30 rounded-xl p-4 text-sm text-gray-400">
        Conecta a wallet admin para gerir o protocolo.
      </div>
    );
  }

  /* ================= ACTIONS ================= */


  async function toggleSwap() {
    if (!amount) return;
    const parsed = parseUnits(amount, getTokenDecimals(token));

    await writeContractAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [CONTRACTS.CORPORATE_SWAP, parsed],
      account: address,
      chain: bsc,
    });
  }

  /* ===== Vault deposit requires approve first ===== */
  async function depositTreasury() {
    try {
      if (!amount || !tokenAddress || !CONTRACTS?.LIQUIDITY_RESERVE_VAULT) {
        alert("Missing data");
        return;
      }

      const parsed = parseUnits(amount, getTokenDecimals(token));

      console.log("APPROVING...");
      const hash = await writeContractAsync({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [CONTRACTS.LIQUIDITY_RESERVE_VAULT, parsed],
        account: address,
        chain: bsc,
      });

      if (publicClient) {
        console.log("WAITING CONFIRMATION...");
        await publicClient.waitForTransactionReceipt({ hash });
      }

      console.log("DEPOSIT...");
      await writeContractAsync({
        address: CONTRACTS.LIQUIDITY_RESERVE_VAULT,
        abi: liquidityReserveVaultAbi,
        functionName: "deposit",
        args: [tokenAddress, parsed],
        account: address,
        chain: bsc,
      });

      console.log("DONE");
    } catch (err) {
      console.error(err);
      alert("Transaction failed — check console");
    }
  }

  async function withdrawTreasury() {
    console.log("Iniciando Withdraw...");

    if (!amount || !withdrawTo || !tokenAddress) {
      alert("Preencha o valor, o destino e escolha o token.");
      return;
    }

    try {
      const parsed = parseUnits(amount, getTokenDecimals(token));

      console.log("Token:", tokenAddress);
      console.log("Para:", withdrawTo);
      console.log("Quantidade:", parsed.toString());

      const hash = await writeContractAsync({
        address: CONTRACTS.LIQUIDITY_RESERVE_VAULT,
        abi: liquidityReserveVaultAbi,
        functionName: "withdraw",
        args: [tokenAddress, parsed, withdrawTo as `0x${string}`],
        account: address,
        chain: bsc,
      });

      alert("Transação enviada! Hash: " + hash);
    } catch (err: any) {
      console.error("Erro detalhado:", err);

      if (err.message?.includes("OwnableUnauthorizedAccount")) {
        alert("Erro: Tu não és o Owner deste Vault!");
      } else {
        alert("Falha na transação. Verifica a consola para o erro do RPC.");
      }
    }
  }

  function setMax() {
    if (token === "USDT" && usdtBalance) {
      const safe = usdtBalance > 1n ? usdtBalance - 1n : 0n;
      setAmount(formatUnits(safe, 18));
    }
    if (token === "ECOIN" && ecoBalance) {
      const safe = ecoBalance > 1n ? ecoBalance - 1n : 0n;
      setAmount(formatUnits(safe, 18));
    }
    if (token === "EUSD" && eusdBalance) {
      const safe = eusdBalance > 1n ? eusdBalance - 1n : 0n;
      setAmount(formatUnits(safe, 18));
    }
  }

  const isAdmin =
    treasuryOwner &&
    address &&
    treasuryOwner.toLowerCase() === address.toLowerCase();

  /* ================= UI ================= */

  return (
    <div className="mt-12 space-y-6 border border-[#D4AF37]/30 rounded-2xl p-6 bg-black/40 backdrop-blur-md">
      <h3 className="text-[#D4AF37] font-bold text-lg">
        🛠 E‑Coin Protocol — Admin Panel (Liquidity Reserve Vault)
      </h3>


      {/* SWAP */}
      <div className="space-y-2">
        <div className="text-sm text-gray-300">
          Swap Status: <b className={swapPaused ? "text-red-400" : "text-green-400"}>{swapPaused ? "PAUSED" : "ACTIVE"}</b>
        </div>
        <button onClick={toggleSwap} className="px-4 py-2 rounded-lg border border-[#D4AF37]/40 text-[#D4AF37]">
          {swapPaused ? "Unpause Swap" : "Pause Swap"}
        </button>
      </div>

      {/* VAULT BALANCES */}
      <div className="text-sm text-gray-300 space-y-1">
        <div className="flex justify-between"><span>🏦 Vault E‑Coin</span><span className="text-[#D4AF37] font-mono">{treasuryEcoinFormatted}</span></div>
        <div className="flex justify-between"><span>🏦 Vault E‑USD</span><span className="text-[#D4AF37] font-mono">{treasuryEusdFormatted}</span></div>
        <div className="flex justify-between">
          <span>🏦 Vault USDT</span>
          <span className="text-[#D4AF37] font-mono">
            {treasuryUsdtFormatted}
          </span>
        </div>
      </div>

      {/* VAULT CONTROLS */}
      <div className="space-y-3 border-t border-[#D4AF37]/20 pt-4">
        <h4 className="text-[#D4AF37] font-semibold">Vault Controls</h4>

        <select
          value={token}
          onChange={(e) => setToken(e.target.value as AdminToken)}
          className="bg-black border border-[#D4AF37]/30 px-2 py-1 rounded text-white"
        >
          <option value="ECOIN">ECOIN</option>
          <option value="EUSD">E-USD</option>
          <option value="USDT">USDT</option>
        </select>

        <div className="flex gap-2 items-center">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full bg-transparent border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-white"
          />

          <button
            onClick={setMax}
            className="px-3 py-2 rounded-lg bg-[#D4AF37] text-black font-semibold whitespace-nowrap"
          >
            MAX
          </button>
        </div>

        <div className="flex gap-3">
          <button onClick={depositTreasury} className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold">Deposit</button>
        </div>

        <input
          value={withdrawTo}
          onChange={(e) => setWithdrawTo(e.target.value)}
          placeholder="Withdraw to address"
          className="w-full bg-transparent border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-white"
        />

        <button
          onClick={withdrawTreasury}
          disabled={!isAdmin}
          className="px-4 py-2 rounded-lg bg-red-500 text-black font-semibold disabled:opacity-40"
        >
          {isAdmin ? "Withdraw" : "Not Vault Owner"}
        </button>
      </div>
    </div>
  );
}