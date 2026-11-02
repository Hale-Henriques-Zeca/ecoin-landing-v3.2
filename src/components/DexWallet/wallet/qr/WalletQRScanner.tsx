
"use client";

import { useEffect } from "react";
import {
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats
} from "html5-qrcode";
import { isAddress } from "viem";

interface Props {
  onScan: (address: `0x${string}`) => void;
  onClose: () => void;
}

export default function WalletQRScanner({
  onScan,
  onClose
}: Props) {

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "wallet-qr-reader",
      {
        fps: 10,
        qrbox: { width: 230, height: 230 },
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE
        ]
      },
      false
    );

    scanner.render(
      (decodedText) => {
        const value = decodedText.trim();

        if (!isAddress(value)) {
          console.warn("QR Code não contém um endereço válido.");
          return;
        }

        void scanner.clear().catch(console.error);

        onScan(value as `0x${string}`);
      },
      () => {}
    );

    return () => {
      void scanner.clear().catch(console.error);
    };
  }, [onScan]);

  return (
    <div className="bg-black border border-blue-500/30 rounded-xl p-4 space-y-3">

      <div className="flex justify-between items-center">
        <h3 className="text-sm text-blue-400 font-bold">
          Scan Wallet Address
        </h3>

        <button
          onClick={onClose}
          className="text-xs text-red-400"
        >
          Fechar
        </button>
      </div>

      <div id="wallet-qr-reader" />

      <p className="text-[10px] text-gray-500 text-center">
        Aponte a câmara para o QR Code da carteira de destino.
      </p>

    </div>
  );
}
