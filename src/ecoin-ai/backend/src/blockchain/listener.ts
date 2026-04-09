import { ethers } from "ethers";
import User from "../models/User";

const provider = new ethers.JsonRpcProvider(process.env.RPC);

const contract = new ethers.Contract(
  process.env.VAULT!,
  [
    "event Deposited(address user, uint256 amount)"
  ],
  provider
);

contract.on("Deposited", async (user, amount) => {
  console.log("Deposit detected:", user, amount.toString());

  const gas = Number(amount) * 1000; // 1 USDT = 1000 ecGas

  await User.findOneAndUpdate(
    { wallet: user.toLowerCase() },
    {
      $inc: {
        ecGas: gas,
        totalDeposited: Number(amount)
      }
    },
    { upsert: true }
  );
});