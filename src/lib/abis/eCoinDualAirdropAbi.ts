export const eCoinDualAirdropAbi = [
  {
    type: "function",
    name: "currentSeason",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "seasons",
    stateMutability: "view",
    inputs: [{ name: "", type: "uint256" }],
    outputs: [
      { name: "seasonId", type: "uint256" },
      { name: "openedAt", type: "uint256" },
      { name: "active", type: "bool" },
    ],
  },
  {
    type: "function",
    name: "airdropAmounts",
    stateMutability: "view",
    inputs: [
      { name: "", type: "uint256" },
      { name: "", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "userMining",
    stateMutability: "view",
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "uint256" },
      { name: "", type: "address" },
    ],
    outputs: [
      { name: "startedAt", type: "uint256" },
      { name: "totalReward", type: "uint256" },
      { name: "claimedAmount", type: "uint256" },
      { name: "started", type: "bool" },
    ],
  },
  {
    type: "function",
    name: "getMiningStatus",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "seasonId", type: "uint256" },
      { name: "token", type: "address" },
    ],
    outputs: [
      { name: "accumulated", type: "uint256" },
      { name: "claimable", type: "uint256" },
      { name: "remaining", type: "uint256" },
    ],
  },
  {
    type: "function",
    name: "startMining",
    stateMutability: "nonpayable",
    inputs: [{ name: "token", type: "address" }],
    outputs: [],
  },
  {
    type: "function",
    name: "claim",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "seasonId", type: "uint256" },
    ],
    outputs: [],
  },
] as const;