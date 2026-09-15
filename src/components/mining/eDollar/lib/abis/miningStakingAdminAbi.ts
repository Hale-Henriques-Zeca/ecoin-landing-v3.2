export const miningStakingAdminAbi = [

  {
    name: "totalStaked",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
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
    name: "streamRate",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },

  {
    name: "authorizedInjectors",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "injector", type: "address" }],
    outputs: [{ type: "bool" }],
  },

  {
    name: "setAuthorizedInjector",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "injector", type: "address" },
      { name: "allowed", type: "bool" }
    ],
    outputs: [],
  },

  {
    name: "injectUSDT",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },

  {
    name: "injectEUSD",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
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
      { name: "amount", type: "uint256" }
    ],
    outputs: [],
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
}

];