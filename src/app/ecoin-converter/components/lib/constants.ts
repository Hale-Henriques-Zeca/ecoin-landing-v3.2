import { parseAbi } from "viem";
import { bsc as bscChain } from "wagmi/chains";

export const BSC_CHAIN_ID = 56;

// BSC Config com o contrato nativo Multicall3 (para usar na config do Wagmi/createPublicClient)
export const bscInfinity = {
  ...bscChain,
  contracts: {
    ...bscChain.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11" as `0x${string}`,
      blockCreated: 15921452,
    },
  },
} as const;

// Endereço Oficial Atualizado do PancakeSwap Infinity Universal Router (BSC)
export const PANCAKESWAP_ROUTER = "0xd9C500DfF816a1Da21A48A732d3498Bf09dc9AEB" as `0x${string}`;

export const TOKENS = {
  ECOIN: {
    address: "0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964" as `0x${string}`,
    symbol: "E-Coin",
    decimals: 18,
  },
  USDT: {
    address: "0x55d398326f99059fF775485246999027B3197955" as `0x${string}`,
    symbol: "USDT",
    decimals: 18,
  },
};

export const UNIVERSAL_ROUTER_ABI = parseAbi([
  "function execute(bytes commands, bytes[] inputs, uint256 deadline) external payable",
  "function execute(bytes commands, bytes[] inputs) external payable"
]);

export const ERC20_ABI = parseAbi([
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)"
]);