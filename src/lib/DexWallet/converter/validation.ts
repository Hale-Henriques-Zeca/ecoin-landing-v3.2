import {
  decodeAbiParameters,
  isAddress,
  isHex,
  parseAbiParameters,
  parseUnits,
  type Hex,
} from "viem";

import type {
  ConverterAsset,
  ConverterAssetSymbol,
  ConverterValidationResult,
} from "@/types/converter";

import {
  CONVERTER_SETTINGS,
  NATIVE_BNB,
  ZERO_ADDRESS,
} from "./contracts";

import {
  isConverterAssetConfigured,
} from "./assets";

import {
  getConverterProvider,
} from "./providers";

/**
 * =========================================================
 * 1. WALLET ADDRESS
 * =========================================================
 */

export function validateWalletAddress(
  address?: string
): ConverterValidationResult {
  if (!address || !isAddress(address)) {
    return {
      valid: false,
      message: "Invalid wallet address.",
    };
  }

  if (address.toLowerCase() === ZERO_ADDRESS.toLowerCase()) {
    return {
      valid: false,
      message: "Zero address cannot be used as a wallet.",
    };
  }

  return { valid: true };
}

/**
 * =========================================================
 * 2. ASSET CONFIGURATION
 * =========================================================
 */

export function validateConverterAsset(
  asset: ConverterAsset
): ConverterValidationResult {
  if (!isAddress(asset.address)) {
    return {
      valid: false,
      message: `${asset.symbol} has an invalid address.`,
    };
  }

  const normalizedAddress = asset.address.toLowerCase();

  if (
    normalizedAddress === ZERO_ADDRESS.toLowerCase()
  ) {
    return {
      valid: false,
      message: `${asset.symbol} is not configured.`,
    };
  }

  if (
    asset.isNative &&
    normalizedAddress !== NATIVE_BNB.toLowerCase()
  ) {
    return {
      valid: false,
      message: "Invalid native BNB configuration.",
    };
  }

  if (
    !asset.isNative &&
    normalizedAddress === NATIVE_BNB.toLowerCase()
  ) {
    return {
      valid: false,
      message: "Native BNB cannot be configured as ERC20.",
    };
  }

  if (
    !Number.isInteger(asset.decimals) ||
    asset.decimals < 0 ||
    asset.decimals > 255
  ) {
    return {
      valid: false,
      message: `Invalid decimals for ${asset.symbol}.`,
    };
  }

  return { valid: true };
}

/**
 * =========================================================
 * 3. CONVERSION PAIR
 * =========================================================
 */

export function validateConversionPair(
  tokenIn: ConverterAsset,
  tokenOut: ConverterAsset
): ConverterValidationResult {
  if (
    tokenIn.address.toLowerCase() ===
    tokenOut.address.toLowerCase()
  ) {
    return {
      valid: false,
      message: "Select two different assets.",
    };
  }

  const inputValidation =
    validateConverterAsset(tokenIn);

  if (!inputValidation.valid) {
    return inputValidation;
  }

  const outputValidation =
    validateConverterAsset(tokenOut);

  if (!outputValidation.valid) {
    return outputValidation;
  }

  return { valid: true };
}

/**
 * =========================================================
 * 4. CONVERSION AMOUNT
 * =========================================================
 */

export function validateConversionAmount(
  amount: string,
  decimals = 18
): ConverterValidationResult {
  const normalized = amount.trim();

  if (!normalized) {
    return {
      valid: false,
      message: "Enter an amount.",
    };
  }

  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return {
      valid: false,
      message: "Enter a valid amount.",
    };
  }

  try {
    const parsedAmount = parseUnits(
      normalized,
      decimals
    );

    if (parsedAmount <= 0n) {
      return {
        valid: false,
        message: "Amount must be greater than zero.",
      };
    }
  } catch {
    return {
      valid: false,
      message: "Amount exceeds the supported precision.",
    };
  }

  return { valid: true };
}

/**
 * =========================================================
 * 5. SLIPPAGE
 * =========================================================
 */

export function validateSlippage(
  slippage: number
): ConverterValidationResult {
  if (!Number.isFinite(slippage)) {
    return {
      valid: false,
      message: "Invalid slippage.",
    };
  }

  if (
    slippage < CONVERTER_SETTINGS.minimumSlippage ||
    slippage > CONVERTER_SETTINGS.maximumSlippage
  ) {
    return {
      valid: false,
      message:
        `Slippage must be between ` +
        `${CONVERTER_SETTINGS.minimumSlippage}% and ` +
        `${CONVERTER_SETTINGS.maximumSlippage}%.`,
    };
  }

  return { valid: true };
}

/**
 * =========================================================
 * 6. PROVIDER ID
 * =========================================================
 */

export function validateProviderId(
  providerId?: string
): ConverterValidationResult {
  if (!providerId || !/^0x[0-9a-fA-F]{64}$/.test(providerId)) {
    return {
      valid: false,
      message: "Invalid DEX provider.",
    };
  }

  const provider = getConverterProvider(
    providerId as Hex
  );

  if (!provider) {
    return {
      valid: false,
      message: "DEX provider is not configured or enabled.",
    };
  }

  return { valid: true };
}

/**
 * =========================================================
 * 7. LIQUIDMESH ROUTE DATA
 * =========================================================
 *
 * Expected ABI encoding:
 *
 * abi.encode(
 *  bytes callData,
 *  uint256 callValue,
 *  uint256 validUntil,
 *  uint256 signedMinAmountOut,
 *  bytes signature
 * )
 */

const LIQUIDMESH_ROUTE_PARAMETERS =
  parseAbiParameters(
    "bytes callData, uint256 callValue, uint256 validUntil, uint256 signedMinAmountOut, bytes signature"
  );

export function validateRouteData(
  routeData?: Hex
): ConverterValidationResult {
  if (
    !routeData ||
    !isHex(routeData, { strict: true }) ||
    routeData === "0x"
  ) {
    return {
      valid: false,
      message: "Invalid conversion route.",
    };
  }

  try {
    const [
      callData,
      callValue,
      validUntil,
      signedMinAmountOut,
      signature,
    ] = decodeAbiParameters(
      LIQUIDMESH_ROUTE_PARAMETERS,
      routeData
    );

    if (callData === "0x" || callData.length < 4) {
      return {
        valid: false,
        message: "LiquidMesh callData is empty or invalid.",
      };
    }

    if (signature.length !== 132) {
      return {
        valid: false,
        message: "Invalid LiquidMesh signature length.",
      };
    }

    if (validUntil <= 0n) {
      return {
        valid: false,
        message: "LiquidMesh route has an invalid expiry.",
      };
    }

    if (signedMinAmountOut <= 0n) {
      return {
        valid: false,
        message: "Invalid signed minimum output.",
      };
    }

    // callValue is intentionally decoded and validated
    // by the execution flow against tokenIn and amountIn.
    void callValue;

    return { valid: true };
  } catch {
    return {
      valid: false,
      message: "LiquidMesh routeData has an invalid ABI encoding.",
    };
  }
}

/**
 * =========================================================
 * 8. COMPLETE CONVERSION REQUEST
 * =========================================================
 */

export function validateConverterForm(
  values: {
    tokenIn: ConverterAsset;
    tokenOut: ConverterAsset;
    amount: string;
    slippage: number;
    providerId?: string;
  }
): ConverterValidationResult {
  const pair = validateConversionPair(
    values.tokenIn,
    values.tokenOut
  );

  if (!pair.valid) return pair;

  const amount = validateConversionAmount(
    values.amount,
    values.tokenIn.decimals
  );

  if (!amount.valid) return amount;

  const slippage = validateSlippage(
    values.slippage
  );

  if (!slippage.valid) return slippage;

  const provider = validateProviderId(
    values.providerId
  );

  if (!provider.valid) return provider;

  return { valid: true };
}

/**
 * =========================================================
 * 9. ASSET AVAILABILITY
 * =========================================================
 */

export function canUseConverterAsset(
  symbol: ConverterAssetSymbol
): boolean {
  return isConverterAssetConfigured(symbol);
}