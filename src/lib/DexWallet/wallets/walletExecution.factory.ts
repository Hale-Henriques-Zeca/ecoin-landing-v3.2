import type {
  WalletExecutionAdapter,
  WalletExecutionFactoryConfig,
  WalletExecutionType,
} from "./walletExecution.types";

import { EoaWalletAdapter } from "./eoaWalletAdapter";
import { SmartAccountWalletAdapter } from "./smartAccountWalletAdapter";

export function createWalletExecutionAdapter(
  type: WalletExecutionType,
  config: WalletExecutionFactoryConfig
): WalletExecutionAdapter {
  if (type === "EOA") {
    if (!config.eoa) {
      throw new Error(
        "A configuração da carteira EOA não foi fornecida."
      );
    }

    return new EoaWalletAdapter(config.eoa);
  }

  if (type === "SMART_ACCOUNT") {
    if (!config.smartAccount) {
      throw new Error(
        "A configuração da Cloud Wallet não foi fornecida."
      );
    }

    return new SmartAccountWalletAdapter(
      config.smartAccount
    );
  }

  throw new Error("Tipo de execução de carteira não suportado.");
}