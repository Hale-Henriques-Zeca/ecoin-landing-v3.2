export const PANCAKESWAP_ROUTER = {
  swapExactTokensForTokensUrl: (inputToken: string, outputToken: string) =>
    `https://pancakeswap.finance/swap?inputCurrency=${inputToken}&outputCurrency=${outputToken}`,
};