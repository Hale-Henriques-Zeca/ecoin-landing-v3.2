'use client';

import React from 'react';

export type NetworkKey = 'bsc' | 'ethereum' | 'polygon' | 'eden' | string;

interface NetworkIconProps {
  networkKey: NetworkKey;
  size?: number;
}

export default function NetworkIcon({ networkKey, size = 16 }: NetworkIconProps) {
  const normalizedKey = networkKey.toLowerCase();

  // BNB Smart Chain Logo Premium
  if (normalizedKey === 'bsc' || normalizedKey === 'bnb') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L16.5 6.5L12 11L7.5 6.5L12 2Z" fill="#F3BA2F" />
        <path d="M16.5 17.5L12 22L7.5 17.5L12 13L16.5 17.5Z" fill="#F3BA2F" />
        <path d="M12 11L16.5 6.5L21 11L16.5 15.5L12 11Z" fill="#F3BA2F" />
        <path d="M7.5 6.5L12 11L7.5 15.5L3 11L7.5 6.5Z" fill="#F3BA2F" />
      </svg>
    );
  }

  // Ethereum Logo Premium
  if (normalizedKey === 'ethereum' || normalizedKey === 'eth') {
    return (
      <svg width={size} height={size} viewBox="0 0 784 1277" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.8">
          <path d="M392 0L383.5 29V868.5L392 877L784 646L392 0Z" fill="#8C8C8C" />
          <path d="M392 0L0 646L392 877V469.5V0Z" fill="#3C3C3D" />
          <path d="M392 956L387 962V1271.5L392 1277L784 725L392 956Z" fill="#8C8C8C" />
          <path d="M392 1277V956L0 725L392 1277Z" fill="#3C3C3D" />
          <path d="M392 877L784 646L392 469.5V877Z" fill="#141414" />
          <path d="M0 646L392 877V469.5L0 646Z" fill="#343435" />
        </g>
      </svg>
    );
  }

  // Polygon (Matic) Logo Premium
  if (normalizedKey === 'polygon' || normalizedKey === 'matic') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 6L19.5 7.7V11.2L16.5 13L13.5 11.2V7.7L16.5 6ZM7.5 11L10.5 12.7V16.2L7.5 18L4.5 16.2V12.7L7.5 11ZM7.5 3L10.5 4.7V8.2L7.5 10L4.5 8.2V4.7L7.5 3ZM16.5 14L19.5 15.7V19.2L16.5 21L13.5 19.2V15.7L16.5 14Z" fill="#8247E5" />
      </svg>
    );
  }

  // Eden Chain Logo Premium (Custom Gold & Emerald Gradient)
  if (normalizedKey === 'eden') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2L4 9V23L16 30L28 23V9L16 2Z" fill="url(#edenGrad)" />
        <path d="M16 8L8 12.5V19.5L16 24L24 19.5V12.5L16 8Z" fill="#050505" />
        <path d="M16 11L11 14V18L16 21L21 18V14L16 11Z" fill="url(#edenGrad)" />
        <defs>
          <linearGradient id="edenGrad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4AF37" />
            <stop offset="1" stopColor="#00FF9C" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Fallback (Globo de Rede Genérico)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}