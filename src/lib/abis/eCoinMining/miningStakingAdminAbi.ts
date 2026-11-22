export const miningStakingAdminAbi = [
  /* ================= VIEW / TELEMETRY ================= */

  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "ecoin",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "claimCollector",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "totalStaked",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "totalEligibleStaked",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "totalEligibleStakedSupply",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "totalStakers",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "rewardBufferECoin",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "accECoinPerShare",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "lastStream",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "streamRate",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "authorizedInjectors",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "injector", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },

  /* ================= INJECTOR / REWARDS ================= */

  {
    name: "setAuthorizedInjector",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "injector", type: "address" },
      { name: "allowed", type: "bool" },
    ],
    outputs: [],
  },

  {
    name: "injectInstantECoin",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },

  {
    name: "addECoinBuffer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },

  {
    name: "addGasCapacity",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "user", type: "address" },
      { name: "ecoinAmount", type: "uint256" },
    ],
    outputs: [],
  },

  {
    name: "pingStream",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },

  {
    name: "streamRewards",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },

  /* ================= ADMIN CONFIG & TREASURY ================= */

  {
    name: "initialize",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_ecoin", type: "address" },
      { name: "owner_", type: "address" },
    ],
    outputs: [],
  },

  {
    name: "setClaimCollector",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_collector", type: "address" }],
    outputs: [],
  },

  {
    name: "withdrawExcess",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "to", type: "address" }],
    outputs: [],
  },

  {
    name: "emergencyWithdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },

  {
    name: "transferOwnership",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "newOwner", type: "address" }],
    outputs: [],
  },

  {
    name: "renounceOwnership",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },

  {
    name: "upgradeTo",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "newImplementation", type: "address" }],
    outputs: [],
  },

  {
    name: "upgradeToAndCall",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "newImplementation", type: "address" },
      { name: "data", type: "bytes" },
    ],
    outputs: [],
  },

  /* ================= EVENTS ================= */

  {
    type: "event",
    name: "RewardInjected",
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
  },

  {
    type: "event",
    name: "InjectorAuthorized",
    anonymous: false,
    inputs: [
      { indexed: false, name: "injector", type: "address" },
      { indexed: false, name: "allowed", type: "bool" },
    ],
  },
] as const;