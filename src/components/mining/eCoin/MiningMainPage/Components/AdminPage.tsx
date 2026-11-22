"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Wallet,
  Activity,
  Settings,
  Coins,
  Fuel,
  AlertTriangle,
  Link2,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  usePublicClient,
} from "wagmi";
import { parseUnits, formatUnits, isAddress, erc20Abi } from "viem";
import { CONTRACTS } from "@/lib/contracts/contracts";

/* ================= ABIs ALINHADAS AOS CONTRATOS ================= */

const miningStakingECoinAdminAbi = [
  {
    name: "ecoin",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "claimCollector",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "totalStaked",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "totalEligibleStaked",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "rewardBufferECoin",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "totalStakers",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "streamRate",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "authorizedInjectors",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ type: "bool" }],
  },
  {
    name: "injectInstantECoin",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },
  {
    name: "addECoinBuffer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },
  {
    name: "pingStream",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    name: "setAuthorizedInjector",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "injector", type: "address" },
      { name: "allowed", type: "bool" },
    ],
    outputs: [],
  },
  {
    name: "setClaimCollector",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_collector", type: "address" }],
    outputs: [],
  },
  {
    name: "withdrawExcess",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "to", type: "address" }],
    outputs: [],
  },
] as const;

const ecGasSaleECoinAdminAbi = [
  {
    name: "ecoinEnabled",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "bool" }],
  },
  {
    name: "collector",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "mining",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "activityRegistry",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "setECoinEnabled",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "enabled", type: "bool" }],
    outputs: [],
  },
  {
    name: "setCollector",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_collector", type: "address" }],
    outputs: [],
  },
  {
    name: "setMining",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_mining", type: "address" }],
    outputs: [],
  },
  {
    name: "setActivityRegistry",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_activityRegistry", type: "address" }],
    outputs: [],
  },
] as const;

const treasuryAbi = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "token", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "dailyWithdrawLimit",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "withdrawnToday",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "setDailyWithdrawLimit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "limit", type: "uint256" }],
    outputs: [],
  },
] as const;

type CardProps = {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
};

const Card = ({ title, icon: Icon, children }: CardProps) => (
  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
        <Icon size={20} />
      </div>
      <h2 className="text-white font-black text-lg">{title}</h2>
    </div>
    {children}
  </div>
);

export default function AdminPage() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const stakingAddress = CONTRACTS.eCoin_Mining_Staking_eCoin;
  const gasSaleAddress = CONTRACTS.ecGas_Sale_eCoin;
  const contractsRecord = CONTRACTS as Record<string, `0x${string}` | undefined>;
  const treasuryAddress = contractsRecord.TREASURY;

  // Estados independentes por painel
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [treasuryAmount, setTreasuryAmount] = useState("");
  const [treasuryWallet, setTreasuryWallet] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");

  const [rewardAmount, setRewardAmount] = useState("");
  const [injectorAddress, setInjectorAddress] = useState("");
  const [claimCollectorInput, setClaimCollectorInput] = useState("");
  const [excessRecipient, setExcessRecipient] = useState("");

  const [gasCollectorInput, setGasCollectorInput] = useState("");
  const [gasMiningInput, setGasMiningInput] = useState("");
  const [activityRegistryInput, setActivityRegistryInput] = useState("");

  /* ================= LEITURAS MINING (ECoinMiningStakingECoin) ================= */

  const { data: onChainECoin } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "ecoin",
  });

  const ecoinTokenAddress = (onChainECoin ??
    contractsRecord.ECOIN ??
    contractsRecord.eCoin) as `0x${string}` | undefined;

  const { data: totalStaked, refetch: refetchTotalStaked } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "totalStaked",
  });

  const { data: totalEligibleStaked, refetch: refetchEligible } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "totalEligibleStaked",
  });

  const { data: rewardBufferECoin, refetch: refetchBuffer } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "rewardBufferECoin",
  });

  const { data: totalStakers } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "totalStakers",
  });

  const { data: currentClaimCollector, refetch: refetchClaimCollector } =
    useReadContract({
      address: stakingAddress,
      abi: miningStakingECoinAdminAbi,
      functionName: "claimCollector",
    });

  const { data: stakingContractECoinBalance, refetch: refetchStakingBalance } =
    useReadContract({
      address: ecoinTokenAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [stakingAddress],
      query: { enabled: Boolean(ecoinTokenAddress) },
    });

  const { data: isCurrentAddressInjector } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "authorizedInjectors",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  /* ================= LEITURAS ECGAS (EcGasSaleECoin) ================= */

  const { data: ecoinSaleEnabled, refetch: refetchSaleEnabled } = useReadContract({
    address: gasSaleAddress,
    abi: ecGasSaleECoinAdminAbi,
    functionName: "ecoinEnabled",
  });

  const { data: currentGasCollector, refetch: refetchGasCollector } =
    useReadContract({
      address: gasSaleAddress,
      abi: ecGasSaleECoinAdminAbi,
      functionName: "collector",
    });

  const { data: currentGasMining, refetch: refetchGasMining } = useReadContract({
    address: gasSaleAddress,
    abi: ecGasSaleECoinAdminAbi,
    functionName: "mining",
  });

  const { data: currentActivityRegistry, refetch: refetchActivityRegistry } =
    useReadContract({
      address: gasSaleAddress,
      abi: ecGasSaleECoinAdminAbi,
      functionName: "activityRegistry",
    });

  /* ================= LEITURAS TREASURY (eCoin) ================= */

  const { data: treasuryECOIN, refetch: refetchTreasuryBalance } = useReadContract({
    address: treasuryAddress,
    abi: treasuryAbi,
    functionName: "balanceOf",
    args: ecoinTokenAddress ? [ecoinTokenAddress] : undefined,
    query: { enabled: Boolean(treasuryAddress && ecoinTokenAddress) },
  });

  const { data: dailyWithdrawLimit, refetch: refetchDailyLimit } = useReadContract({
    address: treasuryAddress,
    abi: treasuryAbi,
    functionName: "dailyWithdrawLimit",
    query: { enabled: Boolean(treasuryAddress) },
  });

  const { data: withdrawnToday, refetch: refetchWithdrawnToday } = useReadContract({
    address: treasuryAddress,
    abi: treasuryAbi,
    functionName: "withdrawnToday",
    query: { enabled: Boolean(treasuryAddress) },
  });

  /* ================= HELPER DE EXECUÇÃO ON-CHAIN ================= */

  async function executeTx(actionKey: string, fn: () => Promise<`0x${string}`>) {
    try {
      setBusyAction(actionKey);
      const hash = await fn();
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }
      await Promise.all([
        refetchTotalStaked(),
        refetchEligible(),
        refetchBuffer(),
        refetchClaimCollector(),
        refetchStakingBalance(),
        refetchSaleEnabled(),
        refetchGasCollector(),
        refetchGasMining(),
        refetchActivityRegistry(),
        refetchTreasuryBalance(),
        refetchDailyLimit(),
        refetchWithdrawnToday(),
      ]);
    } catch (err) {
      console.error(`Erro na ação [${actionKey}]:`, err);
    } finally {
      setBusyAction(null);
    }
  }

  /* ================= AÇÕES: MINING REWARDS & BUFFER ================= */

  async function handleFundStakingContract() {
    if (!ecoinTokenAddress || !rewardAmount || Number(rewardAmount) <= 0) {
      alert("Insira uma quantidade válida em eCoin.");
      return;
    }
    const parsed = parseUnits(rewardAmount, 18);
    await executeTx("fundStaking", () =>
      writeContractAsync({
        address: ecoinTokenAddress,
        abi: erc20Abi,
        functionName: "transfer",
        args: [stakingAddress, parsed],
      })
    );
  }

  async function handleInjectInstantECoin() {
    if (!rewardAmount || Number(rewardAmount) <= 0) {
      alert("Insira uma quantidade válida em eCoin.");
      return;
    }
    const parsed = parseUnits(rewardAmount, 18);
    await executeTx("injectInstant", () =>
      writeContractAsync({
        address: stakingAddress,
        abi: miningStakingECoinAdminAbi,
        functionName: "injectInstantECoin",
        args: [parsed],
      })
    );
  }

  async function handleAddECoinBuffer() {
    if (!rewardAmount || Number(rewardAmount) <= 0) {
      alert("Insira uma quantidade válida em eCoin.");
      return;
    }
    const parsed = parseUnits(rewardAmount, 18);
    await executeTx("addBuffer", () =>
      writeContractAsync({
        address: stakingAddress,
        abi: miningStakingECoinAdminAbi,
        functionName: "addECoinBuffer",
        args: [parsed],
      })
    );
  }

  async function handlePingStream() {
    await executeTx("pingStream", () =>
      writeContractAsync({
        address: stakingAddress,
        abi: miningStakingECoinAdminAbi,
        functionName: "pingStream",
      })
    );
  }

  /* ================= AÇÕES: MINING SECURITY & COLLECTOR ================= */

  async function handleAuthorizeInjector(allowed: boolean) {
    if (!isAddress(injectorAddress)) {
      alert("Endereço de injector inválido.");
      return;
    }
    await executeTx("authorizeInjector", () =>
      writeContractAsync({
        address: stakingAddress,
        abi: miningStakingECoinAdminAbi,
        functionName: "setAuthorizedInjector",
        args: [injectorAddress, allowed],
      })
    );
  }

  async function handleUpdateClaimCollector() {
    if (!isAddress(claimCollectorInput)) {
      alert("Endereço do ClaimCollector inválido.");
      return;
    }
    await executeTx("setClaimCollector", () =>
      writeContractAsync({
        address: stakingAddress,
        abi: miningStakingECoinAdminAbi,
        functionName: "setClaimCollector",
        args: [claimCollectorInput],
      })
    );
  }

  async function handleWithdrawExcess() {
    if (!isAddress(excessRecipient)) {
      alert("Endereço de destino inválido.");
      return;
    }
    await executeTx("withdrawExcess", () =>
      writeContractAsync({
        address: stakingAddress,
        abi: miningStakingECoinAdminAbi,
        functionName: "withdrawExcess",
        args: [excessRecipient],
      })
    );
  }

  /* ================= AÇÕES: ECGAS SALE (EcGasSaleECoin) ================= */

  async function handleSetECoinEnabled(enabled: boolean) {
    await executeTx("setECoinEnabled", () =>
      writeContractAsync({
        address: gasSaleAddress,
        abi: ecGasSaleECoinAdminAbi,
        functionName: "setECoinEnabled",
        args: [enabled],
      })
    );
  }

  async function handleSetGasCollector() {
    if (!isAddress(gasCollectorInput)) {
      alert("Endereço de Collector inválido.");
      return;
    }
    await executeTx("setGasCollector", () =>
      writeContractAsync({
        address: gasSaleAddress,
        abi: ecGasSaleECoinAdminAbi,
        functionName: "setCollector",
        args: [gasCollectorInput],
      })
    );
  }

  async function handleSetGasMining() {
    if (!isAddress(gasMiningInput)) {
      alert("Endereço do contrato de Mining inválido.");
      return;
    }
    await executeTx("setGasMining", () =>
      writeContractAsync({
        address: gasSaleAddress,
        abi: ecGasSaleECoinAdminAbi,
        functionName: "setMining",
        args: [gasMiningInput],
      })
    );
  }

  async function handleSetActivityRegistry() {
    if (!isAddress(activityRegistryInput)) {
      alert("Endereço do ActivityRegistry inválido.");
      return;
    }
    await executeTx("setActivityRegistry", () =>
      writeContractAsync({
        address: gasSaleAddress,
        abi: ecGasSaleECoinAdminAbi,
        functionName: "setActivityRegistry",
        args: [activityRegistryInput],
      })
    );
  }

  /* ================= AÇÕES: TREASURY VAULT (eCoin) ================= */

  async function handleDepositTreasury() {
    if (!treasuryAddress || !ecoinTokenAddress) {
      alert("Endereço do Treasury ou eCoin não configurado.");
      return;
    }
    if (!treasuryAmount || Number(treasuryAmount) <= 0) {
      alert("Insira um valor válido em eCoin.");
      return;
    }
    const parsed = parseUnits(treasuryAmount, 18);

    await executeTx("depositTreasury", async () => {
      const approveHash = await writeContractAsync({
        address: ecoinTokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [treasuryAddress, parsed],
      });
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash: approveHash });
      }
      return writeContractAsync({
        address: treasuryAddress,
        abi: treasuryAbi,
        functionName: "deposit",
        args: [ecoinTokenAddress, parsed],
      });
    });
  }

  async function handleWithdrawTreasury() {
    if (!treasuryAddress || !ecoinTokenAddress) return;
    if (!isAddress(treasuryWallet)) {
      alert("Carteira de destino inválida.");
      return;
    }
    if (!treasuryAmount || Number(treasuryAmount) <= 0) {
      alert("Insira um valor válido em eCoin.");
      return;
    }
    const parsed = parseUnits(treasuryAmount, 18);

    await executeTx("withdrawTreasury", () =>
      writeContractAsync({
        address: treasuryAddress,
        abi: treasuryAbi,
        functionName: "withdraw",
        args: [ecoinTokenAddress, treasuryWallet, parsed],
      })
    );
  }

  async function handleUpdateDailyLimit() {
    if (!treasuryAddress || !dailyLimit || Number(dailyLimit) < 0) return;
    await executeTx("updateDailyLimit", () =>
      writeContractAsync({
        address: treasuryAddress,
        abi: treasuryAbi,
        functionName: "setDailyWithdrawLimit",
        args: [parseUnits(dailyLimit, 18)],
      })
    );
  }

  if (!isConnected) {
    return (
      <main className="min-h-[320px] bg-black/60 rounded-3xl flex items-center justify-center text-white font-mono text-sm">
        Conecte a carteira Admin para gerenciar o protocolo eCoin
      </main>
    );
  }

  const stakedNum = totalStaked
    ? Number(formatUnits(totalStaked as bigint, 18))
    : 0;
  const eligibleNum = totalEligibleStaked
    ? Number(formatUnits(totalEligibleStaked as bigint, 18))
    : 0;
  const bufferNum = rewardBufferECoin
    ? Number(formatUnits(rewardBufferECoin as bigint, 18))
    : 0;
  const contractBalNum = stakingContractECoinBalance
    ? Number(formatUnits(stakingContractECoinBalance, 18))
    : 0;
  const excessNum = Math.max(0, contractBalNum - stakedNum);

  return (
    <div className="w-full space-y-8">
      {/* CABEÇALHO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
            <span className="text-[#D4AF37]">e</span>Coin{" "}
            <span className="text-[#D4AF37]">Protocol Admin</span>
          </h1>
          <p className="text-white/50 text-xs md:text-sm font-mono">
            ECoinMiningStakingECoin • EcGasSaleECoin (1.3x) • Treasury Vault
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span
            className={`px-3 py-1.5 rounded-full border ${
              ecoinSaleEnabled
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            ecGas Sale: {ecoinSaleEnabled ? "ATIVO" : "PAUSADO"}
          </span>

          <span
            className={`px-3 py-1.5 rounded-full border ${
              isCurrentAddressInjector
                ? "bg-[#D4AF37]/15 border-[#D4AF37]/30 text-[#D4AF37]"
                : "bg-white/5 border-white/10 text-white/50"
            }`}
          >
            Injector:{" "}
            {isCurrentAddressInjector ? "AUTORIZADO" : "NÃO AUTORIZADO"}
          </span>
        </div>
      </div>

      {/* MÉTRICAS GLOBAIS ON-CHAIN (100% eCoin) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="text-white/40 text-xs font-mono uppercase mb-2">
            Total Staked (eCoin)
          </div>
          <div className="text-3xl font-black text-[#D4AF37] font-mono">
            {stakedNum.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-white/40 mt-1 font-mono">
            Stakers ativos: {totalStakers ? Number(totalStakers) : 0}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="text-white/40 text-xs font-mono uppercase mb-2">
            Stake Elegível (Com Gás)
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {eligibleNum.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-white/40 mt-1 font-mono">
            Multiplicador Gás: 1.3x (130%)
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="text-white/40 text-xs font-mono uppercase mb-2">
            Reward Buffer (eCoin)
          </div>
          <div className="text-3xl font-black text-blue-400 font-mono">
            {bufferNum.toLocaleString("en-US", { maximumFractionDigits: 4 })}
          </div>
          <div className="text-[11px] text-white/40 mt-1 font-mono">
            Stream: {(bufferNum / 24).toFixed(4)} eCoin / hora
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="text-white/40 text-xs font-mono uppercase mb-2">
            Excedente Disponível (eCoin)
          </div>
          <div className="text-3xl font-black text-purple-400 font-mono">
            {excessNum.toLocaleString("en-US", { maximumFractionDigits: 4 })}
          </div>
          <div className="text-[11px] text-white/40 mt-1 font-mono">
            Saldo Contrato: {contractBalNum.toFixed(2)} eCoin
          </div>
        </div>
      </div>

      {/* PAINÉIS DE ADMINISTRAÇÃO */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* 1. MINING REWARDS & BUFFER (ECoinMiningStakingECoin) */}
        <Card title="Mining Rewards & Stream (eCoin)" icon={Coins}>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-2xl p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-white/50">Buffer Atual (1/24h):</span>
                <span className="text-blue-400 font-bold">
                  {bufferNum.toFixed(6)} eCoin
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Saldo Total no Contrato:</span>
                <span className="text-emerald-400 font-bold">
                  {contractBalNum.toFixed(6)} eCoin
                </span>
              </div>
            </div>

            <input
              placeholder="Quantidade em eCoin (ex: 1000)"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl px-4 py-4 text-white font-mono text-sm"
            />

            <button
              disabled={busyAction !== null}
              onClick={handleFundStakingContract}
              className="w-full bg-white/10 hover:bg-white/15 text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <ArrowUpRight size={16} className="text-[#D4AF37]" />
              1. Enviar Liquidez eCoin ao Contrato Staking
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={busyAction !== null}
                onClick={handleInjectInstantECoin}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-2xl text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40"
              >
                Inject Instant eCoin
              </button>

              <button
                disabled={busyAction !== null}
                onClick={handleAddECoinBuffer}
                className="bg-blue-500 hover:bg-blue-400 text-black font-black py-4 rounded-2xl text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40"
              >
                Add eCoin Buffer
              </button>
            </div>

            <button
              disabled={busyAction !== null}
              onClick={handlePingStream}
              className="w-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 text-[#D4AF37] font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <RefreshCw size={15} />
              Executar pingStream() (Liberar Ciclo 1h)
            </button>
          </div>
        </Card>

        {/* 2. ECGAS ENGINE (EcGasSaleECoin) */}
        <Card title="ecGas Sale Engine (EcGasSaleECoin)" icon={Fuel}>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-2xl p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-white/50">Status Venda eCoin:</span>
                <span
                  className={
                    ecoinSaleEnabled
                      ? "text-emerald-400 font-bold"
                      : "text-red-400 font-bold"
                  }
                >
                  {ecoinSaleEnabled ? "ATIVADA (1.3x)" : "PAUSADA"}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/50 shrink-0">Collector:</span>
                <span className="text-white/80 truncate">
                  {currentGasCollector ? String(currentGasCollector) : "—"}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/50 shrink-0">Mining Staking:</span>
                <span className="text-white/80 truncate">
                  {currentGasMining ? String(currentGasMining) : "—"}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/50 shrink-0">Activity Registry:</span>
                <span className="text-white/80 truncate">
                  {currentActivityRegistry
                    ? String(currentActivityRegistry)
                    : "—"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={busyAction !== null}
                onClick={() => handleSetECoinEnabled(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
              >
                Ativar Venda eCoin
              </button>

              <button
                disabled={busyAction !== null}
                onClick={() => handleSetECoinEnabled(false)}
                className="bg-red-500 hover:bg-red-400 text-black font-black py-3.5 rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
              >
                Pausar Venda eCoin
              </button>
            </div>

            <div className="flex gap-2">
              <input
                placeholder="Novo Collector (0x...)"
                value={gasCollectorInput}
                onChange={(e) => setGasCollectorInput(e.target.value)}
                className="flex-1 bg-black border border-white/10 rounded-2xl px-4 py-3 text-white font-mono text-xs"
              />
              <button
                disabled={busyAction !== null}
                onClick={handleSetGasCollector}
                className="px-4 bg-purple-500 hover:bg-purple-400 text-black font-black rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
              >
                Set Collector
              </button>
            </div>

            <div className="flex gap-2">
              <input
                placeholder="Novo Mining Contract (0x...)"
                value={gasMiningInput}
                onChange={(e) => setGasMiningInput(e.target.value)}
                className="flex-1 bg-black border border-white/10 rounded-2xl px-4 py-3 text-white font-mono text-xs"
              />
              <button
                disabled={busyAction !== null}
                onClick={handleSetGasMining}
                className="px-4 bg-purple-500 hover:bg-purple-400 text-black font-black rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
              >
                Set Mining
              </button>
            </div>

            <div className="flex gap-2">
              <input
                placeholder="Novo ActivityRegistry (0x...)"
                value={activityRegistryInput}
                onChange={(e) => setActivityRegistryInput(e.target.value)}
                className="flex-1 bg-black border border-white/10 rounded-2xl px-4 py-3 text-white font-mono text-xs"
              />
              <button
                disabled={busyAction !== null}
                onClick={handleSetActivityRegistry}
                className="px-4 bg-purple-500 hover:bg-purple-400 text-black font-black rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
              >
                Set Registry
              </button>
            </div>
          </div>
        </Card>

        {/* 3. AUTHORIZED INJECTORS & CLAIM COLLECTOR */}
        <Card title="Injectors & Claim Collector" icon={Settings}>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-2xl p-4 text-xs font-mono flex justify-between gap-2">
              <span className="text-white/50 shrink-0">
                ClaimCollector Atual:
              </span>
              <span className="text-[#D4AF37] truncate">
                {currentClaimCollector ? String(currentClaimCollector) : "—"}
              </span>
            </div>

            <input
              placeholder="Endereço do Injector (ex: EcGasSaleECoin 0x...)"
              value={injectorAddress}
              onChange={(e) => setInjectorAddress(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-white font-mono text-xs"
            />

            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={busyAction !== null}
                onClick={() => handleAuthorizeInjector(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
              >
                Authorize Injector
              </button>

              <button
                disabled={busyAction !== null}
                onClick={() => handleAuthorizeInjector(false)}
                className="bg-red-500 hover:bg-red-400 text-black font-black py-3.5 rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
              >
                Remove Injector
              </button>
            </div>

            <div className="pt-2 border-t border-white/10 flex gap-2">
              <input
                placeholder="Novo ClaimCollectorECoin (0x...)"
                value={claimCollectorInput}
                onChange={(e) => setClaimCollectorInput(e.target.value)}
                className="flex-1 bg-black border border-white/10 rounded-2xl px-4 py-3 text-white font-mono text-xs"
              />
              <button
                disabled={busyAction !== null}
                onClick={handleUpdateClaimCollector}
                className="px-4 bg-[#D4AF37] hover:bg-amber-400 text-black font-black rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
              >
                Atualizar
              </button>
            </div>
          </div>
        </Card>

        {/* 4. EXCESS LIQUIDITY RECOVERY */}
        <Card title="Recuperação de Excedente (Staking)" icon={AlertTriangle}>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-2xl p-4 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-white/50">Saldo Total Contrato:</span>
                <span className="text-white">{contractBalNum.toFixed(4)} eCoin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Reservado (totalStaked):</span>
                <span className="text-amber-400">{stakedNum.toFixed(4)} eCoin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Excedente Sacável:</span>
                <span className="text-emerald-400 font-bold">
                  {excessNum.toFixed(4)} eCoin
                </span>
              </div>
            </div>

            <input
              placeholder="Carteira de destino para withdrawExcess (0x...)"
              value={excessRecipient}
              onChange={(e) => setExcessRecipient(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-white font-mono text-xs"
            />

            <button
              disabled={busyAction !== null || excessNum <= 0}
              onClick={handleWithdrawExcess}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-2xl text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40"
            >
              Sacar Excedente (withdrawExcess)
            </button>
          </div>
        </Card>

        {/* 5. TREASURY VAULT (EXCLUSIVO eCoin) */}
        {treasuryAddress && (
          <Card title="Treasury Vault (eCoin)" icon={Wallet}>
            <div className="space-y-4">
              <div className="bg-black/40 rounded-2xl p-4 text-xs font-mono flex justify-between">
                <span className="text-white/50">Saldo Treasury eCoin:</span>
                <span className="text-emerald-400 font-bold">
                  {treasuryECOIN
                    ? Number(formatUnits(treasuryECOIN as bigint, 18)).toFixed(4)
                    : "0.0000"}{" "}
                  eCoin
                </span>
              </div>

              <input
                placeholder="Quantidade em eCoin"
                value={treasuryAmount}
                onChange={(e) => setTreasuryAmount(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-white font-mono text-xs"
              />

              <input
                placeholder="Carteira destino para saque (0x...)"
                value={treasuryWallet}
                onChange={(e) => setTreasuryWallet(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-white font-mono text-xs"
              />

              <div className="grid grid-cols-2 gap-4">
                <button
                  disabled={busyAction !== null}
                  onClick={handleDepositTreasury}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
                >
                  Approve & Deposit
                </button>

                <button
                  disabled={busyAction !== null}
                  onClick={handleWithdrawTreasury}
                  className="bg-red-500 hover:bg-red-400 text-black font-black py-3.5 rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
                >
                  Withdraw eCoin
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* 6. SECURITY CONTROLS & PROTOCOL STATUS */}
        <Card title="Segurança & Status do Protocolo" icon={ShieldCheck}>
          <div className="space-y-4">
            {treasuryAddress && (
              <>
                <div className="bg-black/40 rounded-2xl p-4 text-xs font-mono space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/50">Limite Diário Treasury:</span>
                    <span className="text-white">
                      {dailyWithdrawLimit
                        ? formatUnits(dailyWithdrawLimit as bigint, 18)
                        : "0"}{" "}
                      eCoin
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Sacado Hoje:</span>
                    <span className="text-amber-400">
                      {withdrawnToday
                        ? formatUnits(withdrawnToday as bigint, 18)
                        : "0"}{" "}
                      eCoin
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    placeholder="Novo Limite Diário (eCoin)"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(e.target.value)}
                    className="flex-1 bg-black border border-white/10 rounded-2xl px-4 py-3 text-white font-mono text-xs"
                  />
                  <button
                    disabled={busyAction !== null}
                    onClick={handleUpdateDailyLimit}
                    className="px-4 bg-[#D4AF37] hover:bg-amber-400 text-black font-black rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
                  >
                    Atualizar
                  </button>
                </div>
              </>
            )}

            <div className="bg-black/40 rounded-2xl p-4 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-white/50">Token Oficial:</span>
                <span className="text-[#D4AF37] truncate max-w-[200px]">
                  {ecoinTokenAddress ?? "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Staking Contract:</span>
                <span className="text-emerald-400 truncate max-w-[200px]">
                  {stakingAddress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">ecGas Sale Contract:</span>
                <span className="text-emerald-400 truncate max-w-[200px]">
                  {gasSaleAddress}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-white/5">
                <span className="text-white/50 flex items-center gap-1.5">
                  <Activity size={13} className="text-emerald-400" />
                  Estado Operacional:
                </span>
                <span className="text-emerald-400 font-bold">
                  {busyAction ? `PROCESSANDO (${busyAction})...` : "SINCRONIZADO"}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}