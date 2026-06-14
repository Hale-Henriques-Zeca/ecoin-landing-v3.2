export const miningStakingAbi = [
  {
    name: "stake",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
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
    name: "totalStaked",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },

  {
    name: "totalStakers",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },

  {
    name: "pendingRewards",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "userAddr", type: "address" }],
    outputs: [
      { name: "usdt", type: "uint256" },
      { name: "eusd", type: "uint256" },
    ],
  },

  {
    name: "userShareBP",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ type: "uint256" }],
  },

  {
    name: "preview",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "userAddr", type: "address" }],
    outputs: [
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "bool" },
    ],
  },

  {
    name: "rewardRates",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "userAddr", type: "address" }],
    outputs: [
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
    ],
  },

  {
    name: "projectedRewards",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "userAddr", type: "address" }],
    outputs: [
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
    ],
  },

  {
    name: "users",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [
      { name: "amount", type: "uint256" },
      { name: "rewardDebtUSDT", type: "uint256" },
      { name: "rewardDebtEUSD", type: "uint256" },
      { name: "pendingUSDT", type: "uint256" },
      { name: "pendingEUSD", type: "uint256" },
    ],
  },

  {
  name: "rewardBufferUSDT",
  type: "function",
  stateMutability: "view",
  inputs: [],
  outputs: [{ type: "uint256" }],
},

{
  name: "rewardBufferEUSD",
  type: "function",
  stateMutability: "view",
  inputs: [],
  outputs: [{ type: "uint256" }],
},

{
  name: "lastClaim",
  type: "function",
  stateMutability: "view",
  inputs: [{ name: "", type: "address" }],
  outputs: [{ type: "uint256" }],
},

{
  name: "lastStream",
  type: "function",
  stateMutability: "view",
  inputs: [],
  outputs: [{ type: "uint256" }],
},

{
  name: "streamRate",
  type: "function",
  stateMutability: "view",
  inputs: [],
  outputs: [{ type: "uint256" }],
},

{
  name: "stakeTimestamp",
  type: "function",
  stateMutability: "view",
  inputs: [{ name: "", type: "address" }],
  outputs: [{ type: "uint256" }],
},

{
  name: "CLAIM_COOLDOWN",
  type: "function",
  stateMutability: "view",
  inputs: [],
  outputs: [{ type: "uint256" }],
},

{
  name: "MIN_STAKE_TIME",
  type: "function",
  stateMutability: "view",
  inputs: [],
  outputs: [{ type: "uint256" }],
},
{
  type: "function",
  name: "owner",
  stateMutability: "view",
  inputs: [],
  outputs: [
    {
      type: "address"
    }
  ]
},
{
  name: "miningSession",
  type: "function",
  stateMutability: "view",
  inputs: [
    {
      name: "",
      type: "address",
    },
  ],
  outputs: [
    {
      type: "uint256",
    },
  ],
},
{
  name: "sessions",
  type: "function",
  stateMutability: "view",
  inputs: [
    {
      name: "",
      type: "address",
    },
    {
      name: "",
      type: "uint256",
    },
  ],
  outputs: [
    {
      name: "startedAt",
      type: "uint256",
    },
    {
      name: "endedAt",
      type: "uint256",
    },
    {
      name: "gasPurchased",
      type: "uint256",
    },
    {
      name: "gasConsumed",
      type: "uint256",
    },
    {
      name: "claimedUSDT",
      type: "uint256",
    },
    {
      name: "claimedEUSD",
      type: "uint256",
    },
    {
      name: "completed",
      type: "bool",
    },
  ],
},
{
  type: "event",
  name: "MiningSessionCompleted",
  inputs: [
    {
      indexed: true,
      name: "user",
      type: "address"
    },
    {
      indexed: true,
      name: "sessionId",
      type: "uint256"
    },
    {
      indexed: false,
      name: "gasUsed",
      type: "uint256"
    },
    {
      indexed: false,
      name: "usdtClaimed",
      type: "uint256"
    },
    {
      indexed: false,
      name: "eusdClaimed",
      type: "uint256"
    },
    {
      indexed: false,
      name: "startedAt",
      type: "uint256"
    },
    {
      indexed: false,
      name: "endedAt",
      type: "uint256"
    }
  ]
},


] as const;