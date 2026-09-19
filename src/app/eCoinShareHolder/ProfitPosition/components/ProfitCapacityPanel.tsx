'use client';

import React, { useState } from 'react';
import { MarketType } from '../types';

interface ProfitCapacityPanelProps {
  market: MarketType;
  onBuyCapacity: (amount: number, asset: string) => void;
}

export const ProfitCapacityPanel: React.FC<ProfitCapacityPanelProps> = ({
  market,
  onBuyCapacity,
}) => {
  const getOptions = () => {
    if (market === 'BNB') return [0.0001, 0.01, 0.1, 1, 10, 100];
    return [10, 50, 100, 500, 1000, 5000];
  };

  const getAssetOptions = () => {
    if (market === 'USDT') return ['USDT', 'EUSD'];
    if (market === 'EUSD') return ['EUSD', 'USDT'];
    if (market === 'ECOIN') return ['ECOIN'];
    return ['BNB'];
  };

  const options = getOptions();
  const assetOptions = getAssetOptions();

  const [selectedAmount, setSelectedAmount] = useState<number>(options[2]);
  const [selectedAsset, setSelectedAsset] = useState<string>(assetOptions[0]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white tracking-wide">
          STEP 3 — BUY {market} PROFIT CAPACITY
        </h3>
        <span className="text-xs text-amber-400 font-bold">Commitment Seal (CS)</span>
      </div>

      <div>
        <label className="text-xs text-slate-400 font-medium block mb-2">
          Choose Commitment Value:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedAmount(opt)}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedAmount === opt
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {opt} {selectedAsset}
            </button>
          ))}
        </div>
      </div>

      {assetOptions.length > 1 && (
        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium block">Payment Asset:</label>
          <div className="flex gap-4">
            {assetOptions.map((ast) => (
              <label key={ast} className="flex items-center gap-2 text-xs text-white cursor-pointer">
                <input
                  type="radio"
                  name="paymentAsset"
                  value={ast}
                  checked={selectedAsset === ast}
                  onChange={() => setSelectedAsset(ast)}
                  className="accent-amber-500"
                />
                {ast}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
        <div className="flex justify-between text-slate-400">
          <span>Capital Reference:</span>
          <span className="font-bold text-white">{selectedAmount} {selectedAsset}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Potential Profit Cap (+30%):</span>
          <span className="font-bold text-emerald-400">{(selectedAmount * 0.3).toFixed(2)} {selectedAsset}</span>
        </div>
        <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-1 font-bold">
          <span>Maximum Cycle Capacity:</span>
          <span className="text-amber-400">{(selectedAmount * 1.3).toFixed(2)} {selectedAsset}</span>
        </div>
      </div>

      <button
        onClick={() => onBuyCapacity(selectedAmount, selectedAsset)}
        className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md"
      >
        BUY PROFIT CAPACITY
      </button>
    </div>
  );
};

export default ProfitCapacityPanel;