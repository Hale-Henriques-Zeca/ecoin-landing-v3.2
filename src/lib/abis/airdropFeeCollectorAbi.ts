export const airdropFeeCollectorAbi = [
  {
    type: "function",
    name: "CLAIM_FEE_BP",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "", type: "uint256" },
    ],
  },
  {
    type: "function",
    name: "feeSplit",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "miningStableCoinBP", type: "uint256" },
      { name: "miningCryptoCoinBP", type: "uint256" },
      { name: "liquidityBP", type: "uint256" },
      { name: "salaryBP", type: "uint256" },
      { name: "treasuryBP", type: "uint256" },
      { name: "buybackBP", type: "uint256" },
      { name: "tradingBP", type: "uint256" },
      { name: "ecosystemBP", type: "uint256" },
      { name: "referralBP", type: "uint256" },
    ],
  },
] as const;