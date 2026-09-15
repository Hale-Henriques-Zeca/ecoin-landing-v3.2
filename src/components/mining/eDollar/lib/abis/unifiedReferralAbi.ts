export const unifiedReferralAbi = [
  /* ================= PROFILE ================= */

  {
    type: "function",
    name: "setProfile",
    stateMutability: "nonpayable",
    inputs: [
      { name: "username", type: "string" },
      { name: "country", type: "bytes32" },
      { name: "region", type: "bytes32" },
      { name: "metadataURI", type: "string" },
    ],
    outputs: [],
  },

  {
    type: "function",
    name: "profiles",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [
      { name: "username", type: "string" },
      { name: "country", type: "bytes32" },
      { name: "region", type: "bytes32" },
      { name: "metadataURI", type: "string" },
      { name: "createdAt", type: "uint256" },
    ],
  },

  /* ================= REFERRAL ================= */

  {
    type: "function",
    name: "bindInviter",
    stateMutability: "nonpayable",
    inputs: [{ name: "inviter", type: "address" }],
    outputs: [],
  },

  {
    type: "function",
    name: "inviterOf",
    stateMutability: "view",
    inputs: [{ name: "invitee", type: "address" }],
    outputs: [{ name: "", type: "address" }],
  },

  {
    type: "function",
    name: "directReferrals",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  /* ================= REWARDS ================= */

  {
    type: "function",
    name: "pendingRewards",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "token", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    type: "function",
    name: "totalRewards",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    type: "function",
    name: "claim",
    stateMutability: "nonpayable",
    inputs: [{ name: "token", type: "address" }],
    outputs: [],
  },

  /* ================= SCORE ================= */

  {
    type: "function",
    name: "getScore",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  /* ================= SOURCES ================= */

  {
    type: "function",
    name: "SOURCE_MINING",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bytes32" }],
  },

  {
    type: "function",
    name: "SOURCE_TRADING",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bytes32" }],
  },

  /* ================= ANALYTICS ================= */

  {
    type: "function",
    name: "usersPerCountry",
    stateMutability: "view",
    inputs: [{ name: "", type: "bytes32" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  {
    type: "function",
    name: "rewardsPerCountry",
    stateMutability: "view",
    inputs: [{ name: "", type: "bytes32" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;