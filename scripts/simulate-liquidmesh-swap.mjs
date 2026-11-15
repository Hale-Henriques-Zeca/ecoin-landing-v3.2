
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local", quiet: true });

const ROUTER =
  "0x3d90f66B534Dd8482b181e24655A9e8265316BE9";

const APPROVAL =
  "0x8157a9d65807521FBB8db8f37EEEcEfDD247E9B1";

const USDT =
  "0x55d398326f99059fF775485246999027B3197955";

const file = path.resolve(
  "scripts/liquidmesh-swap-response.json"
);

const rpcUrl =
  process.env.BSC_RPC_URL ||
  process.env.NEXT_PUBLIC_BSC_RPC_URL;

if (!rpcUrl) {
  throw new Error("Missing BSC_RPC_URL.");
}

const provider = new ethers.JsonRpcProvider(rpcUrl);

const erc20 = new ethers.Contract(
  USDT,
  [
    "function balanceOf(address) view returns (uint256)",
    "function allowance(address,address) view returns (uint256)",
    "function decimals() view returns (uint8)"
  ],
  provider
);

function requireAddress(value, name) {
  if (!ethers.isAddress(value)) {
    throw new Error(`Invalid ${name}`);
  }
  return ethers.getAddress(value);
}

async function main() {
  console.log("\n=== EDENKINGDOM LIQUIDMESH SIMULATION ===\n");

  const result = JSON.parse(fs.readFileSync(file, "utf8"));

  if (result.success !== true || result.swap?.code !== 0) {
    throw new Error("Swap response is not successful.");
  }

  const data = result.swap.data;
  const call = data?.callMsg;

  if (!call) {
    throw new Error("Missing callMsg.");
  }

  const network = await provider.getNetwork();

  if (network.chainId !== 56n) {
    throw new Error("Wrong blockchain network.");
  }

  if (String(data.chainId) !== "56") {
    throw new Error("Wrong LiquidMesh chain.");
  }

  const from = requireAddress(call.from, "sender");
  const to = requireAddress(call.to, "router");

  if (to !== ethers.getAddress(ROUTER)) {
    throw new Error("Unexpected router.");
  }

  if (
    from !== requireAddress(result.userAddress, "user")
  ) {
    throw new Error("Sender mismatch.");
  }

  if (
    result.inputToken.toLowerCase() !== USDT.toLowerCase()
  ) {
    throw new Error("This diagnostic supports USDT input only.");
  }

  if (
    !ethers.isHexString(call.data) ||
    ethers.dataLength(call.data) < 4
  ) {
    throw new Error("Invalid calldata.");
  }

  const value = BigInt(call.value);

  if (value !== 0n) {
    throw new Error("Unexpected BNB value.");
  }

  const expiry = Number(data.expiryTimestamp);
  const now = Math.floor(Date.now() / 1000);

  if (!Number.isSafeInteger(expiry)) {
    throw new Error("Invalid order expiry.");
  }

  console.log("Wallet:", from);
  console.log("Router:", to);
  console.log("Selector:", call.data.slice(0, 10));
  console.log("Order ID:", data.orderId);
  console.log("Expiry:", new Date(expiry * 1000).toISOString());

  const decimals = Number(await erc20.decimals());

  const [balance, allowance] = await Promise.all([
    erc20.balanceOf(from),
    erc20.allowance(from, APPROVAL)
  ]);

  const requiredAmount = BigInt(result.inputAmount);

  console.log("\n=== USDT STATUS ===");
  console.log("Balance:", ethers.formatUnits(balance, decimals));
  console.log("Allowance:", ethers.formatUnits(allowance, decimals));
  console.log("Required:", ethers.formatUnits(requiredAmount, decimals));

  if (expiry <= now) {
    console.log("\nORDER EXPIRED.");
    console.log("Generate a fresh swap response before simulation.");
    return;
  }

  if (balance < requiredAmount) {
    console.log("\nInsufficient USDT balance.");
    return;
  }

  if (allowance < requiredAmount) {
    console.log("\nInsufficient LiquidMesh allowance.");
    return;
  }

  const tx = {
    from,
    to,
    data: call.data,
    value
  };

  console.log("\n=== ETH_CALL SIMULATION ===");

  try {
    const simulation = await provider.call(tx);
    console.log("Simulation successful.");
    console.log("Return data:", simulation);
  } catch (error) {
    console.log("Simulation reverted:");
    console.log(error.shortMessage || error.message);
    return;
  }

  console.log("\n=== GAS ESTIMATE ===");

  try {
    const gas = await provider.estimateGas(tx);
    console.log("Estimated gas:", gas.toString());
  } catch (error) {
    console.log("Gas estimation failed:");
    console.log(error.shortMessage || error.message);
  }

  console.log("\nNO TRANSACTION WAS SIGNED OR BROADCAST.");
}

main().catch((error) => {
  console.error("\nDIAGNOSTIC ERROR:");
  console.error(error.shortMessage || error.message);
  process.exitCode = 1;
});
