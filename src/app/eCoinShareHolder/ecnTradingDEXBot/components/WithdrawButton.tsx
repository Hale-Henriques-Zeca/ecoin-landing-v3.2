'use client';

import { useState } from 'react';
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

interface WithdrawButtonProps {
  availableProfitUsdt: number;
  onWithdraw?: (amount: number, asset: string) => Promise<void> | void;
  disabled?: boolean;
}

export default function WithdrawButton({
  availableProfitUsdt,
  onWithdraw,
  disabled = false,
}: WithdrawButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0 || numericAmount > availableProfitUsdt) return;

    setIsLoading(true);
    try {
      if (onWithdraw) {
        await onWithdraw(numericAmount, selectedAsset);
      }
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        setAmount('');
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={disabled || availableProfitUsdt <= 0}
        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
        type="button"
      >
        <ArrowUpRight className="w-4 h-4 stroke-[3]" />
        <span>Levantar Lucros (${availableProfitUsdt.toFixed(2)})</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#12181F] border border-emerald-500/30 w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-5 text-white shadow-2xl relative animate-in slide-in-from-bottom duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="py-8 text-center flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-2 animate-bounce" />
                <h3 className="text-base font-bold text-white">Saque Concluído!</h3>
                <p className="text-xs text-gray-400 mt-1">Os fundos foram transferidos para a sua carteira.</p>
              </div>
            ) : (
              <>
                <h3 className="text-base font-bold text-emerald-400 mb-1">Levantamento de Lucros</h3>
                <p className="text-xs text-gray-400 mb-4">
                  Saldo disponível: <span className="text-white font-semibold">${availableProfitUsdt.toFixed(2)} USDT</span>
                </p>

                <div className="mb-4">
                  <label className="text-[11px] text-gray-400 block mb-1">Selecione o Ativo de Saída</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['USDT', 'eDollar', 'BNB'].map((asset) => (
                      <button
                        key={asset}
                        type="button"
                        onClick={() => setSelectedAsset(asset)}
                        className={`py-2 text-xs font-bold rounded-lg border transition ${
                          selectedAsset === asset
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                            : 'bg-[#0B0E14] border-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {asset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] text-gray-400">Quantia a Sacar</label>
                    <button
                      onClick={() => setAmount(availableProfitUsdt.toString())}
                      className="text-[10px] text-emerald-400 font-bold hover:underline"
                      type="button"
                    >
                      MAX
                    </button>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#0B0E14] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={isLoading || !amount || parseFloat(amount) <= 0}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-extrabold text-sm rounded-xl transition shadow-md"
                  type="button"
                >
                  {isLoading ? 'Processando...' : 'Confirmar Saque'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}