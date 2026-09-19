'use client';

export const usePoolParticipation = (userStake: number, totalEligibleStake: number) => {
  const poolSharePercentage = totalEligibleStake > 0 
    ? ((userStake / totalEligibleStake) * 100).toFixed(2) 
    : '0.00';

  return {
    userStake,
    totalEligibleStake,
    poolSharePercentage: Number(poolSharePercentage)
  };
};