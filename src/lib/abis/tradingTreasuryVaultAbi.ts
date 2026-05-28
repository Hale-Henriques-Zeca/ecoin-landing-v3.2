export const tradingTreasuryVaultAbi = [

  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },

  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "token", type: "address" }],
    outputs: [{ type: "uint256" }],
  },

  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [],
  },

  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [],
  },

  {
    name: "dailyWithdrawLimit",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },

  {
    name: "withdrawnToday",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },

  {
    name: "setDailyWithdrawLimit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "limit", type: "uint256" }],
    outputs: [],
  },

  {
    name: "setAuthorizedCaller",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "caller", type: "address" },
      { name: "allowed", type: "bool" }
    ],
    outputs: [],
  },

  {
    name: "setAuthorizedSpender",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "allowed", type: "bool" }
    ],
    outputs: [],
  },

];