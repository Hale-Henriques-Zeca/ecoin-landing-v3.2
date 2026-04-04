let initialBalance = 1000; // simulado
let currentBalance = 1000;

export function updateBalance(newBalance: number) {
  currentBalance = newBalance;
}

export function getProfit() {
  return currentBalance - initialBalance;
}