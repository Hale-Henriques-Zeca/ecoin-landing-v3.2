export const bsc: Chain = {

  id: 56,

  name: 'BNB Smart Chain',

  network: 'bsc',

  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },

  rpcUrls: {
    default: {
      http: [
        'https://bsc-dataseed.bnbchain.org'
      ],
    },
  },

  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://bscscan.com',
    },
  },

  bsc: true,
};