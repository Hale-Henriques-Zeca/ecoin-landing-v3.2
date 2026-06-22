import { Spot } from "@binance/connector";

let client: Spot | null = null;

export function connectBinance(
  apiKey: string,
  secretKey: string
) {
  client = new Spot(apiKey, secretKey);

  return true;
}

export async function getBalance() {
  if (!client) {
    throw new Error("Binance not connected");
  }

  const account = await client.account();

  return account.data.balances;
}