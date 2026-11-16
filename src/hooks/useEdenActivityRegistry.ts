"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount, useReadContract, usePublicClient } from "wagmi";
import { formatUnits, keccak256, toBytes, getAddress } from "viem";

import { CONTRACTS } from "@/lib/contracts/contracts";
import { edenActivityRegistryAbi } from "@/lib/abis/edenActivityRegistryAbi";

const PAGE_SIZE = 50;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

type Hex = `0x${string}`;

interface StoredActivity {
  activityType: Hex;
  token: string;
  amount: bigint;
  source: string;
  referenceId: Hex;
  timestamp: bigint;
}

export interface ActivityRecord {
  user: string;
  activityTypeHash: Hex;
  activityLabel: string;
  token: string;
  amount: number;
  source: string;
  referenceId: Hex;
  timestamp: number;

  blockNumber?: bigint;
  transactionHash?: Hex;
}

// Mapeamento completo sincronizado com todas as atividades do contrato inteligente
const ACTIVITY_NAMES: Record<string, string> = {
  // Transações básicas e staking
  DEPOSIT: "Depósito",
  WITHDRAWAL: "Levantamento",
  ADD_PROFIT_MARGIN: "Staking / Margem",
  REMOVE_PROFIT_MARGIN: "Remover Staking",
  PROFIT: "Lucro Recebido",
  
  // Referências e Códigos
  REFERRAL: "Comissão de Referral",
  REFERRAL_CLAIM: "Resgate de Referral",
  REFERRAL_COMMISSION_CLAIM: "Comissão de Referral",
  LINK_UPLINE: "Vínculo de Referência",
  REFERRAL_CODE_REGISTERED: "Registo de Código",

  // Capacidade e Resgates
  ADD_PROFIT_CAPACITY: "Emissão de Selo CS",
  CLAIM: "Resgate / Claim",

  // Trading e Investimento
  TRADING: "Trading",
  INVESTMENT: "Investimento",
  CONVERSION: "Conversão / Swap",

  // Gestão de Tokens
  OFFICIAL_TOKEN_REGISTERED: "Registo de Token Oficial",
  CUSTOM_TOKEN_ADDED: "Token Personalizado Adicionado",
  CUSTOM_TOKEN_REMOVED: "Token Personalizado Removido",
  CUSTOM_TOKEN_DETECTED: "Token Personalizado Detectado",
  CUSTOM_TOKEN_TRANSFERRED: "Transferência de Token",
  CUSTOM_TOKEN_APPROVED: "Aprovação de Token",

  // Segurança e Sessões da Carteira
  WALLET_RECOVERY: "Recuperação de Carteira",
  SESSION_CREATED: "Sessão Criada",
  SESSION_REVOKED: "Sessão Revogada",
  SESSION_CONSUMED: "Sessão Utilizada",
  SESSIONS_INVALIDATED: "Sessões Invalidadas",
  CONTROLLER_AUTHORIZED: "Controlador Autorizado",
  CONTROLLER_PERMISSIONS_UPDATED: "Permissões Atualizadas",
  CONTROLLER_REVOKED: "Controlador Revogado",
  DEVICE_AUTHORIZED: "Dispositivo Autorizado",
  DEVICE_REVOKED: "Dispositivo Revogado",
  WALLET_FROZEN: "Carteira Congelada",
  WALLET_UNFROZEN: "Carteira Descongelada",
  GUARDIAN_STATUS_CHANGED: "Estado do Guardian Alterado",
  SECURITY_OPERATOR_UPDATED: "Operador de Segurança Atualizado",
  WALLET_GUARDIAN_FACTORY_UPDATED: "Fábrica de Guardian Atualizada",

  // Patrocínio de Gás e Transferências
  GAS_SPONSORSHIP_AUTHORIZED: "Patrocínio de Gas Autorizado",
  GAS_SPONSORSHIP_COMPLETED: "Patrocínio de Gas Concluído",
  TRANSFER: "Transferência",
  SERVICE_FEE: "Taxa de Serviço",

  // Operações de Wallet & Batch
  WALLET_CREATED: "Carteira Criada",
  WALLET_EXECUTED: "Operação de Carteira",
  WALLET_BATCH_EXECUTED: "Operações em Lote",
  WALLET_SESSION_EXECUTED: "Operação por Sessão",

  // Airdrop
  AIRDROP_CLAIM: "Airdrop Claim",
  AIRDROP_SERVICE_FEE: "Taxa de Serviço",
  AIRDROP_REFERRAL: "Referência de Airdrop",

  // Purchase / Corporate Swap (Alinhado com keccak256("BUY_E-COIN"))
  "BUY_E-COIN": "Buy E-Coin",
  PURCHASE: "Buy E-Coin",
};

const HASH_LABEL_MAP = new Map<string, string>(
  Object.entries(ACTIVITY_NAMES).map(([key, label]) => [
    keccak256(toBytes(key)).toLowerCase(),
    label,
  ])
);

function parseActivityLabel(hash: string): string {
  return (
    HASH_LABEL_MAP.get(hash.toLowerCase()) ??
    "Atividade no Protocolo"
  );
}

function mapStoredActivity(
  record: StoredActivity,
  user: string
): ActivityRecord {
  return {
    user,
    activityTypeHash: record.activityType,
    activityLabel: parseActivityLabel(record.activityType),
    token: getAddress(record.token || ZERO_ADDRESS),
    amount: Number(formatUnits(record.amount, 18)),
    source: getAddress(record.source || ZERO_ADDRESS),
    referenceId: record.referenceId,
    timestamp: Number(record.timestamp) * 1000,
  };
}

export function useEdenActivityRegistry() {
  const { address } = useAccount();
  const publicClient = usePublicClient({ chainId: 56 });

  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [storedCount, setStoredCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);

  const formattedAddress = address
    ? getAddress(address)
    : undefined;

  const {
    data: userActivityCount,
    refetch: refetchLegacyCount,
  } = useReadContract({
    abi: edenActivityRegistryAbi,
    address: CONTRACTS.EDEN_ACTIVITY_REGISTRY,
    functionName: "activityCount",
    args: formattedAddress ? [formattedAddress] : undefined,
    query: {
      enabled: !!formattedAddress,
    },
  });

  const fetchActivities = useCallback(
    async (offset = 0, append = false) => {
      if (!formattedAddress || !publicClient) {
        setActivities([]);
        setStoredCount(0);
        setIsLoading(false);
        setIsLoadingMore(false);
        return;
      }

      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        setActivities([]);
      }

      setIsError(false);

      try {
        const [countResult, recordsResult] = await Promise.all([
          publicClient.readContract({
            address: CONTRACTS.EDEN_ACTIVITY_REGISTRY,
            abi: edenActivityRegistryAbi,
            functionName: "getUserActivityCount",
            args: [formattedAddress],
          }),
          publicClient.readContract({
            address: CONTRACTS.EDEN_ACTIVITY_REGISTRY,
            abi: edenActivityRegistryAbi,
            functionName: "getUserActivities",
            args: [
              formattedAddress,
              BigInt(offset),
              BigInt(PAGE_SIZE),
            ],
          }),
        ]);

        const count = Number(countResult);
        const records = recordsResult as unknown as StoredActivity[];

        const parsed = records.map((record) =>
          mapStoredActivity(record, formattedAddress)
        );

        setStoredCount(count);

        setActivities((previous) =>
          append ? [...previous, ...parsed] : parsed
        );
      } catch (error) {
        console.error(
          "Erro ao consultar o histórico on-chain do EdenActivityRegistry:",
          error
        );
        setIsError(true);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [formattedAddress, publicClient]
  );

  useEffect(() => {
    void fetchActivities(0, false);
  }, [fetchActivities]);

  const loadMore = useCallback(() => {
    if (
      isLoading ||
      isLoadingMore ||
      activities.length >= storedCount
    ) {
      return;
    }

    void fetchActivities(activities.length, true);
  }, [
    activities.length,
    storedCount,
    isLoading,
    isLoadingMore,
    fetchActivities,
  ]);

  const refetch = useCallback(() => {
    void fetchActivities(0, false);
    void refetchLegacyCount();
  }, [fetchActivities, refetchLegacyCount]);

  return {
    activities,
    totalCount: storedCount,
    legacyActivityCount: Number(userActivityCount ?? 0n),
    isLoading,
    isLoadingMore,
    isError,
    hasMore: activities.length < storedCount,
    loadMore,
    refetch,
  };
}