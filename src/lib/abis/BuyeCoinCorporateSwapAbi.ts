
export const BuyeCoinCorporateSwapAbi = [
  // =========================================================
  // BUY ECOIN WITH USDT
  // =========================================================
  {
    type: "function",
    name: "buyEcoin",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "minAmountOut", type: "uint256" },
    ],
    outputs: [
      { name: "amountOut", type: "uint256" },
    ],
  },

  // =========================================================
  // BUY PREVIEW
  // =========================================================
  {
    type: "function",
    name: "previewBuy",
    stateMutability: "view",
    inputs: [
      { name: "amountIn", type: "uint256" },
    ],
    outputs: [
      { name: "buyerUSDT", type: "uint256" },
      { name: "usdtToLiquidity", type: "uint256" },
      { name: "usdtToCollector", type: "uint256" },
      { name: "ecoinAmount", type: "uint256" },
      { name: "sqrtPriceX96", type: "uint160" },
    ],
  },

  // =========================================================
  // PANCAKESWAP INFINITY CL PRICE
  // =========================================================
  {
    type: "function",
    name: "getCurrentSqrtPriceX96",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "sqrtPriceX96", type: "uint160" },
      { name: "tick", type: "int24" },
      { name: "protocolFee", type: "uint24" },
      { name: "lpFee", type: "uint24" },
    ],
  },

  // =========================================================
  // PUBLIC CONFIGURATION
  // =========================================================
  {
    type: "function",
    name: "ECOIN",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "USDT",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "poolManager",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "poolId",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bytes32" }],
  },
  {
    type: "function",
    name: "liquidityVault",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "feeCollector",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  // =========================================================
  // CONSTANTS
  // =========================================================
  {
    type: "function",
    name: "BP",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "COLLECTOR_BP",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "Q96",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },

  // =========================================================
  // OWNERSHIP / PAUSE STATUS
  // =========================================================
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "paused",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
  },

  // =========================================================
  // ADMIN FUNCTIONS
  // =========================================================
  {
    type: "function",
    name: "setFeeCollector",
    stateMutability: "nonpayable",
    inputs: [
      { name: "newCollector", type: "address" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "setLiquidityVault",
    stateMutability: "nonpayable",
    inputs: [
      { name: "newVault", type: "address" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "setPool",
    stateMutability: "nonpayable",
    inputs: [
      { name: "newManager", type: "address" },
      { name: "newPoolId", type: "bytes32" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "pause",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "unpause",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },

  // =========================================================
  // EVENTS
  // =========================================================
  {
    type: "event",
    name: "EcoinPurchased",
    anonymous: false,
    inputs: [
      { name: "buyer", type: "address", indexed: true },
      { name: "usdtPaid", type: "uint256", indexed: false },
      { name: "usdtToLiquidity", type: "uint256", indexed: false },
      { name: "usdtToCollector", type: "uint256", indexed: false },
      { name: "ecoinDelivered", type: "uint256", indexed: false },
      { name: "sqrtPriceX96", type: "uint160", indexed: false },
    ],
  },
  {
    type: "event",
    name: "FeeCollectorUpdated",
    anonymous: false,
    inputs: [
      { name: "previousCollector", type: "address", indexed: true },
      { name: "newCollector", type: "address", indexed: true },
    ],
  },
  {
    type: "event",
    name: "LiquidityVaultUpdated",
    anonymous: false,
    inputs: [
      { name: "previousVault", type: "address", indexed: true },
      { name: "newVault", type: "address", indexed: true },
    ],
  },
  {
    type: "event",
    name: "PoolUpdated",
    anonymous: false,
    inputs: [
      { name: "previousManager", type: "address", indexed: true },
      { name: "newManager", type: "address", indexed: true },
      { name: "previousPoolId", type: "bytes32", indexed: false },
      { name: "newPoolId", type: "bytes32", indexed: false },
    ],
  },
  {
    type: "event",
    name: "EmergencyPause",
    anonymous: false,
    inputs: [
      { name: "account", type: "address", indexed: true },
    ],
  },
  {
    type: "event",
    name: "EmergencyUnpause",
    anonymous: false,
    inputs: [
      { name: "account", type: "address", indexed: true },
    ],
  },
] as const;
