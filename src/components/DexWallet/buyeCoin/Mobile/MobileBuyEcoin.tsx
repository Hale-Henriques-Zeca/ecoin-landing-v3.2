"use client";

import {
  useState,
  useEffect,
} from "react";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, History, Wallet } from "lucide-react";

import type {
  ConversionDirection,
  ConversionStatus,
  ConverterAsset,
  ConverterAssetSymbol,
  ConverterProvider,
} from "@/types/converter";

import type {
  ConverterHistoryItem,
} from "@/hooks/DexWallet/converter/Execução-e-acompanhamento/useConverterHistory";

import MobileHeader from "./MobileHeader";
import MobileConverterForm from "./MobileConverterForm";
import MobileTransactionModal from "./MobileTransactionModal";
import MobileTransactionStatus from "./MobileTransactionStatus";
import MobileConversionHistory from "./MobileConversionHistory";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";

export interface MobileBuyEcoinProps {
  assets: ConverterAsset[];
  providers: ConverterProvider[];
  history: ConverterHistoryItem[];

  direction: ConversionDirection;
  tokenIn: ConverterAssetSymbol;
  tokenOut: ConverterAssetSymbol;

  amount: string;
  providerId?: string;

  amountIn?: string;
  fee?: string;
  feePercentage?: number;
  netAmountIn?: string;
  expectedAmountOut?: string;
  minimumAmountOut?: string;
  priceImpact?: number;

  slippage: number;

  isPairSupported: boolean;
  hasQuote: boolean;
  feeValid: boolean;
  isApproved: boolean;
  requiresApproval: boolean;

  conversionStatus: ConversionStatus;

  transactionHash?: string;
  transactionMessage?: string;
  explorerUrl?: string;

  loading?: boolean;
  transactionLoading?: boolean;
  historyLoading?: boolean;

  approvalConfirmed?: boolean;
  error?: string;

  onDirectionChange: (value: ConversionDirection) => void;
  onTokenInChange: (value: ConverterAssetSymbol) => void;
  onTokenOutChange: (value: ConverterAssetSymbol) => void;
  onReverse: () => void;

  onAmountChange: (value: string) => void;
  onProviderChange: (id: string) => void;
  onSlippageChange: (value: number) => void;

  onContinue: () => void;
  onConfirm: () => void;
  onCloseModal: () => void;

  onRefresh: () => void;
  onRefreshHistory: () => void;
}

export default function MobileBuyEcoin({
  assets = [],
  providers = [],
  history = [],

  direction,
  tokenIn,
  tokenOut,

  amount,
  providerId,

  amountIn,
  fee,
  feePercentage,
  netAmountIn,
  expectedAmountOut,
  minimumAmountOut,
  priceImpact,

  slippage,

  isPairSupported,
  hasQuote,
  feeValid,
  isApproved,
  requiresApproval,

  conversionStatus,

  transactionHash,
  transactionMessage,
  explorerUrl,

  loading = false,
  transactionLoading = false,
  historyLoading = false,

  approvalConfirmed = false,
  error,

  onDirectionChange,
  onTokenInChange,
  onTokenOutChange,
  onReverse,

  onAmountChange,
  onProviderChange,
  onSlippageChange,

  onContinue,
  onConfirm,
  onCloseModal,

  onRefresh,
  onRefreshHistory,
}: MobileBuyEcoinProps) {
  // Estado para controlar a aba ativa no mobile ("converter" | "historico" | "carteira")
  const [activeTab, setActiveTab] = useState<string>("converter");
  const [modalOpen, setModalOpen] = useState(false);

  const menuItems = [
    { id: "converter", label: "Converter", icon: ArrowLeftRight },
    { id: "historico", label: "Histórico", icon: History },
    { id: "carteira", label: "Portfolio", icon: Wallet },
  ];

  // Proteção adicional contra dados ausentes.
  const safeAssets = assets ?? [];
  const safeProviders = providers ?? [];
  const safeHistory = history ?? [];

  const hasProvider = safeProviders.some(
    (provider) =>
      provider.id === providerId &&
      provider.enabled
  );

  const hasActiveQuote =
    hasQuote &&
    feeValid &&
    isPairSupported &&
    hasProvider &&
    !!providerId;

  // Fechar automaticamente quando a operação terminar.
  useEffect(() => {
    if (conversionStatus === "success") {
      setModalOpen(false);
      onCloseModal();
    }
  }, [conversionStatus, onCloseModal]);

  // Não manter o modal aberto depois de uma falha.
  useEffect(() => {
    if (conversionStatus === "failed") {
      setModalOpen(false);
    }
  }, [conversionStatus]);

  const handleContinue = () => {
    if (!hasActiveQuote || loading) return;

    onContinue();
    setModalOpen(true);
  };

  const handleClose = () => {
    if (transactionLoading) return;

    setModalOpen(false);
    onCloseModal();
  };

  const handleConfirm = () => {
    if (transactionLoading || !hasActiveQuote) return;

    onConfirm();
  };

  const statusVisible =
    conversionStatus !== "idle";

  return (
    <main className="min-h-[100dvh] bg-[#070708] pb-28 text-white relative">
      <MobileHeader
        title="Buy & Convert"
        subtitle="EdenKingDom Converter"
      />

      <div className="mx-auto w-full max-w-lg space-y-5 px-4 py-5">
        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0d0d0f] px-4 py-3">
          <div>
            <p className="text-[10px] text-gray-400 font-medium">
              Rede selecionada
            </p>

            <p className="mt-0.5 text-xs font-bold text-amber-400">
              BNB Smart Chain
            </p>
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading || transactionLoading}
            className="rounded-lg bg-white/5 px-3 py-2 text-[10px] font-bold text-amber-400 hover:bg-white/10 transition disabled:opacity-50"
          >
            Atualizar
          </button>
        </div>

        {/* RENDERING CONDICIONAL DAS ABAS NO MOBILE COM ANIMAÇÃO */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {activeTab === "converter" && (
              <div className="space-y-5">
                <MobileConverterForm
                  direction={direction}
                  onDirectionChange={onDirectionChange}
                  tokenIn={tokenIn}
                  tokenOut={tokenOut}
                  onTokenInChange={onTokenInChange}
                  onTokenOutChange={onTokenOutChange}
                  onReverse={onReverse}
                  amount={amount}
                  onAmountChange={onAmountChange}
                  assets={safeAssets}
                  providers={safeProviders}
                  providerId={providerId}
                  onProviderChange={onProviderChange}
                  amountIn={amountIn}
                  fee={fee}
                  feePercentage={feePercentage}
                  netAmountIn={netAmountIn}
                  expectedAmountOut={expectedAmountOut}
                  minimumAmountOut={minimumAmountOut}
                  priceImpact={priceImpact}
                  slippage={slippage}
                  onSlippageChange={onSlippageChange}
                  loading={loading}
                  isPairSupported={isPairSupported}
                  hasProvider={hasProvider}
                  hasQuote={hasQuote}
                  feeValid={feeValid}
                  requiresApproval={requiresApproval}
                  isApproved={isApproved}
                  onContinue={handleContinue}
                />

                {statusVisible && (
                  <MobileTransactionStatus
                    status={conversionStatus}
                    hash={transactionHash}
                    explorerUrl={explorerUrl}
                    message={transactionMessage}
                  />
                )}
              </div>
            )}

            {activeTab === "historico" && (
              <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-4">
                <MobileConversionHistory
                  history={safeHistory}
                  loading={historyLoading}
                  onRefresh={onRefreshHistory}
                />
              </div>
            )}

            {activeTab === "carteira" && (
              <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-4">
                <EcoinWalletDashboard />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <MobileTransactionModal
          open={modalOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          amountIn={amountIn ?? amount}
          amountOut={expectedAmountOut ?? "—"}
          fee={fee ?? "—"}
          requiresApproval={requiresApproval}
          approvalConfirmed={approvalConfirmed}
          loading={transactionLoading}
          error={error}
        />
      </div>

      {/* 📱 MOBILEBAR INFERIOR FIXA */}
      <nav aria-label="Navegação móvel" className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0f]/95 backdrop-blur-md border-t border-white/10 px-6 py-3 flex items-center justify-around shadow-2xl">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? "text-[#D4AF37]" : "text-white/50 hover:text-white"
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${isActive ? "bg-[#D4AF37]/15 shadow-sm shadow-[#D4AF37]/30" : ""}`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </main>
  );
}