
import type { Address } from "viem";

export const BSC_CHAIN_ID = 56;

export const SEND_ROUTER_ADDRESS =
  process.env.NEXT_PUBLIC_ECOIN_SEND_ROUTER as Address;

export const INTERNAL_CONVERTER_ADDRESS =
  process.env.NEXT_PUBLIC_INTERNAL_CONVERTER as Address;

export const SEND_ROUTER_ABI = [
  {
    type: "function",
    name: "sendToken",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "recipient", type: "address" },
      { name: "grossAmount", type: "uint256" }
    ],
    outputs: [
      { name: "feeAmount", type: "uint256" },
      { name: "netAmount", type: "uint256" }
    ]
  },
  {
    type: "function",
    name: "sendBNB",
    stateMutability: "payable",
    inputs: [
      { name: "recipient", type: "address" }
    ],
    outputs: [
      { name: "feeAmount", type: "uint256" },
      { name: "netAmount", type: "uint256" }
    ]
  },
  {
    type: "function",
    name: "calculateFee",
    stateMutability: "pure",
    inputs: [
      { name: "grossAmount", type: "uint256" }
    ],
    outputs: [
      { name: "feeAmount", type: "uint256" },
      { name: "netAmount", type: "uint256" }
    ]
  }
] as const;

export const ERC20_ABI = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" }
    ],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" }
    ],
    outputs: [{ name: "", type: "uint256" }]
  }
] as const;
