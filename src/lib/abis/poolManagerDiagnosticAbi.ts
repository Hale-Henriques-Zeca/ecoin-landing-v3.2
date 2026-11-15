
export const poolManagerDiagnosticAbi = [
  {
    type: "function",
    name: "getSlot0",
    stateMutability: "view",
    inputs: [
      { name: "id", type: "bytes32" },
    ],
    outputs: [
      { name: "sqrtPriceX96", type: "uint160" },
      { name: "tick", type: "int24" },
      { name: "protocolFee", type: "uint24" },
      { name: "lpFee", type: "uint24" },
    ],
  },
  {
    type: "function",
    name: "poolIdToPoolKey",
    stateMutability: "view",
    inputs: [
      { name: "id", type: "bytes32" },
    ],
    outputs: [
      { name: "currency0", type: "address" },
      { name: "currency1", type: "address" },
      { name: "hooks", type: "address" },
      { name: "poolManager", type: "address" },
      { name: "fee", type: "uint24" },
      { name: "parameters", type: "bytes32" },
    ],
  },
] as const;
