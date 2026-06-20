import { ethers } from "ethers";
import { db } from "../db/connect";
import { formatUnits } from "ethers";
import User from "../models/User";

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org"); // ou tua RPC

const CONTRACT_ADDRESS = "0xcD55717633ABBa6758616949fCa54d8C41972535";
const ABI = [
  "event Deposited(address indexed user, uint256 amount)"
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

export function startListener() {
  console.log("👂 Listening Deposits...");

  // No teu blockchain/listener.ts
contract.on("Deposited", async (user, amount, tokenAddress) => {
  try {
    console.log("Deposit detected:", user, amount.toString());
    
    // Converte de Wei para unidades (ex: 18 casas)
    const amountFormatted = Number(formatUnits(amount, 18));
    
    // Define o multiplicador (1000) e calcula
    const ecGas = amountFormatted * 1000;

    // Atualiza o banco de dados usando $inc para somar ao valor existente
    await User.updateOne(
  { wallet: user.toLowerCase() },
  { $inc: { ecGas } },
  { upsert: true }
);
    
    console.log(`✅ Adicionado ${ecGas} ecGas para ${user}`);
  } catch (err) {
    console.error("Listener error:", err);
  }
});
}