'use client';

import React from 'react';
import { useWithdrawProfit } from '../hooks/useWithdrawProfit';

interface WithdrawProfitButtonProps {
  allocatedProfits: { asset: string; amount: number }[];
}

export const WithdrawProfitButton: React.FC<WithdrawProfitButtonProps> = ({
  allocatedProfits,
}) => {
  const { withdraw, isProcessing } = useWithdrawProfit();

  return (
    <button
      onClick={() => withdraw(allocatedProfits)}
      disabled={isProcessing}
      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs transition-all shadow-md uppercase tracking-wider"
    >
      {isProcessing ? 'Processing...' : 'WITHDRAW PROFIT'}
    </button>
  );
};

export default WithdrawProfitButton;