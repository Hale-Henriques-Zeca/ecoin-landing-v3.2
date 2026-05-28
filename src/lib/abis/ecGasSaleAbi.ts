export const ecGasSaleAbi = [

  /* ================= BUY ================= */

  {
    name: "buyUSDT",
    type: "function",
    stateMutability: "nonpayable",

    inputs: [
      {
        name: "amount",
        type: "uint256",
      },
    ],

    outputs: [],
  },

  {
    name: "buyEUSD",
    type: "function",
    stateMutability: "nonpayable",

    inputs: [
      {
        name: "amount",
        type: "uint256",
      },
    ],

    outputs: [],
  },

  /* ================= STATUS ================= */

  {
    name: "usdtEnabled",
    type: "function",
    stateMutability: "view",

    inputs: [],

    outputs: [
      {
        type: "bool",
      },
    ],
  },

  {
    name: "eusdEnabled",
    type: "function",
    stateMutability: "view",

    inputs: [],

    outputs: [
      {
        type: "bool",
      },
    ],
  },

  /* ================= ADMIN ================= */

  {
    name: "setUSDTEnabled",
    type: "function",
    stateMutability: "nonpayable",

    inputs: [
      {
        name: "enabled",
        type: "bool",
      },
    ],

    outputs: [],
  },

  {
    name: "setEUSDEnabled",
    type: "function",
    stateMutability: "nonpayable",

    inputs: [
      {
        name: "enabled",
        type: "bool",
      },
    ],

    outputs: [],
  },

  {
    name: "setCollector",
    type: "function",
    stateMutability: "nonpayable",

    inputs: [
      {
        name: "_collector",
        type: "address",
      },
    ],

    outputs: [],
  },

] as const;