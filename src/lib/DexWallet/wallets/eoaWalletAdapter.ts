import type {
  Address,
  Hex,
} from "viem";

import type {
  EoaWalletAdapterConfig,
  WalletExecutionAdapter,
  WalletExecutionRequest,
  WalletExecutionResult,
} from "./walletExecution.types";

export class EoaWalletAdapter implements WalletExecutionAdapter {
  readonly type = "EOA" as const;

  constructor(
    private readonly config: EoaWalletAdapterConfig
  ) {}

  async getAddress(): Promise<Address> {
    const [address] = await this.config.walletClient.getAddresses();

    if (!address) {
      throw new Error("Nenhuma conta EOA está conectada.");
    }

    return address;
  }

  async sendTransaction(
    request: WalletExecutionRequest
  ): Promise<WalletExecutionResult> {
    const sender = await this.getAddress();

    const hash = await this.config.walletClient.sendTransaction({
      account: sender,
      chain: this.config.walletClient.chain,
      to: request.to,
      data: request.data,
      value: request.value ?? 0n,
    });

    return {
      hash,
      executionType: "EOA",
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