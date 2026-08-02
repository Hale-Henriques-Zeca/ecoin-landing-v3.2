import { ethers } from "ethers";
import { provider } from "./blockchain.service";
import { PANCAKE_PAIR_ADDRESS } from "../constants";

// ABI mínimo para ler as reservas de um Pair da PancakeSwap V2 (Uniswap V2 Pair ABI)
const PAIR_ABI = [
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "function token0() external view returns (address)",
  "function token1() external view returns (address)"
];

const ERC20_ABI = [
  "function totalSupply() external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];

export const pancakeService = {
  async getReserves() {
    try {
      const pairContract = new ethers.Contract(PANCAKE_PAIR_ADDRESS, PAIR_ABI, provider);
      const reserves = await pairContract.getReserves();
      return {
        reserve0: reserves.reserve0,
        reserve1: reserves.reserve1,
      };
    } catch (error) {
      console.error("Erro ao buscar reservas da PancakeSwap:", error);
      return null;
    }
  },

  async getTokenSupply(tokenAddress: string): Promise<number> {
    try {
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const supply = await tokenContract.totalSupply();
      const decimals = await tokenContract.decimals();
      return Number(ethers.utils.formatUnits(supply, decimals));
    } catch (error) {
      console.error("Erro ao buscar Total Supply:", error);
      return 0;
    }
  }
};