export const TradingGasVaultAbi = [
  {
    "type": "function",
    "name": "deposit",
    "stateMutability": "nonpayable",
    "inputs": [{ "name": "amount", "type": "uint256" }],
    "outputs": []
  },
  {
    "type": "function",
    "name": "redeem",
    "stateMutability": "nonpayable",
    "inputs": [{ "name": "gasAmount", "type": "uint256" }],
    "outputs": []
  },
  {
    "type": "function",
    "name": "chargeFee",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "user", "type": "address" },
      { "name": "tradeAmount", "type": "uint256" },
      { "name": "isProfitable", "type": "bool" }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "ecGasBalance",
    "stateMutability": "view",
    "inputs": [{ "name": "", "type": "address" }],
    "outputs": [{ "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "usdtEquivalent",
    "stateMutability": "view",
    "inputs": [{ "name": "", "type": "address" }],
    "outputs": [{ "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "previewInternal",
    "stateMutability": "view",
    "inputs": [{ "name": "usdtAmount", "type": "uint256" }],
    "outputs": [{ "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "liquidityReserve",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "type": "address" }]
  },
  {
    "type": "function",
    "name": "setLiquidityReserve",
    "stateMutability": "nonpayable",
    "inputs": [{ "name": "_reserve", "type": "address" }],
    "outputs": []
  },
  {
    "type": "event",
    "name": "Deposited",
    "inputs": [
      { "name": "user", "type": "address", "indexed": true },
      { "name": "usdtAmount", "type": "uint256", "indexed": false },
      { "name": "gas", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "GasUsed",
    "inputs": [
      { "name": "user", "type": "address", "indexed": true },
      { "name": "gasUsed", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "Redeemed",
    "inputs": [
      { "name": "user", "type": "address", "indexed": true },
      { "name": "gas", "type": "uint256", "indexed": false },
      { "name": "ecoinAmount", "type": "uint256", "indexed": false }
    ]
  }
]

