"use client";

import QRCode from "react-qr-code";
import { Download, Share2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { downloadMiningCertificate } from "@/lib/downloadMiningCertificate";

type Props = {
  session: {
    id: number;

    wallet: string;
    upline: string;

    referralCode: string;

    startedAt: bigint;
    endedAt: bigint;

    gasPurchased: bigint;
    gasConsumed: bigint;

    claimedUSDT: bigint;
    claimedEUSD: bigint;

    completed: boolean;
  };
};

export default function MiningSessionCard({
  session,
}: Props) {

  const started =
    Number(session.startedAt) > 0
      ? new Date(
          Number(session.startedAt) * 1000
        ).toLocaleString()
      : "-";

  const ended =
    Number(session.endedAt) > 0
      ? new Date(
          Number(session.endedAt) * 1000
        ).toLocaleString()
      : "-";

  const shareSession = async () => {

    const text = `
E-Coin Mining Session #${session.id}

Wallet:
${session.wallet}

Referral:
${session.referralCode}

Gas Purchased:
${Number(session.gasPurchased) / 1e18}

Gas Consumed:
${Number(session.gasConsumed) / 1e18}

Claimed USDT:
${Number(session.claimedUSDT) / 1e18}

Claimed EUSD:
${Number(session.claimedEUSD) / 1e18}
`;

    if (navigator.share) {

      await navigator.share({
        title:
          `Mining Session #${session.id}`,
        text,
      });

      return;
    }

    await navigator.clipboard.writeText(text);
  };

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
      "
    >

      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent" />

      <div className="relative z-10 space-y-5">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-white font-black text-xl">
              Mining Session #{session.id}
            </h2>

            <p className="text-green-400 text-xs uppercase mt-1">
              Completed
            </p>

          </div>

          <CheckCircle2
            size={24}
            className="text-green-400"
          />

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <div>

            <p className="text-white/40 text-xs mb-1">
              Wallet
            </p>

            <p className="text-white break-all text-sm">
              {session.wallet}
            </p>

          </div>

          <div>

            <p className="text-white/40 text-xs mb-1">
              Upline
            </p>

            <p className="text-blue-300 break-all text-sm">
              {session.upline}
            </p>

          </div>

          <div>

            <p className="text-white/40 text-xs mb-1">
              Referral ID
            </p>

            <p className="text-[#D4AF37] font-black">
              {session.referralCode}
            </p>

          </div>

          <div>

            <p className="text-white/40 text-xs mb-1">
              Started
            </p>

            <p className="text-white text-sm">
              {started}
            </p>

          </div>

          <div>

            <p className="text-white/40 text-xs mb-1">
              Ended
            </p>

            <p className="text-white text-sm">
              {ended}
            </p>

          </div>

          <div>

            <p className="text-white/40 text-xs mb-1">
              Gas Purchased
            </p>

            <p className="text-green-400">
              {(
                Number(session.gasPurchased) /
                1e18
              ).toFixed(2)}
            </p>

          </div>

          <div>

            <p className="text-white/40 text-xs mb-1">
              Gas Consumed
            </p>

            <p className="text-red-400">
              {(
                Number(session.gasConsumed) /
                1e18
              ).toFixed(2)}
            </p>

          </div>

          <div>

            <p className="text-white/40 text-xs mb-1">
              Claimed USDT
            </p>

            <p className="text-green-400">
              {(
                Number(session.claimedUSDT) /
                1e18
              ).toFixed(4)}
            </p>

          </div>

          <div>

            <p className="text-white/40 text-xs mb-1">
              Claimed EUSD
            </p>

            <p className="text-cyan-400">
              {(
                Number(session.claimedEUSD) /
                1e18
              ).toFixed(4)}
            </p>

          </div>

        </div>

        <div className="flex justify-center">

          <div className="bg-white p-2 rounded-xl">

            <QRCode
              value={session.wallet}
              size={80}
            />

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() =>
              downloadMiningCertificate(
                session
              )
            }
            className="
              flex-1
              py-3
              rounded-xl
              bg-gradient-to-r
              from-[#D4AF37]
              to-[#3B82F6]
              text-black
              font-bold
            "
          >
            <Download
              size={16}
              className="inline mr-2"
            />
            Download JPG
          </button>

          <button
            onClick={shareSession}
            className="
              flex-1
              py-3
              rounded-xl
              border
              border-green-500/30
              text-green-400
            "
          >
            <Share2
              size={16}
              className="inline mr-2"
            />
            Share
          </button>

        </div>

      </div>

    </motion.div>
  );
}