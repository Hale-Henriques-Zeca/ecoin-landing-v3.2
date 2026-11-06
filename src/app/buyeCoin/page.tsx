"use client";

import BuyEcoinController from "@/components/DexWallet/buyeCoin/shared/BuyEcoinController";

import DesktopBuyEcoin from "@/components/DexWallet/buyeCoin/Desktop/DesktopBuyEcoin";
import MobileBuyEcoin from "@/components/DexWallet/buyeCoin/Mobile/MobileBuyEcoin";

export default function BuyEcoinPage() {
  return (
    <BuyEcoinController
      desktop={<DesktopBuyEcoin />}
      mobile={<MobileBuyEcoin />}
      showWalletBar={false}
      initialState={{
        fromAsset: "USDT",
        toAsset: "ECOIN",
        amount: "",
        slippage: 0.5,
      }}
    />
  );
}