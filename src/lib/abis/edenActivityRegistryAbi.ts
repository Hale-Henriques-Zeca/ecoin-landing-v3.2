
export const edenActivityRegistryAbi = [
  // READ / MAPPINGS
  {
    type: "function",
    name: "activityCount",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "importedActivityCount",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "authorizedRecorders",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },

  // NUMBER OF STORED ACTIVITIES
  {
    type: "function",
    name: "getUserActivityCount",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },

  // SINGLE ACTIVITY
  {
    type: "function",
    name: "getUserActivity",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "index", type: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "activityType", type: "bytes32" },
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "source", type: "address" },
          { name: "referenceId", type: "bytes32" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },

  // PAGINATED HISTORY — NEWEST FIRST
  {
    type: "function",
    name: "getUserActivities",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [
      {
        name: "result",
        type: "tuple[]",
        components: [
          { name: "activityType", type: "bytes32" },
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "source", type: "address" },
          { name: "referenceId", type: "bytes32" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },

  // EVENTS
  {
    type: "event",
    name: "RecorderAuthorized",
    inputs: [
      { indexed: true, name: "recorder", type: "address" },
      { indexed: false, name: "allowed", type: "bool" },
    ],
  },
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
  {
    type: "event",
    name: "HistoricalActivitiesImported",
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "quantity", type: "uint256" },
      { indexed: false, name: "newStoredCount", type: "uint256" },
    ],
  },
] as const;
