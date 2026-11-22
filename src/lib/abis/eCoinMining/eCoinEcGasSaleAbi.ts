export const eCoinEcGasSaleAbi = [
  /* ================= BUY ================= */

  {
    name: "buyECoin",
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

  /* ================= VIEW / STATE ================= */

  {
    name: "ecoinEnabled",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },

  {
    name: "ecoin",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },

  {
    name: "collector",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },

  {
    name: "mining",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },

  {
    name: "activityRegistry",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },

  {
    name: "ACT_DEPOSIT",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
  },

  {
    name: "SOURCE",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
  },

  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
  },

  /* ================= ADMIN / INITIALIZER ================= */

  {
    name: "initialize",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_ecoin",
        type: "address",
      },
      {
        name: "_collector",
        type: "address",
      },
      {
        name: "_staking",
        type: "address",
      },
      {
        name: "owner_",
        type: "address",
      },
    ],
    outputs: [],
  },

  {
    name: "setECoinEnabled",
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

  {
    name: "setMining",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_mining",
        type: "address",
      },
    ],
    outputs: [],
  },

  {
    name: "setActivityRegistry",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_activityRegistry",
        type: "address",
      },
    ],
    outputs: [],
  },

  {
    name: "transferOwnership",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "newOwner",
        type: "address",
      },
    ],
    outputs: [],
  },

  {
    name: "renounceOwnership",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },

  {
    name: "upgradeTo",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "newImplementation",
        type: "address",
      },
    ],
    outputs: [],
  },

  {
    name: "upgradeToAndCall",
    type: "function",
    stateMutability: "payable",
    inputs: [
      {
        name: "newImplementation",
        type: "address",
      },
      {
        name: "data",
        type: "bytes",
      },
    ],
    outputs: [],
  },

  /* ================= EVENTS ================= */

  {
    name: "CapacityPurchased",
    type: "event",
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        name: "ecoinAmount",
        type: "uint256",
      },
      {
        indexed: false,
        name: "capacityAdded",
        type: "uint256",
      },
    ],
  },

  {
    name: "ActivityRegistryUpdated",
    type: "event",
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "registry",
        type: "address",
      },
    ],
  },
] as const;