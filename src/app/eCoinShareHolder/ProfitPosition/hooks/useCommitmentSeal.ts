'use client';

import { useState } from 'react';
import { CommitmentSeal } from '../types';

export const useCommitmentSeal = () => {
  const [seals, setSeals] = useState<CommitmentSeal[]>([
    {
      id: 'cs-1',
      sealNumber: '#001',
      capitalAmount: 100,
      paymentAsset: 'BNB',
      maxCapacity: 130,
      startDate: '2026-09-18',
      status: 'ACTIVE'
    }
  ]);

  const buyCapacity = (amount: number, asset: string) => {
    const newSeal: CommitmentSeal = {
      id: `cs-${seals.length + 1}`,
      sealNumber: `#00${seals.length + 1}`,
      capitalAmount: amount,
      paymentAsset: asset,
      maxCapacity: amount * 1.30,
      startDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE'
    };
    setSeals((prev) => [...prev, newSeal]);
  };

  const totalCommitment = seals.reduce((acc, curr) => acc + curr.capitalAmount, 0);
  const totalMaxCapacity = seals.reduce((acc, curr) => acc + curr.maxCapacity, 0);

  return { seals, buyCapacity, totalCommitment, totalMaxCapacity };
};