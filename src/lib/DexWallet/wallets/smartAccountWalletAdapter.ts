import type {
  Address,
  Hex,
} from "viem";

import type {
  SmartAccountWalletAdapterConfig,
  WalletExecutionAdapter,
  WalletExecutionRequest,
  WalletExecutionResult,
} from "./walletExecution.types";

export class SmartAccountWalletAdapter
  implements WalletExecutionAdapter
{
  readonly type = "SMART_ACCOUNT" as const;

  constructor(
    private readonly config: SmartAccountWalletAdapterConfig
  ) {}

  async getAddress(): Promise<Address> {
    return this.config.address;
  }

  async sendTransaction(
    request: WalletExecutionRequest
  ): Promise<WalletExecutionResult> {
    const sender = await this.getAddress();

    const result = await this.config.execute(request);

    if (!result?.hash) {
      throw new Error(
        "A Smart Account não devolveu um hash de execução válido."
      );
    }

    return {
      hash: result.hash,
      executionType: "SMART_ACCOUNT",
      sender,
    };
  }

  async waitForTransaction(hash: Hex): Promise<boolean> {
    const receipt =
      await this.config.publicClient.waitForTransactionReceipt({
        hash,
      });

    return receipt.status === "success";
  }
}