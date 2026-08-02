import { useState, useEffect } from 'react';
import { PriceData } from '../types/price';
import { REFRESH_PRICE } from '../constants';

export function useECoinPrice(): PriceData {
  const [priceData, setPriceData] = useState<PriceData>({
    price: 0.01, // Mock inicial seguro
    change24h: 0.0,
    volume24h: 0,
    liquidity: 0,
  });

  useEffect(() => {
    async function updatePrice() {
      // Aqui integraras a chamada ao pancakeService quando tiveres o par configurado
      // Exemplo temporário para manter a UI funcional:
      setPriceData((prev) => ({
        ...prev,
        price: 0.0102, 
        change24h: 2.5,
      }));
    }

    updatePrice();
    const interval = setInterval(updatePrice, REFRESH_PRICE);
    return () => clearInterval(interval);
  }, []);

  return priceData;
}