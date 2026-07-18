'use client';

import React from 'react';

interface AddressAvatarProps {
  address: string;
}

export default function AddressAvatar({ address }: AddressAvatarProps) {
  // Gera uma cor de gradiente hash determinística baseada no endereço para o avatar
  const getGradientColors = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color1 = `hsl(${Math.abs(hash % 360)}, 75%, 55%)`;
    const color2 = `hsl(${Math.abs((hash + 120) % 360)}, 75%, 55%)`;
    return { color1, color2 };
  };

  const { color1, color2 } = getGradientColors(address);

  return (
    <div 
      className="w-5 h-5 rounded-full shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.05)]"
      style={{
        background: `linear-gradient(135deg, ${color1}, ${color2})`
      }}
    />
  );
}