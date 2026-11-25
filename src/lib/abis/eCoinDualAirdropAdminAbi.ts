export const eCoinDualAirdropAdminAbi = [
  /* ================= VIEW / TELEMETRY ================= */

  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "eCoinToken",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "eDollarToken",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "airdropFeeCollector",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "currentSeason",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "MINING_DURATION",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "paused",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
  },

  {
    name: "seasons",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "uint256" }],
    outputs: [
      { name: "seasonId", type: "uint256" },
      { name: "openedAt", type: "uint256" },
      { name: "active", type: "bool" },
    ],
  },

  {
    name: "getSeasonInfo",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "seasonId", type: "uint256" }],
    outputs: [
      { name: "seasonIdOut", type: "uint256" },
      { name: "openedAt", type: "uint256" },
      { name: "active", type: "bool" },
    ],
  },

  {
    name: "tokenPaused",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },

  {
    name: "airdropAmounts",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "", type: "uint256" },
      { name: "", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "reservedRewards",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "getVaultBalance",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "token", type: "address" }],
    outputs: [
      { name: "totalBalance", type: "uint256" },
      { name: "reserved", type: "uint256" },
      { name: "freeBalance", type: "uint256" },
    ],
  },

  {
    name: "hasClaimed",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "uint256" },
      { name: "", type: "address" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },

  {
    name: "userMining",
    type: "function",
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
    name: "getMiningStatus",
    type: "function",
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

  /* ================= ADMIN & TREASURY CONTROLS ================= */

  {
    name: "initialize",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "owner_", type: "address" },
      { name: "_eCoinToken", type: "address" },
      { name: "_eDollarToken", type: "address" },
    ],
    outputs: [],
  },

  {
    name: "restore",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },

  {
    name: "pauseGlobal",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },

  {
    name: "unpauseGlobal",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },

  {
    name: "setTokenPause",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "paused", type: "bool" },
    ],
    outputs: [],
  },

  {
    name: "setAirdropFeeCollector",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_airdropFeeCollector", type: "address" }],
    outputs: [],
  },

  {
    name: "setAirdropAmount",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },

  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },

  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
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

  /* ================= USER ACTIONS ================= */

  {
    name: "startMining",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "token", type: "address" }],
    outputs: [],
  },

  {
    name: "startMiningBoth",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },

  {
    name: "claim",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "token", type: "address" }],
    outputs: [],
  },

  {
    name: "claim",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "seasonId", type: "uint256" },
    ],
    outputs: [],
  },

  {
    name: "claimCurrent",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "token", type: "address" }],
    outputs: [],
  },

  {
    name: "claimBoth",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "seasonId", type: "uint256" }],
    outputs: [],
  },

  /* ================= EVENTS ================= */

  {
    type: "event",
    name: "SeasonRestored",
    anonymous: false,
    inputs: [
      { indexed: true, name: "newSeason", type: "uint256" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
  },

  {
    type: "event",
    name: "TokenPauseStatusUpdated",
    anonymous: false,
    inputs: [
      { indexed: true, name: "token", type: "address" },
      { indexed: false, name: "paused", type: "bool" },
    ],
  },

  {
    type: "event",
    name: "AirdropAmountUpdated",
    anonymous: false,
    inputs: [
      { indexed: true, name: "season", type: "uint256" },
      { indexed: true, name: "token", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
  },

  {
    type: "event",
    name: "FundsDeposited",
    anonymous: false,
    inputs: [
      { indexed: true, name: "sender", type: "address" },
      { indexed: true, name: "token", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
  },

  {
    type: "event",
    name: "FundsWithdrawn",
    anonymous: false,
    inputs: [
      { indexed: true, name: "recipient", type: "address" },
      { indexed: true, name: "token", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
  },

  {
    type: "event",
    name: "MiningStarted",
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: true, name: "season", type: "uint256" },
      { indexed: true, name: "token", type: "address" },
      { indexed: false, name: "totalReward", type: "uint256" },
      { indexed: false, name: "startedAt", type: "uint256" },
    ],
  },

  {
    type: "event",
    name: "AirdropClaimed",
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: true, name: "season", type: "uint256" },
      { indexed: true, name: "token", type: "address" },
      { indexed: false, name: "grossAmount", type: "uint256" },
    ],
  },

  {
    type: "event",
    name: "AirdropFeeCollectorUpdated",
    anonymous: false,
    inputs: [{ indexed: true, name: "newCollector", type: "address" }],
  },
] as const;