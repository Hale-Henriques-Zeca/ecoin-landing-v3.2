
"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";
import { Copy, Check, X, Wallet } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function ReceiveModal({ onClose }: Props) {
  const { address, isConnected, chainId } = useAccount();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!address) return;

    await navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected || !address) return null;

  const networkName =
    chainId === 56 ? "BNB Smart Chain Mainnet" :
    chainId === 97 ? "BSC Testnet" :
    "Rede não suportada";

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0B0E14] border border-[#D4AF37]/30 rounded-3xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <Wallet className="mx-auto text-[#D4AF37] mb-3" size={32} />

          <h2 className="text-xl font-black text-white">
            Receber fundos
          </h2>

          <p className="text-xs text-gray-400 mt-2">
            Partilhe o seu endereço para receber ativos.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="bg-white p-4 rounded-2xl">
            <QRCode
              value={address}
              size={200}
              level="H"
            />
          </div>
        </div>

        <div className="mt-5 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            Rede
          </p>

          <p className="text-sm text-[#00FF9C] font-semibold mt-1">
            {networkName}
          </p>
        </div>

        <div className="mt-4 bg-black/50 border border-gray-800 rounded-xl p-3">
          <p className="text-[10px] text-gray-500 mb-2">
            Endereço público
          </p>

          <p className="text-xs text-white font-mono break-all">
            {address}
          </p>
        </div>

        <button
          onClick={copyAddress}
          className="w-full mt-4 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm flex items-center justify-center gap-2"
        >
          {copied ? <Check size={17} /> : <Copy size={17} />}
          {copied ? "Endereço copiado!" : "Copiar endereço"}
        </button>

        <p className="text-[10px] text-gray-500 text-center mt-4">
          Envie apenas ativos compatíveis com a rede indicada.
          Este endereço é da sua carteira conectada.
        </p>

      </div>
    </div>
  );
}
