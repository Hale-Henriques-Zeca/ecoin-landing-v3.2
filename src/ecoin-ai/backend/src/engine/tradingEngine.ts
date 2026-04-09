import User from "../models/User";

export const runBotCycle = async () => {
  const users = await User.find({ botActive: true });

  for (const user of users) {
    if (user.ecGas <= 0) continue;

    const profit = Math.random() * 2; // simulação
    const cost = 10;

    user.ecGas -= cost;
    user.totalProfit += profit;

    await user.save();

    console.log(`🤖 ${user.wallet} +${profit} USDT`);
  }
};