export const eCoinMiningStakingAbi = [
  /* ================= USER ACTIONS ================= */

  {
    name: "stake",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },

  {
    name: "stakeFor",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "user", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },

  {
    name: "unstake",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },

  {
    name: "claim",
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

  {
    name: "pingStream",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },

  /* ================= GLOBAL VIEWS ================= */

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
    name: "accECoinPerShare",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "CLAIM_COOLDOWN",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "MIN_STAKE_TIME",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  {
    name: "capacityFromECoin",
    type: "function",
    stateMutability: "pure",
    inputs: [{ name: "ecoinAmount", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  /* ================= USER VIEWS ================= */

  {
    name: "pendingRewards",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "userAddr", type: "address" }],
    outputs: [{ name: "pendingECoinAmount", type: "uint256" }],
  },

  {
    name: "userShareBP",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "preview",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "userAddr", type: "address" }],
    outputs: [
      { name: "pendingECoin", type: "uint256" },
      { name: "remainingCapacity", type: "uint256" },
      { name: "usedCapacity", type: "uint256" },
      { name: "maxCapacity", type: "uint256" },
      { name: "willAccumulate", type: "bool" },
    ],
  },

  {
    name: "rewardRates",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "userAddr", type: "address" }],
    outputs: [
      { name: "ecoinPerSecond", type: "uint256" },
      { name: "ecoinPerMinute", type: "uint256" },
      { name: "ecoinPerHour", type: "uint256" },
      { name: "ecoinPerDay", type: "uint256" },
    ],
  },

  {
    name: "projectedRewards",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "userAddr", type: "address" }],
    outputs: [
      { name: "next24hECoin", type: "uint256" },
      { name: "next7dECoin", type: "uint256" },
      { name: "next30dECoin", type: "uint256" },
    ],
  },

  {
    name: "users",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [
      { name: "amount", type: "uint256" },
      { name: "rewardDebtECoin", type: "uint256" },
      { name: "pendingECoin", type: "uint256" },
    ],
  },

  {
    name: "isStaker",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },

  {
    name: "isMiningActive",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },

  {
    name: "gasCapacity",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "gasConsumed",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "gasPurchasedECoin",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "eligibleAmount",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "lastClaim",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "stakeTimestamp",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "miningSession",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    name: "sessions",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "uint256" },
    ],
    outputs: [
      { name: "startedAt", type: "uint256" },
      { name: "endedAt", type: "uint256" },
      { name: "gasPurchased", type: "uint256" },
      { name: "gasConsumed", type: "uint256" },
      { name: "claimedECoin", type: "uint256" },
      { name: "completed", type: "bool" },
    ],
  },

  /* ================= EVENTS ================= */

  {
    type: "event",
    name: "Staked",
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
  },

  {
    type: "event",
    name: "Unstaked",
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
  },

  {
    type: "event",
    name: "Claimed",
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "ecoinAmount", type: "uint256" },
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
    name: "GasInsufficient",
    anonymous: false,
    inputs: [
      { indexed: false, name: "user", type: "address" },
      { indexed: false, name: "missedReward", type: "uint256" },
    ],
  },

  {
    type: "event",
    name: "RewardOverflowReturned",
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "ecoinOverflow", type: "uint256" },
    ],
  },

  {
    type: "event",
    name: "MiningSessionCompleted",
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: true, name: "sessionId", type: "uint256" },
      { indexed: false, name: "gasUsed", type: "uint256" },
      { indexed: false, name: "ecoinClaimed", type: "uint256" },
      { indexed: false, name: "startedAt", type: "uint256" },
      { indexed: false, name: "endedAt", type: "uint256" },
    ],
  },
] as const;