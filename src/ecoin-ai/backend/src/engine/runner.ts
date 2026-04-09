import { runBotCycle } from "./tradingEngine";

setInterval(() => {
  runBotCycle();
}, 5000);