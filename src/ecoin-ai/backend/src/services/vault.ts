import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("RPC_URL");

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const VAULT_ADDRESS = "SEU_CONTRACT";

const ABI = [
  "function redeem(address user, uint256 amount)"
];

const contract = new ethers.Contract(VAULT_ADDRESS, ABI, wallet);

export const vault = {
  redeem: async (user: string, amount: number) => {
    const tx = await contract.redeem(user, amount);
    await tx.wait();
  }
};