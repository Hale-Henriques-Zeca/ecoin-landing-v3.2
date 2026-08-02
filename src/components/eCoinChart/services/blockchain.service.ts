import { ethers } from "ethers";
import { NETWORK } from "../constants";

// Provider público para a BNB Smart Chain (BSC) compatível com ethers v6
const BSC_RPC_URL = "https://bsc-dataseed.binance.org/";

export const provider = new ethers.JsonRpcProvider(BSC_RPC_URL);

export const blockchainService = {
  provider,
  network: NETWORK,
};