import { ethers } from "ethers";
import { db } from "../db";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // ou tua RPC

const CONTRACT_ADDRESS = "SEU_CONTRACT";
const ABI = [
  "event Deposited(address indexed user, uint256 amount)"
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

export function startListener() {
  console.log("👂 Listening Deposits...");

  contract.on("Deposited", async (user, amount) => {
    try {
      console.log("Deposit detected:", user, amount.toString());

      const ecGas = Number(amount) * 1000;

      await db.collection("users").updateOne(
        { wallet: user.toLowerCase() },
        { $inc: { ecGas } },
        { upsert: true }
      );

    } catch (err) {
      console.error("Listener error:", err);
    }
  });
}