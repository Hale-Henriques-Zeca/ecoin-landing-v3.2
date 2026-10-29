
import { bscChain } from
  "@/components/eCoinCloudWallet/lib/chains";

function readAddress(
  value: string | undefined,
  name: string,
): `0x${string}` | undefined {
  if (!value) return undefined;

  if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
    throw new Error(
      `Endereço inválido na configuração: ${name}`,
    );
  }

  return value as `0x${string}`;
}

export const walletConfig = {
  chainId: bscChain.id,

  contracts: {
    cloudWalletFactory: readAddress(
      process.env.NEXT_PUBLIC_CLOUD_WALLET_FACTORY,
      "CLOUD_WALLET_FACTORY",
    ),

    entryPoint: readAddress(
      process.env.NEXT_PUBLIC_ENTRY_POINT,
      "ENTRY_POINT",
    ),

    internalConverter: readAddress(
      process.env.NEXT_PUBLIC_INTERNAL_CONVERTER,
      "INTERNAL_CONVERTER",
    ),

    feeRegistry: readAddress(
      process.env.NEXT_PUBLIC_FEE_REGISTRY,
      "FEE_REGISTRY",
    ),

    feeCollector: readAddress(
      process.env.NEXT_PUBLIC_FEE_COLLECTOR,
      "FEE_COLLECTOR",
    ),

    feeDistributor: readAddress(
      process.env.NEXT_PUBLIC_FEE_DISTRIBUTOR,
      "FEE_DISTRIBUTOR",
    ),

    edenActivityRegistry: readAddress(
      process.env.NEXT_PUBLIC_EDEN_ACTIVITY_REGISTRY,
      "EDEN_ACTIVITY_REGISTRY",
    ),
  },
} as const;
