
"use client";

import { useMemo } from "react";

import {
  useReadContracts,
} from "wagmi";

import {
  DEX_ROUTER_REGISTRY_ABI,
} from "@/lib/abis/Converter/abis";

import {
  CONVERTER_CONTRACTS,
  ZERO_ADDRESS,
} from "@/lib/DexWallet/converter/contracts";

import {
  getConfiguredProviders,
} from "@/lib/DexWallet/converter/providers";

import type {
  ConverterProvider,
} from "@/types/converter";

export function useConverterProvider() {
  const configuredProviders = useMemo(
    () => getConfiguredProviders(),
    []
  );

  const contracts = useMemo(() => {
    return configuredProviders.flatMap((provider) => [
      {
        address: CONVERTER_CONTRACTS.routerRegistry,
        abi: DEX_ROUTER_REGISTRY_ABI,
        functionName: "providerAdapters" as const,
        args: [provider.id] as const,
      },
      {
        address: CONVERTER_CONTRACTS.routerRegistry,
        abi: DEX_ROUTER_REGISTRY_ABI,
        functionName: "approvedAdapters" as const,
        args: [provider.adapter!] as const,
      },
    ]);
  }, [configuredProviders]);

  const configured =
    CONVERTER_CONTRACTS.routerRegistry !== ZERO_ADDRESS;

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useReadContracts({
    contracts: contracts as never,
    query: {
      enabled: configured && configuredProviders.length > 0,
    },
  });

  const providers = useMemo(() => {
    return configuredProviders.map((provider, index) => {
      const adapterResult = data?.[index * 2];
      const approvalResult = data?.[index * 2 + 1];

      const registeredAdapter =
        adapterResult?.status === "success"
          ? String(adapterResult.result).toLowerCase()
          : undefined;

      const approved =
        approvalResult?.status === "success"
          ? Boolean(approvalResult.result)
          : undefined;

      const adapterMatches =
        !!provider.adapter &&
        registeredAdapter === provider.adapter.toLowerCase();

      return {
        ...provider,
        approved,
        registeredAdapter,
        adapterMatches,
        enabled:
          approved === true &&
          adapterMatches &&
          provider.enabled,
      };
    });
  }, [configuredProviders, data]);

  const activeProviders = providers.filter(
    (provider) => provider.enabled
  );

  const getProvider = (providerId: string) =>
    activeProviders.find(
      (provider) =>
        provider.id.toLowerCase() === providerId.toLowerCase()
    );

  return {
    providers,
    activeProviders,
    defaultProvider: activeProviders[0] as
      | ConverterProvider
      | undefined,
    getProvider,
    hasAvailableProvider: activeProviders.length > 0,
    isLoading,
    isError,
    configured,
    refetch,
  };
}
