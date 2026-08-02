import { useState, useEffect } from 'react';
import { pancakeService } from '../services/pancake.service';
import { ECOIN_TOKEN_ADDRESS } from '../constants';

export function useTokenSupply() {
  const [supply, setSupply] = useState<number>(0);

  useEffect(() => {
    async function fetchSupply() {
      const total = await pancakeService.getTokenSupply(ECOIN_TOKEN_ADDRESS);
      setSupply(total);
    }
    fetchSupply();
  }, []);

  return supply;
}