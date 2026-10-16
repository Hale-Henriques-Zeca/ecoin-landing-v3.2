export const edenActivityRegistryAbi = [
  // READ / MAPPINGS
  {
    type: "function",
    name: "activityCount",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "authorizedRecorders",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },

  // EVENTS
  {
    type: "event",
    name: "ActivityRecorded",
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: true, name: "activityType", type: "bytes32" },
      { indexed: true, name: "token", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: false, name: "source", type: "address" },
      { indexed: false, name: "referenceId", type: "bytes32" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
  },
  {
    type: "event",
    name: "ReferralLinkRecorded",
    inputs: [
      { indexed: true, name: "upline", type: "address" },
      { indexed: true, name: "downline", type: "address" },
      { indexed: true, name: "referenceId", type: "bytes32" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
  },
  {
    type: "event",
    name: "ReferralCodeUsed",
    inputs: [
      { indexed: true, name: "upline", type: "address" },
      { indexed: true, name: "downline", type: "address" },
      { indexed: true, name: "codeHash", type: "bytes32" },
      { indexed: false, name: "code", type: "string" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
  },
  {
    type: "event",
    name: "ReferralCodeRegistered",
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: true, name: "codeHash", type: "bytes32" },
      { indexed: false, name: "code", type: "string" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
  },
] as const;