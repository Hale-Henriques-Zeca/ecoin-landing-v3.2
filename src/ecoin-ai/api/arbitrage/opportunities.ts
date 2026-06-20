import { startBinanceStream } from "../../engine/websocket/binance";

export const opportunities: {
  route: string;
  profit: number;
  timestamp: number;
}[] = [];

startBinanceStream();