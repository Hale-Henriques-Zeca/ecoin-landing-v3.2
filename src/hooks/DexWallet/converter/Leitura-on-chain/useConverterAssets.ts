
"use client";

import { useMemo } from "react";

import {
  useReadContracts,
} from "wagmi";

import {
  DEX_INTERNAL_CONVERTER_ABI,
} from "@/lib/abis/Converter/abis";

import {
  CONVERTER_CONTRACTS,
  CONVERTER_TOKENS,
  NATIVE_BNB,
  ZERO_ADDRESS,
} from "@/lib/DexWallet/converter/contracts";

import {
  CONVERTER_ASSETS,
} from "@/lib/DexWallet/converter/assets";

import type {
  ConverterAssetSymbol,
} from "@/types/converter";

import type {
  Address,
} from "viem";

interface UseConverterAssetsParams {
  tokenIn?: ConverterAssetSymbol;
  tokenOut?: ConverterAssetSymbol;
}

export function useConverterAssets({
  tokenIn,
  tokenOut,
}: UseConverterAssetsParams = {}) {
  const tokens = useMemo(() => {
    return [
      CONVERTER_TOKENS.eCoin.address,
      CONVERTER_TOKENS.USDT.address,
      CONVERTER_TOKENS.eDollar.address,
    ].filter((address) => address !== ZERO_ADDRESS);
  }, []);

  const assets = useMemo(() => {
    return [
      {
        symbol: "eCoin",
        address: CONVERTER_TOKENS.eCoin.address,
        isNative: false,
      },
      {
        symbol: "USDT",
        address: CONVERTER_TOKENS.USDT.address,
        isNative: false,
      },
      {
        symbol: "eDollar",
        address: CONVERTER_TOKENS.eDollar.address,
        isNative: false,
      },
      {
        symbol: "BNB",
        address: NATIVE_BNB,
        isNative: true,
      },
    ] as const;
  }, []);

  const pairs = useMemo(() => {
    if (!tokenIn || !tokenOut) return [];

    const input = CONVERTER_ASSETS[tokenIn];
    const output = CONVERTER_ASSETS[tokenOut];

    return [
      {
        address: input.address,
        tokenOut: output.address,
        key: "selected",
      },
    ];
  }, [tokenIn, tokenOut]);

  const contracts = useMemo(() => {
    const assetCalls = tokens.map((address) => ({
      address: CONVERTER_CONTRACTS.internalConverter,
      abi: DEX_INTERNAL_CONVERTER_ABI,
      functionName: "supportedAssets" as const,
      args: [address] as const,
    }));

    const pairCalls = pairs.map((pair) => ({
      address: CONVERTER_CONTRACTS.internalConverter,
      abi: DEX_INTERNAL_CONVERTER_ABI,
      functionName: "pairEnabled" as const,
      args: [
        pair.address,
        pair.tokenOut,
      ] as const,
    }));

    return [...assetCalls, ...pairCalls];
  }, [tokens, pairs]);

  const configured =
    CONVERTER_CONTRACTS.internalConverter !== ZERO_ADDRESS;

  const { data, isLoading, isError, refetch } =
    useReadContracts({
      contracts: contracts as never,
      query: {
        enabled: configured,
      },
    });

  const supportedAssets = useMemo(() => {
    const result: Record<string, boolean | undefined> = {};

    tokens.forEach((address, index) => {
      result[address.toLowerCase()] =
        data?.[index]?.status === "success"
          ? Boolean(data[index].result)
          : undefined;
    });

    // BNB is handled as a native asset by the contract.
    result[NATIVE_BNB.toLowerCase()] = true;

    return result;
  }, [data, tokens]);

  const pairOffset = tokens.length;

  const pairEnabled =
    pairs.length > 0 &&
    data?.[pairOffset]?.status === "success"
      ? Boolean(data[pairOffset].result)
      : undefined;

  const selectableAssets = useMemo(() => {
    return assets.filter((asset) => {
      if (asset.isNative) return true;

      return supportedAssets[asset.address.toLowerCase()] === true;
    });
  }, [assets, supportedAssets]);

  const isPairSupported =
    tokenIn && tokenOut
      ? pairEnabled === true
      : false;

  const pairStatus =
    !tokenIn || !tokenOut
      ? "not_selected"
      : pairEnabled === undefined
        ? "loading"
        : pairEnabled
          ? "enabled"
          : "disabled";

  return {
    assets,
    selectableAssets,
    supportedAssets,
    isPairSupported,
    pairEnabled,
    pairStatus,
    isLoading,
    isError,
    configured,
    refetch,
  };
}
