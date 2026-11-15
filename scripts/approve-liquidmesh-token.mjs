
import dotenv from "dotenv";
import {
  Contract,
  JsonRpcProvider,
  Wallet,
  getAddress,
  parseUnits,
  formatUnits,
} from "ethers";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

dotenv.config({ path: ".env.local" });

const CONFIG = {
  rpcUrl: process.env.BSC_RPC_URL,
  privateKey: process.env.SWAP_TEST_PRIVATE_KEY,

  expectedWallet:
    "0x985fd6478d35D5599Ce70Fb7ae2Ccb026f3570a3",

  token:
    "0x55d398326f99059fF775485246999027B3197955",

  approval:
    "0x8157a9d65807521FBB8db8f37EEEcEfDD247E9B1",

  decimals: 18,
  defaultAmount: "1",
};

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address,address) view returns (uint256)",
  "function approve(address,uint256) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

function required(value, name) {
  if (!value || !value.trim()) {
    throw new Error(`Missing configuration: ${name}`);
  }

  return value.trim();
}

async function main() {
  const rpcUrl = required(CONFIG.rpcUrl, "BSC_RPC_URL");
  const privateKey = required(
    CONFIG.privateKey,
    "SWAP_TEST_PRIVATE_KEY"
  );

  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = new Wallet(privateKey, provider);

  const network = await provider.getNetwork();

  if (network.chainId !== 56n) {
    throw new Error(
      `Wrong network. Expected BSC Mainnet (56), got ${network.chainId}.`
    );
  }

  const expectedWallet = getAddress(CONFIG.expectedWallet);
  const actualWallet = getAddress(wallet.address);

  if (actualWallet !== expectedWallet) {
    throw new Error(
      `Wallet mismatch. Expected ${expectedWallet}, got ${actualWallet}.`
    );
  }

  const tokenAddress = getAddress(CONFIG.token);
  const approvalAddress = getAddress(CONFIG.approval);

  const tokenCode = await provider.getCode(tokenAddress);
  const approvalCode = await provider.getCode(approvalAddress);

  if (tokenCode === "0x") {
    throw new Error("USDT token contract has no code.");
  }

  if (approvalCode === "0x") {
    throw new Error("LiquidMesh Approval contract has no code.");
  }

  const token = new Contract(
    tokenAddress,
    ERC20_ABI,
    wallet
  );

  const symbol = await token.symbol();
  const decimals = Number(await token.decimals());

  if (decimals !== CONFIG.decimals) {
    throw new Error(
      `Unexpected ${symbol} decimals: ${decimals}.`
    );
  }

  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  try {
    console.log("");
    console.log("======================================");
    console.log(" EDENKINGDOM - LIQUIDMESH ALLOWANCE");
    console.log("======================================");
    console.log("");

    console.log("Network:       BNB Smart Chain Mainnet");
    console.log("Chain ID:      56");
    console.log("Wallet:       ", wallet.address);
    console.log("Token:        ", tokenAddress);
    console.log("Spender:      ", approvalAddress);
    console.log("Token symbol: ", symbol);
    console.log("");

    const amountInput = await rl.question(
      `Amount of ${symbol} to authorize [1]: `
    );

    const humanAmount =
      amountInput.trim() || CONFIG.defaultAmount;

    if (
      !/^[0-9]+(\.[0-9]+)?$/.test(humanAmount) ||
      Number(humanAmount) <= 0
    ) {
      throw new Error("Invalid token amount.");
    }

    const amount = parseUnits(humanAmount, decimals);

    const balance = await token.balanceOf(wallet.address);

    let allowance = await token.allowance(
      wallet.address,
      approvalAddress
    );

    console.log("");
    console.log("========== CURRENT STATUS ==========");
    console.log("Balance:", formatUnits(balance, decimals), symbol);
    console.log("Allowance:", formatUnits(allowance, decimals), symbol);
    console.log("Requested:", humanAmount, symbol);

    if (balance < amount) {
      throw new Error(
        `Insufficient ${symbol} balance for this approval test.`
      );
    }

    if (allowance >= amount) {
      console.log("");
      console.log("Allowance is already sufficient.");
      console.log("No approval transaction required.");
      return;
    }

    console.log("");
    console.log("This operation will authorize the exact amount.");
    console.log("It will NOT execute a swap.");

    const confirmation = await rl.question(
      `Authorize ${humanAmount} ${symbol} to LiquidMesh Approval? (YES/NO): `
    );

    if (confirmation.trim().toUpperCase() !== "YES") {
      console.log("Operation cancelled.");
      return;
    }

    // Some ERC20 tokens require resetting an existing allowance.
    if (allowance > 0n) {
      console.log("");
      console.log("Resetting previous allowance to zero...");

      const resetTx = await token.approve(
        approvalAddress,
        0n
      );

      console.log("Reset transaction:", resetTx.hash);

      await resetTx.wait(1);

      allowance = await token.allowance(
        wallet.address,
        approvalAddress
      );

      if (allowance !== 0n) {
        throw new Error("Allowance reset was not confirmed.");
      }
    }

    console.log("");
    console.log("Sending exact approval...");

    const approvalTx = await token.approve(
      approvalAddress,
      amount
    );

    console.log("Approval transaction:", approvalTx.hash);

    const receipt = await approvalTx.wait(1);

    if (!receipt || receipt.status !== 1) {
      throw new Error("Approval transaction failed.");
    }

    const finalAllowance = await token.allowance(
      wallet.address,
      approvalAddress
    );

    console.log("");
    console.log("========== FINAL STATUS ==========");
    console.log("Transaction:", approvalTx.hash);
    console.log("Block:", receipt.blockNumber);
    console.log(
      "Final allowance:",
      formatUnits(finalAllowance, decimals),
      symbol
    );

    if (finalAllowance < amount) {
      throw new Error("Final allowance is below requested amount.");
    }

    console.log("");
    console.log("SUCCESS: LiquidMesh allowance confirmed.");
    console.log("No swap was executed.");
  } finally {
    rl.close();
    provider.destroy();
  }
}

main().catch((error) => {
  console.error("");
  console.error("ALLOWANCE ERROR:");
  console.error(error.shortMessage || error.message || error);
  process.exitCode = 1;
});
