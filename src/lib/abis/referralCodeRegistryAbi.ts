export const referralCodeRegistryAbi = [

  {
    inputs: [
      {
        internalType: "string",
        name: "code",
        type: "string"
      }
    ],
    name: "resolveCode",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },

  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address"
      }
    ],
    name: "hasCode",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },

  {
    inputs: [
      {
        internalType: "string",
        name: "code",
        type: "string"
      }
    ],
    name: "registerCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },

  {
    inputs: [
      {
        internalType: "string",
        name: "newCode",
        type: "string"
      }
    ],
    name: "changeCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }

] as const;