import React from 'react';
import { useCandlestick } from './hooks/useCandlestick';

export const ECoinChart: React.FC = () => {
  const candles = useCandlestick();

  return (
    <div className="w-full h-64 bg-gray-900 rounded-xl p-4 flex flex-col justify-between">
      <div className="text-white text-sm font-semibold">Gráfico Candlestick (Tempo Real)</div>
      <div className="flex-1 flex items-end gap-1 overflow-x-auto py-2">
        {candles.map((candle, index) => (
          <div key={index} className="flex flex-col items-center h-full justify-end group relative">
            <div 
              className={`w-2 ${candle.close >= candle.open ? 'bg-green-500' : 'bg-red-500'}`} 
              style={{ height: '60%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};