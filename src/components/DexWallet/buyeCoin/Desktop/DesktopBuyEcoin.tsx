"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  formatUnits,
  parseUnits,
  type Hex,
} from "viem";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, History, Wallet, ShieldCheck, Cpu } from "lucide-react";

import type {
  ConversionDirection,
  ConversionStatus,
  ConverterAssetSymbol,
} from "@/types/converter";

import {
  CONVERTER_ASSETS,
} from "@/lib/DexWallet/converter/assets";

import {
  CONVERTER_SETTINGS,
} from "@/lib/DexWallet/converter/contracts";

import {
  useConverterAssets,
} from "@/hooks/DexWallet/converter/Leitura-on-chain/useConverterAssets";

import {
  useConverterProvider,
} from "@/hooks/DexWallet/converter/Leitura-on-chain/useConverterProvider";

import {
  useConverterFee,
} from "@/hooks/DexWallet/converter/Leitura-on-chain/useConverterFee";

import {
  useConverterQuote,
} from "@/hooks/DexWallet/converter/Cotação-e-autorização/useConverterQuote";

import {
  useConverterApproval,
} from "@/hooks/DexWallet/converter/Cotação-e-autorização/useConverterApproval";

import {
  useConverter,
} from "@/hooks/DexWallet/converter/Execução-e-acompanhamento/useConverter";

import {
  useConverterStatus,
} from "@/hooks/DexWallet/converter/Execução-e-acompanhamento/useConverterStatus";

import {
  useConverterHistory,
} from "@/hooks/DexWallet/converter/Execução-e-acompanhamento/useConverterHistory";

import DesktopHeader from "./DesktopHeader";
import DesktopConverterForm from "./DesktopConverterForm";
import DesktopTransactionModal from "./DesktopTransactionModal";
import DesktopTransactionStatus from "./DesktopTransactionStatus";
import DesktopConversionHistory from "./DesktopConversionHistory";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";

function displayAmount(
  value: bigint | undefined,
  decimals: number
): string {
  if (value === undefined) return "—";

  return Number(
    formatUnits(value, decimals)
  ).toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
}

export default function DesktopBuyEcoin() {
  // ------------------------------------------------
  // 1. NAVIGATION & TAB STATE
  // ------------------------------------------------
  const [activeTab, setActiveTab] = useState<string>("converter");

  const menuItems = [
    { id: "converter", label: "Converter / Swap", icon: ArrowLeftRight },
    { id: "historico", label: "Histórico", icon: History },
    { id: "carteira", label: "Portfolio & Ativos", icon: Wallet },
  ];

  // ------------------------------------------------
  // 2. FORM STATE
  // ------------------------------------------------
  const [direction, setDirection] =
    useState<ConversionDirection>("CONVERT");

  const [tokenIn, setTokenIn] =
    useState<ConverterAssetSymbol>("USDT");

  const [tokenOut, setTokenOut] =
    useState<ConverterAssetSymbol>("ECOIN");

  const [amount, setAmount] = useState("");

  const [slippage, setSlippage] = useState(
    CONVERTER_SETTINGS.defaultSlippage
  );

  const [providerId, setProviderId] =
    useState<string>("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [conversionStatus, setConversionStatus] =
    useState<ConversionStatus>("idle");

  const [executionError, setExecutionError] =
    useState<string | undefined>();

  // ------------------------------------------------
  // 3. ASSET CONFIGURATION
  // ------------------------------------------------
  const inputAsset = CONVERTER_ASSETS[tokenIn];
  const outputAsset = CONVERTER_ASSETS[tokenOut];

  const amountIn = useMemo(() => {
    try {
      if (
        !amount ||
        !/^\d+(\.\d+)?$/.test(amount)
      ) {
        return 0n;
      }

      return parseUnits(
        amount,
        inputAsset.decimals
      );
    } catch {
      return 0n;
    }
  }, [amount, inputAsset.decimals]);

  // ------------------------------------------------
  // 4. WEB3 ASSETS AND PAIRS
  // ------------------------------------------------
  const assetHook = useConverterAssets({
    tokenIn,
    tokenOut,
  });

  const selectableAssets = useMemo(() => {
    return Object.values(CONVERTER_ASSETS).filter(
      (asset) =>
        assetHook.supportedAssets[
          asset.address.toLowerCase()
        ] === true
    );
  }, [assetHook.supportedAssets]);

  // ------------------------------------------------
  // 5. APPROVED PROVIDERS
  // ------------------------------------------------
  const providerHook = useConverterProvider();
  const activeProviders = providerHook.activeProviders;

  useEffect(() => {
    const exists = activeProviders.some(
      (provider) => provider.id === providerId
    );

    if (!exists) {
      setProviderId(
        activeProviders[0]?.id ?? ""
      );
    }
  }, [activeProviders, providerId]);

  const selectedProvider = activeProviders.find(
    (provider) => provider.id === providerId
  );

  // ------------------------------------------------
  // 6. OFFICIAL ON-CHAIN FEE
  // ------------------------------------------------
  const feeHook = useConverterFee({
    amountIn,
    enabled: amountIn > 0n,
  });

  // ------------------------------------------------
  // 7. REAL DEX QUOTE
  // ------------------------------------------------
  const quoteHook = useConverterQuote({
    tokenIn,
    tokenOut,
    amount,
    slippage,
    providerId: providerId
      ? (providerId as Hex)
      : undefined,
    enabled:
      assetHook.isPairSupported &&
      !!selectedProvider,
  });

  const quote = quoteHook.quote;

  const quoteMatchesFee =
    !!quote &&
    feeHook.isValid &&
    feeHook.feeAmount === quote.feeAmount;

  // ------------------------------------------------
  // 8. ERC20 APPROVAL
  // ------------------------------------------------
  const approvalHook = useConverterApproval({
    token: tokenIn,
    amount: quote?.amountIn ?? amountIn,
  });

  // ------------------------------------------------
  // 9. TRANSACTION EXECUTION
  // ------------------------------------------------
  const converterHook = useConverter();
  const transactionHook = useConverterStatus({
    hash: converterHook.lastSubmittedHash,
  });

  // ------------------------------------------------
  // 10. CONVERSION HISTORY
  // ------------------------------------------------
  const historyHook = useConverterHistory({
    page: 1,
    limit: 10,
  });

  // ------------------------------------------------
  // 11. FORMATTED QUOTE VALUES
  // ------------------------------------------------
  const feeDisplay = displayAmount(
    quote?.feeAmount,
    inputAsset.decimals
  );

  const netInputDisplay = displayAmount(
    quote?.netAmountIn,
    inputAsset.decimals
  );

  const expectedOutputDisplay = displayAmount(
    quote?.expectedAmountOut,
    outputAsset.decimals
  );

  const minimumOutputDisplay = displayAmount(
    quote?.minimumAmountOut,
    outputAsset.decimals
  );

  const feePercentage =
    quote && quote.amountIn > 0n
      ? Number(
          (quote.feeAmount * 10_000n) /
            quote.amountIn
        ) / 100
      : undefined;

  // ------------------------------------------------
  // 12. FORM ACTIONS
  // ------------------------------------------------
  const handleTokenInChange = useCallback(
    (symbol: ConverterAssetSymbol) => {
      setTokenIn(symbol);

      if (symbol === tokenOut) {
        const replacement = selectableAssets.find(
          (asset) => asset.symbol !== symbol
        );

        if (replacement) {
          setTokenOut(replacement.symbol);
        }
      }

      setAmount("");
    },
    [tokenOut, selectableAssets]
  );

  const handleTokenOutChange = useCallback(
    (symbol: ConverterAssetSymbol) => {
      setTokenOut(symbol);
    },
    []
  );

  const handleReverse = useCallback(() => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmount("");
  }, [tokenIn, tokenOut]);

  const handleDirectionChange = useCallback(
    (next: ConversionDirection) => {
      setDirection(next);
    },
    []
  );

  const handleContinue = useCallback(() => {
    if (
      !quoteHook.hasQuote ||
      !quote ||
      !assetHook.isPairSupported ||
      !selectedProvider ||
      !quoteMatchesFee
    ) {
      return;
    }

    setExecutionError(undefined);

    setConversionStatus(
      approvalHook.requiresApproval
        ? "awaiting_approval"
        : "awaiting_confirmation"
    );

    setModalOpen(true);
  }, [
    quoteHook.hasQuote,
    quote,
    assetHook.isPairSupported,
    selectedProvider,
    quoteMatchesFee,
    approvalHook.requiresApproval,
  ]);

  // ------------------------------------------------
  // 13. APPROVAL OR EXECUTION
  // ------------------------------------------------
  const handleConfirm = useCallback(async () => {
    if (!quote || !quoteHook.isFresh) {
      setExecutionError(
        "A cotação expirou. Solicita uma nova cotação."
      );
      return;
    }

    if (!quoteMatchesFee) {
      setExecutionError(
        "A taxa da cotação não corresponde à taxa oficial on-chain."
      );
      return;
    }

    try {
      setExecutionError(undefined);

      if (
        approvalHook.requiresApproval &&
        !approvalHook.isApprovalConfirmed
      ) {
        setConversionStatus("approving");
        await approvalHook.approve(false);
        setConversionStatus("approval_confirming");
        return;
      }

      if (
        !approvalHook.isApproved &&
        !approvalHook.isNative
      ) {
        setExecutionError(
          "A autorização do token ainda não está confirmada."
        );
        return;
      }

      setConversionStatus("submitting");

      await converterHook.executeConversion({
        quote,
      });

      setConversionStatus("confirming");
    } catch (error) {
      setConversionStatus("failed");
      setExecutionError(
        error instanceof Error
          ? error.message
          : "Não foi possível executar a conversão."
      );
    }
  }, [
    quote,
    quoteHook.isFresh,
    quoteMatchesFee,
    approvalHook,
    converterHook,
  ]);

  // ------------------------------------------------
  // 14. APPROVAL & CONVERSION RECEIPTS
  // ------------------------------------------------
  useEffect(() => {
    if (approvalHook.isApprovalConfirmed) {
      approvalHook.refetchAllowance();
      setConversionStatus("awaiting_confirmation");
    }
  }, [
    approvalHook.isApprovalConfirmed,
    approvalHook.refetchAllowance,
  ]);

  useEffect(() => {
    if (approvalHook.isApprovalReceiptError) {
      setConversionStatus("failed");
      setExecutionError("A transação de autorização falhou.");
    }
  }, [approvalHook.isApprovalReceiptError]);

  useEffect(() => {
    if (transactionHook.isSuccess) {
      setConversionStatus("success");
      setModalOpen(false);
      historyHook.refreshHistory();
    }

    if (transactionHook.isFailed) {
      setConversionStatus("failed");
      setExecutionError("A conversão falhou na blockchain.");
    }
  }, [
    transactionHook.isSuccess,
    transactionHook.isFailed,
    historyHook.refreshHistory,
  ]);

  // ------------------------------------------------
  // 15. REFRESH ALL DATA
  // ------------------------------------------------
  const refreshAll = useCallback(async () => {
    await Promise.all([
      assetHook.refetch(),
      providerHook.refetch(),
      feeHook.refetch(),
      approvalHook.refetchAllowance(),
      quoteHook.refreshQuote(),
      historyHook.refreshHistory(),
    ]);
  }, [
    assetHook.refetch,
    providerHook.refetch,
    feeHook.refetch,
    approvalHook.refetchAllowance,
    quoteHook.refreshQuote,
    historyHook.refreshHistory,
  ]);

  const isLoading =
    quoteHook.isLoading ||
    feeHook.isLoading ||
    assetHook.isLoading ||
    providerHook.isLoading;

  const transactionLoading =
    converterHook.isPending ||
    approvalHook.isApprovalPending ||
    approvalHook.isApprovalConfirming ||
    transactionHook.isConfirming;

  const displayedStatus: ConversionStatus =
    conversionStatus === "confirming" &&
    transactionHook.isSuccess
      ? "success"
      : conversionStatus;

  // ------------------------------------------------
  // 16. RENDER
  // ------------------------------------------------
  return (
    <main className="min-h-screen bg-[#070708] text-white pt-20 pb-28 lg:pb-12 px-4 md:px-8 relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* 💻 NAVEGAÇÃO LATERAL (EXCLUSIVA DESKTOP) */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0d0d0f] border border-white/5 rounded-3xl p-4 h-fit sticky top-24 gap-2">
          <div className="px-3 py-2 mb-4 border-b border-white/5 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-xs">CS</div>
            <span className="font-black tracking-wider text-sm">DEX CONVERTER</span>
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.25)]" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* CONTAINER PRINCIPAL DE CONTEÚDO */}
        <section className="flex-1 min-w-0 space-y-6">
          
          {/* HEADER PRINCIPAL */}
          <DesktopHeader
            onRefresh={refreshAll}
            isRefreshing={isLoading}
          />

          {/* 💻 RENDERING CONDICIONAL DAS ABAS (MANTIDO EM DESKTOP) */}
          <div className="block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* ABA 1: CONVERTER / FORMULÁRIO */}
                {activeTab === "converter" && (
                  <div className="space-y-6">
                    <DesktopConverterForm
                      direction={direction}
                      onDirectionChange={handleDirectionChange}
                      tokenIn={tokenIn}
                      tokenOut={tokenOut}
                      onTokenInChange={handleTokenInChange}
                      onTokenOutChange={handleTokenOutChange}
                      onReverse={handleReverse}
                      amount={amount}
                      onAmountChange={setAmount}
                      assets={selectableAssets}
                      providers={providerHook.providers}
                      providerId={providerId}
                      onProviderChange={setProviderId}
                      amountIn={
                        quote
                          ? displayAmount(
                              quote.amountIn,
                              inputAsset.decimals
                            )
                          : amount || undefined
                      }
                      fee={quote ? feeDisplay : undefined}
                      feePercentage={feePercentage}
                      netAmountIn={
                        quote ? netInputDisplay : undefined
                      }
                      expectedAmountOut={
                        quote ? expectedOutputDisplay : undefined
                      }
                      minimumAmountOut={
                        quote ? minimumOutputDisplay : undefined
                      }
                      priceImpact={quote?.priceImpact}
                      slippage={slippage}
                      onSlippageChange={setSlippage}
                      loading={
                        quoteHook.isLoading ||
                        quoteHook.isValidating ||
                        feeHook.isLoading
                      }
                      isPairSupported={assetHook.isPairSupported}
                      hasProvider={!!selectedProvider}
                      hasQuote={quoteHook.hasQuote}
                      feeValid={quoteMatchesFee}
                      requiresApproval={approvalHook.requiresApproval}
                      isApproved={approvalHook.isApproved}
                      onContinue={handleContinue}
                    />

                    {conversionStatus !== "idle" && (
                      <DesktopTransactionStatus
                        status={displayedStatus}
                        hash={converterHook.lastSubmittedHash}
                        explorerUrl={
                          converterHook.lastSubmittedHash
                            ? `https://bscscan.com/tx/${converterHook.lastSubmittedHash}`
                            : undefined
                        }
                        message={executionError}
                      />
                    )}
                  </div>
                )}

                {/* ABA 2: HISTÓRICO */}
                {activeTab === "historico" && (
                  <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
                    <DesktopConversionHistory
                      history={historyHook.history}
                      loading={historyHook.isLoading}
                      onRefresh={historyHook.refreshHistory}
                    />
                  </div>
                )}

                {/* ABA 3: PORTFOLIO / CARTEIRA */}
                {activeTab === "carteira" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6"
                  >
                    <EcoinWalletDashboard />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <DesktopTransactionModal
            open={modalOpen}
            onClose={() => {
              if (!transactionLoading) {
                setModalOpen(false);
              }
            }}
            onConfirm={handleConfirm}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            amountIn={
              quote
                ? displayAmount(
                    quote.amountIn,
                    inputAsset.decimals
                  )
                : amount
            }
            amountOut={expectedOutputDisplay}
            fee={feeDisplay}
            requiresApproval={approvalHook.requiresApproval}
            approvalConfirmed={approvalHook.isApprovalConfirmed}
            loading={transactionLoading}
            error={executionError}
          />

        </section>
      </div>
    </main>
  );
}