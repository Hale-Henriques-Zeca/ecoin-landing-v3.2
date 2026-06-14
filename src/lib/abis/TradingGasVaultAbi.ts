export const TradingGasVaultAbi = [

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
  type: "function",
  name: "usdtEnabled",
  stateMutability: "view",
  inputs: [],
  outputs: [{ type: "bool" }]
},
{
  type: "function",
  name: "eusdEnabled",
  stateMutability: "view",
  inputs: [],
  outputs: [{ type: "bool" }]
},
{
  type: "function",
  name: "depositUSDT",
  stateMutability: "nonpayable",
  inputs: [{ name: "amount", type: "uint256" }],
  outputs: []
},
{
  type: "function",
  name: "depositEUSD",
  stateMutability: "nonpayable",
  inputs: [{ name: "amount", type: "uint256" }],
  outputs: []
},
{
  type: "function",
  name: "setUSDTEnabled",
  stateMutability: "nonpayable",
  inputs: [{ name: "enabled", type: "bool" }],
  outputs: []
},
{
  type: "function",
  name: "setEUSDEnabled",
  stateMutability: "nonpayable",
  inputs: [{ name: "enabled", type: "bool" }],
  outputs: []
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
  type: "function",
  name: "setCollector",
  stateMutability: "nonpayable",
  inputs: [
    {
      name: "_collector",
      type: "address"
    }
  ],
  outputs: []
},
{
  type: "function",
  name: "feeCollector",
  stateMutability: "view",
  inputs: [],
  outputs: [
    {
      type: "address"
    }
  ]
},
{
  type: "function",
  name: "owner",
  stateMutability: "view",
  inputs: [],
  outputs: [{ type: "address" }]
}

] as const;

