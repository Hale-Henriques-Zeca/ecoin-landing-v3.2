"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount, useReadContract, usePublicClient } from "wagmi";
import { formatUnits, hexToString, trim, keccak256, toBytes, parseAbiItem } from "viem";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { edenActivityRegistryAbi } from "@/lib/abis/edenActivityRegistryAbi";

export interface ActivityRecord {
  user: string;
  activityTypeHash: `0x${string}`;
  activityLabel: string;
  token: string;
  amount: number;
  source: string;
  referenceId: `0x${string}`;
  timestamp: number;
  blockNumber: bigint;
  transactionHash: `0x${string}`;
}

// Mapeamento de tipos de atividade para nomes legíveis
const ACTIVITY_NAMES: Record<string, string> = {
  DEPOSIT: "Depósito",
  WITHDRAWAL: "Levantamento",
  ADD_PROFIT_MARGIN: "Adicionar Margem de Lucro",
  REMOVE_PROFIT_MARGIN: "Remover Margem de Lucro",
  PROFIT: "Lucro / Rendimento",
  REFERRAL: "Recompensa de Referência",
  REFERRAL_CLAIM: "Resgate de Referência",
  ADD_PROFIT_CAPACITY: "Emissão de Selo CS",
  CLAIM: "Resgate",
  TRADING: "Atividade de Trading",
  INVESTMENT: "Investimento",
  LINK_UPLINE: "Vínculo de Referência",
  REFERRAL_CODE_REGISTERED: "Registo de Código",
  TRANSFER: "Transferência",
  SERVICE_FEE: "Taxa de Serviço",
  WALLET_CREATED: "Carteira Criada",
};

export function useEdenActivityRegistry() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Leitura da contagem total de atividades registradas
  const { data: userActivityCount, refetch: refetchCount } = useReadContract({
    abi: edenActivityRegistryAbi,
    address: CONTRACTS.EDEN_ACTIVITY_REGISTRY,
    functionName: "activityCount",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Função para buscar os logs do evento ActivityRecorded diretamente da BSC
  const fetchLogs = useCallback(async () => {
    if (!address || !publicClient) {
      setActivities([]);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    try {
      const logs = await publicClient.getLogs({
        address: CONTRACTS.EDEN_ACTIVITY_REGISTRY,
        event: parseAbiItem(
          "event ActivityRecorded(address indexed user, bytes32 indexed activityType, address indexed token, uint256 amount, address source, bytes32 referenceId, uint256 timestamp)"
        ),
        args: {
          user: address,
        },
        fromBlock: "earliest",
        toBlock: "latest",
      });

      const parsed: ActivityRecord[] = logs.map((log) => {
        const args = log.args;
        const rawType = (args.activityType as `0x${string}`) || "0x0";

        return {
          user: args.user || address,
          activityTypeHash: rawType,
          activityLabel: parseActivityLabel(rawType),
          token: args.token || "0x0000000000000000000000000000000000000000",
          amount: args.amount ? Number(formatUnits(args.amount, 18)) : 0,
          source: args.source || "",
          referenceId: (args.referenceId as `0x${string}`) || "0x0",
          timestamp: args.timestamp ? Number(args.timestamp) * 1000 : Date.now(),
          blockNumber: log.blockNumber ?? 0n,
          transactionHash: log.transactionHash ?? "0x0",
        };
      }).reverse(); // Mais recentes primeiro

      setActivities(parsed);
    } catch (error) {
      console.error("Erro ao procurar logs de atividade:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient]);

  useEffect(() => {
    void fetchLogs();
  }, [fetchLogs]);

  const refetch = () => {
    void fetchLogs();
    void refetchCount();
  };

  return {
    activities,
    totalCount: userActivityCount ? Number(userActivityCount) : activities.length,
    isLoading,
    isError,
    refetch,
  };
}

// Utilitário para mapear bytes32 keccak256 para nome legível
function parseActivityLabel(hash: string): string {
  const normalized = hash.toLowerCase();

  for (const [key, label] of Object.entries(ACTIVITY_NAMES)) {
    const calculatedHash = keccak256(toBytes(key)).toLowerCase();
    if (calculatedHash === normalized) {
      return label;
    }
  }

  try {
    const str = hexToString(trim(hash as `0x${string}`, { dir: "right" }));
    if (str.trim().length > 0) return str;
  } catch {
    // Ignorar falha ao tentar converter hex plano
  }

  return "Actividade no Protocolo";
}