
import "dotenv/config";
import {
  createPublicClient,
  http,
  formatUnits,
  isAddress,
} from "viem";
import { bsc } from "viem/chains";

const client = createPublicClient({
  chain: bsc,
  transport: http("https://bsc-dataseed.binance.org/"),
});

const wallet = "0x985fd6478d35D5599Ce70Fb7ae2Ccb026f3570a3";

const tokens = {
  USDT: "0x55d398326f99059fF775485246999027B3197955",
  ECOIN: "0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964",
};

const approval = "0x8157a9d65807521FBB8db8f37EEEcEfDD247E9B1";
const router = "0x3d90f66B534Dd8482b181e24655A9e8265316BE9";

const abi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ type: "uint256" }],
  },
];

async function main() {
  if (!isAddress(wallet)) throw new Error("Invalid wallet address");

  console.log("\n=== LIQUIDMESH WALLET DIAGNOSTIC ===");
  console.log("Wallet:", wallet);

  const bnb = await client.getBalance({ address: wallet });
  console.log("BNB:", formatUnits(bnb, 18));

  for (const [symbol, token] of Object.entries(tokens)) {
    const balance = await client.readContract({
      address: token,
      abi,
      functionName: "balanceOf",
      args: [wallet],
    });

    console.log(`\n=== ${symbol} ===`);
    console.log("Balance:", formatUnits(balance, 18));

    for (const [name, spender] of [
      ["LiquidMesh Approval", approval],
      ["LiquidMesh Router", router],
    ]) {
      const allowance = await client.readContract({
        address: token,
        abi,
        functionName: "allowance",
        args: [wallet, spender],
      });

      console.log(`${name} allowance:`, formatUnits(allowance, 18));
    }
  }
}

main().catch((error) => {
  console.error("Diagnostic failed:", error.shortMessage || error.message);
  process.exitCode = 1;
});
