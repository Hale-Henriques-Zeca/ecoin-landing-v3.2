import type {
  Address,
  Hex,
  PublicClient,
  WalletClient,
} from "viem";

export type WalletExecutionType = "EOA" | "SMART_ACCOUNT";

export interface WalletExecutionRequest {
  to: Address;
  data: Hex;
  value?: bigint;
}

export interface WalletExecutionResult {
  hash: Hex;
  executionType: WalletExecutionType;
  sender: Address;
}

export interface WalletExecutionAdapter {
  readonly type: WalletExecutionType;

  getAddress(): Promise<Address>;

  sendTransaction(
    request: WalletExecutionRequest
  ): Promise<WalletExecutionResult>;

  waitForTransaction(
    hash: Hex
  ): Promise<boolean>;
}

export interface EoaWalletAdapterConfig {
  walletClient: WalletClient;
  publicClient: PublicClient;
}

export interface SmartAccountExecutionResult {
  hash: Hex;
}

export interface SmartAccountWalletAdapterConfig {
  address: Address;

  /**
   * Esta função deve ser fornecida pelo SDK/relayer real
   * da Cloud Wallet / Smart Account.
   */
  execute: (
    request: WalletExecutionRequest
  ) => Promise<SmartAccountExecutionResult>;

  publicClient: PublicClient;
}

export interface WalletExecutionFactoryConfig {
  eoa?: EoaWalletAdapterConfig;
  smartAccount?: SmartAccountWalletAdapterConfig;
}