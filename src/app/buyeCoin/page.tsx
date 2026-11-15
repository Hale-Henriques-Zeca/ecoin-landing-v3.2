"use client";

import { useState, useMemo, useEffect } from "react";
import { parseUnits, formatUnits } from "viem";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useDisconnect,
} from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { erc20Abi } from "@/lib/abis/erc20Abi";
import { BuyeCoinCorporateSwapAbi } from "@/lib/abis/BuyeCoinCorporateSwapAbi";
import { useDexWallet } from "@/contexts/DexWalletContext";
import { bsc } from "wagmi/chains";
import DesktopBuyEcoin from "@/components/DexWallet/buyeCoin/Desktop/DesktopBuyEcoin";
import MobileBuyEcoin from "@/components/DexWallet/buyeCoin/Mobile/MobileBuyEcoin";

type SwapToken = "ECOIN" | "USDT";

const TOKEN_CONFIG = {
  ECOIN: { address: CONTRACTS.ECOIN, decimals: 18 },
  USDT:  { address: CONTRACTS.USDT,  decimals: 18 },
} as const;

export default function BuyEcoinPage() {
  /* ═══════════════ WALLET & CONTEXT HOOKS ═══════════════ */
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { isOwner } = useDexWallet();
  const { writeContractAsync } = useWriteContract();

  /* ═══════════════ LOCAL STATE ═══════════════ */
  const [mounted, setMounted]       = useState(false);
  const [fromToken, setFromToken]   = useState<SwapToken>("USDT");
  const [toToken, setToToken]       = useState<SwapToken>("ECOIN");
  const [amount, setAmount]         = useState("");
  const [txHash, setTxHash]         = useState<`0x${string}` | null>(null);
  const [status, setStatus]         = useState<string>("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (fromToken === toToken) {
      if (fromToken === "ECOIN") setToToken("USDT");
      else setToToken("ECOIN");
    }
  }, [fromToken, toToken]);

  /* ═══════════════ LIVE PRICE FETCH FROM CORPORATE SWAP ═══════════════ */
  const oneUSDT = parseUnits("1", 18);
  const { data: buyQuote } = useReadContract({
    address: CONTRACTS.CORPORATE_SWAP,
    abi: BuyeCoinCorporateSwapAbi,
    functionName: "previewBuy",
    args: [oneUSDT],
    query: { enabled: mounted },
  });

  const quoteTuple = buyQuote as [bigint, bigint, bigint, bigint, bigint] | undefined;
  const ecoinForOneUSDT = quoteTuple?.[3] ?? 0n;
  const price = ecoinForOneUSDT > 0n ? 1 / Number(formatUnits(ecoinForOneUSDT, 18)) : 0;

  /* ═══════════════ TX RECEIPT WATCH ═══════════════ */
  const { isLoading: txMining, isSuccess: txSuccess } =
    useWaitForTransactionReceipt({ hash: txHash ?? undefined });

  useEffect(() => {
    if (!txHash) return;
    if (txMining)   setStatus("⛏️ Confirmando transação...");
    if (txSuccess)  setStatus("✅ Compra de ECOIN concluída!");
  }, [txHash, txMining, txSuccess]);

  /* ═══════════════ PARSED AMOUNT ═══════════════ */
  const parsedAmount = useMemo(() => {
    if (!amount) return 0n;
    try { return parseUnits(amount, TOKEN_CONFIG[fromToken].decimals); }
    catch { return 0n; }
  }, [amount, fromToken]);

  /* ═══════════════ PREVIEW CONTRACT READ (BUY) ═══════════════ */
  const { data: previewData, isLoading: previewLoading } = useReadContract({
    address: CONTRACTS.CORPORATE_SWAP,
    abi: BuyeCoinCorporateSwapAbi,
    functionName: "previewBuy",
    args: [parsedAmount],
    query: { enabled: parsedAmount > 0n && isConnected && fromToken === "USDT" },
  });

  const previewTuple = previewData as [bigint, bigint, bigint, bigint, bigint] | undefined;
  const previewAmountOut = previewTuple?.[3] ?? 0n;
  const previewAllowed = parsedAmount > 0n && fromToken === "USDT";

  /* ═══════════════ CALCULATION ═══════════════ */
  const calculation = useMemo(() => {
    const empty = { gross: 0, feePercent: 0, fee: 0, net: 0, output: 0 };
    if (!amount || !price) return empty;
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) return empty;
    const feePercent = 10.0;
    const fee = amt * (feePercent / 100);
    const net = amt - fee;
    const output = amt * price;
    return { gross: amt, feePercent, fee, net, output };
  }, [amount, price]);

  function invertPair() {
    setFromToken(toToken);
    setToToken(fromToken);
  }

  /* ═══════════════ SWAP / BUY ACTION ═══════════════ */
  async function handleSwap() {
    if (!amount || !isConnected) return;
    if (fromToken !== "USDT") {
      alert("Atualmente o CorporateSwap suporta apenas conversão de USDT para ECOIN.");
      return;
    }

    const tokenIn = TOKEN_CONFIG.USDT.address;
    const parsed = parseUnits(amount, 18);
    const minAmountOut = previewAmountOut - (previewAmountOut * 50n) / 10000n;
    
    try {
      setStatus("🔓 A aprovar USDT...");
      await writeContractAsync({
        address: tokenIn, 
        abi: erc20Abi, 
        functionName: "approve",
        args: [CONTRACTS.CORPORATE_SWAP, parsed], 
        account: address, 
        chain: bsc,
      });
      
      setStatus("🔄 A executar compra...");
      const tx = await writeContractAsync({
        address: CONTRACTS.CORPORATE_SWAP, 
        abi: BuyeCoinCorporateSwapAbi, 
        functionName: "buyEcoin",
        args: [parsed, minAmountOut > 0n ? minAmountOut : 1n], 
        account: address, 
        chain: bsc,
      });
      setTxHash(tx);
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Erro na transação.");
    }
  }

  if (!mounted) return null;

  const sharedProps = {
    isConnected,
    address,
    disconnect,
    isOwner,
    fromToken,
    toToken,
    amount,
    setAmount,
    setFromToken,
    setToToken,
    invertPair,
    price,
    previewAmountOut,
    previewLoading,
    previewAllowed,
    calculation,
    handleSwap,
    txMining,
    status,
  };

  return (
    <>
      <div className="hidden lg:block">
        <DesktopBuyEcoin {...sharedProps} />
      </div>
      <div className="block lg:hidden">
        <MobileBuyEcoin {...sharedProps} />
      </div>
    </>
  );
}