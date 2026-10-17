
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

  // O contrato não guarda estes dois campos.
  // Só estarão disponíveis quando obtidos de uma fonte externa.
  blockNumber?: bigint;
  transactionHash?: Hex;
}

const ACTIVITY_NAMES: Record<string, string> = {
  DEPOSIT: "Depósito",
  WITHDRAWAL: "Levantamento",
  ADD_PROFIT_MARGIN: "Adicionar Margem de Lucro",
  REMOVE_PROFIT_MARGIN: "Remover Margem de Lucro",
  PROFIT: "Lucro / Rendimento",
  REFERRAL: "Recompensa de Referência",
  REFERRAL_CLAIM: "Resgate de Referência",
  ADD_PROFIT_CAPACITY: "Emissão de Selo CS",
  CLAIM: "Resgate / Claim",
  TRADING: "Atividade de Trading",
  INVESTMENT: "Investimento",
  LINK_UPLINE: "Vínculo de Referência",
  REFERRAL_CODE_REGISTERED: "Registo de Código",
  OFFICIAL_TOKEN_REGISTERED: "Registo de Token Oficial",
  CUSTOM_TOKEN_ADDED: "Token Personalizado Adicionado",
  CUSTOM_TOKEN_REMOVED: "Token Personalizado Removido",
  CUSTOM_TOKEN_DETECTED: "Token Personalizado Detectado",
  CUSTOM_TOKEN_TRANSFERRED: "Transferência de Token",
  CUSTOM_TOKEN_APPROVED: "Aprovação de Token",
  CONVERSION: "Conversão",
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
  WALLET_FROZEN: "Carteira Bloqueada",
  WALLET_UNFROZEN: "Carteira Desbloqueada",
  GUARDIAN_STATUS_CHANGED: "Estado do Guardian Alterado",
  SECURITY_OPERATOR_UPDATED: "Operador de Segurança Atualizado",
  WALLET_GUARDIAN_FACTORY_UPDATED: "Fábrica de Guardian Atualizada",
  GAS_SPONSORSHIP_AUTHORIZED: "Patrocínio de Gas Autorizado",
  GAS_SPONSORSHIP_COMPLETED: "Patrocínio de Gas Concluído",
  TRANSFER: "Transferência",
  SERVICE_FEE: "Taxa de Serviço",
  WALLET_CREATED: "Carteira Criada",
  WALLET_EXECUTED: "Operação de Carteira",
  WALLET_BATCH_EXECUTED: "Operações em Lote",
  WALLET_SESSION_EXECUTED: "Operação por Sessão",
  AIRDROP_CLAIM: "Reivindicação de Airdrop",
  AIRDROP_SERVICE_FEE: "Taxa do Airdrop",
  AIRDROP_REFERRAL: "Referência de Airdrop",
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

  // Contador antigo mantido pelo contrato.
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

    // Total efetivamente guardado no novo histórico.
    totalCount: storedCount,

    // Contador preexistente, que pode incluir atividades antigas.
    legacyActivityCount: Number(userActivityCount ?? 0n),

    isLoading,
    isLoadingMore,
    isError,

    hasMore: activities.length < storedCount,

    loadMore,
    refetch,
  };
}
