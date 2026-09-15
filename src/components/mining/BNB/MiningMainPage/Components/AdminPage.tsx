"use client";

import { useState } from "react";

import {
  ShieldCheck,
  Database,
  Wallet,
  Activity,
  Settings,
  Coins,
  Fuel,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

import {
  useAccount,
  useReadContract,
  useWriteContract,
} from "wagmi";

import { parseUnits, formatUnits, isAddress } from "viem";

import { CONTRACTS } from "@/lib/contracts/contracts";

import { erc20Abi } from "viem";

import { miningStakingAdminAbi } from "@/lib/abis/miningStakingAdminAbi";
import { ecGasSaleAbi } from "@/lib/abis/ecGasSaleAbi";
import { usePublicClient } from "wagmi";



const treasuryAbi = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "token",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    outputs: [],
  },

  {
  name: "withdraw",
  type: "function",
  stateMutability: "nonpayable",
  inputs: [
    {
      name: "token",
      type: "address",
    },
    {
      name: "to",
      type: "address",
    },
    {
      name: "amount",
      type: "uint256",
    },
  ],
  outputs: [],
},

  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [
      {
        name: "token",
        type: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
      },
    ],
  },

  {
    name: "dailyWithdrawLimit",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint256",
      },
    ],
  },

  {
    name: "withdrawnToday",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint256",
      },
    ],
  },

  {
    name: "setDailyWithdrawLimit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "limit",
        type: "uint256",
      },
    ],
    outputs: [],
  },
] as const;

const Card = ({ title, icon: Icon, children }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
        <Icon size={20} />
      </div>

      <h2 className="text-white font-black text-lg">
        {title}
      </h2>
    </div>

    {children}
  </div>
);

export default function AdminPage() {

  const { address, isConnected } = useAccount();

  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [rate, setRate] = useState("");
  const [injector, setInjector] = useState("");

  const [token, setToken] = useState("USDT");

  const tokenAddress =
    token === "USDT"
      ? CONTRACTS.USDT
      : token === "EUSD"
      ? CONTRACTS.EUSD
      : CONTRACTS.ECOIN;

  /* ================= TREASURY ================= */

  const { data: treasuryUSDT } = useReadContract({
    address: CONTRACTS.TREASURY,
    abi: treasuryAbi,
    functionName: "balanceOf",
    args: [CONTRACTS.USDT],
  });

  const { data: treasuryEUSD } = useReadContract({
    address: CONTRACTS.TREASURY,
    abi: treasuryAbi,
    functionName: "balanceOf",
    args: [CONTRACTS.EUSD],
  });

  const { data: treasuryECOIN } = useReadContract({
    address: CONTRACTS.TREASURY,
    abi: treasuryAbi,
    functionName: "balanceOf",
    args: [CONTRACTS.ECOIN],
  });

  const { data: dailyWithdrawLimit } = useReadContract({
    address: CONTRACTS.TREASURY,
    abi: treasuryAbi,
    functionName: "dailyWithdrawLimit",
  });

  const { data: withdrawnToday } = useReadContract({
    address: CONTRACTS.TREASURY,
    abi: treasuryAbi,
    functionName: "withdrawnToday",
  });

  /* ================= MINING ================= */

  const { data: totalStaked } = useReadContract({
    address: CONTRACTS.MINING_STAKING,
    abi: miningStakingAdminAbi,
    functionName: "totalStaked",
  });

  const { data: rewardUSDT } = useReadContract({
    address: CONTRACTS.MINING_STAKING,
    abi: miningStakingAdminAbi,
    functionName: "rewardBufferUSDT",
  });

  const { data: rewardEUSD } = useReadContract({
    address: CONTRACTS.MINING_STAKING,
    abi: miningStakingAdminAbi,
    functionName: "rewardBufferEUSD",
  });

  /* ================= GAS ================= */

  const { data: gasRate } = useReadContract({
    address: CONTRACTS.ECGAS_SALE,
    abi: ecGasSaleAbi,
    functionName: "rate",
  });

  /* ================= ACTIONS ================= */

  async function approveToken() {

    if (!amount) return;

    await writeContractAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [
        CONTRACTS.TREASURY,
        parseUnits(amount, 18)
      ]
    });
  }

  async function depositTreasury() {

  try {

    if (!amount) return;

    const parsed = parseUnits(amount, 18);

    console.log("APPROVING...");

    const hash = await writeContractAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [
        CONTRACTS.TREASURY,
        parsed
      ]
    });

    console.log("WAITING...");

    await publicClient.waitForTransactionReceipt({
      hash
    });

    console.log("DEPOSITING...");

    await writeContractAsync({
      address: CONTRACTS.TREASURY,
      abi: treasuryAbi,
      functionName: "deposit",
      args: [
        tokenAddress,
        parsed
      ]
    });

    console.log("DONE");

  } catch (err) {

    console.error(err);

  }
}

  async function withdrawTreasury() {

    if (!isAddress(wallet)) {
      alert("Invalid wallet");
      return;
    }

    await writeContractAsync({
      address: CONTRACTS.TREASURY,
      abi: treasuryAbi,
      functionName: "withdraw",
      args: [
  tokenAddress,
  wallet,
  parseUnits(amount, 18)
]
    });
  }

  async function updateDailyLimit() {

    await writeContractAsync({
      address: CONTRACTS.TREASURY,
      abi: treasuryAbi,
      functionName: "setDailyWithdrawLimit",
      args: [parseUnits(dailyLimit, 18)]
    });
  }

  async function authorizeInjector(allowed: boolean) {

    await writeContractAsync({
      address: CONTRACTS.MINING_STAKING,
      abi: miningStakingAdminAbi,
      functionName: "setAuthorizedInjector",
      args: [injector, allowed]
    });
  }

  async function injectUSDTRewards() {

    await writeContractAsync({
      address: CONTRACTS.USDT,
      abi: erc20Abi,
      functionName: "approve",
      args: [
        CONTRACTS.MINING_STAKING,
        parseUnits(amount, 18)
      ]
    });

    await writeContractAsync({
      address: CONTRACTS.MINING_STAKING,
      abi: miningStakingAdminAbi,
      functionName: "injectUSDT",
      args: [parseUnits(amount, 18)]
    });
  }

  async function injectEUSDRewards() {

    await writeContractAsync({
      address: CONTRACTS.EUSD,
      abi: erc20Abi,
      functionName: "approve",
      args: [
        CONTRACTS.MINING_STAKING,
        parseUnits(amount, 18)
      ]
    });

    await writeContractAsync({
      address: CONTRACTS.MINING_STAKING,
      abi: miningStakingAdminAbi,
      functionName: "injectEUSD",
      args: [parseUnits(amount, 18)]
    });
  }

  async function updateGasRate() {

    await writeContractAsync({
      address: CONTRACTS.ECGAS_SALE,
      abi: ecGasSaleAbi,
      functionName: "setRate",
      args: [parseUnits(rate, 18)]
    });
  }

  async function setUSDTEnabled(enabled: boolean) {

  await writeContractAsync({
    address: CONTRACTS.ECGAS_SALE,
    abi: ecGasSaleAbi,
    functionName: "setUSDTEnabled",
    args: [enabled]
  });
}

async function setEUSDEnabled(enabled: boolean) {

  await writeContractAsync({
    address: CONTRACTS.ECGAS_SALE,
    abi: ecGasSaleAbi,
    functionName: "setEUSDEnabled",
    args: [enabled]
  });
}

  if (!isConnected) {

    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Connect Admin Wallet
      </main>
    );
  }

  return (
    <div className="w-full">

      <div className="w-full">

        <div className="mb-12">

          <h1 className="text-5xl font-black text-white mb-3">
             <span className="text-[#D4AF37]">e</span>Coin <span className="text-[#D4AF37]">Protocol Admin</span>
          </h1>

          <p className="text-white/50">
            Treasury • Mining • ecGas • Security • Rewards
          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="text-white/40 text-xs mb-2">
              Treasury USDT
            </div>

            <div className="text-3xl font-black text-green-400">
              {treasuryUSDT
                ? Number(formatUnits(treasuryUSDT as bigint, 18)).toFixed(2)
                : "0"}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="text-white/40 text-xs mb-2">
              Treasury EUSD
            </div>

            <div className="text-3xl font-black text-blue-400">
              {treasuryEUSD
                ? Number(formatUnits(treasuryEUSD as bigint, 18)).toFixed(2)
                : "0"}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="text-white/40 text-xs mb-2">
              Total Staked
            </div>

            <div className="text-3xl font-black text-[#D4AF37]">
              {totalStaked
                ? Number(formatUnits(totalStaked as bigint, 18)).toFixed(2)
                : "0"}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="text-white/40 text-xs mb-2">
              ecGas Rate
            </div>

            <div className="text-3xl font-black text-purple-400">
              {gasRate
                ? Number(formatUnits(gasRate as bigint, 18)).toFixed(2)
                : "0"}
            </div>
          </div>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* TREASURY */}

          <Card title="Treasury Vault" icon={Wallet}>

            <div className="space-y-4">

              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-4 text-white"
              >
                <option value="USDT">USDT</option>
                <option value="EUSD">EUSD</option>
                <option value="ECOIN">ECOIN</option>
              </select>

              <input
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-4 text-white"
              />

              <input
                placeholder="Wallet"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-4 text-white"
              />

              <div className="grid grid-cols-2 gap-4">

                <button
                  onClick={approveToken}
                  className="bg-blue-500 text-black font-black py-4 rounded-2xl"
                >
                  Approve
                </button>

                <button
                  onClick={depositTreasury}
                  className="bg-green-500 text-black font-black py-4 rounded-2xl"
                >
                  Deposit
                </button>

              </div>

              <button
                onClick={withdrawTreasury}
                className="w-full bg-red-500 text-black font-black py-4 rounded-2xl"
              >
                Withdraw
              </button>

            </div>

          </Card>

          {/* DAILY LIMIT */}

          <Card title="Security Controls" icon={ShieldCheck}>

            <div className="space-y-4">

              <div className="bg-black/40 rounded-2xl p-4">

                <div className="flex justify-between mb-2 text-sm text-white/50">
                  <span>Daily Limit</span>

                  <span>
                    {dailyWithdrawLimit
                      ? formatUnits(dailyWithdrawLimit as bigint, 18)
                      : "0"}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-white/50">
                  <span>Withdrawn Today</span>

                  <span>
                    {withdrawnToday
                      ? formatUnits(withdrawnToday as bigint, 18)
                      : "0"}
                  </span>
                </div>

              </div>

              <input
                placeholder="New Daily Limit"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-4 text-white"
              />

              <button
                onClick={updateDailyLimit}
                className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-2xl"
              >
                Update Daily Limit
              </button>

            </div>

          </Card>

          {/* REWARD CONTROL */}

          <Card title="Mining Rewards" icon={Coins}>

            <div className="space-y-4">

              <div className="bg-black/40 rounded-2xl p-4 space-y-2">

                <div className="flex justify-between">
                  <span className="text-white/50">
                    Reward Buffer USDT
                  </span>

                  <span className="text-green-400">
                    {rewardUSDT
                      ? formatUnits(rewardUSDT as bigint, 18)
                      : "0"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">
                    Reward Buffer EUSD
                  </span>

                  <span className="text-blue-400">
                    {rewardEUSD
                      ? formatUnits(rewardEUSD as bigint, 18)
                      : "0"}
                  </span>
                </div>

              </div>

              <input
                placeholder="Reward Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-4 text-white"
              />

              <div className="grid grid-cols-2 gap-4">

                <button
                  onClick={injectUSDTRewards}
                  className="bg-green-500 text-black font-black py-4 rounded-2xl"
                >
                  Inject USDT
                </button>

                <button
                  onClick={injectEUSDRewards}
                  className="bg-blue-500 text-black font-black py-4 rounded-2xl"
                >
                  Inject EUSD
                </button>

              </div>

            </div>

          </Card>

          {/* GAS ENGINE */}

          <Card title="ecGas Engine" icon={Fuel}>

            <div className="space-y-4">

              <input
                placeholder="New ecGas Rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-4 text-white"
              />

              <button
                onClick={updateGasRate}
                className="w-full bg-purple-500 text-black font-black py-4 rounded-2xl"
              >
                Update Rate
              </button>

            </div>

          </Card>

          <Card title="Deposit Token Controls" icon={AlertTriangle}>

  <div className="space-y-4">

    <div className="grid grid-cols-2 gap-4">

      <button
        onClick={() => setUSDTEnabled(true)}
        className="bg-green-500 text-black font-black py-4 rounded-2xl"
      >
        Activate USDT
      </button>

      <button
        onClick={() => setUSDTEnabled(false)}
        className="bg-red-500 text-black font-black py-4 rounded-2xl"
      >
        Pause USDT
      </button>

    </div>

    <div className="grid grid-cols-2 gap-4">

      <button
        onClick={() => setEUSDEnabled(true)}
        className="bg-blue-500 text-black font-black py-4 rounded-2xl"
      >
        Activate EUSD
      </button>

      <button
        onClick={() => setEUSDEnabled(false)}
        className="bg-orange-500 text-black font-black py-4 rounded-2xl"
      >
        Pause EUSD
      </button>

    </div>

  </div>

</Card>

          {/* INJECTOR CONTROL */}

          <Card title="Authorized Injectors" icon={Settings}>

            <div className="space-y-4">

              <input
                placeholder="Injector Address"
                value={injector}
                onChange={(e) => setInjector(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-4 text-white"
              />

              <div className="grid grid-cols-2 gap-4">

                <button
                  onClick={() => authorizeInjector(true)}
                  className="bg-green-500 text-black font-black py-4 rounded-2xl"
                >
                  Authorize
                </button>

                <button
                  onClick={() => authorizeInjector(false)}
                  className="bg-red-500 text-black font-black py-4 rounded-2xl"
                >
                  Remove
                </button>

              </div>

            </div>

          </Card>

          {/* SYSTEM STATUS */}

          <Card title="Protocol Status" icon={Activity}>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between">
                <span className="text-white/50">
                  Wallet
                </span>

                <span className="text-green-400">
                  CONNECTED
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">
                  Treasury
                </span>

                <span className="text-green-400">
                  ACTIVE
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">
                  Mining
                </span>

                <span className="text-green-400">
                  ACTIVE
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">
                  Security
                </span>

                <span className="text-[#D4AF37]">
                  PROTECTED
                </span>
              </div>

            </div>

          </Card>

        </div>

      </div>

        </div>
  );
}