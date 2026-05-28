"use client";

import { useEffect, useState } from "react";

import {
  Wallet,
  Users,
  Gift,
  ShieldCheck,
} from "lucide-react";

import { useReferral } from "@/hooks/useReferral";
import { useDexWallet } from "@/contexts/DexWalletContext";
import { CONTRACTS } from "@/lib/contracts/contracts";

type Rewards = {
  usdt: bigint;
  eusd: bigint;
  ecoin: bigint;
};

export default function ReferralDashboard() {

  const USDT =
  CONTRACTS.USDT as `0x${string}`;

const EUSD =
  CONTRACTS.EDOLLAR as `0x${string}`;

  const ECOIN =
  CONTRACTS.ECOIN as `0x${string}`;

  const { address, isConnected } = useDexWallet();

  const {
    getInviter,
    getPendingRewards,
    claimRewards,
  } = useReferral();

  const [inviter, setInviter] =
    useState<string | null>(null);

  const [pending, setPending] =
  useState<Rewards>({
    usdt: 0n,
    eusd: 0n,
    ecoin: 0n,
  });

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (!isConnected) return;

    async function load() {

      const inviterData =
        await getInviter();

      setInviter(inviterData);

      const usdtRewards =
  await getPendingRewards(USDT);

const eusdRewards =
  await getPendingRewards(EUSD);

  const ecoinRewards =
  await getPendingRewards(ECOIN);

setPending({
  usdt: usdtRewards,
  eusd: eusdRewards,
  ecoin: ecoinRewards,
});


    }

    load();

  }, [isConnected]);

  if (!isConnected) {

    return (
      <p className="text-sm text-gray-400">
        Connect wallet to access referral rewards.
      </p>
    );
  }

  const pendingUSDT =
    Number(pending.usdt) / 1e18;

  const pendingEUSD =
    Number(pending.eusd) / 1e18;

  const pendingECOIN =
  Number(pending.ecoin) / 1e18;

  const total =
  pendingUSDT +
  pendingEUSD +
  pendingECOIN;

  return (

    <div className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-[#D4AF37]/20
      bg-black/40
      backdrop-blur-xl
      p-6
      space-y-6
    ">

      {/* FX */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="
              w-14
              h-14
              rounded-2xl
              bg-[#D4AF37]/10
              flex
              items-center
              justify-center
            ">
              <Users
                size={24}
                className="text-[#D4AF37]"
              />
            </div>

            <div>

              <h3 className="text-lg font-bold text-white tracking-wide">
  Referral Vault
</h3>

<p className="text-[10px] text-white/40">
  Neural affiliate engine
</p>

            </div>

          </div>

          <ShieldCheck
            className="text-green-400"
          />

        </div>

        {/* WALLET */}
        <div className="
          rounded-2xl
          border
          border-white/10
          bg-black/20
          p-4
        ">

          <div className="flex items-center gap-2 mb-2">

            <Wallet
              size={16}
              className="text-[#D4AF37]"
            />

            <span className="
              text-xs
              uppercase
              text-white/40
            ">
              Wallet
            </span>

          </div>

         <p
  translate="no"
  title={address}
  className="
    notranslate
    text-[11px]
    text-white/70
    truncate
  "
>
  {address}
</p>

        </div>

        {/* UPLINE */}
        <div className="
          rounded-2xl
          border
          border-blue-500/10
          bg-blue-500/5
          p-4
        ">

          <p className="
            text-xs
            uppercase
            text-white/40
            mb-2
          ">
            Upline
          </p>

          <p
  translate="no"
  className="
    notranslate
    text-xs
    text-blue-300
    break-all
  "
>

            {
              inviter &&
              inviter !==
              "0x0000000000000000000000000000000000000000"
                ? inviter
                : "No upline linked"
            }

          </p>

        </div>

        {/* REWARDS */}
        <div className="grid grid-cols-2 gap-4">

          {/* USDT */}
          <div className="
            rounded-2xl
            border
            border-green-500/10
            bg-green-500/5
            p-5
          ">

            <p
  translate="no"
  className="
    notranslate
    text-xs
    uppercase
    text-white/40
    mb-2
  "
>
  Pending USDT
</p>

            <h2
  translate="no"
  className="
    notranslate
    text-xs
    font-black
    text-green-400
  "
>
  {pendingUSDT.toFixed(6)}
</h2>

          </div>

          {/* EUSD */}
          <div className="
            rounded-2xl
            border
            border-blue-500/10
            bg-blue-500/5
            p-3
          ">

            <p
  translate="no"
  className="
    notranslate
    text-xs
    uppercase
    text-white/40
    mb-2
  "
>
  Pending eDollar
</p>

            <h2
  translate="no"
  className="
    notranslate
    text-xs
    font-black
    text-blue-400
  "
>
  {pendingEUSD.toFixed(6)}
</h2>

          </div>

        </div>

        {/* eCOIN */}
<div className="flex flex-col items-center justify-center">
<div className="
  rounded-2xl
  border
  border-[#D4AF37]/10
  bg-[#D4AF37]/5
  p-5
">

  <p
    translate="no"
    className="
      notranslate
      text-xs
      uppercase
      text-white/40
      mb-2
    "
  >
    Pending eCoin
  </p>

  <h2
    translate="no"
    className="
      notranslate
      text-xl
      font-black
      text-[#D4AF37]
    "
  >
    {pendingECOIN.toFixed(6)}
  </h2>

</div>
</div>

        {/* CLAIM */}
        <button
          disabled={
            total <= 0 || loading
          }
          onClick={async () => {

            try {

  setLoading(true);

  if (pendingUSDT > 0) {

    await claimRewards(USDT);
  }

  if (pendingEUSD > 0) {
  await claimRewards(EUSD);
}

if (pendingECOIN > 0) {
  await claimRewards(ECOIN);
}

  setPending({
  usdt: 0n,
  eusd: 0n,
  ecoin: 0n,
});

} finally {

  setLoading(false);
}
          }}

          className={`
            w-full
            py-4
            rounded-2xl
            font-black
            uppercase
            tracking-[0.2em]
            transition-all
            mt-6

            ${
              total <= 0
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#00FF9C] to-[#00C3FF] text-black hover:scale-[1.02]"
            }
          `}
        >

          {
            loading
              ? "PROCESSING..."
              : "CLAIM REFERRAL REWARDS"
          }

        </button>

      </div>

    </div>
  );
}