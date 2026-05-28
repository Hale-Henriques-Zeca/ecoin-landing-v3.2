export const miningFeeCollectorAbi = [

  {
    name: "authorizedClaimers",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ type: "bool" }],
  },

  {
    name: "authorizedInjectors",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ type: "bool" }],
  },

  {
    name: "processClaim",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "user", type: "address" },
      { name: "usdtAmount", type: "uint256" },
      { name: "eusdAmount", type: "uint256" },
    ],
    outputs: [],
  },

  {
    name: "treasury",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },

] as const;