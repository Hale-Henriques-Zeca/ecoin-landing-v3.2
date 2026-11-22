export const miningFeeCollectorAbi = [
  /* ================= CLAIM PROCESSING ================= */

  {
    name: "processClaimECoin",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "user", type: "address" },
      { name: "ecoinAmount", type: "uint256" },
    ],
    outputs: [],
  },

  /* ================= VIEW / STATE ================= */

  {
    name: "ecoin",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "referral",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "staking",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "treasury",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "activityRegistry",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "authorizedClaimers",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },

  {
    name: "authorizedInjectors",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },

  {
    name: "BP",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "CLAIM_FEE_BP",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "ACT_CLAIM",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bytes32" }],
  },

  {
    name: "ACT_REFERRAL",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bytes32" }],
  },

  {
    name: "SOURCE_MINING",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bytes32" }],
  },

  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  /* ================= ADMIN / INITIALIZER ================= */

  {
    name: "initialize",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_ecoin", type: "address" },
      { name: "_referral", type: "address" },
      { name: "_staking", type: "address" },
      { name: "_treasury", type: "address" },
      { name: "owner_", type: "address" },
    ],
    outputs: [],
  },

  {
    name: "setAuthorizedClaimer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "claimer", type: "address" },
      { name: "allowed", type: "bool" },
    ],
    outputs: [],
  },

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
    name: "setTreasury",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_treasury", type: "address" }],
    outputs: [],
  },

  {
    name: "setStaking",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_staking", type: "address" }],
    outputs: [],
  },

  {
    name: "setReferral",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_referral", type: "address" }],
    outputs: [],
  },

  {
    name: "setActivityRegistry",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_activityRegistry", type: "address" }],
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
    name: "ClaimProcessed",
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "netECoin", type: "uint256" },
      { indexed: false, name: "feeECoin", type: "uint256" },
    ],
  },

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

  {
    type: "event",
    name: "ClaimerAuthorized",
    anonymous: false,
    inputs: [
      { indexed: false, name: "claimer", type: "address" },
      { indexed: false, name: "allowed", type: "bool" },
    ],
  },

  {
    type: "event",
    name: "ActivityRegistryUpdated",
    anonymous: false,
    inputs: [{ indexed: true, name: "registry", type: "address" }],
  },

  {
    type: "event",
    name: "ReferralUpdated",
    anonymous: false,
    inputs: [{ indexed: true, name: "referral", type: "address" }],
  },
] as const;